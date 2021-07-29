import React from 'react'
import {TouchableOpacity, Text, StyleSheet} from 'react-native'
import {colors} from '../utils/colors'



function RoundedButton({
  style={},
  textStyle={},
  size=60,
  ...props
}){

  return (
    <TouchableOpacity style={[styles(size).radius, style]} onPress={props.onPress}>
      <Text style={[styles(size).text, textStyle]}>{props.text}</Text>
    </TouchableOpacity>
  )



}


const styles = (size)=>StyleSheet.create({
  radius: {
    borderWidth: 2,
    width: size,
    height: size,
    borderRadius: size/2,
    borderColor: colors.white,
    justifyContent: "center",
  },
  text:{
    fontSize: size/4,
    color: colors.white,
    textAlign: "center"
  }
})

export {RoundedButton}