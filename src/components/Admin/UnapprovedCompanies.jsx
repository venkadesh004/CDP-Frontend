import React, { useEffect, useState } from "react";
import axios from "axios";
import logo from "../../assets/logo1.png";
import { Link } from "react-router-dom";

function UnapprovedCompanies() {
  const [unApproved, setUnapproved] = useState([]);

  useEffect(() => {
    axios
      .get("http://127.0.0.1:5000/admin/getUnapprovedCompData")
      .then((res) => {
        console.log(res);
        setUnapproved(res.data);
      });
  }, []);

  const approve = (id) => {
    console.log(id);
    console.log(window.sessionStorage.getItem("adminName"));
    axios
      .put("http://127.0.0.1:5000/admin/allowCompanies", {
        _id: id,
        username: window.sessionStorage.getItem("adminName"),
      })
      .then(async (res) => {
        console.log(res);
        await axios
          .get("http://127.0.0.1:5000/admin/getUnapprovedCompData")
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
      .put("http://127.0.0.1:5000/admin/denyCompanies", {
        _id: id,
        comments: comments,
        username: window.sessionStorage.getItem("adminName"),
      })
      .then(async (res) => {
        console.log(res);
        await axios
          .get("http://127.0.0.1:5000/admin/getUnapprovedCompData")
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
          <div className="w-full h-[300px] bg-[#FCBD16]/50  rounded-xl flex items-center justify-between p-9">
            <div className="flex flex-col items-start justify-evenly h-full">
              <div className="flex items-start justify-evenly flex-col h-full">
                <h1 className="font-bold text-xl">Name : {company.name}</h1>
                <h1 className="font-bold text-xl">Email : {company.email}</h1>
                <h1 className="font-bold text-xl">Phone : {company.phone}</h1>
              </div>
              <div className="flex flex-col gap-5">
                {company.filename !== "" ? (
                  <a
                    className="px-4 py-2 bg-[#FCBD16] rounded-md font-semibold"
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
            <form
              className="flex flex-col items-start justify-evenly"
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
                {/* <button
                  className="px-4 py-2 bg-white/20 rounded-md font-semibold"
                  onClick={() => approve(company["_id"])}
                >
                  Approve
                </button>
                <button
                  className="px-4 py-2 bg-white/20 rounded-md font-semibold"
                  onClick={() => approve(company["_id"])}
                >
                  Approve
                </button> */}
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
                <input
                  type="radio"
                  name="approve"
                  className="ml-2"
                  value="reject"
                  id="reject-radio"
                />
                <label htmlFor="reject-radio">Reject</label>
              </div>
              <textarea
                name="comments"
                id=""
                cols="100"
                rows="7"
                placeholder="Comment"
                className="px-5 py-2 rounded-md"
              ></textarea>
              <button
                type="submit"
                className="px-4 py-2 bg-[#FCBD16] rounded-md font-semibold mt-2"
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

        <ul className="flex flex-col gap-9  w-[90%] ml-9 pb-9">{datas}</ul>
      </div>

      {/* <div className="w-[25%] bg-[#FCBD16] h-screen fixed right-0"></div> */}
    </div>
  );
}

export default UnapprovedCompanies;