import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Cookies from "js-cookie";

import Layout from "../../components/Layout";
import Button from "../../components/Button";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

const Home = () => {
  const navigate = useNavigate();
  const username = Cookies.get("username");

  console.log(username);

  return (
    <section className=":w-screen h-fit">
      <Navbar username={username} />

      {/* Header */}
      <div className="sm:px-8 md:h-screen h-fit w-full flex flex-row-reverse md:justify-between md:px-24 items-center">
        <div className="sm:w-full md:w-1/2 grid grid-col gap-y-5 ">
          <h1 className="font-bold text-5xl text-[#0E0E44] sm:mt-32">We Help You Make Wise Shopping Decisions.</h1>
          <p className="text-[#999]">"Spend your money wisely, only buy what you need, and save the rest for greater rewards."</p>
          <div>
            <Button id="btn-start" label="Let's kickstart the list" onClick={() => navigate("/shopwise/list")} />
          </div>
        </div>
        <div className="md:w-1/2 sm:w-full">
          <img src="./src/assets/Header.png" className=" md:w-[500px]" />
        </div>
      </div>

      {/* Footer */}
      <div>
        <Footer />
      </div>
    </section>
  );
};

export default Home;
