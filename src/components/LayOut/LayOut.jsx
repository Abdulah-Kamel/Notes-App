import React from "react";
import NavBar from "../NavBar/NavBar";
import { Outlet } from "react-router-dom";
import Home from "../Home/Home";
const LayOut = () => {
  return (
    <section className="flex justify-center items-center flex-col">
      <NavBar />
      <Home />
      <Outlet />
    </section>
  );
};

export default LayOut;
