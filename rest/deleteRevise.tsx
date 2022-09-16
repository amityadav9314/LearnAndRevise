import {topicIP} from "../constants/General";

export default async function DeleteRevise(postId: number): Promise<PostsDTO> {
  try {
    let url = topicIP + "/rest/revise/";
    const resp  = await fetch(url, {
      method: 'DELETE',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        post_id: postId
      })
    });
    return await resp.json();
  } catch (e) {
    console.log("Error occurred while putting revise data" + e);
    throw e;
  }
}