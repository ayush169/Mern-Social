import React, { useState, useEffect, useContext } from "react";
import Post from "../post/Post";
import Share from "../share/Share";
// import { Posts } from "../../dummyData";
import axios from "axios";

import { AuthContext } from "../../context/AuthContext";

import "./feed.css";

const Feed = ({ username }) => {
  const [posts, setPosts] = useState([]);

  const { user } = useContext(AuthContext);

  useEffect(() => {
    const fetchPosts = async () => {
      const res = username
        ? await axios.get(`http://localhost:8800/api/posts/profile/${username}`)
        : await axios.get(
            "http://localhost:8800/api/posts/timeline/" + user._id
          );
      setPosts(res.data);
      console.log(res.data);
    };

    fetchPosts();
  }, [username, user._id]);

  return (
    <div className="feed">
      <div className="feedWrapper">
        <Share />
        {posts.map((p) => (
          <Post key={p._id} post={p} />
        ))}
      </div>
    </div>
  );
};

export default Feed;
