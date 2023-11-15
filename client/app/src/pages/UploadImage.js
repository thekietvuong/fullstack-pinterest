import React, { useEffect, useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Navbar } from '../components/Navbar';
import { getUserAPI, uploadImageAPI } from '../utility/fetchAPI';
import { jwtDecode } from 'jwt-decode';

export const UploadImage = () => {

  const token = localStorage.getItem("token");

  const [image, setImage] = useState();
  const [user, setUser] = useState({});
  const [fileName, setFileName] = useState();
  const [imgName, setImgName] = useState("");
  const [imgDesc, setImgDesc] = useState("");

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setImage(reader.result);
    };
  };

  // upload ảnh
  const postImage = () => {

    const formData = new FormData();
    formData.append('file', fileName);
    formData.append('image_name', imgName);
    formData.append('image_desc', imgDesc);

    uploadImageAPI(formData, token)
      .then(() => {
        toast.success("Your photo has been posted successfully 😃!", {
          position: "top-center"
        });
        setImage("");
        setImgName("");
        setImgDesc("");
      })
      .catch((err) => {
        toast.error(err.response.data + " 👎!", {
          position: "top-center"
        });
      })
  }

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

  useEffect(() => {
    const input = document.querySelector("#formFile");
    input.addEventListener("change", (event) => {
      setFileName(event.target.files[0]);
    });
  }, []);


  return (
    <>
      <Navbar />
      <div className="upload-image">
        <div className="left">
          {
            image
              ? <img src={image} alt="Ảnh upload" />
              : <div className='image-container'>You should use high quality .jpg files</div>
          }
          <input type="file" name="image" accept="image/*" onChange={handleImageUpload} id="formFile" placeholder="" />
        </div>
        <div className="right">
          <h1>Photo Title</h1>
          <input type="text" placeholder="Enter your photo's title" onChange={(e) => setImgName(e.target.value)} value={imgName} />
          <div className='user'>
            <img src={user.avatar} alt="Ảnh đại diện" />
            <h2>{user.full_name}</h2>
          </div>
          <input type="text" placeholder="Let people know what you want to share" onChange={(e) => setImgDesc(e.target.value)} value={imgDesc} />
          <button onClick={postImage}>Post</button>
        </div>
        <ToastContainer />
      </div>
    </>
  )
}
