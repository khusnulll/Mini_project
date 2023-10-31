import React from "react";
import { useNavigate } from "react-router-dom";

const Circle = ({ onClick }) => {
  return <div className="w-6 h-6 border rounded-full cursor-pointer" onClick={onClick}></div>;
};

export default Circle;
