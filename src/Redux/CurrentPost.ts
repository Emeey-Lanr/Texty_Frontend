import { createSlice } from "@reduxjs/toolkit";

import { POST } from "./HomePost";
const currentPost: POST = {
  text: "",
  time: 0,
  img_url: "",
  postedBy: "",
  comment: [],
  likes: [],
};

export const currentPostSlice = createSlice({
  name: "currentPostSlice",
  initialState: { value: currentPost },
  reducers: {
    getCurrentPost: (state, action) => {
      state.value = action.payload;
    },
    // work for like and unlike
    getCurrentLikes: (state, action) => {
      if (
        state.value.time === action.payload.time &&
        state.value.postedBy === action.payload.postedBy
      ) {
        state.value.likes = action.payload.likesBox;
      }
    },
    commentR: (state, action) => {
      if (
        state.value.time === action.payload.time &&
        state.value.postedBy === action.payload.postedBy
      ) {
        state.value.comment = action.payload.commentBox;
      }
    },
  },
});

export const { getCurrentPost, getCurrentLikes, commentR } =
  currentPostSlice.actions;
export default currentPostSlice.reducer;
