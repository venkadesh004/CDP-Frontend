import React from "react";

const CustomerSignIn = (props) => {
  return (
    
    <div className="flex h-[80vh] w-full items-center ml-9">
      <div className="flex flex-col gap-9">
        <h1 className="font-bold text-4xl">Customer Sign Up</h1>
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
      </div>
    </div>
  );
};

export default CustomerSignIn;
