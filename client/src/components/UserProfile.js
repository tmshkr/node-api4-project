import React, { useEffect, useState } from "react";
import axios from "../utils/axios";

import Post from "./Post";

function UserProfile(props) {
  const { history, match, users, getUsers } = props;
  const [posts, setPosts] = useState([]);
  const [name, setName] = useState("");
  const { id } = match.params;
  useEffect(() => {
    axios.get(`/api/users/${id}`).then(({ data }) => setName(data.name));
    axios.get(`/api/users/${id}/posts`).then(({ data }) => setPosts(data));
  }, []);
  return (
    <div className="user-profile">
      <h3>{name}</h3>
      {posts.map((p) => (
        <Post key={p.id} post={p} />
      ))}
    </div>
  );
}

export default UserProfile;
