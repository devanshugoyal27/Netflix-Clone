import React from "react";

const ShimmerUi = () => {
  return (
    <div className="top-[10vh] absolute flex flex-col lg:flex-row gap-14 lg:px-36 lg:py-10 p-3">
      <div className="shimmer-wrapper lg:w-[25vw] lg:h-[70vh] w-[60vw] h-[52.5vh] bg-[#262626] rounded-xl ml-16 md:ml-40 my-5 lg:ml-0">
        <div className="shimmer"></div>
      </div>
      <div className="bg-[#262626]  lg:w-[500px] w-[350px] md:w-[450px] m-auto h-4 mt-6 rounded-xl md:ml-44">
        <div className="bg-[#262626] lg:w-[500px] shimmer-wrapper w-[200px] md:w-[300px] m-auto h-4 mt-8 rounded-xl">
          <div className="shimmer"></div>
        </div>
        <div className="bg-[#262626] lg:w-[500px] shimmer-wrapper md:w-[450px] h-14 lg:mt-32 md:mt-20 hidden md:block rounded-xl">
          <div className="shimmer"></div>
        </div>
      </div>
    </div>
  );
};

export default ShimmerUi;
