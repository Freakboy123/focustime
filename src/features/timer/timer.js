import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, Vibration, Platform } from 'react-native';
import { ProgressBar } from 'react-native-paper';
import {useKeepAwake} from 'expo-keep-awake'

import { fontSizes, spacing } from '../../utils/sizes';
import { colors } from '../../utils/colors';
import { Countdown } from '../../components/CountDown';
import { RoundedButton } from '../../components/RoundedButton';

import {Timing} from './Timing'

const Timer = ({ focusSubject, onFocusEnd, cleartheSubject }) => {
  useKeepAwake()
  
  const [isStarted, setIsStarted] = useState(false);
  const [progress, setProgress] = useState(1) 
  const [minutes, setMinutes] = useState(0.05)
  
  const colors ={
    'red': '#eb4b3d',
    'green': '#00d1d1', 
    'yellow': '#ebb73d'
  }

  const onChangeTime = (min) =>{
    setMinutes(min)
    setIsStarted(false)
    setProgress(1)
  }

  const onEnd = () =>{
    setProgress(1)
    setIsStarted(false)
    onFocusEnd()
    const interval = setInterval(()=>Vibration.vibrate(), 200);
    setTimeout(()=>clearInterval(interval), 3000)
  }

  const onProgress = (progress)=>{
    setProgress(progress)
  }
  return (
    <View style={styles.container}>
      <View style={styles.countdown}>
        <Countdown minutes ={minutes} isPaused={!isStarted} onEnd={onEnd} onProgress={onProgress} />
      </View>
      <View
        style={{
          marginRight: 50,
          marginBottom: 10,
          marginTop: Platform.OS === 'ios' ? 0 : 20,
          padding: Platform.OS === 'ios' ? 20: 10,
          marginLeft: 50,
          shadowColor: '#000',
          shadowOffset: {
            width: Platform.OS === 'ios' ? 2: 1,
            height: 4,
          },
          shadowOpacity: Platform.OS === 'ios' ? 0.3: 0.1,
          shadowRadius: Platform.OS === 'ios' ? 4.65: 1,
          elevation: Platform.OS === 'ios' ? 3: 1,
          borderRadius: Platform.OS === 'ios' ? 25: 50,
          
        }}>
        <ProgressBar
          color={progress >= 0.66 ? colors.green : progress >= 0.33 ? colors.yellow : colors.red}
          progress={progress}
          style={{
            height: 50,
            borderRadius: 35,
            
            
    
          }}
        />
      </View>
      <View style={{ paddingTop: spacing.xxl}}>
        <Text style={styles.title}>Focusing on:</Text>
        <Text style={styles.task}>{focusSubject}</Text>
      </View>
        
        <View style={styles.timing}>
          <Timing onChangeTime={onChangeTime}/>
        </View>

        <View style={styles.buttonWrapper}>
          {!isStarted ? (
            <RoundedButton
              text="Start"
              size={100}
              onPress={() => {
                setIsStarted((prevState) => !prevState);
              }}
            />
          ) : (
            <RoundedButton
              text="Pause"
              size={100}
              onPress={() => {
                setIsStarted((prevState) => !prevState);
              }}
            />
          )}
        </View>
        <View style={styles.clearSubject}>
          <RoundedButton
                text="-"
                size={60}
                onPress={() => {
                  cleartheSubject();
                }}
              />
        </View>
      
    </View>
  );
};

export { Timer };

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    color: colors.white,
    textAlign: 'center',
    fontSize: fontSizes.lg,
  },
  task: {
    color: colors.white,
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: fontSizes.lg,
  },
  countdown: {
    flex: 0.5,
    margin: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonWrapper: {
    flex: 0.3,
    paddingTop: 30,
    alignItems: 'center',
  },
  clearSubject:{
    paddingLeft: 15,
    marginTop: 30,
    
  }

});
