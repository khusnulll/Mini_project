import React from "react";
import Layout from "../../components/Layout";
import { PlusIcon, PencilIcon, TrashIcon } from "@heroicons/react/24/outline";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { useSelector, useDispatch } from "react-redux";
import { deleteTarget } from "../../features/authSlice";

import Navbar from "../../components/Navbar";
import Button from "../../components/Button";
import Circle from "../../components/Circle";
import Chat from "../../components/Chat";
import Footer from "../../components/Footer";

const List = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [list, setList] = useState([]);
  const [done, setDone] = useState([]);
  const username = Cookies.get("username");

  const target = useSelector((state) => state.auth.target);
  console.log("target:", target);

  const getList = () => {
    axios
      .get("https://65380540a543859d1bb125f4.mockapi.io/ShopWise?state=belumDibeli")
      .then((response) => {
        setList(response?.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getList();
  }, []);

  const getDone = () => {
    axios
      .get("https://65380540a543859d1bb125f4.mockapi.io/ShopWise?state=selesai")
      .then((response) => {
        setDone(response?.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getDone();
  }, []);

  const handleUpdateList = (ShopWiseId) => {
    navigate(`/shopwise/list/update_list/${ShopWiseId}`);
  };

  const handleDeleteTarget = () => {
    dispatch(deleteTarget());
    navigate("/shopwise/list");
  };

  const handleDelete = (ShopWiseId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`https://65380540a543859d1bb125f4.mockapi.io/ShopWise/${ShopWiseId}`)
          .then(() => {
            const updateList = list.filter((item) => item.id !== ShopWiseId);
            setList(updateList);
            Swal.fire("Deleted!", "Your product has been deleted.", "success");
          })
          .catch((error) => {
            console.log(error);
            Swal.fire("Error", "An error occurred while deleting the product.", "error");
          });
      }
    });
  };

  const handleCircleClick = (ShopWiseId) => {
    axios
      .put(`https://65380540a543859d1bb125f4.mockapi.io/ShopWise/${ShopWiseId}`, { state: "selesai" })
      .then(() => {
        const updatedList = list.map((item) => {
          if (item.id === ShopWiseId) {
            return { ...item, state: "selesai" };
          } else {
            return item;
          }
        });
        setList(updatedList);
      })
      .catch((error) => {
        console.log(error);
        Swal.fire("Error", "An error occurred while updating the item status.", "error");
      });
  };

  const totalHargaBelanja = list.reduce((total, item) => total + parseFloat(item.price), 0);
  const totalSelesai = done.reduce((total, item) => total + parseFloat(item.price), 0);

  return (
    <section className="w-screen">
      <Navbar username={username} />
      <Layout>
        {target ? (
          <div className="flex gap-x-5 items-center w-full px-32 mt-32 mb-8">
            <h3 className="font-semibold text-2xl">Target Amount</h3>
            <div className="font-semibold text-2xl px-5">Rp. {target}</div>
            <PencilIcon className="w-8 cursor-pointer" onClick={() => navigate("/shopwise/list/edit/:targetId")} />
            <TrashIcon className="w-8 cursor-pointer" onClick={handleDeleteTarget} />
          </div>
        ) : (
          <div className="flex gap-x-5 items-center w-full px-32 mt-32 mb-8">
            <h3 className="font-semibold text-2xl">Increase the spending target amount</h3>
            <PlusIcon className="w-6 h-6 border border-[#0E0E44] rounded-md cursor-pointer" onClick={() => navigate("/shopwise/list/Add_target_amount")} />
          </div>
        )}

        <div className="w-3/4 mx-32 mt-12 p-6 shadow-md border rounded-3xl relative flex flex-col gap-y-5">
          <div className="absolute -top-9">
            <Button label="Add Shopping List" onClick={() => navigate("/shopwise/list/add_list")} icon={<PlusIcon className="w-6 h-6" />} />
          </div>
          <h1 className="font-semibold text-3xl mt-2">Daftar Belanja</h1>
          <table className="w-full justify-between ">
            <tbody className="p-2 justify-between">
              {list.length > 0 ? (
                list.map((item, index) => (
                  <tr key={index} className="p-2">
                    <td>
                      <Circle onClick={() => handleCircleClick(item.id)} />
                    </td>
                    <td className="p-2">{item?.name}</td>
                    <td>{item?.date}</td>
                    <td>{item?.category}</td>
                    <td>Rp. {item?.price}</td>
                    <td>
                      <PencilIcon className="w-6 cursor-pointer" onClick={() => handleUpdateList(item.id)} />
                    </td>
                    <td>
                      <TrashIcon className="w-6 cursor-pointer" onClick={() => handleDelete(item.id)} />
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6">Anda belum membuat list belanja</td>
                </tr>
              )}
            </tbody>
          </table>
          <div className="font-semibold text-2xl mt-4 text-center">Total Harga Belanja: Rp. {totalHargaBelanja}</div>
        </div>
        <div className="w-3/4 mx-32 mt-12 p-6 shadow-md border rounded-3xl relative flex flex-col gap-y-5">
          <h1 className="font-semibold text-3xl mt-2">Selesai</h1>
          <table className="w-full justify-between ">
            <tbody className="p-2 justify-between">
              {done.length > 0 ? (
                done.map((item, index) => (
                  <tr key={index} className="p-2">
                    <td>{item.id}</td>
                    <td className="p-2">{item?.name}</td>
                    <td>{item?.date}</td>
                    <td>{item?.category}</td>
                    <td>Rp. {item?.price}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6">Belum ada daftar belanja yang selesai</td>
                </tr>
              )}
            </tbody>
          </table>
          <div className="font-semibold text-2xl mt-4 text-center">Total : Rp. {totalSelesai}</div>
        </div>
        {/* <div>
          <Chart />
        </div> */}
        <div className="mt-20 mb-10">
          <Chat />
        </div>
        <Footer />
      </Layout>
    </section>
  );
};

export default List;
