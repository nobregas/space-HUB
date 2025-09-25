
import React, { useState } from 'react';
import type { Reservation } from '@/types';
import { Calendar, Clock, Trash2, User2 } from 'lucide-react';
import ConfirmationModal from '../common/ConfirmationModal';

interface AllReservationsProps {
  reservations: Reservation[];
  onCancelReservation: (reservationId: string) => void;
}

const AllReservations: React.FC<AllReservationsProps> = ({ reservations, onCancelReservation }) => {
  // No longer filtering for upcoming reservations, show all
  const allReservations = reservations;

  const [confirmOpen, setConfirmOpen] = useState(false);
  const [pendingCancelId, setPendingCancelId] = useState<string | null>(null);

  const requestCancel = (reservationId: string) => {
    setPendingCancelId(reservationId);
    setConfirmOpen(true);
  };

  const handleConfirm = () => {
    if (pendingCancelId) {
      onCancelReservation(pendingCancelId);
    }
    setConfirmOpen(false);
    setPendingCancelId(null);
  };

  const handleClose = () => {
    setConfirmOpen(false);
    setPendingCancelId(null);
  };

  return (
    <div className="mt-12">
      <h2 className="text-xl font-bold text-gray-900 mb-4">Todas as Reservas</h2>
      {allReservations.length > 0 ? (
        <ul className="space-y-4">
          {allReservations.map(reservation => (
            <li key={reservation.id} className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 flex items-center justify-between">
              <div>
                <p className="font-semibold text-gray-800">{reservation.roomName}</p>
                <div className="flex items-center text-sm text-gray-500 mt-1">
                  <User2 className="w-4 h-4 mr-2" />
                  <span>{reservation.userName}</span>
                  <Calendar className="w-4 h-4 ml-4 mr-2" />
                  <span>{new Date(reservation.date).toLocaleDateString('pt-BR')}</span>
                  <Clock className="w-4 h-4 ml-4 mr-2" />
                  <span>{reservation.startTime} - {reservation.endTime}</span>
                </div>
              </div>
              <button
                onClick={() => requestCancel(reservation.id)}
                className="text-red-500 hover:text-red-700 transition-colors"
                aria-label="Cancelar reserva"
              >
                <Trash2 className="w-5 h-5" />
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <div className="text-center py-8 px-4 bg-gray-50 rounded-lg">
          <p className="text-gray-600">Nenhuma reserva encontrada.</p>
        </div>
      )}
      <ConfirmationModal
        isOpen={confirmOpen}
        onClose={handleClose}
        onConfirm={handleConfirm}
        title="Cancelar reserva"
        message="Tem certeza que deseja cancelar esta reserva? Esta ação não pode ser desfeita."
        confirmButtonColor="bg-red-600 hover:bg-red-700"
      />
    </div>
  );
};

export default AllReservations;