import * as WebBrowser from 'expo-web-browser';
import {FlatList, ListRenderItemInfo, StyleSheet, TouchableOpacity} from 'react-native';
import * as constants from '../constants/General';

import Colors from '../constants/Colors';
import {Text, View} from './Themed';
import usePostsResources from "../hooks/usePostsResources";
import Loading from "./Loading";
import ReadType from "../dtos/ReadType";
import {FontAwesome} from '@expo/vector-icons';


interface Props {
  readType: ReadType
}

export default function Posts(props: Props) {
  let [isLoadingComplete, topics] = usePostsResources(props.readType);
  if (!isLoadingComplete) return null;
  const loadingComponent = <Loading/>;

  const renderNoStateMessage = () => {
    return (
      <View>
        <Text style={styles.noTopic}>You have no nothing to revise.</Text>
      </View>
    );
  }

  const topicsComponent =
    <FlatList
      data={topics.results}
      ListEmptyComponent={renderNoStateMessage()}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({item}: ListRenderItemInfo<Post>) => {
        return (
          <View style={styles.topic}>
            <View>
              <TouchableOpacity
                onPress={() => handleViewPosts(item.get_absolute_url)}
                style={styles.touchable}
              >
                <Text style={styles.topicLinkText} lightColor={Colors.light.tint}>
                  {item.title}
                </Text>
              </TouchableOpacity>
            </View>
            {
              props.readType == ReadType.LEARN
              &&
              <View>
                <TouchableOpacity
                  onPress={() => handleMarkPostAsRead(item.id)}
                  style={styles.touchable}
                >
                  <FontAwesome style={styles.eye} name={'eye-slash'}/>
                </TouchableOpacity>
              </View>
            }
          </View>
        );
      }}
    />;
  return (
    <View>
      {isLoadingComplete ? topicsComponent : loadingComponent}
    </View>
  );
}

function handleMarkPostAsRead(id: number) {
  alert("Mark as read");
}

function handleViewPosts(endpoint: string) {
  const url = constants.topicIP + endpoint;
  WebBrowser.openBrowserAsync(url);
}

const styles = StyleSheet.create({
  topic: {
    borderColor: '#e5e5e5',
    backgroundColor: '#f5f5f5',
    borderWidth: 1,
    padding: 10,
    margin: 5,
    flexDirection: 'row',
    alignItem: 'center',
    justifyContent: 'space-between',
  },
  touchable: {
    paddingVertical: 5,
    borderColor: '#e5e5e5',
    backgroundColor: '#f5f5f5',
  },
  topicLinkText: {
    color: '#000',
    fontSize: 20,
  },
  noTopic: {
    borderColor: '#e5e5e5',
    backgroundColor: '#f5f5f5',
    borderWidth: 1,
    padding: 50,
    margin: 5,
    textAlign: 'center',
  },
  eye: {
    color: '#000',
    fontSize: 20,
    fontWeight: 'bold'
  }
});
