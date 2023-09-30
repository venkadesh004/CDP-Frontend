import React from "react";

const Buttons = (props) => {
  return (
    <button className="flex cursor-pointer " onClick={props.set}>
      <div className="flex items-center w-full px-8 border-solid border-2 border-black/50 rounded-md  py-4 gap-4 hover:border-black duration-150  ">
        <div>
            <img src={props.icon} alt="icons" />
        </div>
        <div>
          <h1 className="font-bold tracking-wide text-start">{props.title}</h1>
          <p className="tracking-wide">{props.desc}</p>
        </div>
      </div>
    </button>
  );
};

export default Buttons;
