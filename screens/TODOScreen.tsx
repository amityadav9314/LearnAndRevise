import {StyleSheet} from 'react-native';

import {Text, View} from '../components/Themed';
import {RootTabScreenProps} from "../types";
import TODOComponent from "../components/TODOComponent";

export default function TODOScreen({navigation}: RootTabScreenProps<'TabFive'>) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Your TODOs</Text>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)"/>
      <TODOComponent />
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
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
