import React from "react";
import { Link} from "react-router-dom"
const WaitingScreen = () => {

  return (
    <div className="flex h-screen w-full items-center justify-center">
      <div className="flex flex-col w-auto justify-center gap-6 items-center">
        <h1 className="text-5xl font-bold">Wait Till Admin Authorizes</h1>
        <h1 className="text-4xl font-semibold">Check in after a while.....</h1>
        <Link className="text-xl bg-[#FCBD16] px-5 py-1 font-semibold rounded-md tracking-wide" to="/signUp" >
          Back
        </Link>
      </div>
    </div>
  );
};

export default WaitingScreen;
