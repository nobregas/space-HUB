
import React, { useState, useMemo } from 'react';
import { X } from 'lucide-react';
import type { User, Room, CheckinEntry } from '@/types';
import ConfirmationModal from '../common/ConfirmationModal';

interface ManualCheckinModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCheckin: (userId: string, spaceId: string, quantity: number) => void;
  users: User[];
  rooms: Room[];
  checkinEntries: CheckinEntry[];
}

const ManualCheckinModal: React.FC<ManualCheckinModalProps> = ({
  isOpen,
  onClose,
  onCheckin,
  users,
  rooms,
  checkinEntries,
}) => {
  const [selectedUser, setSelectedUser] = useState<string>('');
  const [selectedSpace, setSelectedSpace] = useState<string>('');
  const [isCompanyCheckin, setIsCompanyCheckin] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [isCancelModalOpen, setCancelModalOpen] = useState(false);

  const occupiedSpaces = useMemo(() => {
    const spaceCounts = checkinEntries
      .filter((entry) => entry.status === 'checked-in')
      .reduce((acc, entry) => {
        acc[entry.space] = (acc[entry.space] || 0) + 1;
        return acc;
      }, {} as Record<string, number>);

    const fullyOccupiedSpaces = new Set<string>();
    for (const room of rooms) {
      if (spaceCounts[room.name] >= room.capacity) {
        fullyOccupiedSpaces.add(room.name);
      }
    }
    return fullyOccupiedSpaces;
  }, [checkinEntries, rooms]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedUser && selectedSpace) {
      onCheckin(selectedUser, selectedSpace, isCompanyCheckin ? quantity : 1);
      onClose();
    }
  };

  const handleCancel = () => {
    setCancelModalOpen(true);
  };

  const handleConfirmCancel = () => {
    setCancelModalOpen(false);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 bg-black/90 bg-opacity-50 flex justify-center items-center z-50">
        <div className="bg-white rounded-lg p-8 max-w-md w-full">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800">Check-in Manual</h2>
            <button onClick={handleCancel} className="text-gray-500 hover:text-gray-700">
              <X size={24} />
            </button>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="user" className="block text-sm font-medium text-gray-700 mb-2">
                Usuário
              </label>
              <select
                id="user"
                value={selectedUser}
                onChange={(e) => setSelectedUser(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="" disabled>Selecione um usuário</option>
                {users.map((user) => (
                  <option key={user.id} value={user.id}>
                    {user.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="mb-4">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={isCompanyCheckin}
                  onChange={(e) => setIsCompanyCheckin(e.target.checked)}
                  className="mr-2"
                />
                Check-in de empresa
              </label>
            </div>
            {isCompanyCheckin && (
              <div className="mb-4">
                <label htmlFor="quantity" className="block text-sm font-medium text-gray-700 mb-2">
                  Quantidade
                </label>
                <input
                  id="quantity"
                  type="number"
                  min="1"
                  value={quantity}
                  onChange={(e) => setQuantity(parseInt(e.target.value, 10))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            )}
            <div className="mb-6">
              <label htmlFor="space" className="block text-sm font-medium text-gray-700 mb-2">
                Espaço ou Passe
              </label>
              <select
                id="space"
                value={selectedSpace}
                onChange={(e) => setSelectedSpace(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="" disabled>Selecione um espaço</option>
                <option value="daily-pass">Passe Diário</option>
                {rooms.map((room) => {
                  const isOccupied = occupiedSpaces.has(room.name);
                  return (
                    <option key={room.id} value={room.id} disabled={isOccupied}>
                      {room.name} {isOccupied && '(Ocupado)'}
                    </option>
                  );
                })}
              </select>
            </div>
            <div className="flex justify-center gap-4">
              <button
                type="button"
                onClick={handleCancel}
                className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300"
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Confirmar Check-in
              </button>
            </div>
          </form>
        </div>
      </div>
      <ConfirmationModal
        isOpen={isCancelModalOpen}
        onClose={() => setCancelModalOpen(false)}
        onConfirm={handleConfirmCancel}
        title="Confirmar Cancelamento"
        message="Você tem certeza que deseja cancelar o check-in manual?"
      />
    </>
  );
};

export default ManualCheckinModal;
