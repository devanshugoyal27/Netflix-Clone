import React from "react";
import { MdTranslate } from "react-icons/md";
import { SUPPORTED_LANGUAGES, lang } from "../multiLanguage/lang";
import { useDispatch, useSelector } from "react-redux";
import { changeLang } from "../redux/langSlice";

const Header = () => {
  const dispatch = useDispatch();

  const langkey = useSelector((store) => store.multilang.lang);

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
            <div className="relative flex">
              <span className="absolute top-[9px] left-3">
                <MdTranslate color="white" />
              </span>

              <select
                onChange={(e) => dispatch(changeLang(e.target.value))}
                className="bg-[#0f1111] text-white px-7 py-1 mr-4 border-2 rounded-md cursor-pointer "
              >
                {SUPPORTED_LANGUAGES.map((data) => (
                  <option
                    key={data.identifier}
                    value={data.identifier}
                    className="bg-white text-black"
                  >
                    {data.name}
                  </option>
                ))}
              </select>
            </div>

            <button className="py-1 px-4 bg-red-600 text-white font-semibold rounded-lg whitespace-nowrap text-xs md:text-[14px]">
              {lang[langkey].title}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
