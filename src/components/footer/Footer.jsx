import React from "react";

const Footer = () => {
  return (
   <div className="h-[30vh] w-full border-t-[1px] border-gray-900 text-white">
     <div className="flex lg:gap-40  gap-20 justify-center items-center md:mt-20 mt-10 whitespace-nowrap">
      <div className=" flex-col gap-2 custom hidden md:flex">
        <button>Audio Discription</button>
        <button>Investor Relation</button>
        <button>Legal Notices</button>
      
      </div>
      <div className=" flex-col gap-2 custom hidden md:flex">
        <button>Help Centre</button>
        <button>Jobs</button>
        <button>Cookies Prefrences</button>
    
      </div>
      <div className="flex flex-col gap-2 custom">
        <button>Gifts Card</button>
        <button>Terms Of Use</button>
        <button>Corporate Information</button>
      
      </div>
      <div className="flex flex-col gap-2 custom">
        <button>Media Centre</button>
        <button>Privacy</button>
        <button>Contact Us</button>
      
      </div>
    </div>
      <p className="text-center mt-6 text-gray-400">&copy; 1997-2024 Netflix, Inc.</p>
   </div>
  );
};

export default Footer;
