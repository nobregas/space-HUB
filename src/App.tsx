import { useState, useEffect } from "react";
import "./App.css";
import AppLayout from "@/components/Layout/AppLayout";
import type { Reservation } from "@/types";
import { mockReservations } from "@/data/mockdata";
import Alert from "@/components/common/Alert";
import { Routes, Route } from "react-router-dom";
import Login from "./pages/(auth)/Login";
import AppRoutes from "./routes";

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
    <>
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
        <Route path="/login" element={<Login />} />
        <Route
          path="/*"
          element={
            <AppLayout>
              <AppRoutes
                reservations={reservations}
                handleReservation={handleReservation}
                handleCancelReservation={handleCancelReservation}
              />
            </AppLayout>
          }
        />
      </Routes>
    </>
  );
}

export default App;
