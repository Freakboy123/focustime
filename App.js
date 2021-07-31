import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Platform, AsyncStorage, TextInput } from 'react-native';
import { Focus } from './src/features/focus/focus';
import { colors } from './src/utils/colors';
import { Timer } from './src/features/timer/timer';
import { fontSizes, spacing } from './src/utils/sizes';
import { FocusHistory } from './src/features/focus/FocusHistory';



const STATUS = {
  COMPLETED: 1,
  CANCELLED: 0,
};

export default function App() {
  const [focusSubject, setFocusSubject] = useState(null);
  const [focusHistory, setFocusHistory] = useState([]);
  Text.defaultProps = Text.defaultProps || {};
    // Ignore dynamic type scaling on iOS
    Text.defaultProps.allowFontScaling = false; 
    TextInput.defaultProps = TextInput.defaultProps || {};
    // Ignore dynamic type scaling on iOS
    TextInput.defaultProps.allowFontScaling = false; 

  const onDelete = (index)=>{ 
    const manipHistory = [...focusHistory]
    manipHistory.splice(index, 1)
    setFocusHistory(manipHistory)
  }

 const saveFocusHistory = async () => {
   console.log("GitHub")
    try {
      await AsyncStorage.setItem('focusHistory', JSON.stringify(focusHistory));
    } catch (e) {
      console.log(e); 
    }
  };
  
  const loadFocusHistory = async () => {
    try {
      const history = await AsyncStorage.getItem('focusHistory');

      if (history && JSON.parse(history).length) {
        setFocusHistory(JSON.parse(history));
      }
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(()=>{loadFocusHistory()}, [])
  useEffect(()=>{saveFocusHistory()}, [focusHistory])



  const onTask = (index) => {
    setFocusSubject(focusHistory[index].focusSubject)
    onDelete(index)
  }

 
  const addFocusWithStatus = (focusSubject, status) => {
    
    setFocusHistory([{key:Math.random() * 100 + 1, focusSubject, status}, ...focusHistory]); 
  }
 
  
  function clearSubject() {
    setFocusSubject(null);
  }
  return ( 
    <View style={styles.container}>
      {focusSubject ? (
        <Timer 
          focusSubject={focusSubject} 
          onFocusEnd={() => {
            addFocusWithStatus(focusSubject, STATUS.COMPLETED);
            clearSubject()
          }}
          cleartheSubject={() => {
            addFocusWithStatus(focusSubject, STATUS.CANCELLED);
            clearSubject();
          }}
        />
      ) : (
        <>
          <Focus setFocusSubject={setFocusSubject} />
          <FocusHistory data={focusHistory} onDelete={onDelete} onClear={()=>setFocusHistory([])} onTask={onTask}/>
        </>
      )}
      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.lightBlue,
    paddingTop: spacing.lg
  },
});
