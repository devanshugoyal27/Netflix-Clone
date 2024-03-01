import React, { useEffect, useState } from "react";
import { Link, Route, Routes, useParams, NavLink } from "react-router-dom";
import { API_OPTION, MOVIES_POSTER } from "../constant/constant";
import MovieHeader from "../browseMovies/MovieHeader";
import { FaPlayCircle } from "react-icons/fa";
import MovieOverview from "./MovieOverview";
import MovieTrailer from "./MovieTrailer";
import Episode from "./Episode";
import MoreLikeThis from "./MoreLikeThis";
import ShowTrailer from "./ShowTrailer";
import ShimmerUi from "../shimmerUi/ShimmerUi";
import { FaStar } from "react-icons/fa";
import SimilarMovie from "./SimilarMovie";
import CastCreadits from "./CastCreadits";
import Footer from "../footer/Footer";

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
  }, [id]);

  return (
    <>
      <div>
        <MovieHeader />

        {/* backdrop image  */}
        <div
          style={{
            backgroundImage: `url(${MOVIES_POSTER}${movies.backdrop_path})`,
            opacity: 0.2,
            filter: "blur(8px)",
          }}
          className="absolute bg-cover w-full h-[100vh] bg-gradient-to-t from-black -z-[999]"
        ></div>

        {movies ? (
          <div className="absolute top-[15%]  right-0 left-0">
            {/* movie info  */}
            <div className="w-[100vw] grid lg:grid-cols-4 grid-cols-2 lg:gap-60 text-white lg:ml-20 lg:pl-16">
              {/* movie poster  */}
              <div
                onClick={() => setShowMovieTrailer(true)}
                className="lg:w-[24vw] lg:h-[100%] w-[50vw] h-[100%] col-span-1 mx-[50%] mb-5 lg:m-0 relative hover:scale-105 duration-300 cursor-pointer"
              >
                <img
                  src={MOVIES_POSTER + movies.poster_path}
                  alt=""
                  className="rounded-md "
                />
                <div className="absolute inset-0 flex items-center justify-center w-full h-[100%]  opacity-0 hover:opacity-100 duration-300 lg:bg-black lg:bg-opacity-50">
                  <span className="cursor-pointer duration-300 text-6xl hover:text-7xl">
                    <FaPlayCircle />
                  </span>
                </div>
              </div>

              {/* movie details  */}
              <div className="col-span-3">
                <h1 className="md:text-6xl text-4xl text-center md:my-10 lg:my-0 lg:text-left font-bold ">
                  {movies.original_title}
                </h1>
                <ul className="flex lg:gap-8 gap-5 px-3 lg:px-0  text-center justify-center lg:justify-start text-sm list-disc mt-5">
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

                <div className="mt-3  mx-3">
                  <span className="flex gap-2 items-center ">
                    <FaStar
                      size={24}
                      className="cursor-pointer text-yellow-500"
                    />
                    <p className="font-bold text-lg cursor-pointer">
                      {movies.vote_average.toFixed(1)}
                      <span className="opacity-60">/10</span>{" "}
                    </p>
                  </span>
                  <span className="opacity-60 ml-8 text-sm">
                    ( {movies.vote_count} )
                  </span>
                </div>

                {/* details navigation  */}

                <div className="flex lg:gap-24 mt-6 w-[95%] mx-4 text-sm lg:text-[16px] border-b-[1px] border-gray-600 font-semibold whitespace-nowrap gap-6 md:w-[90vw] lg:w-[40vw] md:mx-auto lg:mx-0">
                  <NavLink
                    end
                    className={({ isActive }) =>
                      isActive
                        ? "border-b-2 pb-2 border-red-500 text-red-500"
                        : ""
                    }
                    to={`/browse/${movies.id}`}
                  >
                    Overview
                  </NavLink>
                  <NavLink
                    className={({ isActive }) =>
                      isActive
                        ? "border-b-2 pb-2 border-red-500 text-red-500"
                        : ""
                    }
                    to={`/browse/${movies.id}/trailer`}
                  >
                    Trailer & More
                  </NavLink>
                  <NavLink
                    className={({ isActive }) =>
                      isActive
                        ? "border-b-2 pb-2 border-red-500 text-red-500"
                        : ""
                    }
                    to={`/browse/${movies.id}/moreLikeThis`}
                  >
                    Recommendations
                  </NavLink>
                </div>

                <Routes>
                  <Route path="/" element={<MovieOverview movies={movies} />} />
                  <Route path="/episode" element={<Episode />} />
                  <Route
                    path="/trailer"
                    element={<MovieTrailer movieTrailer={movieTrailer} />}
                  />
                  <Route
                    path="/moreLikeThis"
                    element={<MoreLikeThis id={id} />}
                  />
                </Routes>
              </div>
            </div>

            {/* cast credits  */}
            <div className="lg:px-14 lg:mt-8 mt-5 px-4 ">
              <h1 className="text-white lg:text-2xl font-bold my-5 lg:my-0 border-b-[1px] pb-3 border-gray-600 text-lg">
                Top Billed Cast
              </h1>
              <CastCreadits id={id} />
            </div>

            {/* similar movies  */}
            <div className="lg:px-14 lg:mt-8 mt-5 px-4 mb-20">
              <h1 className="text-white lg:text-2xl font-bold my-5 lg:my-0 border-b-[1px] pb-3 text-lg border-gray-600">
                Similar Movies
              </h1>
              <SimilarMovie id={id} />
            </div>
            <div>
              <Footer/>
            </div>
          </div>
        ) : (
          <ShimmerUi />
        )}
      </div>

      {showMovieTrailer && (
        <ShowTrailer
          movieTrailer={movieTrailer}
          setShowMovieTrailer={setShowMovieTrailer}
        />
      )}
    </>
  );
};

export default MovieInfo;
