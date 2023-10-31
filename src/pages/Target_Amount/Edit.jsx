import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { setTarget } from "../../features/authSlice";

import Input from "../../components/Input";
import Button from "../../components/Button";

const Edit = () => {
  const dispatch = useDispatch();
  const [editedTargetAmount, setEditedTargetAmount] = useState("");

  const handleEditTarget = (e) => {
    e.preventDefault();
    dispatch(setTarget(editedTargetAmount));
  };

  return (
    <section className="w-screen h-screen flex flex-col justify-center items-center bg-[#EEF5FB]">
      <div className="p-14 bg-white rounded-xl shadow-md">
        <form onSubmit={handleEditTarget} className="grid gap-y-5">
          <Input label="Edit Target Amount" id="editedTargetAmount" name="editedTargetAmount" type="number" value={editedTargetAmount} onChange={(e) => setEditedTargetAmount(e.target.value)} />
          <div>
            <Button label="Save" type="submit" />
          </div>
        </form>
      </div>
    </section>
  );
};

export default Edit;
