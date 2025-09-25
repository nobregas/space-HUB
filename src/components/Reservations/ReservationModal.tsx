import React, { useState } from 'react';
import { X, Users, MapPin } from 'lucide-react';
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
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Finalidade da Reunião
              </label>
              <textarea
                value={purpose}
                onChange={(e) => setPurpose(e.target.value)}
                placeholder="Descreva brevemente o propósito da reunião..."
                rows={3}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 resize-none"
                required
              />
            </div>

            <UserSelector 
              users={users}
              selectedAttendees={selectedAttendees}
              onToggleAttendee={handleToggleAttendee}
            />
            
            <div className="flex space-x-3 pt-4">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 py-3 px-4 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors duration-200"
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="flex-1 py-3 px-4 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors duration-200"
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