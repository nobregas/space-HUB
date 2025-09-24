import { useState, useEffect } from "react";
import "./App.css";
import Sidebar from "@/components/Layout/SideBar";
import Dashboard from "./pages/Dashboard";
import CheckIn from "./pages/Checkin";
import Events from "./pages/Events";
import Reports from "./pages/Reports";
import Reservations from "./pages/Reservations";
import Users from "./pages/Users"; // Import the Users component
import type { Reservation } from "@/types";
import { mockReservations } from "@/data/mockdata";
import Alert from "@/components/common/Alert";

function App() {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [reservations, setReservations] =
    useState<Reservation[]>(mockReservations);
  const [alert, setAlert] = useState<{
    message: string;
    type: "success" | "error" | "warning" | "info";
  } | null>(null);

  useEffect(() => {
    if (alert) {
      const timer = setTimeout(() => {
        setAlert(null);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [alert]);

  const handleReservation = (
    reservation: Omit<
      Reservation,
      "id" | "status" | "roomName" | "userId" | "userName"
    >,
    roomName: string
  ) => {
    const newReservation: Reservation = {
      id: `res-${Date.now()}`,
      roomId: reservation.roomId,
      roomName: roomName,
      userId: "user-1", // Mock user ID
      userName: "Admin", // Mock user name
      date: reservation.date,
      startTime: reservation.startTime,
      endTime: reservation.endTime,
      status: "confirmed",
      purpose: reservation.purpose,
      attendees: reservation.attendees,
    };

    setReservations((prev) => [...prev, newReservation]);
    setAlert({ message: "Reserva confirmada com sucesso!", type: "success" });
  };

  const handleCancelReservation = (reservationId: string) => {
    setReservations((prev) => prev.filter((res) => res.id !== reservationId));
    setAlert({ message: "Reserva cancelada com sucesso!", type: "info" });
  };

  const renderPage = () => {
    switch (activeTab) {
      case "dashboard":
        return <Dashboard />;
      case "checkin":
        return <CheckIn reservations={reservations} />;
      case "reservations":
        return (
          <Reservations
            reservations={reservations}
            onConfirmReservation={handleReservation}
            onCancelReservation={handleCancelReservation}
          />
        );
      case "users": // New case for Users page
        return <Users />;
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
      <main className="flex-1 overflow-y-auto">
        {alert && (
          <div className="fixed top-5 right-5 z-50">
            <Alert
              message={alert.message}
              type={alert.type}
              onClose={() => setAlert(null)}
            />
          </div>
        )}
        {renderPage()}
      </main>
    </div>
  );
}

export default App;
