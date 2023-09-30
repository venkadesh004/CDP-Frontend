import React from "react";
import { Player } from "@lottiefiles/react-lottie-player";
import worker from "../../assets/worker.json";

const Hero = () => {
  return (
    <div className="flex items-center justify-center px-12 pt-3 h-[85vh]">
      <div className="flex items-center">
        <div className="flex flex-col gap-12 ">
          <div>
            <h1 className="text-6xl font-bold">
              Find the <span className="text-[#fcbd16]">Best Supplies</span>
            </h1>
            <h1 className="text-6xl font-bold">
              For your <span className="text-[#fcbd16]">Project</span>
            </h1>
          </div>
          <div>
            <ul className="flex flex-col gap-3 list-inside">
              <li className="text-lg">Biggest Online Suppliers marketplace.</li>
              <li className="text-lg">
                Find suppliers of any materials for your project
              </li>
              <li className="text-lg">Verified Suppliers</li>
            </ul>
          </div>
          <div className="flex gap-9">
            <button className="tracking-wider bg-[#fcbd16] px-7 py-4 rounded-2xl">
              Find a Supplier
            </button>
            <button className="tracking-wider border-solid border-2 border-black/70 px-7 py-4 rounded-2xl">
              Supplier Registeration
            </button>
          </div>
        </div>
        <div className="relative">
          <div className="z-10">
            <Player src={worker} loop autoplay  />
          </div>
          <div className="absolute top-[60%] left-[20%] -z-10">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="400"
              height="120"
              viewBox="0 0 413 174"
              fill="none"
            >
              <path
                d="M412.5 25.7146C412.5 76.2487 346.851 166.715 256 166.715C165.149 166.715 1.04904e-05 200.715 0 121.715C18.5 41.7148 73.1492 14.7147 164 14.7147C254.851 14.7147 412.5 -24.8194 412.5 25.7146Z"
                fill="#FCBD16"
              />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
