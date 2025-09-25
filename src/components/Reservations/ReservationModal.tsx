import React, { useState } from 'react';
import { X, Users, MapPin, Search } from 'lucide-react';
import type { Room, User, Reservation } from '@/types';
import UserSelector from './UserSelector';
import TimeSlotPicker from './TimeSlotPicker';
import Alert from '../common/Alert';

interface ReservationModalProps {
  room: Room | null;
  onClose: () => void;
  onConfirm: (reservation: {
    roomId: string;
    date: string;
    startTime: string;
    endTime: string;
    purpose: string;
    attendees: User[];
  }) => void;
  users: User[];
  reservations: Reservation[];
  selectedDate: string;
  selectedDateRange?: { start: string; end: string };
}

const ReservationModal: React.FC<ReservationModalProps> = ({ room, onClose, onConfirm, users, reservations, selectedDate, selectedDateRange }) => {
  const [purpose, setPurpose] = useState('');
  const [selectedAttendees, setSelectedAttendees] = useState<User[]>([]);
  const [selectedTimeRange, setSelectedTimeRange] = useState<{ start: string | null; end: string | null }>({ start: null, end: null });
  const [alert, setAlert] = useState<{ message: string; type: 'success' | 'error' | 'info' | 'warning' } | null>(null);

  // Recorrência
  const [recurring, setRecurring] = useState<'none' | 'daily' | 'weekly' | 'monthly'>('none');
  const [recurringUntil, setRecurringUntil] = useState<string>('');

  // Busca de pessoas
  const [userSearch, setUserSearch] = useState('');
  const filteredUsers = users.filter(u => u.name.toLowerCase().includes(userSearch.toLowerCase()));

  if (!room) return null;

  const handleToggleAttendee = (user: User) => {
    setSelectedAttendees(prev => {
      if (prev.find(u => u.id === user.id)) {
        return prev.filter(u => u.id !== user.id);
      } else {
        return [...prev, user];
      }
    });
  };

  const generateRecurringDates = (startIso: string, untilIso: string, mode: 'daily' | 'weekly' | 'monthly') => {
    const dates: string[] = [];
    const start = new Date(`${startIso}T00:00:00`);
    const until = new Date(`${untilIso}T00:00:00`);

    const cursor = new Date(start);
    while (cursor <= until) {
      dates.push(cursor.toISOString().split('T')[0]);
      if (mode === 'daily') {
        cursor.setDate(cursor.getDate() + 1);
      } else if (mode === 'weekly') {
        cursor.setDate(cursor.getDate() + 7);
      } else if (mode === 'monthly') {
        const d = cursor.getDate();
        cursor.setMonth(cursor.getMonth() + 1);
        // Ajusta para o final do mês se o dia não existir (ex.: 31)
        if (cursor.getDate() < d) {
          cursor.setDate(0);
        }
      }
    }
    return dates;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedTimeRange.start || !selectedTimeRange.end || selectedTimeRange.start === selectedTimeRange.end) {
      setAlert({ message: 'Por favor, selecione um horário de início e fim diferentes.', type: 'warning' });
      return;
    }

    // Se houver um intervalo de datas selecionado, cria reservas para cada dia
    if (selectedDateRange && selectedDateRange.start && selectedDateRange.end) {
      const start = new Date(`${selectedDateRange.start}T00:00:00`);
      const end = new Date(`${selectedDateRange.end}T00:00:00`);
      for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
        const dateStr = d.toISOString().split('T')[0];
        onConfirm({
          roomId: room.id,
          date: dateStr,
          startTime: selectedTimeRange.start,
          endTime: selectedTimeRange.end,
          purpose,
          attendees: selectedAttendees,
        });
      }
    } else if (recurring !== 'none') {
      if (!recurringUntil) {
        setAlert({ message: 'Selecione a data final da recorrência.', type: 'warning' });
        return;
      }
      const dates = generateRecurringDates(selectedDate, recurringUntil, recurring);
      dates.forEach(dateStr => {
        onConfirm({
          roomId: room.id,
          date: dateStr,
          startTime: selectedTimeRange.start as string,
          endTime: selectedTimeRange.end as string,
          purpose,
          attendees: selectedAttendees,
        });
      });
    } else {
      onConfirm({
        roomId: room.id,
        date: selectedDate,
        startTime: selectedTimeRange.start,
        endTime: selectedTimeRange.end,
        purpose,
        attendees: selectedAttendees,
      });
    }

    setAlert({ message: 'Reserva confirmada com sucesso!', type: 'success' });

    setTimeout(() => {
      onClose();
    }, 2000);
  };

  return (
    <div className="fixed inset-0 bg-black/90 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-gray-900">Confirmar Reserva</h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {alert && (
            <div className="mb-4">
              <Alert
                message={alert.message}
                type={alert.type}
                onClose={() => setAlert(null)}
              />
            </div>
          )}
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <img
                src={room.image}
                alt={room.name}
                className="w-full h-40 object-cover rounded-lg mb-3"
              />
              <h3 className="font-semibold text-gray-900 text-lg">{room.name}</h3>
              <div className="flex items-center text-gray-500 text-sm mt-1">
                <MapPin className="w-4 h-4 mr-1" />
                {room.location}
              </div>
              <div className="flex items-center text-gray-500 text-sm mt-1">
                <Users className="w-4 h-4 mr-1" />
                Capacidade: {room.capacity} pessoas
              </div>
            </div>
            <div>
              <TimeSlotPicker
                room={room}
                selectedDate={selectedDate}
                reservations={reservations}
                selectedTimeRange={selectedTimeRange}
                onSelectTimeRange={setSelectedTimeRange}
              />
            </div>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            {selectedDateRange && (
              <div className="p-3 rounded-lg bg-primary-50 text-primary-800 text-sm">
                Reservando de <strong>{new Date(`${selectedDateRange.start}T00:00:00`).toLocaleDateString('pt-BR')}</strong>
                {' '}até{' '}
                <strong>{new Date(`${selectedDateRange.end}T00:00:00`).toLocaleDateString('pt-BR')}</strong>
              </div>
            )}

            {/* Recorrência */}
            {!selectedDateRange && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Recorrência</label>
                  <select
                    value={recurring}
                    onChange={(e) => setRecurring(e.target.value as 'none' | 'daily' | 'weekly' | 'monthly')}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  >
                    <option value="none">Nenhuma</option>
                    <option value="daily">Diária</option>
                    <option value="weekly">Semanal</option>
                    <option value="monthly">Mensal</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Até a data</label>
                  <input
                    type="date"
                    value={recurringUntil}
                    onChange={(e) => setRecurringUntil(e.target.value)}
                    disabled={recurring === 'none'}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 disabled:bg-gray-100 disabled:text-gray-500"
                  />
                </div>
              </div>
            )}

            {/* Busca de pessoas */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Buscar pessoas</label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                <input
                  type="text"
                  value={userSearch}
                  onChange={(e) => setUserSearch(e.target.value)}
                  placeholder="Digite um nome para buscar..."
                  className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                />
              </div>
            </div>

            <UserSelector 
              users={filteredUsers}
              selectedAttendees={selectedAttendees}
              onToggleAttendee={handleToggleAttendee}
            />
            
            <div className="flex space-x-3 pt-4">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 py-3 px-4 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors duration-200 hover:scale-101"
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="flex-1 py-3 px-4 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors duration-200 hover:scale-101"
              >
                Confirmar Reserva
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ReservationModal;