import React, { useEffect, useState } from "react";
import axios from "axios";
import logo from "../../assets/logo1.png";
import { Link } from "react-router-dom";
import { Player } from "@lottiefiles/react-lottie-player";
import loadingLottie from "../../assets/loadingLottie.json";
function UnapprovedCompanies() {
  const [unApproved, setUnapproved] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    axios
      .get("https://cdp-backend.onrender.com/admin/getUnapprovedCompData")
      .then((res) => {
        console.log(res);
        setUnapproved(res.data);
        setLoading(false);
      })
      .catch(() => {
        setLoading(true);
      });
  }, []);

  const approve = (id) => {
    console.log(id);
    console.log(window.sessionStorage.getItem("adminName"));
    axios
      .put("https://cdp-backend.onrender.com/admin/allowCompanies", {
        _id: id,
        username: window.sessionStorage.getItem("adminName"),
      })
      .then(async (res) => {
        console.log(res);
        await axios
          .get("https://cdp-backend.onrender.com/admin/getUnapprovedCompData")
          .then((res) => {
            console.log(res);
            setUnapproved(res.data);
          });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const reject = (id, comments) => {
    console.log(id);
    console.log(window.sessionStorage.getItem("adminName"));

    axios
      .put("https://cdp-backend.onrender.com/admin/denyCompanies", {
        _id: id,
        comments: comments,
        username: window.sessionStorage.getItem("adminName"),
      })
      .then(async (res) => {
        console.log(res);
        await axios
          .get("https://cdp-backend.onrender.com/admin/getUnapprovedCompData")
          .then((res) => {
            console.log(res);
            setUnapproved(res.data);
          });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const datas = unApproved.map((company, index) => {
    return (
      <div>
        <li className="text-black/60 ">
          <div className="w-full h-[275px] bg-[#FCBD16]  rounded-xl flex items-start justify-between p-9">
            <div className="flex flex-col items-start justify-evenly h-3/4  ">
              <div className="flex items-start justify-evenly flex-col h-full mb-9">
                <h1 className="font-bold text-xl">Name : {company.name}</h1>
                <h1 className="font-bold text-xl">Email : {company.email}</h1>
                <h1 className="font-bold text-xl">Phone : {company.phone}</h1>
              </div>
              <div className="">
                {company.filename !== "" ? (
                  <a
                    className="px-4 py-2 bg-white/20 rounded-md font-semibold"
                    target="_blank"
                    href={`https://cdp-backend.onrender.com/admin/downloadCompanyFiles/${company._id}`}
                  >
                    Download
                  </a>
                ) : (
                  <p className="cursor-pointer">No Document</p>
                )}
              </div>
            </div>
            <form
              className="flex flex-col items-start justify-evenly gap-3"
              onSubmit={(e) => {
                e.preventDefault();
                if (e.currentTarget.elements.approve.value === "approve") {
                  console.log("Approve");
                  console.log(company["_id"]);
                  approve(company["_id"]);
                } else {
                  console.log("Reject");
                  console.log(e.currentTarget.elements.comments.value);
                  reject(
                    company["_id"],
                    e.currentTarget.elements.comments.value
                  );
                }
              }}
            >
              <div className="flex items-center justify-start">
                <div className="flex gap-3">
                  <div className="flex gap-1">
                    <input
                      type="radio"
                      name="approve"
                      value="approve"
                      className=""
                      id="approve-radio"
                    />
                    <label htmlFor="approve-radio" className="">
                      Approve
                    </label>
                  </div>
                  <div className="flex gap-1">
                    <input
                      type="radio"
                      name="approve"
                      className="ml-2"
                      value="reject"
                      id="reject-radio"
                    />
                    <label htmlFor="reject-radio">Reject</label>
                  </div>
                </div>
              </div>
              <textarea
                name="comments"
                id=""
                cols="100"
                rows="4"
                placeholder="Comment"
                className="px-5 py-2 rounded-md focus:outline-[#FCBD16]/20 bg-white/30 text-black placeholder:text-black/70"
              ></textarea>
              <button
                type="submit"
                className="px-4 py-2 bg-white/20 rounded-md font-semibold mt-2"
              >
                Send
              </button>
            </form>
          </div>
        </li>
      </div>
    );
  });

  return (
    <div className="flex justify-center">
      <div className="flex w-[100%] h-[100vh] items-start justify-start flex-col px-9 ">
        <div className="  flex  gap-9 items-center  sticky top-0 w-full bg-white  mt-4 pb-4">
          <div className="flex flex-col items-center w-fit">
            <img src={logo} alt="Logo" className="h-10" />
            <h1 className="">SUPPLYCHAIN</h1>
          </div>
          <h1 className="font-semibold text-xl">Unapproved Companies</h1>
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
          <ul className="flex flex-col gap-9  w-[90%] ml-9 pb-9">{datas}</ul>
        )}
      </div>

      {/* <div className="w-[25%] bg-[#FCBD16] h-screen fixed right-0"></div> */}
    </div>
  );
}

export default UnapprovedCompanies;
