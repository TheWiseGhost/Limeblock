import React from "react";
import Sidebar from "./Sidebar";
import HowToExport from "./HowToExport";
import GettingStarted from "./GettingStarted";
import FrontendDocs from "./FrontendDocs";
import BackendDocs from "./BackendDocs";
import ManagingTokens from "./ManagingTokens";
import VoteForNewFramework from "./VoteForNewFramework";
import ReportBug from "./ReportBug";
import RequestFeature from "./RequestFeature";
import HaveBot from "./HaveBot";

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
        {page == "managing_tokens" && <ManagingTokens />}
        {page == "vote" && <VoteForNewFramework />}
        {page == "report" && <ReportBug />}
        {page == "request" && <RequestFeature />}
        {page == "have_bot" && <HaveBot />}
      </div>
    </div>
  );
};

export default Docs;
