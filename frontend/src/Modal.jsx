import React, { useState } from "react";
import "./Modal.css";
import { useEffect } from "react";
import db from "./firebase";

import FavoriteBorderOutlined from "@material-ui/icons/FavoriteBorderOutlined";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ChatBubbleOutlineOutlined from "@material-ui/icons/ChatBubbleOutlineOutlined";
import { IconButton, Tooltip } from "@material-ui/core";
import Axios from "axios";
import FlipMove from "react-flip-move";

function Modal({ setOpen, id, open }) {
  const [post, setPost] = useState("");

  const [likes, setLikes] = useState("");

  const [comment, setComment] = useState("");

  const [comments, setComments] = useState([]);

  const [currentUser, setCurrentUser] = useState("");

  useEffect(() => {
    Axios.get("http://localhost:5000/api/v1/user/current", {
      headers: {
        token: localStorage.getItem("token"),
      },
    }).then((res) => {
      setCurrentUser(res.data.username);
    });
  }, []);

  useEffect(() => {
    db.collection("posts")
      .doc(id)
      .get()
      .then((doc) =>
        setPost({
          id: doc.id,
          title: doc.data().title,
          createdAt: doc.data().createdAt,
          username: doc.data().username,
        })
      );
  }, [id]);

  useEffect(() => {
    Axios.get(`http://localhost:5000/api/v1/post/singlePost/${id}`, {
      headers: {
        token: localStorage.getItem("token"),
      },
    }).then((res) => setLikes(res.data.likes));
  }, [id, likes]);

  const addLike = () => {
    const token = localStorage.getItem("token");
    fetch(`http://localhost:5000/api/v1/post/like/${id}`, {
      method: "PUT",
      headers: {
        token: token,
      },
    });
  };

  useEffect(() => {
    db.collection("posts")
      .doc(id)
      .collection("comments")
      .orderBy("createdAt", "desc")
      .onSnapshot((snapshot) =>
        setComments(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            comment: doc.data().comment,
            createdAt: doc.data().createdAt,
            username: doc.data().username,
          }))
        )
      );
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (comment) {
      db.collection("posts").doc(id).collection("comments").add({
        username: currentUser,
        comment: comment,
        createdAt: new Date().toISOString(),
      });
      setComment("");
    } else {
      alert("Write something");
    }
  };

  return (
    <div className="modal">
      <div className="modal-content">
        {!post && <h1 className="loader">loading...</h1>}
        {post && (
          <>
            <span className="close" onClick={() => setOpen(false)}>
              &times;
            </span>
            <div className="modal-post" key={post.id}>
              <div className="modal-avatar">
                <img src="https://source.unsplash.com/random" alt="" />
                <p>{post.username}</p>
              </div>
              <div className="modal-title">
                <h3>{post.title}</h3>
              </div>
              <div className="modal-actions">
                <div className="modal-likes">
                  <Tooltip
                    title={likes && likes.length === 0 ? "Like" : "You liked"}
                  >
                    <IconButton onClick={() => addLike()}>
                      {likes && likes.length === 0 ? (
                        <FavoriteBorderOutlined />
                      ) : (
                        <FavoriteIcon />
                      )}
                    </IconButton>
                  </Tooltip>
                  <p>{likes && likes.length}</p>
                </div>
                <div className="modal-commentCount">
                  <IconButton>
                    <ChatBubbleOutlineOutlined />
                  </IconButton>
                  <p>{likes && likes.length}</p>
                </div>
              </div>
            </div>
            <div className="modal-comment">
              <h2>Comment</h2>

              <form onSubmit={handleSubmit}>
                <input
                  type="text"
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                />
                <button type="submit">Add</button>
              </form>
            </div>
            <FlipMove>
              {comments.map((comment) => (
                <div className="modal-commentPost" key={comment.id}>
                  <div className="modal-commentAvatar">
                    <img src="https://source.unsplash.com/random" alt="" />
                    <p>{comment.username}</p>
                  </div>
                  <div className="modal-commentAll">
                    <h3>{comment.comment}</h3>
                  </div>
                  <div className="modal-commentActions">
                    <div className="modal-commentLikes">
                      <Tooltip
                        title={
                          likes && likes.length === 0 ? "Like" : "You liked"
                        }
                      >
                        <IconButton onClick={() => addLike()}>
                          {likes && likes.length === 0 ? (
                            <FavoriteBorderOutlined />
                          ) : (
                            <FavoriteIcon />
                          )}
                        </IconButton>
                      </Tooltip>
                      <p>{likes && likes.length}</p>
                    </div>
                  </div>
                </div>
              ))}
            </FlipMove>
          </>
        )}
      </div>
    </div>
  );
}

export default Modal;
