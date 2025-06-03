import { useState } from "react";
// import Header from "../components/Header";
// import Sidebar from "../components/Sidebar";
// import { Navbar } from "../components/navbar";
import DashboardGrid from "../components/DashboardGrid";
import UpdatesHistory from "../components/UpdateHistory";
import FeeChart from "../components/FeeChart";
import CombinedReport from "../components/MonthlyFeeReport";

// import SummaryCards from "../components/summary-cards";
export default function DashboardLayout({ children }) {
  const [selectedSchool, setSelectedSchool] = useState("Tech Minds School BWN");
  const [selectedLanguage, setSelectedLanguage] = useState("English");

  return (
    <div className="flex">
      {/* <Sidebar /> */}
      <div className="flex-1">
        {/* <Header />
        <Navbar /> */}
        <h1 className="text-3xl font-bold p-2 ">Admin Dashboard</h1>
        <DashboardGrid />
        {/* Updates History and Fee Chart */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8 mx-2 mt-4">
          <div className="lg:col-span-2">
            <UpdatesHistory />
          </div>
          <div>
            <FeeChart />
          </div>
        </div>

        {/* Monthly Report and Goal Completion */}
        {/* Combined Report Component */}
        <div className="mb-8 mx-2">
          <CombinedReport />
        </div>
      </div>
    </div>
  );
}
