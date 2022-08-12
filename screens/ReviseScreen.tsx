import { StyleSheet } from 'react-native';

import Posts from '../components/Posts';
import { Text, View } from '../components/Themed';
import { RootTabScreenProps } from '../types';
import ReadType from "../dtos/ReadType";

export default function ReviseScreen({ navigation }: RootTabScreenProps<'TabOne'>) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Today's Topics To Revise...</Text>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      <Posts readType={ReadType.REVISE}/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    paddingTop: 10,
    marginLeft: 10
  },
  separator: {
    marginVertical: 10,
    height: 1,
    width: '100%',
  },
});
