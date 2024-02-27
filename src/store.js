import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./components/redux/userSlice";
import movieReducer from "./components/redux/movieSlice"

const store = configureStore({
  reducer: {
    user: userReducer,
    movies: movieReducer,
  },
});

export default store;
