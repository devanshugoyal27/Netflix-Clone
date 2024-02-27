import React from "react";
import { MdTranslate } from "react-icons/md";

const Header = () => {
  return (
    <div className="w-11/12 mx-auto">
      <div className="relative z-50 top-5">
        <div className="flex justify-between items-center">
          {/* logo */}
          <div className="md:w-40 w-28">
            <img
              src="https://cdn.cookielaw.org/logos/dd6b162f-1a32-456a-9cfe-897231c7763c/4345ea78-053c-46d2-b11e-09adaef973dc/Netflix_Logo_PMS.png"
              alt="logo"
            />
          </div>
          {/* right  */}
          <div className="flex">
            <div className="relative hidden md:flex">
              <span className="absolute top-[9px] left-3">
                <MdTranslate color="white" />
              </span>

              <select className="bg-[#0f1111] text-white px-7 py-1 mr-4 border-2 rounded-md cursor-pointer ">
                <option className="bg-white text-black">English</option>
                <option className="bg-white text-black">Hindi</option>
              </select>
            </div>

            <button className="py-1 px-4 bg-red-600 text-white font-semibold rounded-lg whitespace-nowrap text-xs md:text-[14px]">
              Sign in
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
