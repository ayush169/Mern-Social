import React, { useState, useEffect } from "react";
import Post from "../post/Post";
import Share from "../share/Share";
// import { Posts } from "../../dummyData";
import axios from "axios";

import "./feed.css";

const Feed = ({ username }) => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const res = username
        ? await axios.get(`http://localhost:8800/api/posts/profile/${username}`)
        : await axios.get(
            "http://localhost:8800/api/posts/timeline/62fbb694b5510687c161a858"
          );
      setPosts(res.data);
      console.log(res.data);
    };

    fetchPosts();
  }, [username]);

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
