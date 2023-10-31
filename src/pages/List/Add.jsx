import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";

import Button from "../../components/Button";
import Input from "../../components/Input";

const Add = () => {
  const navigate = useNavigate();
  const { ShopWiseId } = useParams();
  const [list, setList] = useState([]);
  const target = useSelector((state) => state.auth.target);

  console.log("target:", target);

  const [name, setName] = useState("");
  const [date, setDate] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [isTargetReached, setIsTargetReached] = useState(false);

  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
  };

  useEffect(() => {
    axios
      .get(`https://65380540a543859d1bb125f4.mockapi.io/ShopWise?state=belumDibeli`)
      .then((response) => {
        setList(response.data);
        setPrice(response.data.price);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [ShopWiseId]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const newData = {
      name,
      date,
      category,
      price,
      state: "belumDibeli",
    };

    const totalPrice = parseFloat(price);
    const totalHargaBelanja = list.reduce((total, item) => total + parseFloat(item.price), 0);

    if (totalPrice + totalHargaBelanja > parseFloat(target)) {
      setIsTargetReached(true);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Penambahan item melebihi target amount.",
      });
    } else {
      axios
        .post("https://65380540a543859d1bb125f4.mockapi.io/ShopWise", newData)
        .then((response) => {
          const newList = response.data;

          Swal.fire({
            icon: "success",
            title: "Success",
            text: `Success Input List: ${newList.name}`,
          });

          setList([...list, newData]);
        })
        .catch((error) => {
          console.log(error);
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "An error occurred while adding a new list.",
          });
        });

      setName("");
      setDate("");
      setCategory("");
      setPrice("");
      setIsTargetReached(false);
    }

    navigate(`/shopwise/list`);
  };

  return (
    <section className="bg-[#EEF5FB] w-screen flex flex-col justify-center items-center h-screen">
      <div className="p-14 bg-white rounded-3xl shadow-sm w-1/3 justify-center">
        <h1 className="text-center font-semibold text-xl mb-3">Add Shopping List</h1>
        {isTargetReached && <div className="text-red-600">Anda telah mencapai target amount!</div>}
        <form onSubmit={handleSubmit} className="grid grid-cols gap-y-3">
          <Input label="Name" id="name" type="text" name="name" value={name} onChange={(e) => setName(e.target.value)} placeholder="Input shopping list" />
          <Input label="Date" id="date" type="date" name="date" value={date} onChange={(e) => setDate(e.target.value)} placeholder="" />
          <div className="grid grid-cols gap-y-1">
            <label htmlFor="category" className="font-semibold">
              Category
            </label>
            <select name="category" id="categoryInput" value={category} onChange={handleCategoryChange} className="bg-white rounded-md border border-slate-200 p-2 text-black">
              <option value="">Choose...</option>
              <option value="Groceries">Groceries</option>
              <option value="Skincare">Skincare</option>
              <option value="School">School</option>
              <option value="Others">Others</option>
            </select>
          </div>
          <Input label="Price" id="price" type="number" name="price" value={price} onChange={(e) => setPrice(e.target.value)} placeholder="Rp." />
          <div className="w-full text-center">
            <Button type="submit" id="add" label="Submit" />
          </div>
        </form>
      </div>
    </section>
  );
};

export default Add;
