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
    <section className="">
      <Navbar username={username} />

      {/* Header */}
      <div className="flex flex-wrap flex-row-reverse justify-center items-center px-24 h-screen">
        <div className="grid grid-col gap-y-5 w-1/2">
          <h1 className="font-bold text-5xl text-[#0E0E44]">We Help You Make Wise Shopping Decisions.</h1>
          <p className="text-[#999]">"Spend your money wisely, only buy what you need, and save the rest for greater rewards."</p>
          <div>
            <Button id="btn-start" label="Let's kickstart the list" onClick={() => navigate("/shopwise/list")} />
          </div>
        </div>
        <div className="w-1/2 ">
          <img src="https://storyset.com/illustration/mobile-note-list/cuate#3362CCFF&hide=&hide=complete" width={500} />
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
