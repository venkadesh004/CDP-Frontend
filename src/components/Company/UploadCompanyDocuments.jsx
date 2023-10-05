import React, { useState, useId } from "react";
import logo from "../../assets/logo1.png";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const UploadCompanyDocuments = () => {
  const [uploaded, setUploaded] = useState(null);
  const [yes, setYes] = useState(false);

  const checkUpload = () => {
    if (uploaded !== null) {
      setYes(true);
    }
  };
  const navigate = useNavigate();

  return (
    <div className="flex ">
      {/* Navabar */}
      <div className="w-[75%]  px-9 py-5 h-[10vh]">
        <div className="flex flex-col items-center w-fit">
          <img src={logo} alt="Logo" className="h-10" />
          <h1 className="">SUPPLYCHAIN</h1>
        </div>
        {/* Hero Section */}

        <div className="h-[80vh] flex items-center justify-start  ml-9">
          <div className=" flex flex-col gap-10">
            <div className="flex flex-col gap-4 tracking-wider">
              <h1 className="text-4xl font-bold ">Upload Company Documents</h1>
              <p>It will be shown to the suppliers</p>
            </div>
            <div className="">
              <form
                className="flex flex-col gap-9"
                onSubmit={async(e) => {
                  e.preventDefault();
                  const data = new FormData(e.target);
                  await axios({
                    method: "post",
                    url: "https://cdp-backend.onrender.com/company/fileUpload",
                    data: {
                      file: data.get('file'),
                      _id: data.get('id')
                    },
                    headers: {"Content-Type": "multipart/form-data"}
                  }).then(res => {
                    console.log(res);
                    navigate('/wait');
                  }).catch(err => {
                    console.log(err);
                  })
                }}
              >
                <input
                  type="none"
                  name="id"
                  value={window.localStorage.getItem("compID")}
                  className="hidden"
                />
                <input type="file" name="file" accept=".pdf" id="file" />
                <button
                  className="bg-[#FCBD16] py-2 rounded-md block font-bold tracking-wider"

                  // onChange={(e) => {
                  //   setUploaded(e.target.files[0]);
                  //   setYes(true);
                  //   console.log(e.target.files[0]);
                  // }}
                >
                  Upload
                </button>
                <button
                  className="bg-[#FCBD16] py-2 rounded-md block font-bold tracking-wider"
                  onClick={() => {
                    navigate("/signUp");
                  }}
                >
                  Back
                </button>
              </form>
              {/* <a target="_blank" href={`https://cdp-backend.onrender.com/supplier/downloadFiles/${window.localStorage.getItem("compID")}`}>Download Last Upload</a> */}
            </div>
          </div>
        </div>
      </div>

      <div className="w-[25%] bg-[#FCBD16] h-screen"></div>
    </div>
  );
};

export default UploadCompanyDocuments;
