import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom';
import { Comment } from '../components/Comment';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Navbar } from '../components/Navbar';
import { imageDetailsAPI, savedYetAPI, saveImgAPI } from '../utility/fetchAPI';
import { getRouteParam } from '../utility/getRouteParam';
import { jwtDecode } from 'jwt-decode';

export const Detail = () => {

  const [data, setData] = useState({});
  const [user, setUser] = useState({});
  const [save, setSave] = useState();
  const [clickSave, setclickSave] = useState(false);
  const location = useLocation();

  const token = localStorage.getItem("token");

  //Get thông tin ảnh và người tạo ảnh bằng id ảnh
  useEffect(() => {
    imageDetailsAPI(getRouteParam(location), token)
      .then(res => {
        setData(res);
        setUser(res.users);
      })
      .catch(err => {
        toast.error("Can not get image's detail: " + err.response.data + " 👎!", {
          position: "top-center"
        });
      });
  }, []);

  // Lưu ảnh
  const saveFn = () => {
    const model = {
      user_id: jwtDecode(token).data.user_id,
      image_id: getRouteParam(location)
    }
    saveImgAPI(model, token)
      .then(res => {
        toast.success(res + ` ${res === "Saved image successfully" ? "😃!" : "🥲!"} `, {
          position: "top-center"
        });
        setclickSave(true);
      }).catch(err => {
        toast.error(err + " 👎!", {
          position: "top-center"
        });
      });
  }

  // Get thông tin ảnh đã lưu chưa
  useEffect(() => {
    setclickSave(false);
    savedYetAPI(getRouteParam(location), token)
      .then(res => {
        if (res === "Photo has not been saved") {
          setSave("");
        } else {
          setSave(res);
        }
      })
      .catch(err => {
        toast.error("Can not get image's saved info: " + err.response.data + " 👎!", {
          position: "top-center"
        });
      });
  }, [clickSave]);

  return (
    <>
      <Navbar />
      <div className='detail_container'>
        <img className='image_details' src={data.image_path} alt="img" />
        <div className='details'>
          <button
            className='save'
            onClick={saveFn}
            style={{
              backgroundColor: save ? "black" : "#E41E27",
            }}
          >
            {save ? "Saved" : "Save"}
          </button>
          <h1>{data.image_name}</h1>
          <p>{data.image_desc}</p>
          <div className='poster'>
            <img className='avatar' src={user.avatar} />
            <h2>{user.full_name}</h2>
          </div>
          <Comment />
        </div>
        <ToastContainer />
      </div>
    </>
  )
}
