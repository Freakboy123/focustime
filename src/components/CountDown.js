import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { fontSizes, spacing } from '../utils/sizes';
import { colors } from '../utils/colors';

const minutesToMillis = (min) => min * 1000 * 60;
const formatTime = (time) => (time < 10 ? `0${time}` : time);
const Countdown = ({
  minutes = 1,
  isPaused = true,
  onStart = () => {},
  onPause = () => {},
  onEnd = () => {},
  onProgress = () => {},
}) => {

  const interval = useRef(null)
  const [millis, setMillis] = useState(null);

  const countDown = () => {
    setMillis((prevTime) => {
      const timeLeft = prevTime - 1000;
      if (prevTime === 0) { 
        clearInterval(interval.current)
        interval.current = null
        return timeLeft;
      }
          
      
      return timeLeft;
    });
  };

  useEffect(()=>{
    setMillis(minutesToMillis(minutes))
    }, [minutes]
  )

  useEffect(()=>{
    onProgress(millis/minutesToMillis(minutes))
    if (millis === -1000){
      onEnd() 
    }
  }, [millis])

  useEffect(()=>{ //Initial Pause: true
    if (isPaused){
      return;
    }
    interval.current = setInterval(countDown, 1000)

    return ()=> {clearInterval(interval.current)}
  }, [isPaused])


  const minute = Math.floor(millis / 1000 / 60);
  const seconds = Math.floor((millis - minutesToMillis(minute)) / 1000);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>
        {minute>=0 ? formatTime(minute):'00'}:{minute>=0 ? formatTime(seconds):'00'}
      </Text>
    </View>
  );
};

export { Countdown };

const styles = StyleSheet.create({
  text: {
    color: '#fae873',
    fontSize: fontSizes.xxxl,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  container: {
    backgroundColor: 'rgba(0, 60, 97, 0.2)',
    shadowOffset: {
      width: 5,
      height: 5,
    },
    shadowRadius: 15,
    shadowOpacity: 0.25,
    borderRadius: 30,
    padding: spacing.md,
  },
});
