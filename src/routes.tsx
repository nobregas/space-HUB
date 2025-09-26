import { Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import CheckIn from "./pages/Checkin";
import Events from "./pages/Events";
import Reports from "./pages/Reports";
import Reservations from "./pages/Reservations";
import Users from "./pages/Users";
import Settings from "./pages/Settings";
import type { Reservation } from "@/types";

interface AppRoutesProps {
  reservations: Reservation[];
  handleReservation: (reservation: Omit<Reservation, 'id' | 'status' | 'roomName' | 'userId' | 'userName'>, roomName: string) => void;
  handleCancelReservation: (reservationId: string) => void;
}

const AppRoutes = ({ reservations, handleReservation, handleCancelReservation }: AppRoutesProps) => (
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
    <Route path="/settings" element={<Settings />} />
  </Routes>
);

export default AppRoutes;
