import React from 'react';
import { View, StyleSheet } from 'react-native';

import { RoundedButton } from '../../components/RoundedButton';

export const Timing = ({ onChangeTime }) => {
  return (
    <View style={styles.timing}>
      <RoundedButton
        size={75}
        style={styles.button}
        textStyle={{color: '#0b005c',}}
        text={'15'}
        onPress={()=>onChangeTime(15)}
      />
      <RoundedButton
        size={75}
        style={styles.button}
        text={'25'}
        textStyle={{color: '#0b005c',}}
        onPress={()=>onChangeTime(25)}
      />
      <RoundedButton
        size={75}
        style={styles.button}
        textStyle={{color: '#0b005c',}}
        text={'45'}
        onPress={()=>onChangeTime(45)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  timing: {
    marginTop: 30,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    margin: 20,
    backgroundColor: 'white',
    shadowOffset: {
      width: 5,
      height: 5,
    },
    shadowRadius: 15,
    shadowOpacity: 0.25,

  }
});
