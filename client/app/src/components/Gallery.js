import CloseIcon from '@mui/icons-material/Close';
import { Link } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios'
import { useDispatch } from "react-redux";
import { delImg } from "./Redux/imageReducer.js"
import { deleteImageAPI } from '../utility/fetchAPI.js';

export const Gallery = ({ images, edit, isDel }) => {

  const dispatch = useDispatch();
  let token = localStorage.getItem("token");

  // xóa ảnh đã tạo
  const deleteImage = (image_id, token) => {
    deleteImageAPI(image_id, token)
      .then(res => {
        dispatch(delImg(res));
        isDel(true);
      }).catch(err => {
        console.log(err);
        toast.error(err + " 👎!", {
          position: "top-center"
        });
      });
  }

  return (
    <div className="gallery">
      {
        images.map(item => (
          <div className="post_box" key={item.image_id}>
            <div className="card" style={{ textDecoration: 'none' }}>
              {edit === "enable" && <CloseIcon className='delete' onClick={() => deleteImage(item.image_id, token)} />}
              <Link to={token ? `/detail/${item.image_id}` : `/signin`} ><img src={item.image_path} /></Link>
              <h2>{item.image_name}</h2>
            </div>
          </div>
        ))
      }
    </div>
  )
}
