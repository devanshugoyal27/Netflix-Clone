import { useDispatch } from 'react-redux';
import { addNowPlayingMovies } from '../components/redux/movieSlice';
import { API_OPTION } from '../components/constant/constant';
import { useEffect } from 'react';

const useNowPlayingMovies = () => {
    const dispatch = useDispatch();

    const getNowPlayingMovie = async () => {
      const data = await fetch(
        "https://api.themoviedb.org/3/movie/now_playing",
        API_OPTION
      );
      const json = await data.json();
      dispatch(addNowPlayingMovies(json.results));
    };
  
    useEffect(() => {
      getNowPlayingMovie();
    }, []);
}

export default useNowPlayingMovies;
