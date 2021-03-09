import React, { useEffect, useContext } from "react";

import axios from "axios";
import { Context } from "./Store";
import Post from "./Post";

const Blog = () => {
  const [state, dispatch] = useContext(Context);

  useEffect(() => {
    axios
      .get("https://jsonplaceholder.typicode.com/posts")
      .then(response => {
        const postsData = response.data;
        console.log({ postsData });
        dispatch({ type: "SET_POSTS", payload: postsData });
      })
      .catch(error => {
        console.log(error);
        dispatch({ type: "SET_ERROR", payload: error });
      });
  }, []);

  let posts = <p>Loading...</p>;

  if (state.error) {
    posts = (
      <p>
        Something went wrong: <span>{state.error}</span>
      </p>
    );
  }

  if (!state.error && state.posts && state.posts.length != 0) {
    posts = state.posts.map(post => {
      return <Post key={post.id} title={post.title} author={post.userId} />;
    });
  }

  return posts;
};

export default Blog;
