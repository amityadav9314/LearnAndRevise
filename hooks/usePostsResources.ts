import {useEffect, useState} from "react";
import ReadType from "../dtos/ReadType";
import GetPosts from "../rest/getPosts";

export default function usePostsResources(readType: ReadType): PostsDTO {
  const [topics, setTopics] = useState<PostsDTO>();

  useEffect(() => {
    GetPosts(readType)
      .then(resp => setTopics(resp));
  }, []);

  return topics!;
}