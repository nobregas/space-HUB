import { useState } from "react";
import "./App.css";
import Sidebar from "@/components/Layout/SideBar";
import Dashboard from "./pages/Dashboard";
import CheckIn from "./pages/Checkin";
import Events from "./pages/Events";
import Reports from "./pages/Reports";
import Reservations from "./pages/Reservations";

function App() {
  const [activeTab, setActiveTab] = useState("dashboard");

  const renderPage = () => {
    switch (activeTab) {
      case "dashboard":
        return <Dashboard />;
      case "checkin":
        return <CheckIn />;
      case "reservations":
        return <Reservations />;
      case "events":
        return <Events />;
      case "reports":
        return <Reports />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Sidebar activeTab={activeTab} onTabChange={setActiveTab} />
      <main className="flex-1 overflow-y-auto">{renderPage()}</main>
    </div>
  );
}

export default App;
