import React from "react";

const MovieOverview = ({ movies }) => {
  return (
    <div>
      <p className="m-4 text-lg lg:w-[50vw]">{movies.overview}</p>
    </div>
  );
};

export default MovieOverview;
