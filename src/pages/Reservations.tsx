import React, { useState } from 'react';
import RoomCard from '../components/Reservations/RoomCard';
import ReservationModal from '../components/Reservations/ReservationModal';
import AllReservations from '../components/Reservations/AllReservations';
import CalendarView from '../components/Reservations/CalendarView';
import { Filter, Search, ArrowLeft } from 'lucide-react';
import type { Room, Reservation, User } from '@/types';
import { mockRooms, mockUsers } from '@/data/mockdata';

interface ReservationsProps {
  reservations: Reservation[];
  onConfirmReservation: (
    reservation: Omit<Reservation, "id" | "status" | "roomName" | "userId" | "userName">,
    roomName: string
  ) => void;
  onCancelReservation: (reservationId: string) => void;
}

const Reservations: React.FC<ReservationsProps> = ({ reservations, onConfirmReservation, onCancelReservation }) => {
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [capacityFilter, setCapacityFilter] = useState('all');
  const [equipmentFilter, setEquipmentFilter] = useState('all');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedRange, setSelectedRange] = useState<{ start: Date | null; end: Date | null }>({ start: null, end: null });
  const [showCalendar, setShowCalendar] = useState(true);

  const handleDateChange = (date: Date) => {
    setSelectedDate(date);
    setSelectedRange({ start: null, end: null });
    setShowCalendar(false);
  };

  const handleRangeChange = (range: { start: Date; end: Date }) => {
    setSelectedRange(range);
    setSelectedDate(range.start);
    setShowCalendar(false);
  };

  const filteredRooms = mockRooms.filter(room => {
    const matchesSearch = room.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         room.location.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCapacity = capacityFilter === 'all' || 
                           (capacityFilter === 'small' && room.capacity <= 6) ||
                           (capacityFilter === 'medium' && room.capacity > 6 && room.capacity <= 10) ||
                           (capacityFilter === 'large' && room.capacity > 10);
    
    const matchesEquipment = equipmentFilter === 'all' ||
                           room.equipment.some(eq => eq.toLowerCase().includes(equipmentFilter.toLowerCase()));
    
    return matchesSearch && matchesCapacity && matchesEquipment;
  });

  const handleLocalConfirmReservation = (reservationData: {
    roomId: string;
    date: string;
    startTime: string;
    endTime: string;
    purpose: string;
    attendees: User[];
  }) => {
    if (!selectedRoom) return;
    onConfirmReservation(reservationData, selectedRoom.name);
  };

  return (
    <div className="p-4 sm:p-6">
      <div className="mb-4 sm:mb-6">
        <div className="flex items-center justify-between mb-3 sm:mb-4">
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-gray-900">Reservar Sala</h1>
            <p className="text-gray-600 mt-1 text-sm sm:text-base">
              {showCalendar 
                ? 'Selecione uma data no calendário para ver as salas disponíveis' 
                : selectedRange.start && selectedRange.end
                ? `Mostrando salas de ${selectedRange.start.toLocaleDateString('pt-BR')} até ${selectedRange.end.toLocaleDateString('pt-BR')}`
                : `Mostrando salas para ${selectedDate.toLocaleDateString('pt-BR')}`}
            </p>
          </div>
          {!showCalendar && (
            <button
              onClick={() => setShowCalendar(true)}
              className="flex items-center space-x-2 px-3 py-2 sm:px-4 border rounded-lg transition-colors duration-200 hover:bg-gray-50 cursor-pointer text-gray-700"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Voltar</span>
            </button>
          )}
        </div>
        
        {showCalendar ? (
          <CalendarView selectedDate={selectedDate} onDateChange={handleDateChange} onRangeChange={handleRangeChange} />
        ) : (
          <>
            <div className="flex flex-col lg:flex-row gap-3 sm:gap-4">
              <div className="relative flex-1 min-w-0">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Buscar por nome da sala ou localização..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                />
              </div>
              
              <button
                onClick={() => setShowFilters(!showFilters)}
                className={`flex items-center justify-center gap-2 px-3 sm:px-4 py-2.5 sm:py-3 border rounded-lg transition-colors duration-200 ${
                  showFilters ? 'bg-blue-50 border-blue-300 text-blue-700' : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                }`}
              >
                <Filter className="w-5 h-5" />
                <span>Filtros</span>
              </button>
            </div>
            
            {showFilters && (
              <div className="mt-4 p-4 bg-gray-50 rounded-xl border border-gray-200">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Capacidade
                    </label>
                    <select
                      value={capacityFilter}
                      onChange={(e) => setCapacityFilter(e.target.value)}
                      className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                    >
                      <option value="all">Todas</option>
                      <option value="small">Pequena (até 6 pessoas)</option>
                      <option value="medium">Média (7-10 pessoas)</option>
                      <option value="large">Grande (11+ pessoas)</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Equipamentos
                    </label>
                    <select
                      value={equipmentFilter}
                      onChange={(e) => setEquipmentFilter(e.target.value)}
                      className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                    >
                      <option value="all">Todos</option>
                      <option value="tv">TV</option>
                      <option value="projetor">Projetor</option>
                      <option value="whiteboard">Whiteboard</option>
                      <option value="video">Video Conference</option>
                    </select>
                  </div>
                  
                  <div className="flex items-end">
                    <button
                      onClick={() => {
                        setCapacityFilter('all');
                        setEquipmentFilter('all');
                        setSearchTerm('');
                      }}
                      className="px-3 sm:px-4 py-2 text-sm text-gray-600 hover:text-gray-900 transition-colors duration-200"
                    >
                      Limpar Filtros
                    </button>
                  </div>
                </div>
              </div>
            )}
          </>
        )}
      </div>
      
      {!showCalendar && (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {filteredRooms.map((room) => (
              <RoomCard
                key={room.id}
                room={room}
                onSelect={setSelectedRoom}
              />
            ))}
          </div>
          
          {filteredRooms.length === 0 && (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Nenhuma sala encontrada</h3>
              <p className="text-gray-600">Tente ajustar seus filtros de busca</p>
            </div>
          )}
        </>
      )}
      
      <ReservationModal
        room={selectedRoom}
        onClose={() => setSelectedRoom(null)}
        onConfirm={handleLocalConfirmReservation}
        users={mockUsers}
        reservations={reservations}
        selectedDate={selectedDate.toISOString().split('T')[0]}
      />

      <AllReservations 
        reservations={reservations}
        onCancelReservation={onCancelReservation}
      />
    </div>
  );
};

export default Reservations;
