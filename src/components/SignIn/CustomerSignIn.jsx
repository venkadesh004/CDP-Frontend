import React, { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";

const CustomerSignIn = (props) => {
  const [message , setMessage] = useState("")
  const [signIn, setsignIn] = useState(0);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    await axios
      .post("http://127.0.0.1:5000/company/addCompany", data)
      .then((res) => {
        setMessage(res.data);
        console.log(res.data);
        setsignIn(0)
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (  
    <div className="flex h-[80vh] w-full items-center ml-9">
      {signIn === 0 && (
        <div className="flex flex-col gap-9">
          <h1 className="font-bold text-4xl">Customer Sign In</h1>
          <form className="flex flex-col w-full gap-9 ">
            <div className="flex flex-col gap-4">
              <input
                type="text"
                placeholder="Username"
                className="w-96 border-2 py-1 px-2 rounded-md  "
              />
              <input
                type="password"
                placeholder="Password"
                className="w-96 border-2 py-1 px-2 rounded-md"
              />
            </div>
            <div className="flex gap-8">
              <button className="self-start bg-[#FCBD16] px-5 py-1 font-bold rounded-md tracking-wide">
                Login
              </button>
              <button
                className="self-start border-2 border-black/50 px-5 py-1 font-bold rounded-md tracking-wide"
                onClick={() => {
                  props.setPage(0);
                }}
              >
                Back
              </button>
            </div>
          </form>
          <p>
            New to SupplyChain ?{" "}
            <button
              className="ml-4"
              onClick={() => {
                setsignIn(1);
              }}
            >
              Sign Up
            </button>
          </p>
        </div>
      )}
      {signIn === 1 && (
        <div className="flex flex-col gap-9">
          <h1 className="font-bold text-4xl">Customer Sign Up</h1>
          <form
            className="flex flex-col w-full gap-9 "
            onSubmit={handleSubmit((data) => {
              onSubmit(data);
            })}
          >
            <div className="flex flex-col gap-4">
              <input
                {...register("name", { required: "this is required" })}
                type="text"
                placeholder="Username"
                className="w-96 border-2 py-1 px-2 rounded-md  "
              />
              <input
                {...register("email", { required: "this is required" })}
                type="email"
                placeholder="Email"
                className="w-96 border-2 py-1 px-2 rounded-md"
              />{" "}
              <input
                {...register("phone", { required: "this is required" })}
                type="text"
                placeholder="Phone"
                className="w-96 border-2 py-1 px-2 rounded-md"
              />
              <input
                {...register("password", { required: "this is required" })}
                type="password"
                placeholder="Password"
                className="w-96 border-2 py-1 px-2 rounded-md"
              />
            </div>
            <div className="flex gap-8">
              <button
                className="self-start bg-[#FCBD16] px-5 py-1 font-bold rounded-md tracking-wide"
                type="submit"
              >
                Create
              </button>
              <button
                className="self-start border-2 border-black/50 px-5 py-1 font-bold rounded-md tracking-wide"
                onClick={() => {
                  props.setPage(0);
                }}
              >
                Back
              </button>
            </div>
          </form>
          <p>
            Already a SupplyChain Customer?{" "}
            <button
              className="ml-4"
              onClick={() => {
                setsignIn(0);
              }}
            >
              Sign In
            </button>
          </p>
        </div>
      )}
    </div>
  );
};

export default CustomerSignIn;
