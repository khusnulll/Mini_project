import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { useDispatch } from "react-redux";
import { setTarget } from "../../features/authSLice";

import Button from "../../components/Button";
import Input from "../../components/Input";

const AddTarget = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [targetAmount, setTargetAmount] = useState("");

  const handleTargetAmount = (e) => {
    e.preventDefault();
    dispatch(setTarget(targetAmount));
    console.log("Target Amount:", targetAmount);
    navigate(`/shopwise/list`);
  };
  return (
    <section className="w-screen h-screen flex flex-col justify-center items-center bg-[#EEF5FB]">
      <div className="p-14 bg-white rounded-xl shadow-md">
        <form onSubmit={handleTargetAmount} className="grid gap-y-5">
          <Input label="Target Amount" id="targetAmount" name="targetAmount" type="number" value={targetAmount} onChange={(e) => setTargetAmount(e.target.value)} />
          <div>
            <Button label="Submit" type="submit" />
          </div>
        </form>
      </div>
    </section>
  );
};

export default AddTarget;
