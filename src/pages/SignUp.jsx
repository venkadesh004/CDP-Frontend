import React from "react";
import logo from "../assets/logo1.png";
import Buttons from "../components/SignIn/Buttons";
import globe from "../assets/globe-solid.svg";
import person from "../assets/person-digging.svg";
import find from "../assets/magnifying-glass.svg";
import { useState } from "react";
import CustomerSignIn from "../components/SignIn/CustomerSignIn";
import SupplierSignIn from "../components/SignIn/Supplier/SupplierSignIn";
import Login from "../components/Admin/Login";
import { Link } from "react-router-dom";

const SignUp = () => {

  const [page, setPage] = useState(0);
  const customerPage = () =>{
    setPage(1);
  }
  const supplierPage = () =>{
    setPage(2);
  }
  const adminPage = () =>{
    setPage(3);
  }
  return (
    <div className="flex ">
      {/* Navabar */}
      <div className="w-[75%]  px-9 py-5 h-[10vh]">
        <div className="flex flex-col items-center w-fit">
          <img src={logo} alt="Logo" className="h-10" />
          <h1 className="">SUPPLYCHAIN</h1>
        </div>
        {/* Hero Section */}
        {page === 0 && (
          <div className="h-[80vh] flex items-center justify-start  ml-9">
          <div className=" flex flex-col gap-10">
            <div className="flex flex-col gap-4 tracking-wider">
              <h1 className="text-4xl font-bold ">How do you want to</h1>
              <h1 className="text-4xl font-bold">use Supplychain?</h1>
            </div>
            <div className="flex flex-col gap-5">
              <Buttons
                set = {customerPage}
                icon={find}
                title="I’m here to Find Supplier"
                desc="Find best Suppliers around"
              />
              <Buttons
                set = {supplierPage}
                icon={person}
                title="I’m here as a Supplier"
                desc="Verify credentials for construction companies"
              />
              <Buttons
                set = {adminPage}
                icon={globe}
                title="I’m here as Admin"
                desc="Verifies the Suppliers"
              />
            </div>
            <Link to = "/" className="text-center bg-[#FCBD16] py-2 rounded-md block font-bold tracking-wider text-lg">Back</Link>
          </div>
        </div>
        )}
        {page === 1 && (
          <CustomerSignIn page={page} setPage={setPage}/>
        )}
        {page===2 && (
            <SupplierSignIn page = {page} setPage = {setPage}/>
        )}
        {page==3 && (
          <Login page = {page} setPage = {setPage}/>
        )}
      </div>

      <div className="w-[25%] bg-[#FCBD16] h-screen"></div>
    </div>
  );
};

export default SignUp;
