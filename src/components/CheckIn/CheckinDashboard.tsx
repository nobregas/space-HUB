import React, { useMemo, useState } from "react";
import {
  UserPlus,
  CheckCircle,
  Clock,
  XCircle,
} from "lucide-react";
import type { CheckinEntry, CheckinStatus } from "@/types";
import { mockReservations, mockUsers, mockRooms } from "@/data/mockdata";
import CheckinFilters from "./CheckinFilters";
import CheckinList from "./CheckinList";
import ManualCheckinModal from "./ManualCheckinModal";

// Gerando dados de check-in a partir dos mocks existentes
const generateCheckinData = (): CheckinEntry[] => {
  const today = new Date().toISOString().split("T")[0]; // Usar a data de hoje para relevância
  const checkinEntries: CheckinEntry[] = [];

  // Adicionar usuários com reservas de sala
  mockReservations.forEach((reservation, index) => {
    const user = mockUsers.find((u) => u.id === reservation.userId);
    if (user) {
      checkinEntries.push({
        id: `checkin-${reservation.id}`,
        user: user,
        space: reservation.roomName,
        startTime: `${today}T${reservation.startTime}:00`,
        endTime: `${today}T${reservation.endTime}:00`,
        status: index % 2 === 0 ? "waiting" : "checked-in", // Alternar status para exemplo
      });
    }
  });

  // Adicionar outros usuários que podem ter passes diários (sem reserva de sala)
  const usersWithReservations = new Set(mockReservations.map((r) => r.userId));
  mockUsers.forEach((user) => {
    if (!usersWithReservations.has(user.id)) {
      checkinEntries.push({
        id: `checkin-user-${user.id}`,
        user: user,
        space: "Passe Diário",
        startTime: `${today}T09:00:00`,
        endTime: `${today}T18:00:00`,
        status: user.isCheckedIn ? "checked-in" : "checked-out",
      });
    }
  });

  return checkinEntries;
};
const mockCheckinEntries: CheckinEntry[] = generateCheckinData();

const statusConfig: Record<
  CheckinStatus,
  { text: string; icon: React.ElementType; color: string }
> = {
  waiting: {
    text: "Aguardando",
    icon: Clock,
    color: "text-yellow-600 bg-yellow-100",
  },
  "checked-in": {
    text: "Presente",
    icon: CheckCircle,
    color: "text-green-600 bg-green-100",
  },
  "checked-out": {
    text: "Finalizado",
    icon: XCircle,
    color: "text-gray-500 bg-gray-100",
  },
};

const CheckinDashboard: React.FC = () => {
  const [checkinEntries, setCheckinEntries] =
    useState<CheckinEntry[]>(mockCheckinEntries);
  const [filter, setFilter] = useState<"all" | CheckinStatus>("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  const handleCheckIn = (id: string) => {
    setCheckinEntries((prev) =>
      prev.map((r) => (r.id === id ? { ...r, status: "checked-in" } : r))
    );
  };

  const handleCheckOut = (id: string) => {
    setCheckinEntries((prev) =>
      prev.map((r) => (r.id === id ? { ...r, status: "checked-out" } : r))
    );
  };

  const handleManualCheckin = (userId: string, spaceId: string) => {
    const user = mockUsers.find((u) => u.id === userId);
    const space =
      spaceId === "daily-pass"
        ? { id: "daily-pass", name: "Passe Diário" }
        : mockRooms.find((r) => r.id === spaceId);

    if (user && space) {
      // Verifica se o espaço já está ocupado
      const isSpaceOccupied = checkinEntries.some(
        (entry) => entry.space === space.name && entry.status === "checked-in"
      );

      if (isSpaceOccupied) {
        alert(`O espaço "${space.name}" já está ocupado.`);
        return;
      }

      const today = new Date().toISOString().split("T")[0];
      const newCheckinEntry: CheckinEntry = {
        id: `manual-checkin-${Date.now()}`,
        user,
        space: space.name,
        startTime: `${today}T${new Date().toLocaleTimeString("pt-BR", {
          hour: "2-digit",
          minute: "2-digit",
        })}:00`,
        endTime: `${today}T18:00:00`, // Default end time for manual check-in
        status: "checked-in",
      };
      setCheckinEntries((prev) => [newCheckinEntry, ...prev]);
    }
  };

  const filteredEntries = useMemo(() => {
    return checkinEntries
      .filter((entry) => {
        if (filter === "all") return true;
        return entry.status === filter;
      })
      .filter((entry) => {
        const term = searchTerm.toLowerCase();
        return (
          entry.user.name.toLowerCase().includes(term) ||
          entry.user.role.toLowerCase().includes(term)
        );
      });
  }, [checkinEntries, filter, searchTerm]);

  return (
    <div className="p-6 bg-gray-50 min-h-full">
      {/* Cabeçalho */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">
            Gerenciamento de Check-in
          </h1>
          <p className="text-gray-500">
            Visualize e gerencie as entradas e saídas do dia.
          </p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <UserPlus size={18} />
          <span>Check-in Manual</span>
        </button>
      </div>

      {/* Filtros e Busca */}
      <CheckinFilters
        activeFilter={filter}
        onFilterChange={setFilter}
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
      />

      {/* Lista de Reservas */}
      <CheckinList
        entries={filteredEntries}
        statusConfig={statusConfig}
        onCheckIn={handleCheckIn}
        onCheckOut={handleCheckOut}
      />

      <ManualCheckinModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onCheckin={handleManualCheckin}
        users={mockUsers}
        rooms={mockRooms}
        checkinEntries={checkinEntries}
      />
    </div>
  );
};

export default CheckinDashboard;