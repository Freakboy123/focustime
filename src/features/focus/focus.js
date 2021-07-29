import React, { useState } from 'react';
import { Text, StyleSheet, View, TextInput, Platform } from 'react-native';
import {} from 'react-native-paper';
import { RoundedButton } from '../../components/RoundedButton';
import { fontSizes, spacing } from '../../utils/sizes';
import { colors } from '../../utils/colors';

const Focus = (props) => {
  const [textInput, setTextInput] = useState('');

  const onSetFocus = (text) => {
    props.setFocusSubject(text.trim());
  };

  return (

    <View style={styles.container}>
      <View style={styles.appTitle}>
        <Text style={{ fontSize: 50, textAlign: 'center',  fontWeight: 'bold', color: "#f7d734" }}>FocusTime</Text>
      </View>
      <Text style={styles.title}>What would you like to focus on?</Text>
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Enter a task..."
          style={styles.input}
          value={textInput}
          onChange={({ nativeEvent }) => {
            setTextInput(nativeEvent.text);
          }}
        />
        <RoundedButton
        style={{flex: 0.5}}
        size = {55}
          text={'+'}
          textStyle={{ fontSize: 30 }}
          onPress={() => {
            onSetFocus(textInput);
          }}
        />
      </View>
    </View>

  );
};

export { Focus };

const styles = StyleSheet.create({
  appTitle: {
    marginBottom: Platform.OS === 'ios' ? 60 : 40,
    margin: 30,
    padding: 8,
    backgroundColor: 'rgba(9, 78, 237, 0.2)',
    shadowOffset: {
      width: 5,
      height: 5,
    },
    shadowRadius: 15,
    shadowOpacity: 0.5,
    borderRadius: 60,

   
  },
  container: {
    flex: 1,
    padding: spacing.sm,
    justifyContent: 'center',
  },
  title: {
    color: colors.white,
    fontWeight: 'bold',
    fontSize: 28,
    textAlign: 'center',
  },
  input: {
    flex: 2.5,
    fontSize: fontSizes.lg,
    borderWidth: 0,
    backgroundColor: colors.white,
    height: 60,
    shadowOffset: {
      width: 5,
      height: 5,
    },
    shadowRadius: 12,
    shadowOpacity: 0.25,
    padding: spacing.md,
    borderRadius: 30,
    marginRight: spacing.lg,
  },

  inputContainer: {
    paddingBottom: Platform.OS === 'ios' ? spacing.sm: spacing.md,
    paddingTop: Platform.OS === 'ios' ? spacing.md : spacing.lg,
    flex: 0.5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    margin: spacing.md,
    marginTop: spacing.xl,
  },
});
