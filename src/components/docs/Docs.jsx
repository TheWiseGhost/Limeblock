"use client";

import React from "react";
import Sidebar from "./Sidebar";
import HowToExport from "./HowToExport";
import GettingStarted from "./GettingStarted";

const Docs = ({ page }) => {
  return (
    <div className="flex flex-row min-h-screen">
      {/* Sidebar */}
      <Sidebar active={page} />
      {/* Main Content */}
      {page == "export" ? <HowToExport /> : <></>}
      {page == "getting_started" ? <GettingStarted /> : <></>}
    </div>
  );
};

export default Docs;
