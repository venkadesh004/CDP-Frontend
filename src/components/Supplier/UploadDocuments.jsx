import React from "react";
import logo from "../../assets/logo1.png";

const UploadDocuments = () => {
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
              <h1 className="text-4xl font-bold ">Upload Documents</h1>
              <p>Will be verified by admin</p>
            </div>
            <div className="">
              <form className="flex flex-col gap-9"
                action="http://127.0.0.1:5000/supplier/fileUpload.upload"
                method="post"
                encType="multipart/form-data"
              >
                <input type="file" name="file" accept=".pdf" />
                <button className="bg-[#FCBD16] py-2 rounded-md block font-bold tracking-wider">
                  Upload
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

      <div className="w-[25%] bg-[#FCBD16] h-screen"></div>
    </div>
  );
};

export default UploadDocuments;
