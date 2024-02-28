import React, { useEffect, useState } from "react";
import { API_OPTION, MOVIES_POSTER } from "../constant/constant";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addAllTrailer } from "../redux/movieSlice";
import { GoInfo } from "react-icons/go";

const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 8,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 4,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 2,
  },
};

const MovieCard = ({ movies }) => {
  const [hoveredMovie, setHoveredMovie] = useState(null);
  const [showTrailer, setShowTrailer] = useState(null);

  const dispatch = useDispatch();

  const getAllTrailer = async () => {
    const data = await fetch(
      `https://api.themoviedb.org/3/movie/${hoveredMovie}/videos?language=en-US`,
      API_OPTION
    );
    const json = await data.json();
    const trailer = json.results?.filter((video) => video.type === "Trailer");
    dispatch(addAllTrailer(trailer[0]));
    setShowTrailer(trailer[0]);
    console.log(trailer[0]);
  };

  useEffect(() => {
    getAllTrailer();
  }, [hoveredMovie]);

  return (
    <div className="">
      {movies && (
        <Carousel
          responsive={responsive}
          infinite={true}
          autoPlay={true}
          swipeable={false}
          draggable={false}
          autoPlaySpeed={2000}
          className="lg:h-[36vh] z-[1]"
        >
          {movies &&
            movies.map((movie) => (
              <div
                key={movie.id}
                className="relative hover:scale-110 cursor-pointer"
                onMouseEnter={() => setHoveredMovie(movie.id)}
                onMouseLeave={() => setHoveredMovie(null)}
              >
                <Link to={`/browse/${movie.id}`}>
                  {movies.length ? <img 
                    src={MOVIES_POSTER + movie.poster_path}
                    alt="poster"
                    className="md:w-[20vw] lg:w-[10vw] w-[35vw] cursor-pointer rounded-md hover:scale-110 duration-300 hover:border-2"
                  />:<div className="md:w-[20vw] lg:w-[10vw] h-[16vw] w-[35vw] bg-[#262626] rounded-md"></div>
                   }
                </Link>
                {hoveredMovie === movie.id && (
                  <div className="absolute bg-[#262626] bottom-8 right-10 border-[1px] border-gray-500 rounded-lg overflow-hidden">
                    <div className="relative">
                      <iframe
                        className=""
                        src={`https://www.youtube.com/embed/${showTrailer?.key}?autoplay=1&mute=1&controls=0`}
                        title="YouTube video player"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture;"
                        allowFullScreen
                      ></iframe>

                      <Link
                        to={`/browse/${movie.id}`}
                        className="cursor-pointer text-white bg-black bg-opacity-50 border-t-[1px] w-full flex justify-center items-center p-2 gap-2 text-sm border-gray-500 hover:text-[15px] duration-300"
                      >
                        <GoInfo /> More Info
                      </Link>
                    </div>
                  </div>
                )}
              </div>
            ))}
        </Carousel>
      )}
    </div>
  );
};

export default MovieCard;
