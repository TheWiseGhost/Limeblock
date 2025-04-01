import React from "react";
import Sidebar from "./Sidebar";
import HowToExport from "./HowToExport";
import GettingStarted from "./GettingStarted";
import FrontendDocs from "./FrontendDocs";
import BackendDocs from "./BackendDocs";
import ManagingPlans from "./ManagingPlans";
import VoteForNewFramework from "./VoteForNewFramework";

const Docs = ({ page }) => {
  return (
    <div className="flex flex-row min-h-screen">
      {/* Sidebar (Sticky) */}
      <div className="hidden md:flex w-fit h-screen sticky top-0 overflow-y-auto">
        <Sidebar active={page} />
      </div>

      {/* Main Content (Scrollable) */}
      <div className="flex-1 overflow-y-auto h-screen">
        {page === "export" && <HowToExport />}
        {page === "getting_started" && <GettingStarted />}
        {page === "frontend" && <FrontendDocs />}
        {page == "backend" && <BackendDocs />}
        {page == "managing_plans" && <ManagingPlans />}
        {page == "vote" && <VoteForNewFramework />}
      </div>
    </div>
  );
};

export default Docs;
