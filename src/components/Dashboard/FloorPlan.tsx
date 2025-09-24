import type { Room } from "@/types";
import React from "react";

interface FloorPlanProps {
  rooms: Room[];
}

const FloorPlan: React.FC<FloorPlanProps> = ({ rooms }) => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">
        Planta do Espaço
      </h3>

      <div className="relative bg-gray-50 rounded-lg p-8 min-h-[400px]">
        {/* Área Comum */}
        <div className="absolute top-4 left-4 right-4 h-16 bg-blue-100 rounded-lg flex items-center justify-center border-2 border-dashed border-blue-300">
          <span className="text-blue-700 font-medium">
            Área Comum - Recepção
          </span>
        </div>

        {/* 1º Andar */}
        <div className="absolute top-24 left-4 right-1/2 bottom-1/2 mr-2">
          <div className="bg-gray-100 rounded-lg p-4 h-full">
            <h4 className="text-sm font-medium text-gray-700 mb-2">1º Andar</h4>
            <div className="grid grid-cols-1 gap-2 h-full">
              {rooms
                .filter((room) => room.location.includes("1º"))
                .map((room) => (
                  <div
                    key={room.id}
                    className={`p-3 rounded-lg border-2 transition-all duration-200 hover:scale-105 cursor-pointer ${
                      room.isAvailable
                        ? "bg-green-50 border-green-200 hover:bg-green-100"
                        : "bg-red-50 border-red-200 hover:bg-red-100"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <h5 className="text-sm font-medium text-gray-900">
                          {room.name}
                        </h5>
                        <p className="text-xs text-gray-500">
                          Cap: {room.capacity} pessoas
                        </p>
                      </div>
                      <div
                        className={`w-3 h-3 rounded-full ${
                          room.isAvailable ? "bg-green-400" : "bg-red-400"
                        }`}
                      />
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>

        {/* 2º Andar */}
        <div className="absolute top-24 right-4 left-1/2 bottom-1/2 ml-2">
          <div className="bg-gray-100 rounded-lg p-4 h-full">
            <h4 className="text-sm font-medium text-gray-700 mb-2">2º Andar</h4>
            <div className="grid grid-cols-1 gap-2 h-full">
              {rooms
                .filter((room) => room.location.includes("2º"))
                .map((room) => (
                  <div
                    key={room.id}
                    className={`p-3 rounded-lg border-2 transition-all duration-200 hover:scale-105 cursor-pointer ${
                      room.isAvailable
                        ? "bg-green-50 border-green-200 hover:bg-green-100"
                        : "bg-red-50 border-red-200 hover:bg-red-100"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <h5 className="text-sm font-medium text-gray-900">
                          {room.name}
                        </h5>
                        <p className="text-xs text-gray-500">
                          Cap: {room.capacity} pessoas
                        </p>
                      </div>
                      <div
                        className={`w-3 h-3 rounded-full ${
                          room.isAvailable ? "bg-green-400" : "bg-red-400"
                        }`}
                      />
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>

        {/* Área de Descanso */}
        <div className="absolute bottom-4 left-4 right-4 h-16 bg-purple-100 rounded-lg flex items-center justify-center border-2 border-dashed border-purple-300">
          <span className="text-purple-700 font-medium">
            Área de Descanso - Coffee & Networking
          </span>
        </div>
      </div>

      <div className="mt-4 flex items-center justify-center space-x-6 text-sm">
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-green-400 rounded-full"></div>
          <span>Disponível</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-red-400 rounded-full"></div>
          <span>Ocupado</span>
        </div>
      </div>
    </div>
  );
};

export default FloorPlan;
