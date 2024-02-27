import { useDispatch } from "react-redux";
import { addTvSeries } from "../components/redux/movieSlice";
import { API_OPTION } from "../components/constant/constant";
import { useEffect } from "react";

const useTvSeries = () => {
  const dispatch = useDispatch();

  const getTvSeries = async () => {
    const data = await fetch(
      "https://api.themoviedb.org/3/tv/top_rated?language=en-US&page=1",
      API_OPTION
    );
    const json = await data.json();
    dispatch(addTvSeries(json.results));
  };

  useEffect(() => {
    getTvSeries();
  }, []);
};

export default useTvSeries;
