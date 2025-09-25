
import React from 'react';
import { Users, MapPin, Monitor, Tv, Webcam, Phone, AlertTriangle, CheckCircle2, Wrench } from 'lucide-react';
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

  const statusConfig: Record<string, { color: string; bg: string; text: string; icon: React.ReactNode }> = {
    available: {
      color: 'text-green-700',
      bg: 'bg-green-50 border-green-200',
      text: 'Disponível',
      icon: <CheckCircle2 className="w-3.5 h-3.5" />,
    },
    occupied: {
      color: 'text-red-700',
      bg: 'bg-red-50 border-red-200',
      text: 'Ocupado',
      icon: <AlertTriangle className="w-3.5 h-3.5" />,
    },
    maintenance: {
      color: 'text-amber-700',
      bg: 'bg-amber-50 border-amber-200',
      text: 'Manutenção',
      icon: <Wrench className="w-3.5 h-3.5" />,
    },
  };

  const currentStatus = room.status ?? (room.isAvailable ? 'available' : 'occupied');
  const status = statusConfig[currentStatus];

  return (
    <div className="relative bg-white rounded-xl shadow-sm border hover:scale-101 border-gray-100 overflow-hidden hover:shadow-md transition-shadow duration-200">
      {/* Status badge no canto superior esquerdo do card */}
      <div className={`absolute top-2 right-2 inline-flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-full border ${status.bg} ${status.color} z-10`}> 
        {status.icon}
        <span>{status.text}</span>
      </div>

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
          {room.pricePerHour !== undefined && (
            <div className="text-right">
              <div className="text-sm text-gray-500">Preço/hora</div>
              <div className="text-base font-semibold text-gray-900">R$ {room.pricePerHour.toFixed(2)}</div>
            </div>
          )}
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
          disabled={currentStatus !== 'available'}
          className={[
            'w-full py-2 px-4 rounded-lg font-medium transition-colors duration-200 hover:scale-101',
            currentStatus === 'available'
              ? 'bg-blue-600 text-white hover:bg-blue-700'
              : 'bg-gray-200 text-gray-500 cursor-not-allowed'
          ].join(' ')}
        >
          {currentStatus === 'available' ? 'Reservar Sala' : currentStatus === 'maintenance' ? 'Indisponível' : 'Ocupada'}
        </button>
      </div>
    </div>
  );
};

export default RoomCard;
