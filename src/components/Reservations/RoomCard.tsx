import React from 'react';
import { Users, MapPin, Monitor, Tv, Webcam, Phone } from 'lucide-react';
import type { Room } from '@/types';

interface RoomCardProps {
  room: Room;
  onSelect: (room: Room) => void;
}

const RoomCard: React.FC<RoomCardProps> = ({ room, onSelect }) => {
  const getEquipmentIcon = (equipment: string) => {
    if (equipment.includes('TV')) return <Tv className="w-4 h-4" />;
    if (equipment.includes('Monitor')) return <Monitor className="w-4 h-4" />;
    if (equipment.includes('Webcam')) return <Webcam className="w-4 h-4" />;
    if (equipment.includes('Telefone')) return <Phone className="w-4 h-4" />;
    return <Monitor className="w-4 h-4" />;
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow duration-200">
      <div className="aspect-video relative overflow-hidden">
        <img
          src={room.image}
          alt={room.name}
          className="w-full h-full object-cover"
        />
      </div>
      
      <div className="p-4">
        <div className="flex items-start justify-between mb-3">
          <div>
            <h3 className="font-semibold text-gray-900 text-lg">{room.name}</h3>
            <div className="flex items-center text-gray-500 text-sm mt-1">
              <MapPin className="w-4 h-4 mr-1" />
              {room.location}
            </div>
          </div>
        </div>
        
        <div className="flex items-center text-gray-600 text-sm mb-3">
          <Users className="w-4 h-4 mr-2" />
          <span>Até {room.capacity} pessoas</span>
        </div>
        
        <div className="space-y-2 mb-4">
          <h4 className="text-sm font-medium text-gray-700">Equipamentos:</h4>
          <div className="flex flex-wrap gap-2">
            {room.equipment.map((item, index) => (
              <div key={index} className="flex items-center space-x-1 text-xs bg-gray-100 px-2 py-1 rounded-full">
                {getEquipmentIcon(item)}
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>
        
        <button
          onClick={() => onSelect(room)}
          className="w-full py-2 px-4 rounded-lg font-medium transition-colors duration-200 bg-blue-600 text-white hover:bg-blue-700"
        >
          Reservar Sala
        </button>
      </div>
    </div>
  );
};

export default RoomCard;