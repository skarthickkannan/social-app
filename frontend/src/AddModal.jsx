import "./AddModal.css";
import { useState } from "react";
import db from "./firebase";
import axios from "axios";

function AddModal({ currentUser, setOpen }) {
  const [title, setTitle] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    db.collection("posts")
      .add({
        title: title,
        username: currentUser,
        createdAt: new Date().toISOString(),
      })
      .then((doc) => {
        const newPost = {
          postId: doc.id,
          title: title,
          username: currentUser,
        };
        axios.post("http://localhost:5000/api/v1/post/", newPost, {
          headers: {
            token: localStorage.getItem("token"),
          },
        });
      });
    setTitle("");
    setOpen(false);
  };

  return (
    <div className="addmodal">
      <div className="addmodal-content">
        <span className="close" onClick={() => setOpen(false)}>
          &times;
        </span>
        <form className="addForm" onSubmit={handleSubmit}>
          <h3>Add Post</h3>
          <input
            type="text"
            placeholder="Post"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <button type="submit">Post</button>
        </form>
      </div>
    </div>
  );
}

export default AddModal;
