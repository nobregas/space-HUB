import React, { useMemo, useState, useEffect } from "react";
import {
  UserPlus,
  CheckCircle,
  Clock,
  XCircle,
} from "lucide-react";
import type { CheckinEntry, CheckinStatus, Room, Reservation } from "@/types";
import { mockUsers, mockRooms } from "@/data/mockdata";
import CheckinFilters from "./CheckinFilters";
import CheckinList from "./CheckinList";
import ManualCheckinModal from "./ManualCheckinModal";
import SpaceCard from "./SpaceCard";

interface CheckinDashboardProps {
  reservations: Reservation[];
}

const CheckinDashboard: React.FC<CheckinDashboardProps> = ({ reservations }) => {
  const generateCheckinData = (reservations: Reservation[]): CheckinEntry[] => {
    const today = new Date().toISOString().split("T")[0];
    const checkinEntries: CheckinEntry[] = [];

    reservations.forEach((reservation) => {
      reservation.attendees.forEach(attendee => {
        checkinEntries.push({
          id: `checkin-${reservation.id}-${attendee.id}`,
          user: attendee,
          space: reservation.roomName,
          startTime: `${today}T${reservation.startTime}:00`,
          endTime: `${today}T${reservation.endTime}:00`,
          status: "waiting",
          attendees: reservation.attendees,
        });
      })
    });

    const usersWithReservations = new Set(reservations.flatMap((r) => r.attendees.map(a => a.id)));
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

  const [checkinEntries, setCheckinEntries] = useState<CheckinEntry[]>([]);

  useEffect(() => {
    setCheckinEntries(generateCheckinData(reservations));
  }, [reservations]);

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

  const [filter, setFilter] = useState<"all" | CheckinStatus>("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedSpace, setSelectedSpace] = useState<string>("all");

  const handleCheckIn = (id: string) => {
    const entry = checkinEntries.find((e) => e.id === id);
    if (entry && entry.attendees && !entry.attendees.some(attendee => attendee.id === entry.user.id)) {
      alert(`Usuário ${entry.user.name} não autorizado para este espaço.`);
      return;
    }

    setCheckinEntries((prev) =>
      prev.map((r) => (r.id === id ? { ...r, status: "checked-in" } : r))
    );
  };

  const handleCheckOut = (id: string) => {
    setCheckinEntries((prev) =>
      prev.map((r) => (r.id === id ? { ...r, status: "checked-out" } : r))
    );
  };

  const handleManualCheckin = (
    userId: string,
    spaceId: string,
    quantity: number
  ) => {
    const user = mockUsers.find((u) => u.id === userId);
    const space =
      spaceId === "daily-pass"
        ? { id: "daily-pass", name: "Passe Diário", capacity: Infinity }
        : mockRooms.find((r) => r.id === spaceId);

    if (user && space) {
      const checkedInCount = checkinEntries.filter(
        (entry) => entry.space === space.name && entry.status === "checked-in"
      ).length;

      if (checkedInCount + quantity > space.capacity) {
        alert(
          `O espaço "${space.name}" não tem capacidade para ${quantity} pessoa(s).`
        );
        return;
      }

      const today = new Date().toISOString().split("T")[0];
      const newCheckinEntries: CheckinEntry[] = [];

      for (let i = 0; i < quantity; i++) {
        const newUser = {
          ...user,
          id: `${user.id}-${i}`,
          name: quantity > 1 ? `${user.name} (${i + 1})` : user.name,
        };

        newCheckinEntries.push({
          id: `manual-checkin-${Date.now()}-${i}`,
          user: newUser,
          space: space.name,
          startTime: `${today}T${new Date().toLocaleTimeString("pt-BR", {
            hour: "2-digit",
            minute: "2-digit",
          })}:00`,
          endTime: `${today}T18:00:00`, // Default end time
          status: "checked-in",
        });
      }

      setCheckinEntries((prev) => [...newCheckinEntries, ...prev]);
    }
  };

  const spaces: (Room & { occupancy: number })[] = useMemo(() => {
    const occupancyMap = checkinEntries
      .filter((entry) => entry.status === "checked-in")
      .reduce((acc, entry) => {
        acc[entry.space] = (acc[entry.space] || 0) + 1;
        return acc;
      }, {} as Record<string, number>);

    return mockRooms.map((room) => ({
      ...room,
      occupancy: occupancyMap[room.name] || 0,
    }));
  }, [checkinEntries]);

  const totalOccupancy = useMemo(() => {
    return spaces.reduce((acc, space) => acc + space.occupancy, 0);
  }, [spaces]);

  const filteredEntries = useMemo(() => {
    return checkinEntries
      .filter((entry) => {
        if (selectedSpace === "all") return true;
        return entry.space === selectedSpace;
      })
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
  }, [checkinEntries, filter, searchTerm, selectedSpace]);

  return (
    <div className="p-6 bg-gray-50 min-h-full">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">
            Gerenciamento de Check-in
          </h1>
          <p className="text-gray-500">
            Visualize e gerencie as entradas e saídas do dia.
          </p>
        </div>
        <div className="flex items-center justify-center gap-4">
          <div className="text-right ">
            <p className="text-lg font-bold text-gray-800">Ocupação Total</p>
            <p className="text-3xl font-bold text-blue-600">{totalOccupancy}</p>
          </div>
          <button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <UserPlus size={18} />
            <span>Check-in Manual</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-4">
            <SpaceCard
              spaceName="Todos os Espaços"
              capacity={mockRooms.reduce((acc, room) => acc + room.capacity, 0)}
              occupancy={totalOccupancy}
              isSelected={selectedSpace === "all"}
              onClick={() => setSelectedSpace("all")}
            />
            {spaces.map((space) => (
              <SpaceCard
                key={space.id}
                spaceName={space.name}
                capacity={space.capacity}
                occupancy={space.occupancy}
                isSelected={selectedSpace === space.name}
                onClick={() => setSelectedSpace(space.name)}
              />
            ))}
          </div>
        </div>

        <div className="lg:col-span-2">
          <CheckinFilters
            activeFilter={filter}
            onFilterChange={setFilter}
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
          />
          <CheckinList
            entries={filteredEntries}
            statusConfig={statusConfig}
            onCheckIn={handleCheckIn}
            onCheckOut={handleCheckOut}
          />
        </div>
      </div>

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
