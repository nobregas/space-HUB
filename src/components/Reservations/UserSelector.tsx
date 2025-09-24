import React from 'react';
import type { User } from '@/types';
import { PlusCircle, XCircle } from 'lucide-react';

interface UserSelectorProps {
  users: User[];
  selectedAttendees: User[];
  onToggleAttendee: (user: User) => void;
}

const UserSelector: React.FC<UserSelectorProps> = ({ users, selectedAttendees, onToggleAttendee }) => {
  const selectedIds = new Set(selectedAttendees.map(u => u.id));

  return (
    <div>
      <h3 className="text-sm font-medium text-gray-700 mb-2">Adicionar Pessoas</h3>
      <div className="max-h-48 overflow-y-auto rounded-lg border border-gray-300">
        {users.map(user => {
          const isSelected = selectedIds.has(user.id);
          return (
            <div
              key={user.id}
              onClick={() => onToggleAttendee(user)}
              className={`flex items-center justify-between p-2 cursor-pointer transition-colors ${
                isSelected ? 'bg-blue-50' : 'hover:bg-gray-50'
              }`}
            >
              <div className="flex items-center">
                <img src={user.avatar} alt={user.name} className="w-8 h-8 rounded-full mr-3" />
                <span className={`text-sm ${isSelected ? 'font-semibold text-blue-800' : 'text-gray-800'}`}>
                  {user.name}
                </span>
              </div>
              {isSelected ? (
                <XCircle className="w-5 h-5 text-red-500" />
              ) : (
                <PlusCircle className="w-5 h-5 text-green-500" />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default UserSelector;
