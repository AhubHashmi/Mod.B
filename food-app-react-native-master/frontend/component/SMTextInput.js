import React from 'react';
import { TextInput } from 'react-native';
import styles from '../styling';

function SMTextField(props) {
  const { label, onChangeText, value, disabled, keyboardType } = props;
  return (
    <>
      <TextInput
        keyboardType={keyboardType}
        value={value}
        editable={!disabled}
        style={[styles.input, styles.border1]}
        placeholderTextColor={styles._dark}
        placeholder={label}
        onChangeText={onChangeText}
      />
    </>
  );
}
export default SMTextField;
