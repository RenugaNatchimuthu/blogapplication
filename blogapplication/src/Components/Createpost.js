import React, { useEffect, useState } from "react";
import axios from "axios";
import { auth } from "../Components/firebase-config";
import { useNavigate } from "react-router-dom";

function Createpost({ isAuth }) {
  const [title, setTitle] = useState("");
  const [postText, setPostText] = useState("");
  const navigate = useNavigate();

  const Createpost = async () => {
    try {
      const response = await axios.post('https://localhost:44315/api/Blog/CreatePost', {
        "title": title,
        "body": postText,
        "postAuthor": auth.currentUser.displayName
      });

      console.log(response.data);
    } 
    catch (error) {
    console.error(error);
    }
    navigate("/");
  };

  useEffect(() => {
    if (!isAuth) {
      navigate("/login");
    }
  }, [isAuth, navigate]);

  return (
    <div className="createPostPage">
      <div className="cpContainer">
        <h1>Create A Post</h1>
        <div className="inputGp">
          <label>Title:</label>
          <input
            placeholder="Title..."
            onChange={(event) => {
              setTitle(event.target.value);
            }}
          />
        </div>
        <div className="inputGp">
          <label>Post:</label>
          <textarea
            placeholder="Type here the description of your post"
            onChange={(event) => {
              setPostText(event.target.value);
            }}/>         
        </div>
        <button onClick={Createpost}>Submit Post</button>
      </div>
    </div>
  );
}

export default Createpost;