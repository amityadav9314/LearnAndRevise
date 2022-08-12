import {useEffect, useState} from "react";
import * as constants from '../constants/General';
import ReadType from "../dtos/ReadType";

export default function usePostsResources(readType: ReadType): [boolean, PostsDTO] {
  const [isLoadingComplete, setLoadingComplete] = useState<boolean>(false);
  const [topics, setTopics] = useState<PostsDTO>();

  const getTodaysTopicsToRevise = async () => {
    try {
      let url = constants.topicIP + "/rest/posts/revise/";
      if(readType == ReadType.LEARN) {
        url = constants.topicIP + "/rest/posts/";
      }
      const resp = await fetch(url);
      const respJson = await resp.json();
      setTopics(respJson);
      setLoadingComplete(true);
      console.log("Resp: " + JSON.stringify(respJson));
    } catch (e) {
      console.log("Error occurred while fetch topics: " + e);
      throw e;
    }
  }

  // Loading all topics automatically when the app opens. No
  // event needs to be triggered by user.
  useEffect(() => {
    getTodaysTopicsToRevise();
  }, []);

  return [isLoadingComplete, topics!];
}