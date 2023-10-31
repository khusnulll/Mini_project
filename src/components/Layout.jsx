import React, { Children } from "react";

const Layout = ({ children }) => {
  return <section className="w-screen flex flex-col justify-center items-center">{children}</section>;
};

export default Layout;
