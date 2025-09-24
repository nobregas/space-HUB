import React from 'react';
import { Search } from 'lucide-react';
import type { CheckinStatus } from '@/types';

interface CheckinFiltersProps {
  activeFilter: "all" | CheckinStatus;
  onFilterChange: (filter: "all" | CheckinStatus) => void;
  searchTerm: string;
  onSearchChange: (term: string) => void;
}

const CheckinFilters: React.FC<CheckinFiltersProps> = ({ activeFilter, onFilterChange, searchTerm, onSearchChange }) => {
  const filters: ("all" | CheckinStatus)[] = ['all', 'waiting', 'checked-in', 'checked-out'];
  const filterStyles = {
    all: { base: 'text-gray-600 hover:bg-gray-100', active: 'bg-blue-100 text-blue-700' },
    waiting: { base: 'text-gray-600 hover:bg-gray-100', active: 'bg-yellow-100 text-yellow-700' },
    'checked-in': { base: 'text-gray-600 hover:bg-gray-100', active: 'bg-green-100 text-green-700' },
    'checked-out': { base: 'text-gray-600 hover:bg-gray-100', active: 'bg-gray-200 text-gray-800' },
  };

  return (
    <div className="flex flex-col md:flex-row justify-between items-center mb-4 p-4 bg-white rounded-lg shadow-sm gap-4">
      <div className="flex gap-2">
        {filters.map(filter => (
          <button key={filter} onClick={() => onFilterChange(filter)} className={`px-4 py-2 rounded-md text-sm font-medium capitalize ${activeFilter === filter ? filterStyles[filter].active : filterStyles[filter].base}`}>{filter === 'all' ? 'Todos' : filter.replace('-', ' ')}</button>
        ))}
      </div>
      <div className="relative w-full md:w-80">
        <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
        <input type="text" placeholder="Buscar por membro ou cargo..." value={searchTerm} onChange={(e) => onSearchChange(e.target.value)} className="pl-10 pr-4 py-2 border rounded-lg w-full focus:ring-blue-500 focus:border-blue-500" />
      </div>
    </div>
  );
};

export default CheckinFilters;