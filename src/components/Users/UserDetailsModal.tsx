import type { User } from '@/types';
import React from 'react';

interface UserDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: User | null;
}

const UserDetailsModal: React.FC<UserDetailsModalProps> = ({ isOpen, onClose, user }) => {
  if (!isOpen || !user) return null;

  return (
    <div className="fixed inset-0 bg-black/90 bg-opacity-50 overflow-y-auto h-full w-full flex justify-center items-center">
      <div className="bg-white p-8 rounded-lg shadow-xl max-w-md w-full">
        <h2 className="text-2xl font-bold mb-4">Detalhes do Usuário</h2>
        <div className="flex items-center mb-4">
          <img src={user.avatar} alt={user.name} className="w-16 h-16 rounded-full mr-4" />
          <div>
            <p className="text-xl font-semibold">{user.name}</p>
            <p className="text-gray-600">{user.email}</p>
          </div>
        </div>
        <div className="mb-4">
          <p className="text-gray-700"><strong>Empresa:</strong> {user.company || 'N/A'}</p>
          <p className="text-gray-700"><strong>Cargo:</strong> {user.role}</p>
          <p className="text-gray-700"><strong>Status:</strong> {user.isActive ? 'Ativo' : 'Inativo'}</p>
          <p className="text-gray-700"><strong>Atualmente Check-in:</strong> {user.isCheckedIn ? 'Sim' : 'Não'}</p>
          {user.isCheckedIn && user.checkInTime && (
            <p className="text-gray-700"><strong>Hora do Check-in:</strong> {user.checkInTime}</p>
          )}
        </div>

        <h3 className="text-xl font-bold mb-2">Histórico de Check-ins</h3>
        <ul className="list-disc list-inside mb-4 text-gray-700">
          <li>2025-09-20: Check-in no Innovation Hub (09:00 - 17:00)</li>
          <li>2025-09-18: Check-in no Creative Space (10:00 - 12:00)</li>
          <li>2025-09-15: Check-in no Focus Room (13:00 - 16:00)</li>
        </ul>

        <div className="flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="bg-gray-300 hover:bg-gray-400 text-black font-bold py-2 px-4 rounded cursor-pointer"
          >
            Fechar
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserDetailsModal;
