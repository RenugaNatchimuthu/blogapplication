import React, { useState } from 'react';
import axios from "axios";
import { auth } from "../Components/firebase-config";

// const Comment = ({ content }) => (
//   <div className="comment">
//     <p className="comment__content">{content}</p>
//   </div>
// );

const CommentSection = ({ postid }) => {
  const [comments, setComments] = useState('');
  const handleSubmit= async () => {
  try {
    const response = await axios.post('https://localhost:44315/api/Blog/CreateComments', {
      "comments": comments,
      "post_id": 3,
      "commentsAuthor": auth.currentUser.displayName
    });

    console.log('Comment posted successfully:',response.data);
  } 
  catch (error) {
  console.error('Error when posting comment:',error);
  }
}
  

  return (
    <form className="comment-form" onSubmit={handleSubmit}>
      <textarea
        className="comment-form__textarea"
        placeholder="Write your comment here..."
        onChange={(e) => setComments(e.target.value)}
      />
      <button className="comment-form__submit" type="submit">Post</button>
    </form>
  );
};

// const CommentSection = () => {
//   const [comments, setComments] = useState([]);

//   const handleCommentSubmit = (newComment) => {
//     setComments([...comments, newComment]);
//   };

//   return (
//     <div className="comment-section">
//       <h2 className="comment-section__header">Comments</h2>
//       {comments.map((comment, index) => (
//         <Comment key={index}  content={comment.content} />
//       ))}
//       <CommentForm onSubmit={handleCommentSubmit} />
//     </div>
//   );
// };

export default CommentSection;