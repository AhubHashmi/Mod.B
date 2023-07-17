import React from 'react';
import {TouchableOpacity, Text} from 'react-native';
import styles from '../styling';

function SMButton(props) {
  const {label, onPress} = props;
  return (
    <>
      <TouchableOpacity onPress={onPress} style={styles.btn}>
        <Text style={[styles.textWhite, styles.textCenter, styles.fs4]}>
          {label}
        </Text>
      </TouchableOpacity>
    </>
  );
}
export default SMButton;
