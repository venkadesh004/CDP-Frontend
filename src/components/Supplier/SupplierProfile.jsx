import React, { useState, useEffect } from "react";
import logo from "../../assets/logo1.png";
import { Link } from "react-router-dom";
import axios from "axios";

import ColorStar from "../../assets/color-star.png";
import UnColorStar from "../../assets/uncolor-star.png";

function SupplierProfile() {
  const [editState, setEditState] = useState(true);
  const [location, setLocation] = useState("");
  const [availability, setAvailability] = useState("");
  const [material, setMaterial] = useState("");
  const [data, setData] = useState([]);
  const [rating, setRating] = useState(0);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    axios
      .get(
        "http://127.0.0.1:5000/supplier/getSupplierID/" +
          window.localStorage.getItem("supID")
      )
      .then((res) => {
        console.log(res);
        setData(res.data[0]);
        setLocation(res.data[0]["location"]);
        setAvailability(res.data[0]["availability"]);
        setMaterial(res.data[0]["resourceType"]);
        setRating(res.data[0]["rating"]);
        setLoading(false);
        console.log(data);
      });
  }, []);

  var stars = [0, 0, 0, 0, 0];
  for(var i=0; i<rating; i++) {
    stars[i] = 1;
  }
  const ratingStars = stars.map((value, index) => {
    if (value === 1) {
      return <img key={index} src={ColorStar} alt="" className="w-[15px] h-[15px]" />;
    } else {
      return <img key={index} src={UnColorStar} alt="" className="w-[15px] h-[15px]" />;
    }
  });

  if (loading) {
    return <h1>Loading...</h1>;
  } else {
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
              if (editState) {
                setEditState(false);
              } else {
                setEditState(true);
                console.log(e.currentTarget.elements.resourceType.value);
                console.log(e.currentTarget.elements.location.value);
                console.log(e.currentTarget.elements.availability.value);
                console.log(window.localStorage.getItem("supID"));

                axios
                  .put("http://127.0.0.1:5000/supplier/editProfile", {
                    _id: window.localStorage.getItem("supID"),
                    resourceType: e.currentTarget.elements.resourceType.value,
                    location: e.currentTarget.elements.location.value,
                    availability: e.currentTarget.elements.availability.value,
                    rating: 0,
                    comments: [],
                    status: [],
                  })
                  .then((res) => {
                    console.log(res);
                  })
                  .catch((err) => {
                    console.log(err);
                  });

                setEditState(true);
              }
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
                <label htmlFor="">Resource Type: </label>
                <select
                  name="resourceType"
                  id=""
                  value={material}
                  disabled={editState}
                  onChange={(e) => {
                    setMaterial(e.target.value);
                    console.log(e.target.value);
                  }}
                >
                  <option value="Material">Material</option>
                  <option value="Human">Human</option>
                </select>
              </div>
              <div>
                <label htmlFor="">Location: </label>
                <input
                  type="text"
                  name="location"
                  disabled={editState}
                  value={location}
                  onChange={(e) => {
                    setLocation(e.target.value);
                  }}
                />
              </div>
              <div>
                <label htmlFor="">Availability: </label>
                <input
                  type="text"
                  disabled={editState}
                  name="availability"
                  value={availability}
                  onChange={(e) => {
                    setAvailability(e.target.value);
                  }}
                />
              </div>
            </div>
            <div className="flex flex-col items-center justify-between h-full">
              <div className="flex items-center">
                Rating:
                {ratingStars}
              </div>
              <button className="w-[100px] bg-[#FCBD16] p-2 rounded-2xl">
                Download
              </button>
              <button
                className="w-[100px] bg-[#FCBD16] p-2 rounded-2xl"
                type="submit"
              >
                {editState ? "Edit" : "Save"}
              </button>
            </div>
          </form>
          <div></div>
        </div>
      </div>
    );
  }
}

export default SupplierProfile;
