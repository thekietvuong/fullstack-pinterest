import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getCommentAPI, getUserAPI, postCommentAPI } from '../utility/fetchAPI';
import { getRouteParam } from '../utility/getRouteParam';

export const Comment = () => {

  const [comments, setComment] = useState([]);
  const [user, setUser] = useState({});
  const [newComment, setNewComment] = useState(false);
  const [content, setContent] = useState("");

  const token = localStorage.getItem("token");
  const location = useLocation();

  //post comment
  const handleSubmit = (event) => {
    event.preventDefault();

    const model = {
      image_id: getRouteParam(location),
      content: content
    }
    postCommentAPI(model, token)
      .then(() => {
        setNewComment(true);
      })
      .catch(err => {
        toast.error(err.response.data + " 👎!", {
          position: "top-center"
        });
      });
  };

  //get thông tin user
  useEffect(() => {
    let decodedToken = jwtDecode(token).data;
    getUserAPI(decodedToken.user_id, token)
      .then(res => {
        setUser(res);
      })
      .catch(err => {
        toast.error(err.response.data + " 👎!", {
          position: "top-center"
        });
      });
  }, []);

  //get comment
  useEffect(() => {
    getCommentAPI(getRouteParam(location), token)
      .then(res => {
        setComment(res);
      })
      .catch(err => {
        toast.error("Can not get comments: " + err.response.data + " 👎!", {
          position: "top-center"
        });
      });
    setNewComment(false);
  }, [newComment]);

  return (
    <div className='comment_container'>
      <h3>{`${comments.length} ${comments.length > 1 ? "Comments" : "Comment"}`}</h3>
      <div className='comment_list'>
        {
          comments.map(item => (
            <div className='comment' key={item.comment_id}>
              <img className='avatar' src={item.users.avatar} />
              <p>{item.content}</p>
            </div>
          ))
        }
      </div>

      <div className='post_comment'>
        <img src={user.avatar} className="avatar" width="40" height="40" alt="Avatar" />
        <input type="text" className="input" placeholder="Enter comment here"
          onChange={(event) => setContent(event.target.value)}
        />
        <button className="submit" onClick={handleSubmit}>Send</button>
      </div>
      <ToastContainer />
    </div>
  )
}
