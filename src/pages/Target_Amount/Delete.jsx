import React from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

const Delete = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleDeleteTarget = () => {
    dispatch(deleteTarget());
    navigate("/shopwise/list");
  };
  return (
    <div>
      <h2>Edit Target Amount</h2>
      <form onSubmit={handleEditTarget}>
        <Input label="Edit Target Amount" id="editedTargetAmount" name="editedTargetAmount" type="number" value={editedTargetAmount} onChange={(e) => setEditedTargetAmount(e.target.value)} />
        <Button label="Save" type="submit" />
        <Button label="Delete" onClick={handleDeleteTarget} />
      </form>
    </div>
  );
};

export default Delete;
