import React from "react";
import MoviesList from "./MoviesList";
import { useSelector } from "react-redux";

const MoviesContainer = () => {
  const movies = useSelector((store) => store.movies?.nowPlayingMovies);
  const PopularMovies = useSelector((store) => store.movies?.popularMovies);
  const upcomingMovies = useSelector((store) => store.movies?.upcomingMovies);
  const tvSeries = useSelector((store) => store.movies?.tvSeries);

  return (
    <div>
      <div className="absolute top-[66vh]  w-full overflow-hidden">
        <MoviesList title="Now Playing" movies={movies} />
      </div>
      <div className="lg:mt-48 md:mt-[8vh] mt-[12vh]">
        <MoviesList title="Popular" movies={PopularMovies} />
      </div>
      <MoviesList title="Upcoming Movies" movies={upcomingMovies} />
      <MoviesList title="Top Rated" movies={PopularMovies} />
      <MoviesList title="Trending Now" movies={PopularMovies} />
      <MoviesList title="TV Series" movies={tvSeries} />
    </div>
  );
};

export default MoviesContainer;
