import React from 'react';
import type { CheckinEntry, CheckinStatus } from '@/types';
import CheckinListItem from './CheckinListItem';

interface StatusConfig {
  text: string;
  icon: React.ElementType;
  color: string;
}

interface CheckinListProps {
  entries: CheckinEntry[];
  statusConfig: Record<CheckinStatus, StatusConfig>;
  onCheckIn: (id: string) => void;
  onCheckOut: (id: string) => void;
}

const CheckinList: React.FC<CheckinListProps> = ({ entries, statusConfig, onCheckIn, onCheckOut }) => {
  return (
    <div className="space-y-4 ">
      {entries.length > 0 ? (
        entries.map((entry) => (
          <CheckinListItem key={entry.id} entry={entry} statusConfig={statusConfig} onCheckIn={onCheckIn} onCheckOut={onCheckOut} />
        ))
      ) : (
        <div className="text-center py-10 px-4 bg-white rounded-lg shadow-sm"><p className="text-gray-500">Nenhum registro encontrado para os filtros selecionados.</p></div>
      )}
    </div>
  );
};

export default CheckinList;