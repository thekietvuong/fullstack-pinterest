import React, { useEffect } from 'react'
import { Gallery } from '../components/Gallery'
import { useDispatch, useSelector } from "react-redux";
import { search } from "../components/Redux/imageReducer.js"
import { Navbar } from '../components/Navbar';
import { getImagesAPI } from '../utility/fetchAPI';

export const Home = () => {

    const images = useSelector(state => state.images.images);
    const dispatch = useDispatch();

    //get image
    useEffect(() => {
          getImagesAPI()
            .then(res => dispatch(search(res)))
            .catch(err => console.log(err));
    },[]);

  return (
    <div>
      <Navbar/>
      <Gallery images={images} edit="disable"/>
    </div>
  )
}
