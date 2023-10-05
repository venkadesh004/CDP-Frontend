import React from "react";
import logo from "../../assets/logo1.png";
import { Link } from "react-router-dom";

const AdminDashboard = () => {
  return (
    <div className="flex ">
      <div className="flex w-[75%] h-[95vh]  justify-center flex-col px-9 mt-9 ">
        <div className="flex flex-col items-center w-fit fixed top-0 mt-4 ">
          <img src={logo} alt="Logo" className="h-10" />
          <h1 className="">SUPPLYCHAIN</h1>
        </div>
        <div className="flex flex-col w-full gap-9 ml-9">
          <div>
            <h1 className="text-2xl font-bold tracking-wider">
              Welcome {sessionStorage.getItem("adminName")}
            </h1>
            <h1 className="font-bold text-xl mt-3 tracking-wide">
              Browse through users
            </h1>
          </div>
          <div className="flex flex-col  gap-9   ">
            <div className="flex gap-4 w-full">
              <Link
                to="/unapproved"
                className="text-center w-1/4 bg-[#FCBD16] px-7 py-2 font-semibold rounded-md tracking-wide"
              >
                Unapproved suppliers
              </Link>
              <Link
                to="/approved"
                className="text-center w-1/4 bg-[#FCBD16] px-7 py-2 font-semibold rounded-md tracking-wide"
              >
                Approved suppliers
              </Link>
            </div>
            <div className="flex gap-4 w-full">
              <Link
                to="/unapproved/comp"
                className="text-center w-1/4 bg-[#FCBD16] px-7 py-2 font-semibold rounded-md tracking-wide"
              >
                Unapproved Companies
              </Link>
              <Link
                to="/approved/comp"
                className="text-center w-1/4 bg-[#FCBD16] px-7 py-2 font-semibold rounded-md tracking-wide"
              >
                Approved Companies
              </Link>
            </div>
            <Link
              onClick={() => {
                sessionStorage.removeItem("adminName");
                sessionStorage.removeItem("adminId");
              }}
              to="/"
              className="text-center w-1/4 bg-[#FCBD16] px-7 py-2 font-semibold rounded-md "
            >
              Logout
            </Link>
          </div>
        </div>
      </div>

      <div className="w-[25%] bg-[#FCBD16] h-screen"></div>
    </div>
  );
};

export default AdminDashboard;
