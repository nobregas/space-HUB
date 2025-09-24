import React from 'react';
import { LogIn, LogOut } from 'lucide-react';
import type { CheckinEntry, CheckinStatus } from '@/types';

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
  const StatusIcon = statusConfig[entry.status].icon;
  const statusColor = statusConfig[entry.status].color;
  const statusText = statusConfig[entry.status].text;

  return (
    <div className="bg-white p-4 rounded-lg shadow-sm flex items-center justify-between transition-all hover:shadow-md">
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
        {entry.status === 'waiting' && <button onClick={() => onCheckIn(entry.id)} className="p-2 text-sm bg-green-500 text-white rounded-lg hover:bg-green-600"><LogIn size={16} /></button>}
        {entry.status === 'checked-in' && <button onClick={() => onCheckOut(entry.id)} className="p-2 text-sm bg-red-500 text-white rounded-lg hover:bg-red-600"><LogOut size={16} /></button>}
      </div>
    </div>
  );
};

export default CheckinListItem;