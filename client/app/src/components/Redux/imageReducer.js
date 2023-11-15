import { createSlice } from "@reduxjs/toolkit";

const imageSlice = createSlice({
  name: "images",
  initialState: {
    images: [],
  },
  reducers: {
    search: (state, action) => {
      return {
        images: action.payload,
      };
    },
    delImg: (state, action) => {
      return {
        images: action.payload,
      }
    }
  },
});

export const { search, delImg } = imageSlice.actions;
export default imageSlice.reducer;

