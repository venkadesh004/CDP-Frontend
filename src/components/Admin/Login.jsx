import React, { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = (props) => {
    const navigate = useNavigate();
  const [message, setMessage] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = async (data) => {
    console.log(data);
    axios
      .post("http://127.0.0.1:5000/admin/getAdmin", data)
      .then((res) => {
        console.log(res);
        window.sessionStorage.setItem("adminId", res.data[0]["_id"]);
        window.sessionStorage.setItem("adminName", res.data[0]["username"]);
        navigate("/admin")
      })
      .catch((err) => {
        console.log(err);
        if (err.response.status === 401) {
          setMessage("Wrong Password");
        }
        if (err.response.status === 404) {
          setMessage("User not found");
        }
      });
  };
  return (
    <div>
      <div className="flex h-[80vh] w-full items-center ml-9">
        <div className="flex flex-col gap-9">
          <h1 className="font-bold text-4xl">Admin Sign in</h1>
          <form
            className="flex flex-col w-full gap-9 "
            onSubmit={handleSubmit((data) => {
              onSubmit(data);
            })}
          >
            <div className="flex flex-col gap-4">
              <input
                {...register("username", { required: "this is required" })}
                type="text"
                placeholder="username"
                className="w-96 border-2 py-1 px-2 rounded-md  "
              />
              <input
                {...register("password", { required: "this is required" })}
                type="password"
                placeholder="Password"
                className="w-96 border-2 py-1 px-2 rounded-md"
              />
            </div>
            <div className="flex gap-8">
              <button className="self-start bg-[#FCBD16] px-5 py-1 font-semibold rounded-md tracking-wide">
                Login
              </button>
              <button
                className="self-start border-2 border-black/50 px-5 py-1 font-semibold rounded-md tracking-wide"
                onClick={() => {
                  props.setPage(0);
                }}
              >
                Back
              </button>
            </div>
          </form>
          <p>{message}</p>
        </div>
      </div>
    </div>
  );
};

export default Login;
