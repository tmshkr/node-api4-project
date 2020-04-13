import React from "react";
import { useHistory } from "react-router-dom";
import { Card, CardText, CardBody, Button } from "reactstrap";
import axios from "../utils/axios";
import "./Post.scss";

function Post(props) {
  const { id, text } = props.post;
  const deletePost = (id) => {
    axios.delete(`/api/posts/${id}`).then(() => props.getPosts());
  };
  return (
    <Card className="post">
      <CardBody>
        <CardText>{text}</CardText>
        <Button color="danger" onClick={() => deletePost(id)}>
          Delete
        </Button>
      </CardBody>
    </Card>
  );
}

export default Post;
