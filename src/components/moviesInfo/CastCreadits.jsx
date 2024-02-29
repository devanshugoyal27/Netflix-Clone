import React, { useEffect, useState } from "react";
import { API_OPTION, MOVIES_POSTER } from "../constant/constant";

const CastCreadits = ({ id }) => {
  const [cast, setCast] = useState([]);

  const getCast = async () => {
    const data = await fetch(
      `https://api.themoviedb.org/3/movie/${id}/credits?language=en-US`,
      API_OPTION
    );
    const json = await data.json();
    setCast(json.cast);
  };

  useEffect(() => {
    getCast();
  }, [id]);

  return (
    <div className="w-full lg:h-[50vh] overflow-auto text-white mt-2">
      <div className="flex">
        {cast &&
          cast.map((data) => (
            <div
              key={data.id}
              className="lg:h-[45vh] h-[37vh] border-[1px] rounded-md p-1 m-3"
            >
              <div className="lg:w-[11vw] w-[29vw] mx-auto mb-2">
                <img
                  src={
                    data.profile_path
                      ? MOVIES_POSTER + data.profile_path
                      : "https://conferenceoeh.com/wp-content/uploads/profile-pic-dummy.png"
                  }
                  alt="cast"
                  className="rounded-md cursor-pointer"
                />
              </div>
              <h1 className="text-center font-bold text-sm lg:text-lg hover:underline cursor-pointer">
                {data.name}
              </h1>
              <p className="text-center text-gray-200 text-xs lg:text-sm  hover:underline cursor-pointer">
                {data.character}
              </p>
            </div>
          ))}
      </div>
    </div>
  );
};

export default CastCreadits;
