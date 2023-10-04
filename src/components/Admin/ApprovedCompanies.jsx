import React, { useState, useEffect } from "react";
import axios from "axios";
import logo from "../../assets/logo1.png";
import { Link } from "react-router-dom";

import { Player } from "@lottiefiles/react-lottie-player";
import loadingLottie from "../../assets/loadingLottie.json";

function ApprovedCompanies() {
  const [loading, setLoading] = useState(false);
  const [approved, setApproved] = useState([]);
  useEffect(() => {
    setLoading(true)
    axios.get("http://127.0.0.1:5000/admin/getApprovedCompData").then((res) => {
      setApproved(res.data);
      setLoading(false)
    }).catch(()=>{
      setLoading(true)
    })
  }, []);
  return (
    <div className="flex ">
      <div className="flex w-[80%] h-[100vh] items-start justify-start flex-col px-9 ">
        <div className="  flex  gap-9 items-center  sticky top-0 w-full bg-white  mt-4 pb-4">
          <div className="flex flex-col items-center w-fit">
            <img src={logo} alt="Logo" className="h-10" />
            <h1 className="">SUPPLYCHAIN</h1>
          </div>
          <h1 className="font-semibold text-xl">Approved Companies</h1>
          <Link
            to="/admin"
            className="px-4 py-2 bg-[#FCBD16] rounded-md font-semibold"
          >
            Back
          </Link>
        </div>
        {loading && (
          <div className="w-full h-screen flex items-center justify-center  ">
            <Player src={loadingLottie} loop autoplay className="h-96" />
          </div>
        )}
        {!loading && (
          <ul className="flex flex-col gap-9  w-[75%] ml-9 pb-9">
            {approved.map((company) => (
              <li className="text-black/60 ">
                <div className="w-full h-[170px] bg-[#FCBD16]  rounded-xl flex items-center justify-between p-9">
                  <div className="flex items-start justify-evenly flex-col  h-full">
                    <h1 className="font-bold text-xl">Name : {company.name}</h1>
                    <h1 className="font-bold text-xl">
                      Email : {company.email}
                    </h1>
                    <h1 className="font-bold text-xl">
                      Phone : {company.phone}
                    </h1>
                  </div>
                  <div className="flex flex-col gap-5">
                    {company.filename !== "" ? (
                      <a
                        className="px-4 py-2 bg-white/20 rounded-md font-semibold"
                        target="_blank"
                        href={`http://127.0.0.1:5000/admin/downloadCompanyFiles/${company._id}`}
                      >
                        Download
                      </a>
                    ) : (
                      <p className="cursor-pointer">No Document</p>
                    )}
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="w-[25%] bg-[#FCBD16] h-screen fixed right-0"></div>
    </div>
  );
}

export default ApprovedCompanies;
