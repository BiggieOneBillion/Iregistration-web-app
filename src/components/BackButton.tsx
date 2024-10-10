import React from "react";
import { FaArrowLeft } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";

const BackButton = () => {
  const navigate = useNavigate();
  return (
    <div
      onClick={() => navigate(-1)}
      className="flex items-center gap-2 px-2 py-1 bg-black/80 text-white text-sm w-fit cursor-pointer"
    >
      <span>
        <FaArrowLeft />
      </span>
      <span>Go Back</span>
    </div>
  );
};

export default BackButton;
