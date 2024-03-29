import React, { useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import { signOut } from "firebase/auth";
import { auth } from "../firebase/firebase";
import { useNavigate, Link } from "react-router-dom";
import { RiMenu3Line } from "react-icons/ri";
import { IoCloseSharp, IoSearchOutline } from "react-icons/io5";
import Search from "../Search/Search";

const MovieHeader = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const navigate = useNavigate();

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {})
      .catch((error) => {
        navigate("/errorPage");
      });
  };

  return (
    <div className="flex justify-between items-center md:px-12 px-3 py-2 md:py-3 lg:py-1 text-white bg-gradient-to-b from-black  w-full z-[99] fixed top-0 right-0 left-0">
      <div className="flex gap-3  items-center">
        <Link to="/browse">
          <img
            src="https://cdn.cookielaw.org/logos/dd6b162f-1a32-456a-9cfe-897231c7763c/4345ea78-053c-46d2-b11e-09adaef973dc/Netflix_Logo_PMS.png"
            alt="logo"
            className="md:w-[12vw] w-[30vw]"
          />
        </Link>

        <div
          className={`md:flex gap-3 items-center ${
            isMobileMenuOpen
              ? "flex flex-col backdrop-blur-md text-white w-screen h-[100vh] text-center gap-5 transition-all ease-in duration-500 absolute top-0 left-0 py-20"
              : "hidden"
          }`}
        >
          <Link to="/browse" className="cursor-pointer hover:text-gray-400 duration-300">
            Home
          </Link>
          <p className="cursor-pointer whitespace-nowrap hover:text-gray-400 duration-300">Tv Shows</p>
          <p className="cursor-pointer whitespace-nowrap hover:text-gray-400 duration-300">Movies</p>
          <p className="cursor-pointer whitespace-nowrap hover:text-gray-400 duration-300">New & Popular</p>
          <p className="cursor-pointer whitespace-nowrap hover:text-gray-400 duration-300">MyList</p>
          <p className="cursor-pointer whitespace-nowrap md:hidden lg:block hover:text-gray-400 duration-300">
            Browse By Languages
          </p>
          {isMobileMenuOpen && (
            <p className="cursor-pointer" onClick={handleSignOut}>
              Sign Out
            </p>
          )}
        </div>
      </div>

      <div className="flex gap-5 items-center">

        {/* search bar  */}
        <div onClick={() => setIsSearchOpen(true)} className="cursor-pointer hidden md:block">
          <IoSearchOutline size={30} />
        </div>
        {isSearchOpen && <Search setIsSearchOpen = {setIsSearchOpen} />}



        <div
          className="flex gap-2 items-center cursor-pointer relative md:mr-[-115px] lg:mr-12 w-40 z-[1]"
          onClick={() => setIsOpen(!isOpen)}
        >
          <img
            src="https://wallpapers.com/images/high/netflix-profile-pictures-1000-x-1000-qo9h82134t9nv0j0.webp"
            alt="logo"
            className="w-10 md:block hidden"
          />
          <IoIosArrowDown className="hidden md:block" />

          {isOpen && (
            <p
              className="absolute  top-12 px-4 py-2 bg-black text-white text-sm font-semibold rounded-md whitespace-nowrap"
              onClick={handleSignOut}
            >
              Sign Out
            </p>
          )}
        </div>
      </div>

      {/* search for mobile screen  */}
      <div onClick={() => setIsSearchOpen(true)} className="cursor-pointer md:hidden mr-2">
          <IoSearchOutline size={30} />
        </div>

      <div
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        className="md:hidden cursor-pointer"
      >
        {!isMobileMenuOpen ? (
          <RiMenu3Line size={36} />
        ) : (
          <IoCloseSharp
            className="absolute z-[99999] top-3 right-3"
            size={36}
          />
        )}
      </div>
    </div>
  );
};

export default MovieHeader;
