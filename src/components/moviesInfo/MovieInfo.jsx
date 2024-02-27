import React, { useEffect, useState } from "react";
import { Link, Route, Routes, useParams, NavLink } from "react-router-dom";
import { API_OPTION, MOVIES_POSTER } from "../constant/constant";
import MovieHeader from "../browseMovies/MovieHeader";
import { FaPlay } from "react-icons/fa6";
import MovieOverview from "./MovieOverview";
import MovieTrailer from "./MovieTrailer";
import Episode from "./Episode";
import MoreLikeThis from "./MoreLikeThis";
import ShowTrailer from "./ShowTrailer";
import ShimmerUi from "../shimmerUi/ShimmerUi";

const MovieInfo = () => {
  const [movies, setMovies] = useState("");
  const [movieTrailer, setMovieTrailer] = useState({});
  const [showMovieTrailer, setShowMovieTrailer] = useState(false);

  const { id } = useParams();

  const getMovieDetails = async () => {
    const data = await fetch(
      `https://api.themoviedb.org/3/movie/${id}?language=en-US`,
      API_OPTION
    );
    const json = await data.json();
    setMovies(json);
  };

  const getMovieTrailer = async () => {
    const data = await fetch(
      `https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`,
      API_OPTION
    );
    const json = await data.json();
    const trailer = json.results.filter((video) => video.type === "Trailer");
    setMovieTrailer(trailer[0]);
  };

  useEffect(() => {
    getMovieDetails();
    getMovieTrailer();
  }, []);

  return (
    <div>
      <MovieHeader />

      {/* bg image  */}
      <div
        style={{
          backgroundImage: `url(${MOVIES_POSTER}${movies.backdrop_path})`,
          opacity: 0.2,
          filter: "blur(8px)",
        }}
        className="absolute bg-cover w-full h-[100vh] bg-gradient-to-t from-black -z-[999]"
      ></div>

      {movies ? (
        <div className="top-[10vh] absolute flex flex-col lg:flex-row gap-14 lg:px-36 lg:py-10 p-3 text-white bg-center bg-opacity-30">
          {/* movie poster  */}
          <div
            onClick={() => setShowMovieTrailer(true)}
            className="lg:w-[25vw] lg:h-[70vh] w-[60vw] h-[52.5vh] m-auto my-5 lg:my-0 relative hover:scale-105 duration-300 cursor-pointer "
          >
            <img
              src={MOVIES_POSTER + movies.poster_path}
              alt=""
              className="rounded-md "
            />
            <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 duration-300 bg-black bg-opacity-30">
              <p className="text-white cursor-pointer  duration-500 bg-black rounded-full p-5 text-4xl hover:text-5xl flex items-center justify-center">
                <span className="ml-1">
                  <FaPlay />
                </span>
              </p>
            </div>
          </div>

          {/* movie details  */}
          <div>
            <h1 className=" md:text-6xl text-4xl text-center -mt-14 lg:mt-0 md:my-10 lg:text-left font-bold ">
              {movies.original_title}
            </h1>
            <ul className="flex lg:gap-8 gap-5  text-center justify-center lg:justify-normal text-sm list-disc mt-5">
              <span>{movies.release_date} </span>
              <li className="">
                {movies?.genres?.map((data, i) => (
                  <span key={i}>
                    {data.name} {i < movies?.genres?.length - 1 && ", "}
                  </span>
                ))}
              </li>
              <li>{`${Math.floor(movies.runtime / 60)}h ${
                movies.runtime % 60
              }m`}</li>
            </ul>

            <div className="flex lg:gap-11 mt-6 border-b-[1px] border-gray-800 font-semibold text-sm whitespace-nowrap gap-5 md:w-[100vw] lg:w-[40vw] md:mx-auto lg:mx-0">
              <NavLink
                end
                className={({ isActive }) =>
                  isActive ? "border-b-2 pb-2 border-red-500 text-red-500" : ""
                }
                to={`/browse/${movies.id}`}
              >
                Overview
              </NavLink>
              <NavLink
                className={({ isActive }) =>
                  isActive ? "border-b-2 pb-2 border-red-500 text-red-500" : ""
                }
                to={`/browse/${movies.id}/episode`}
              >
                Episodes
              </NavLink>
              <NavLink
                className={({ isActive }) =>
                  isActive ? "border-b-2 pb-2 border-red-500 text-red-500" : ""
                }
                to={`/browse/${movies.id}/trailer`}
              >
                Trailer & More
              </NavLink>
              <NavLink
                className={({ isActive }) =>
                  isActive ? "border-b-2 pb-2 border-red-500 text-red-500" : ""
                }
                to={`/browse/${movies.id}/moreLikeThis`}
              >
                More Like This
              </NavLink>
            </div>

            <Routes>
              <Route path="/" element={<MovieOverview movies={movies} />} />
              <Route path="/episode" element={<Episode />} />
              <Route
                path="/trailer"
                element={<MovieTrailer movieTrailer={movieTrailer} />}
              />
              <Route path="/moreLikeThis" element={<MoreLikeThis />} />
            </Routes>
          </div>
          {showMovieTrailer && (
            <ShowTrailer
              movieTrailer={movieTrailer}
              setShowMovieTrailer={setShowMovieTrailer}
            />
          )}
        </div>
      ) : (
        <ShimmerUi />
      )}
    </div>
  );
};

export default MovieInfo;
