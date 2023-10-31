import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { setTarget } from "../../features/authSlice";

import Input from "../../components/Input";
import Button from "../../components/Button";

const Edit = () => {
  const { targetId } = useParams();
  const dispatch = useDispatch();
  const [editedTargetAmount, setEditedTargetAmount] = useState("");

  const handleEditTarget = (e) => {
    e.preventDefault();
    dispatch(setTarget(editedTargetAmount));
  };

  return (
    <div>
      <form onSubmit={handleEditTarget}>
        <Input label="Edit Target Amount" id="editedTargetAmount" name="editedTargetAmount" type="number" value={editedTargetAmount} onChange={(e) => setEditedTargetAmount(e.target.value)} />
        <Button label="Save" type="submit" />
      </form>
    </div>
  );
};

export default Edit;
