import React, { useEffect, useState } from "react";
import { API_OPTION, MOVIES_POSTER } from "../constant/constant";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { Link } from "react-router-dom";

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

const SimilarMovie = ({ id }) => {
  const [similarMovies, setSimilarMovies] = useState([]);

  const getSimilarMovie = async () => {
    const data = await fetch(
      `https://api.themoviedb.org/3/movie/${id}/similar?language=en-US`,
      API_OPTION
    );
    const json = await data.json();
    setSimilarMovies(json.results);
  };

  useEffect(() => {
    getSimilarMovie();
  }, [id]);

  return (
    <div className="w-[90vw] text-white">
      { similarMovies.length === 0 ? <h1 className="text-center text-2xl my-20"> No Movies Available For This</h1>:
      <Carousel
        responsive={responsive}
        infinite={true}
        autoPlay={true}
        swipeable={false}
        draggable={true}
        autoPlaySpeed={1000}
        className="lg:h-[40vh] z-10"
      >
        {similarMovies &&
          similarMovies.map((movie) => (
            <Link to={`/browse/${movie.id}`}>
              <img
                src={ movie.poster_path ? MOVIES_POSTER + movie.poster_path:'https://fireteller.com.au/wp-content/uploads/2020/09/Poster_Not_Available2.jpg'}
                key={movie.id}
                alt="poster"
                className="md:w-[20vw] lg:w-[10vw] w-[35vw] cursor-pointer rounded-md hover:scale-110 duration-300 hover:border-2"
              />
            </Link>
          ))}
      </Carousel>}
    </div>
  );
};

export default SimilarMovie;
