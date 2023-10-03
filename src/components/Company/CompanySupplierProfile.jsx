import axios from "axios";
import React, { useEffect, useState } from "react";
import logo from "../../assets/logo1.png";
import { Link } from "react-router-dom";

import ColorStar from "../../assets/color-star.png";
import UnColorStar from "../../assets/uncolor-star.png";

function CompanySupplierProfile() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(
        "http://127.0.0.1:5000/supplier/getSupplierID/" +
          localStorage.getItem("company-sup-view")
      )
      .then((result) => {
        console.log(result);
        setData(result.data[0]);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const ratingStarsFunc = (rating) => {
    console.log(rating);
    var stars = [0, 0, 0, 0, 0];
    for (var i = 0; i < rating; i++) {
      stars[i] = 1;
    }
    console.log(stars);
    const ratingStars = stars.map((value, index) => {
      if (value === 1) {
        return (
          <img
            key={index}
            src={ColorStar}
            alt=""
            className="w-[15px] h-[15px]"
          />
        );
      } else {
        return (
          <img
            key={index}
            src={UnColorStar}
            alt=""
            className="w-[15px] h-[15px]"
          />
        );
      }
    });

    return ratingStars;
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  var getComments = data["comments"].map((value, index) => {
    return (
      <div className="w-full mt-3">
        <h1 className="font-bold text-[20px]">{value["name"]}</h1>
        <h2 className="text-[10px]">{value["email"]}</h2>
        <p className="mt-1">{value["comment"]}</p>
      </div>
    );
  });

  return (
    <div className="w-full flex flex-col items-center">
      <nav className="w-full flex justify-between px-12 pt-3 h-[13vh]">
        <div className="flex flex-col items-center ">
          <img src={logo} alt="Logo" className="h-10" />
          <h1 className="">SUPPLYCHAIN</h1>
        </div>
        <div className="flex items-center gap-9">
          <Link
            className="text-lg font-semibold bg-[#FCBD16] px-4 py-2 rounded-full"
            to="/signUp"
          >
            Logout
          </Link>
        </div>
      </nav>
      <div className="w-[95%] bg-[#FCBD16]/20 p-10">
        <form
          className="flex items-center justify-between h-[150px]"
          onSubmit={(e) => {
            e.preventDefault();
          }}
        >
          <div className="flex flex-col items-start justify-evenly h-full">
            <h1 className="font-bold">Supplier Data</h1>
            <p>Name: {data["name"]}</p>
            <p>Email: {data["email"]}</p>
            <p>Phone: {data["phone"]}</p>
          </div>
          <div className="w-1 bg-[#FCBD16] h-[150px]"></div>
          <div className="flex flex-col items-start justify-evenly h-full">
            <div>
              <p>Resource Type: {data["resourceType"]}</p>
            </div>
            <div>
              <p>Location: {data["location"]}</p>
            </div>
            <div>
              <p>Availability: {data["availability"]}</p>
            </div>
          </div>
          <div className="flex flex-col items-center justify-between h-full">
            <div className="flex items-center">
              Rating:
              {ratingStarsFunc(data["rating"])}
            </div>
            <a
              className="w-[100px] bg-[#FCBD16] p-2 rounded-2xl"
              target="_blank"
              href={`http://127.0.0.1:5000/company/downloadFiles/${data["_id"]}`}
            >
              Download
            </a>
            <button
              className="w-[100px] bg-[#FCBD16] p-2 rounded-2xl"
              onClick={(e) => {
                e.preventDefault();
                var comment = prompt("Add Comment");
                var sendJson = {
                  _id: localStorage.getItem("company-sup-view"),
                  compName: localStorage.getItem("compName"),
                  compMail: localStorage.getItem("compMail"),
                  comment: comment,
                };
                console.log(sendJson);
                axios
                  .put("http://127.0.0.1:5000/company/addComment", sendJson)
                  .then((output) => {
                    console.log(output);
                    axios
                      .get(
                        "http://127.0.0.1:5000/supplier/getSupplierID/" +
                          localStorage.getItem("company-sup-view")
                      )
                      .then((result) => {
                        console.log(result);
                        setData(result.data[0]);
                      })
                      .catch((err) => {
                        console.log(err);
                      });
                  })
                  .catch((err) => {
                    console.log(err);
                  });
              }}
            >
              Add Comment
            </button>
          </div>
        </form>
        <div>
          <h1 className="font-bold mt-3">Comments:</h1>
          {getComments}
        </div>
      </div>
    </div>
  );
}

export default CompanySupplierProfile;
