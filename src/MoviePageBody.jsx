import React from "react";
import MovieHeader from "./components/browseMovies/MovieHeader";
import useNowPlayingMovies from "./hooks/useNowPlayingMovies";
import MainPage from "./components/browseMovies/MainPage";
import usePopularMovies from "./hooks/usePopularMovies";
import MoviesContainer from "./components/browseMovies/MoviesContainer";
import useUpcomingMovies from "./hooks/useUpcomingMovies";
import useTvSeries from "./hooks/useTvSeries";

const MoviePageBody = () => {
  useNowPlayingMovies();
  usePopularMovies();
  useUpcomingMovies();
  useTvSeries();

  return (
    <div>
      <MovieHeader />
      <MainPage/>
      <MoviesContainer/>
    </div>
  );
};

export default MoviePageBody;
