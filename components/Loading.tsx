import React from 'react';
import {ActivityIndicator, StyleSheet} from 'react-native';
import {View} from './Themed';
import Colors from "../constants/Colors";

const Loading = () => {
  return (
    <View style={styles.loader}>
      <ActivityIndicator size="large" color={Colors.defaultBtnColor} />
    </View>
  )
}

const styles = StyleSheet.create({
  loader: {
    justifyContent: 'center',
    alignItems: 'center',
  }
});

export default Loading;