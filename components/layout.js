import React from "react"
import Head from "next/head";
import Navbar from "./Navbar/Navbar";

export default function Layout({ children }) {
    return (
      <React.Fragment>
        {children}
      </React.Fragment>
    );
  }