import React from "react";
import { useSelector } from "react-redux";
import VideoPage from "./VideoPage";

const MainPage = () => {
  const movies = useSelector((store) => store.movies?.nowPlayingMovies);
  if (!movies) return;

  const mainMovie = movies[14];
  

  const { title, overview,id } = mainMovie;

  return (
    <div className="bg-gradient-to-t from-black h-[100vh]  ">
      <VideoPage title = {title} overview = {overview} id={id}/>
  
    </div>
  );
};

export default MainPage;
