import React, { useEffect, useState } from "react";
import { FaPlay } from "react-icons/fa";
import { MdInfoOutline } from "react-icons/md";
import { API_OPTION } from "../constant/constant";
import { useDispatch, useSelector } from "react-redux";
import { addTrailerVideo } from "../redux/movieSlice";
import { Link } from "react-router-dom";

const VideoPage = ({ title, overview, id }) => {
  const dispatch = useDispatch();
  const trailervideo = useSelector((store) => store.movies?.trailerVideo);

  const getMovieTrailer = async () => {
    const data = await fetch(
      `https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`,
      API_OPTION
    );
    const json = await data.json();
    const trailer = json.results.filter((video) => video.type === "Trailer");
    dispatch(addTrailerVideo(trailer[0]));
  };

  useEffect(() => {
    getMovieTrailer();
  }, [id]);

  return (
    <div className="">
      {/* movie info  */}
      <div className=" w-screen h-[90vh]  text-white absolute bg-gradient-to-r from-black md:py-60 md:px-24 pt-40 px-10">
        <h1 className=" md:text-6xl text-3xl">{title}</h1>
        <p className="md:w-[30%] w-[60%] text-sm md:text-[15px] my-6">{overview}</p>
        <div className="flex gap-3">
          <Link to = {`/browse/${id}`} className="bg-white text-black px-3 py-1 rounded-md flex font-bold items-center gap-1 hover:bg-opacity-80 hover:scale-110 duration-300">
            <FaPlay color="black" />
            Play
          </Link>
          <Link to = {`/browse/${id}`} className="bg-gray-200 text-white px-5 py-1 rounded-md bg-opacity-40 flex items-center gap-2 hover:bg-opacity-35 hover:scale-110 duration-300">
            <MdInfoOutline /> More Info
          </Link>
        </div>
      </div>

      {/* bg movie trailer  */}
      <div className="video-background">
        <div className="video-foreground">
          <iframe
            className="w-[100vw] h-[80vh] scale-125 "
            src={`https://www.youtube.com/embed/${trailervideo?.key}?autoplay=1&mute=1&controls=0&playlist=${trailervideo?.key}&loop=1`}
            title="YouTube video player"
            // allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture;"
            allowFullScreen
          ></iframe>
        </div>
      </div>
    </div>
  );
};

export default VideoPage;
