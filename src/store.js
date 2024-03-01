import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./components/redux/userSlice";
import movieReducer from "./components/redux/movieSlice";
import langReducer from "./components/redux/langSlice";

const store = configureStore({
  reducer: {
    user: userReducer,
    movies: movieReducer,
    multilang: langReducer,
  },
});

export default store;
