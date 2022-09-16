import {StyleSheet} from 'react-native';

import {Text, View} from '../components/Themed';
import PostsComponent from "../components/PostsComponent";
import ReadType from "../dtos/ReadType";
import {RootTabScreenProps} from "../types";

export default function LearnScreen({ navigation }: RootTabScreenProps<'TabTwo'>) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Don't let the byte code bite you</Text>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)"/>
      <PostsComponent readType={ReadType.LEARN} nav={navigation}/>
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
