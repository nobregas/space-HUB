import React, { useState } from 'react';
import { LogIn, LogOut } from 'lucide-react';
import type { CheckinEntry, CheckinStatus } from '@/types';
import ConfirmationModal from '../common/ConfirmationModal';

interface StatusConfig {
  text: string;
  icon: React.ElementType;
  color: string;
}

interface CheckinListItemProps {
  entry: CheckinEntry;
  statusConfig: Record<CheckinStatus, StatusConfig>;
  onCheckIn: (id: string) => void;
  onCheckOut: (id: string) => void;
}

const CheckinListItem: React.FC<CheckinListItemProps> = ({ entry, statusConfig, onCheckIn, onCheckOut }) => {
  const [isCheckinModalOpen, setIsCheckinModalOpen] = useState(false);
  const [isCheckoutModalOpen, setIsCheckoutModalOpen] = useState(false);
  const StatusIcon = statusConfig[entry.status].icon;
  const statusColor = statusConfig[entry.status].color;
  const statusText = statusConfig[entry.status].text;

  const handleCheckinClick = () => {
    setIsCheckinModalOpen(true);
  };

  const handleConfirmCheckin = () => {
    onCheckIn(entry.id);
    setIsCheckinModalOpen(false);
  };

  const handleCheckoutClick = () => {
    setIsCheckoutModalOpen(true);
  };

  const handleConfirmCheckout = () => {
    onCheckOut(entry.id);
    setIsCheckoutModalOpen(false);
  };

  return (
    <>
      <div className="bg-white p-4 rounded-lg shadow-sm flex items-center justify-between transition-all hover:shadow-md hover:scale-101">
        <div className="flex items-center gap-4 flex-1 min-w-0">
          <img src={entry.user.avatar} alt={entry.user.name} className="w-12 h-12 rounded-full" />
          <div className="truncate">
            <p className="font-semibold text-gray-800 truncate">{entry.user.name}</p>
            <p className="text-sm text-gray-500 truncate">{entry.user.role}</p>
          </div>
        </div>

        <div className="text-center mx-4 hidden md:block">
          <p className="font-medium text-gray-700">{entry.space}</p>
          <p className="text-sm text-gray-500">
            {new Date(entry.startTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} - {new Date(entry.endTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </p>
        </div>

        <div className="mx-4 hidden lg:block">
          <span className={`flex items-center gap-2 text-sm font-medium px-3 py-1 rounded-full ${statusColor}`}>
            <StatusIcon size={14} />
            {statusText}
          </span>
        </div>

        <div className="flex gap-2">
          {entry.status === 'waiting' && <button onClick={handleCheckinClick} className="p-2 text-sm bg-green-500 text-white rounded-lg hover:bg-green-600"><LogIn size={16} /></button>}
          {entry.status === 'checked-in' && <button onClick={handleCheckoutClick} className="p-2 text-sm bg-red-500 text-white rounded-lg hover:bg-red-600"><LogOut size={16} /></button>}
        </div>
      </div>
      <ConfirmationModal
        isOpen={isCheckinModalOpen}
        onClose={() => setIsCheckinModalOpen(false)}
        onConfirm={handleConfirmCheckin}
        title="Confirmar Check-in"
        message={`Tem certeza que deseja confirmar o check-in para ${entry.user.name}?`}
        confirmButtonColor="bg-green-600 hover:bg-green-700"
      />
      <ConfirmationModal
        isOpen={isCheckoutModalOpen}
        onClose={() => setIsCheckoutModalOpen(false)}
        onConfirm={handleConfirmCheckout}
        title="Confirmar Check-out"
        message={`Tem certeza que deseja finalizar o check-out para ${entry.user.name}?`}
      />
    </>
  );
};

export default CheckinListItem;