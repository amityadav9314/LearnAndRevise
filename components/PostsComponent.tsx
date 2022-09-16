import * as WebBrowser from 'expo-web-browser';
import {
  Button,
  FlatList,
  ListRenderItemInfo,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  useColorScheme
} from 'react-native';
import * as constants from '../constants/General';

import Colors from '../constants/Colors';
import {Text, View} from './Themed';
import Loading from "./Loading";
import ReadType from "../dtos/ReadType";
import {FontAwesome} from '@expo/vector-icons';
import * as React from "react";
import {useEffect, useState} from "react";
import GetPosts from "../rest/getPosts";
import PostRevise from "../rest/postRevise";
import DeleteRevise from "../rest/deleteRevise";
import {NavigationProp} from "@react-navigation/native";


interface Props {
  readType: ReadType
  nav: NavigationProp<any>
}

export default function PostsComponent(props: Props) {
  const [topicData, setTopicData] = useState<PostsDTO>();
  const [refreshed, setRefreshed] = useState(false);
  const colorScheme = useColorScheme();

  const themeTextStyle = colorScheme === 'light' ? styles.lightThemeText : styles.darkThemeText;
  const themeContainerStyle =
    colorScheme === 'light' ? styles.lightContainer : styles.darkContainer;


  const refresh = () => {
    console.log("refresh method is called");
    GetPosts(props.readType)
      .then(r => {
        setTopicData(r);
        setRefreshed(true);
      });
  }

  useEffect(() => {
    refresh();
  }, []);


  if (!topicData) {
    console.log("topic data is not loaded");
    return (
      <View>
        <Loading/>
      </View>
    );
  }

  function onPressLearn() {
    props.nav.navigate("TabTwo");
  }

  const renderNoStateMessage = () => {
    return (
      <View style={[styles.noTopic, themeContainerStyle]}>
        <Text style={[themeTextStyle]}>You have no nothing to revise today.</Text>
        <FontAwesome style={[{textAlign: 'center', fontSize: 50, marginBottom: 30, color: 'green'}]} name={'check'}/>
        <Button
          onPress={onPressLearn}
          title="Start Learning"
          color={Colors.defaultBtnColor}
          accessibilityLabel="Learn BC"
        />
      </View>
    );
  }

  const loadingComponent = <Loading/>;

  const markForRevision = (item: Post) => {
    return (
      <View style={[styles.content, themeContainerStyle]}>
        <TouchableOpacity
          onPress={() => handleMarkRevise(item.id, item.title)}
        >
          <FontAwesome style={[styles.eye, themeTextStyle]} name={'envelope'}/>
        </TouchableOpacity>
      </View>
    );
  }

  const unMarkForRevision = (item: Post) => {
    return (
      <View style={[styles.content, themeContainerStyle]}>
        <TouchableOpacity
          onPress={() => handleUnmarkRevise(item.id, item.title)}
        >
          <FontAwesome style={[styles.eye, themeTextStyle]} name={'envelope-open'}/>
        </TouchableOpacity>
      </View>
    );
  }

  const topicsComponent =
    <FlatList
      data={topicData.results}
      ListEmptyComponent={renderNoStateMessage()}
      keyExtractor={(item) => item.id.toString()}
      refreshing={!refreshed}
      onRefresh={refresh}
      renderItem={({item}: ListRenderItemInfo<Post>) => {
        return (
          <View style={[styles.topic, themeContainerStyle]}>
            <View style={[styles.content, themeContainerStyle]}>
              <TouchableOpacity
                onPress={() => handleViewPosts(item.get_absolute_url)}
              >
                <Text style={[styles.topicLinkText, themeTextStyle]}>
                  <FontAwesome style={[styles.eye, themeTextStyle]} name={'play-circle-o'}/> {item.title}
                </Text>
              </TouchableOpacity>
            </View>
            {
              props.readType == ReadType.LEARN
              && !item.do_revise
              && markForRevision(item)
            }

            {
              props.readType == ReadType.LEARN
              && item.do_revise
              && unMarkForRevision(item)
            }
          </View>
        );
      }}
    />;
  return (
    <SafeAreaView style={{flex: 1, flexDirection: 'row'}}>
      {refreshed ? topicsComponent : loadingComponent}
    </SafeAreaView>
  );
}

function handleMarkRevise(id: number, title: String) {
  PostRevise(id).then(r => {
    if (r.status == 'success') {
      alert("Post `" + title + "` marked to be revised later");
    } else {
      alert("Error: " + r.error);
    }
  });
}

function handleUnmarkRevise(id: number, title: String) {
  DeleteRevise(id).then(r => {
    if (r.status == 'success') {
      alert("Post `" + title + "` deleted from to be revised list");
    } else {
      alert("Error: " + r.error);
    }
  });
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
  content: {
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
    fontSize: 20,
    fontWeight: 'bold'
  },
  lightContainer: {
    backgroundColor: '#f5f5f5',
  },
  darkContainer: {
    backgroundColor: '#1f1d1d',
  },
  lightThemeText: {
    color: '#242c40',
  },
  darkThemeText: {
    color: '#d0d0c0',
  },
});
