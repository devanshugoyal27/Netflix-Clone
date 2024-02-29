import React, { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import { API_OPTION, MOVIES_POSTER } from "../constant/constant";
import { Link } from "react-router-dom";

const Search = ({ setIsSearchOpen }) => {
  const [text, setText] = useState("");
  const [results, setResults] = useState([]);

  const getData = async () => {
    const data = await fetch(
      `https://api.themoviedb.org/3/search/movie?query=${text}&`,
      API_OPTION
    );
    const json = await data.json();
    setResults(json.results);
  };

  useEffect(() => {
    getData();
  }, [text, results]);

  return (
    <div className="absolute inset-0 w-full z-[5]">
      {/* search box  */}
      <div className="flex flex-col justify-start items-center backdrop-blur-xl h-[100vh]">
        <div className="flex items-center p-1 bg-white bg-opacity-15 rounded-md border-[1px] mt-16">
          <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Search here"
            className="p-2 lg:w-[60vw] w-[80vw] outline-none bg-transparent"
          />
          <button className="mr-2">
            <FaSearch size={26} />
          </button>
        </div>
        <button
          className="absolute lg:top-10 lg:right-52 right-3 top-4"
          onClick={() => setIsSearchOpen(false)}
        >
          <IoClose size={40} />
        </button>

        {/* movie results  */}
        {text && (
          <div className="lg:w-[60vw] w-[80vw] lg:h-[60vh] h-[70vh] overflow-y-scroll mt-5">
            <div className="flex gap-4 flex-wrap">
              {results &&
                results.map((movie) => (
                  <Link
                    to={`/browse/${movie.id}`}
                    key={movie.id}
                    className="border-[1px] rounded-md lg:w-[13vw] w-[36vw] md:w-[24vw] p-2 mx-auto"
                  >
                    <img
                      src={
                        movie.poster_path
                          ? MOVIES_POSTER + movie.poster_path
                          : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQXcQ6GPNqMq2fIf9BEZNn0BWx_JkBXeHEuOA&usqp=CAU"
                      }
                      alt=""
                      className="lg:w-[12vw] hover:scale-105 duration-300 cursor-pointer rounded-md"
                    />
                    <p className="text-center font-semibold mt-2 hover:underline cursor-pointer text-xs lg:text-sm">
                      {movie.title}
                    </p>
                  </Link>
                ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Search;
