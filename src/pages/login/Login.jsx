import React from "react";
import { useNavigate } from "react-router-dom";
import { useFormik, validateYupSchema } from "formik";
import * as yup from "yup";
import Cookies from "js-cookie";
import { useDispatch } from "react-redux";
import { setUser } from "../../features/authSLice";

import Input from "../../components/Input";
import Button from "../../components/Button";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const shape = {
    username: yup.string().required("Username belum di isi"),
    password: yup.string().required("Password belum di isi"),
  };

  const userCredentials = yup.object().shape(shape);

  const formik = useFormik({
    initialValues: {
      username: "Imah",
      password: "Imah123",
    },

    validationSchema: userCredentials,
    onSubmit: (values) => {
      Cookies.set("username", values.username, { path: "/" });
      const user = (username, password);
      dispatch(setUser(user));
      navigate("/");
    },
  });
  return (
    <section className="w-screen h-screen">
      <div className="flex flex-wrap justify-between items-center bg-[#EEF5FB] w-full h-full px-40">
        <img src="../../src/assets/illustrasi.png" alt="" width={500} />
        <div className="p-14 bg-white  rounded-lg flex flex-col">
          <div className="text-center flex flex-col gap-y-2">
            <h1 className="font-semibold text-4xl ">Welcome Back</h1>
            <p>Please enter your details</p>
          </div>
          <form className="w-80 grid grid-cols-1 gap-y-5" onSubmit={formik.handleSubmit}>
            <Input id="username" label="Username" name="username" type="text" placeholder="Type your username..." value={formik.values.username} error={formik.errors.username} onChange={formik.handleChange} />
            <Input id="password" label="Password" name="password" type="password" placeholder="Type your password..." value={formik.values.password} error={formik.errors.password} onChange={formik.handleChange} />
            <div>
              <Button id="submit" type="submit" label="Login" />
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Login;
