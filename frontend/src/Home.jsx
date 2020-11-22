import React, { useState } from "react";
import "./Home.css";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import ChatBubbleOutlineIcon from "@material-ui/icons/ChatBubbleOutline";
import { useEffect } from "react";
import db from "./firebase";
import Modal from "./Modal";
import FlipMove from "react-flip-move";

function Home() {
  const [posts, setPosts] = useState([]);

  const [id, setId] = useState("");

  const [open, setOpen] = useState(false);

  useEffect(() => {
    db.collection("posts")
      .orderBy("createdAt", "desc")
      .onSnapshot((snapshot) =>
        setPosts(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            title: doc.data().title,
            createdAt: doc.data().createdAt,
            username: doc.data().username,
          }))
        )
      );
  }, []);

  return (
    <div className="home">
      <FlipMove className="card">
        {posts.map((post) => (
          <div
            className="card-content"
            key={post.id}
            onClick={() => {
              setOpen(true);
              setId(post.id);
            }}
          >
            <div className="card-title">
              <img src="https://source.unsplash.com/random" alt="" />
              <p>{post.username}</p>
            </div>
            <div className="card-post">
              <h3>{post.title}</h3>
            </div>
            <div className="card-actions">
              <div className="like">
                <FavoriteBorderIcon />
                <p>25 likes</p>
              </div>
              <div className="comment">
                <ChatBubbleOutlineIcon />
                <p>30 comments</p>
              </div>
            </div>
          </div>
        ))}
      </FlipMove>
      {open ? <Modal setOpen={setOpen} id={id} open={open} /> : ""}
    </div>
  );
}

export default Home;
