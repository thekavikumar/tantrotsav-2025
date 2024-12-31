import React from "react";
import Sponsor1 from "../../assets/Decathlon_Logo.png";
import Sponsor2 from "../../assets/IIT_Madras_Logo.png";

export default function Sponsor() {
  return (
    <div className="mt-12">
      <h2 className="font-semibold text-4xl sm:text-2xl md:text-3xl lg:text-4xl  text-center mb-3 text-white">
        Partners & Sponsors
      </h2>
      <div className="w-full h-auto bg-gradient-to-r from-black via-slate-700 to-black flex flex-wrap justify-center items-center gap-4 p-4 sm:gap-6 sm:p-6 lg:gap-8 lg:p-8 my-6">
        {/* Sponsors */}
        <div className="flex justify-center items-center">
          <img
            src={Sponsor1}
            alt="Sponsor 1"
            className="w-24 sm:w-32 lg:w-40"
          />
        </div>
        <div className="flex justify-center items-center">
          <img
            src={Sponsor1} // <= IIT MADRAS maybe the second sponsor.
            alt="Sponsor 2"
            className="w-24 sm:w-32 lg:w-40"
          />
        </div>
        <div className="flex justify-center items-center">
          <img
            src={Sponsor1}
            alt="Sponsor 3"
            className="w-24 sm:w-32 lg:w-40"
          />
        </div>
        <div className="flex justify-center items-center">
          <img
            src={Sponsor1}
            alt="Sponsor 4"
            className="w-24 sm:w-32 lg:w-40"
          />
        </div>
      </div>
    </div>
  );
}
