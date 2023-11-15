import { configureStore, combineReducers } from "@reduxjs/toolkit";
import imageReducer from "./imageReducer.js";
import authReducer from "./authReducer.js";

const rootReducer = combineReducers({ 
  images: imageReducer, 
  auth: authReducer
});

const store = configureStore({
  reducer: rootReducer
});

export default store;