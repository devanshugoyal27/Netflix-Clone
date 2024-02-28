import React from "react";


const MovieOverview = ({ movies }) => {
  return (
    <div>
      <p className="mt-2 text-lg lg:w-[40vw] w-[85vw] mx-auto lg:mx-0">{movies.overview}</p>
      
    </div>
  );
};

export default MovieOverview;
