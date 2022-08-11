import * as WebBrowser from 'expo-web-browser';
import {FlatList, ListRenderItemInfo, StyleSheet, TouchableOpacity} from 'react-native';
import * as constants from '../constants/General';

import Colors from '../constants/Colors';
import {Text, View} from './Themed';
import useTopicResources from "../hooks/useTopicResources";
import Loading from "./Loading";
import ReadType from "../dtos/ReadType";

export default function TodaysTopicsToRevise() {
  let [isLoadingComplete, topics] = useTopicResources(ReadType.REVISE);
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
      renderItem={({item}: ListRenderItemInfo<Topic>) => {
        return (
          <View style={styles.topic}>
            <TouchableOpacity
              onPress={() => handleHelpPress(item.get_absolute_url)}
              style={styles.topicLink}
            >
              <Text style={styles.topicLinkText}
                    lightColor={Colors.light.tint}>
                {item.title}
              </Text>
            </TouchableOpacity>
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

function handleHelpPress(endpoint: string) {
  const url = constants.topicIP + endpoint;
  WebBrowser.openBrowserAsync(url);
}

const styles = StyleSheet.create({
  topic: {
    alignItems: 'flex-start',
    borderColor: '#e5e5e5',
    backgroundColor: '#f5f5f5',
    borderWidth: 1,
    padding: 10,
    margin: 5
  },
  topicLink: {
    paddingVertical: 5,
  },
  topicLinkText: {
    color: '#000',
  },
  noTopic: {
    borderColor: '#e5e5e5',
    backgroundColor: '#f5f5f5',
    borderWidth: 1,
    padding: 50,
    margin: 5,
    textAlign: 'center',
  }
});
