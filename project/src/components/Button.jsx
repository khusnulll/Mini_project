import React from "react";

const Button = ({ id, label, onClick, type, icon }) => {
  return (
    <button className="flex gap-x-2 p-4 py-4 bg-[#0E0E44] text-white text-center focus:outline-none focus:border-none cursor-pointer" id={id} onClick={onClick} type={type}>
      {label} {icon}
    </button>
  );
};

export default Button;
