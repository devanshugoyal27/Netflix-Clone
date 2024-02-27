import React from "react";
import { IoMdClose } from "react-icons/io";

const ShowTrailer = ({ movieTrailer, setShowMovieTrailer }) => {
  return (
    <div className="absolute backdrop-blur-md inset-0 flex justify-center lg:items-center">
      <iframe
        className="lg:w-[900px] lg:h-[550px] w-[85vw] h-[30vh] rounded-md mt-20 mr-2"
        src={`https://www.youtube.com/embed/${movieTrailer?.key}/`}
        title="YouTube video player"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture;"
        allowFullScreen
      ></iframe>
      <div
        onClick={() => setShowMovieTrailer(false)}
        className="absolute lg:top-8 lg:right-[200px] top-8 right-4 cursor-pointer duration-300"
      >
        <IoMdClose size={40} />
      </div>
    </div>
  );
};

export default ShowTrailer;
