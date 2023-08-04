import React, { useEffect, useState } from 'react'
import axios from "axios";
import { auth } from "../Components/firebase-config";
// import { useNavigate } from 'react-router-dom';

function Home() {
  const [postLists, setPostList] = useState([]);
  const [CommentsLists, setCommentList] = useState([]);
  const [comments, setComments] = useState('');

  const handleSubmit = async () => {
    try {
      console.log(comments);
      const response = await axios.post('https://localhost:44315/api/Blog/CreateComments', {
        "comments": comments,
        "post_id": 6,
        "commentsAuthor": auth.currentUser.displayName
      });

      console.log('Comment posted successfully:', response.data);
    }
    catch (error) {
      console.error('Error when posting comment:', error);
    }
  }

  // const navigate = useNavigate();
  //   const commentfn = () => {
  //     navigate("/Commentsection");
  // };
  useEffect(() => {
    const getPosts = async () => {
      const response = await fetch('https://localhost:44315/api/Blog/GetPost');
      const data = await response.json();
      console.log(data);
      setPostList(data);
    };
    getPosts();
    //  getComments(); 

  });
  const getComments = async (e) => {
    try {
      console.log('function called');
      const response = await fetch('https://localhost:44315/api/Blog/GetComments?id=6');
      console.log(response);
      const data = await response.json();
      console.log(data);
      setCommentList(data);
    }
    catch (error) {
      console.error('Error fetching comments:', error);
    }
  };
  return <div className="homePage">
    {
      // Render Posts
      postLists.map((post) => {
        return <div className="post">{""}
          <div className="postHeader">
            <div className="title">
              <h1> {post.title} </h1></div>
          </div>
          <div className="postTextContainer" key={post.postId}> {post.body} </div>
          {/* <h3>@{post.postAuthor}</h3> */}
          <button key={post.postId} onClick={getComments}>Show Comments</button>
          <form className="comment-form" >
            <textarea className="comment-form-textarea" placeholder="Write your comment here..." onChange={(e) => setComments(e.target.value)} />
          </form>
          <button className="comment-form-submit" onClick={handleSubmit} type="submit">Post</button>
          {

            CommentsLists.map((comment) => {
              return <div>
                <div className="CommentsTextContainer" key={comment.cid}>
                  <p>{comment.comment1} </p> </div>
                <h3>@{comment.commentsAuthor}</h3> </div>
                
            })}
        </div>
      })
    }
  </div>
}
export default Home
