import React, { useEffect, useState } from "react";
import logo from "../../assets/logo1.png";
import { Link } from "react-router-dom";

import ColorStar from "../../assets/color-star.png";
import UnColorStar from "../../assets/uncolor-star.png";

import magnifyGlass from "../../assets/magnifying-glass.svg";

import axios from "axios";
import { useNavigate } from "react-router-dom";

function CompanyLandingPage() {
  const [data, setData] = useState([]);

  const [type, setType] = useState("Both");
  const [location, setLocation] = useState("All Locations");
  const [availability, setAvailability] = useState("Both");

  const navigate = useNavigate();

  useEffect(() => {
    axios.get("http://127.0.0.1:5000/company/getSuppliers").then((res) => {
      console.log(res);
      setData(res.data);
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

  var dataFilter = () => {
    var finalList = [];
    var flag;
    var selections;

    data.forEach((element) => {
      flag = 0;
      selections = 0;
      // console.log(type, location, availability);
      if (type !== "Both") {
        selections += 1;
        if (element["resourceType"] === type) {
          flag += 1;
        }
      }
      if (location !== "All Locations") {
        selections += 1;
        if (element["location"] === location) {
          flag += 1;
        }
      }
      if (availability !== "Both") {
        selections += 1;
        if (element["availability"] === availability) {
          flag += 1;
        }
      }
      console.log(flag, selections);
      if (flag === selections) {
        finalList.push(element);
      }
    });

    return finalList;
  };

  var dataElements = dataFilter().map((value, index) => {
    return (
      <div className="w-[95%] bg-[#FCBD16]/20 p-10 mt-5">
        <form
          className="flex items-center justify-between h-[150px]"
          onSubmit={(e) => {
            e.preventDefault();
            console.log(e.currentTarget.elements.id.value);
            console.log(localStorage.getItem("compMail"));
            axios
              .put("http://127.0.0.1:5000/company/sendRequest", {
                _id: e.currentTarget.elements.id.value,
                compMail: localStorage.getItem("compMail"),
              })
              .then((res) => {
                console.log(res);
                alert("Request Sent");
              })
              .catch((err) => {
                console.log(err);
              });
          }}
        >
          <input name="id" className="hidden" value={value["_id"]} />
          <div className="flex flex-col items-start justify-evenly h-full">
            <h1 className="font-bold">Supplier Data</h1>
            <p>Name: {value["name"]}</p>
            <p>Email: {value["email"]}</p>
            <p>Phone: {value["phone"]}</p>
          </div>
          <div className="w-1 bg-[#FCBD16] h-[200px]"></div>
          <div className="flex flex-col items-start justify-evenly h-full">
            <div>
              <p>Resource Type: {value["resourceType"]}</p>
            </div>
            <div>
              <p>Location: {value["location"]}</p>
            </div>
            <div>
              <p>Availability: {value["availability"]}</p>
            </div>
          </div>
          <div className="flex flex-col items-center justify-between h-[200px]">
            <div className="flex items-center">
              Rating:
              {ratingStarsFunc(value["rating"])}
            </div>
            <button
              className="w-[100px] bg-[#FCBD16] p-2 rounded-2xl"
              onClick={(e) => {
                e.preventDefault();
                console.log(value["_id"]);
                localStorage.setItem(
                  "company-sup-view",
                  value["_id"]
                );
                navigate("/company/sup");
              }}
            >
              View
            </button>
            <a
              className="w-[100px] bg-[#FCBD16] p-2 rounded-2xl"
              target="_blank"
              href={`http://127.0.0.1:5000/company/downloadFiles/${value["_id"]}`}
            >
              Download
            </a>
            <button
              className="w-[100px] bg-[#FCBD16] p-2 rounded-2xl"
              type="submit"
            >
              Request
            </button>
          </div>
        </form>
      </div>
    );
  });

  return (
    <div>
      <nav className="w-full flex justify-between px-12 pt-3 h-[8vh]">
        <div className="flex flex-col items-center ">
          <img src={logo} alt="Logo" className="h-10" />
          <h1 className="">SUPPLYCHAIN</h1>
        </div>
        <div className="flex items-center gap-9">
          <Link to="/comp/status" className="text-lg font-semibold">
            Status
          </Link>
          <Link
            className="text-lg font-semibold bg-[#FCBD16] px-4 py-2 rounded-full"
            to="/signUp"
          >
            Logout
          </Link>
        </div>
      </nav>
      <div className="flex items-center justify-evenly mt-10 w-full">
        <div className="flex items-center h-16 w-[500px] justify-around bg-[#FEEFC6]/70 p-3 rounded-full">
          <img src={magnifyGlass} alt="" className="h-7 w-7" />
          <input
            type="search"
            className="border-none outline-none h-full w-full bg-transparent px-3"
            placeholder="Search"
          />
        </div>
        <div className="flex items-center justify-between w-[700px]">
          <p className="font-bold">Filter: </p>
          <label htmlFor="" className="font-bold">
            Type
          </label>
          <select
            name=""
            id=""
            onChange={(e) => {
              e.preventDefault();
              console.log(e.target.value);
              setType(e.target.value);
            }}
          >
            <option value="Both">Both</option>
            <option value="Material">Material</option>
            <option value="Human">Human</option>
          </select>
          <label htmlFor="" className="font-bold">
            Location
          </label>
          <select
            name=""
            id=""
            onChange={(e) => {
              e.preventDefault();
              console.log(e.target.value);
              setLocation(e.target.value);
            }}
          >
            <option value="All Locations">All Locations</option>
            <option value="Madurai">Madurai</option>
            <option value="Chennai">Chennai</option>
            <option value="Coimbatore">Coimbatore</option>
            <option value="Kanyakumari">Kanyakumari</option>
          </select>
          <label htmlFor="" className="font-bold">
            Availability
          </label>
          <select
            name=""
            id=""
            onChange={(e) => {
              e.preventDefault();
              console.log(e.target.value);
              setAvailability(e.target.value);
            }}
          >
            <option value="Both">Both</option>
            <option value="Yes">Yes</option>
            <option value="No">No</option>
          </select>
        </div>
      </div>
      <div className="mt-7 w-full flex flex-col items-center">
        {dataElements}
      </div>
    </div>
  );
}

export default CompanyLandingPage;
