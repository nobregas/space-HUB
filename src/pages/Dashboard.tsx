import FloorPlan from "@/components/Dashboard/FloorPlan";
import OccupancyChart from "@/components/Dashboard/OccupancyChart";
import StatsCard from "@/components/Dashboard/StatsCard";
import { mockUsers, mockRooms, mockOccupancyData } from "@/data/mockdata";
import { Users, CheckCircle, Calendar, Clock } from "lucide-react";
import React from "react";

const Dashboard: React.FC = () => {
  const checkedInUsers = mockUsers.filter((user) => user.isCheckedIn).length;
  const availableRooms = mockRooms.filter((room) => room.isAvailable).length;

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600 mt-1">
            Visão geral do espaço em tempo real
          </p>
        </div>
        <div className="text-sm text-gray-500">
          Última atualização: {new Date().toLocaleTimeString("pt-BR")}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          title="Pessoas Presentes"
          value={checkedInUsers}
          subtitle={`de ${mockUsers.length} membros`}
          icon={Users}
          color="blue"
        />

        <StatsCard
          title="Ocupação"
          value={`${Math.round(
            (mockOccupancyData.currentOccupancy /
              mockOccupancyData.totalCapacity) *
              100
          )}%`}
          subtitle={`${mockOccupancyData.currentOccupancy}/${mockOccupancyData.totalCapacity} lugares`}
          icon={CheckCircle}
          color="green"
        />

        <StatsCard
          title="Salas Disponíveis"
          value={availableRooms}
          subtitle={`de ${mockRooms.length} salas`}
          icon={Calendar}
          color="orange"
        />

        <StatsCard
          title="Horário de Pico"
          value="15:00"
          subtitle="82 pessoas presentes"
          icon={Clock}
          color="purple"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <OccupancyChart data={mockOccupancyData} />
        <FloorPlan rooms={mockRooms} />
      </div>
    </div>
  );
};

export default Dashboard;
