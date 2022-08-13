import ReadType from "../dtos/ReadType";
import {topicIP} from "../constants/General";

async function GetPosts(readType: ReadType): Promise<PostsDTO> {
  try {
    let url = topicIP + "/rest/posts/revise/";
    if (readType == ReadType.LEARN) {
      url = topicIP + "/rest/posts/";
    }
    const resp = await fetch(url);
    const respJson = await resp.json();
    console.log("Resp: " + JSON.stringify(respJson));
    return respJson;
  } catch (e) {
    console.log("Error occurred while fetch posts: " + e);
    throw e;
  }
}

export default GetPosts;
