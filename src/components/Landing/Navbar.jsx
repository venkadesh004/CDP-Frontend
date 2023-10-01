import React from "react";
import logo from "../../assets/logo1.png";
import { Link } from "react-router-dom";
const Navbar = () => {
  return (
    <nav className="w-full flex justify-between px-12 pt-3 h-[8vh]">
      <div className="flex flex-col items-center ">
        <img src={logo} alt="Logo" className="h-10"/>
        <h1 className="">SUPPLYCHAIN</h1>
      </div>
      <div className="flex items-center gap-9">
        <Link to="/signUp" className="text-lg font-semibold">Login</Link>
        <Link className="text-lg font-semibold bg-[#FCBD16] px-4 py-2 rounded-full" to="/signUp">Sign Up</Link>
      </div>
    </nav>
  );
};

export default Navbar;
