import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";

import Input from "../../components/Input";
import Button from "../../components/Button";

const Update = () => {
  const { ShopWiseId } = useParams();
  const [list, setList] = useState({});
  const [name, setName] = useState(list.name || "");
  const [date, setDate] = useState(list.date || "");
  const [category, setCategory] = useState(list.category || "");
  const [price, setPrice] = useState(list.price || "");

  useEffect(() => {
    axios
      .get(`https://65380540a543859d1bb125f4.mockapi.io/ShopWise/${ShopWiseId}`)
      .then((response) => {
        setList(response.data);
        setName(response.data.name);
        setDate(response.data.date);
        setCategory(response.data.category);
        setPrice(response.data.price);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [ShopWiseId]);

  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
  };

  const handleUpdate = (e) => {
    e.preventDefault();

    const updatedData = {
      name: name,
      date: date,
      category: category,
      price: price,
    };

    axios
      .put(`https://65380540a543859d1bb125f4.mockapi.io/ShopWise/${ShopWiseId}`, updatedData)
      .then((response) => {
        console.log("List updated successfully");
        console.log(name);
        console.log(date);
        console.log(category);
        console.log(price);

        Swal.fire({
          icon: "success",
          title: "Success",
          text: `Success Update List : ${name}`,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <section className="bg-[#EEF5FB] w-screen flex flex-col justify-center items-center h-screen">
      <div className="p-14 bg-white rounded-3xl shadow-sm w-1/3">
        <h1 className="text-center font-semibold text-xl mb-3">Edit Shopping List</h1>
        <form onSubmit={handleUpdate} className="grid grid-cols gap-y-3">
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
          <div>
            <Button type="submit" id="Edit" label="Edit" />
          </div>
        </form>
      </div>
    </section>
  );
};

export default Update;
