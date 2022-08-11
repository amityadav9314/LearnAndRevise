import React from 'react';
import {ActivityIndicator, StyleSheet} from 'react-native';
import {View} from './Themed';

const Loading = () => {
  return (
    <View style={styles.loader}>
      <ActivityIndicator size="large" color="red" />
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