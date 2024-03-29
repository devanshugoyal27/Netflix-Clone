import React, { useEffect, useState } from "react";
import { API_OPTION, MOVIES_POSTER } from "../constant/constant";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { Link } from "react-router-dom";

const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 5,
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

const MoreLikeThis = ({ id }) => {
  const [recommend, setRecommend] = useState([]);

  const getMovieRecommendations = async () => {
    const data = await fetch(
      `https://api.themoviedb.org/3/movie/${id}/recommendations?language=en-US`,
      API_OPTION
    );
    const json = await data.json();
    setRecommend(json.results);
  };

  useEffect(() => {
    getMovieRecommendations();
  }, []);

  return (
    <div className="lg:w-[40vw] w-[80vw] m-auto lg:m-0">
{ recommend.length === 0 ? <h1 className="text-center text-xl mt-5"> No Movies Available For This</h1>:

      <Carousel
        responsive={responsive}
        infinite={true}
        autoPlay={true}
        swipeable={false}
        draggable={true}
        autoPlaySpeed={1000}
        className=""
      >
        {recommend &&
          recommend.map((movie) => (
            <Link to={`/browse/${movie.id}`}>
              <img
                src={MOVIES_POSTER + movie.poster_path}
                alt="poster"
                className="lg:w-[7vw] md:w-[18vw] md:h-[19vh] w-[32vw] lg:h-[20vh] h-[28vh] m-4 rounded-lg cursor-pointer hover:scale-110 duration-300"
              />
            </Link>
          ))}
      </Carousel>}
    </div>
  );
};

export default MoreLikeThis;
