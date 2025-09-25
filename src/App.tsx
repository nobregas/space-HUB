import { useState, useEffect } from "react";
import "./App.css";
import Sidebar from "@/components/Layout/SideBar";
import AppLayout from "@/components/Layout/AppLayout";
import Dashboard from "./pages/Dashboard";
import CheckIn from "./pages/Checkin";
import Events from "./pages/Events";
import Reports from "./pages/Reports";
import Reservations from "./pages/Reservations";
import Users from "./pages/Users";
import type { Reservation } from "@/types";
import { mockReservations } from "@/data/mockdata";
import Alert from "@/components/common/Alert";
import { Routes, Route } from "react-router-dom";

function App() {
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

  // controle da sidebar responsiva movido para AppLayout

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

  return (
    <AppLayout>
      {alert && (
        <div className="fixed top-5 right-5 z-50">
          <Alert
            message={alert.message}
            type={alert.type}
            onClose={() => setAlert(null)}
          />
        </div>
      )}
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/checkin" element={<CheckIn reservations={reservations} />} />
        <Route
          path="/reservations"
          element={
            <Reservations
              reservations={reservations}
              onConfirmReservation={handleReservation}
              onCancelReservation={handleCancelReservation}
            />
          }
        />
        <Route path="/users" element={<Users />} />
        <Route path="/events" element={<Events />} />
        <Route path="/reports" element={<Reports />} />
      </Routes>
    </AppLayout>
  );
}

export default App;
