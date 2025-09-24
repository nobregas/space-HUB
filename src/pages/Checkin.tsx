import React, { useState } from 'react';
import QRScanner from '../components/CheckIn/QRScanner';
import { Clock, Users, TrendingUp } from 'lucide-react';
import { mockUsers } from '@/data/mockdata';

const CheckIn: React.FC = () => {
  const [users, setUsers] = useState(mockUsers);
  
  // Simular usuário atual logado
  const currentUser = users.find(u => u.id === '1') || null;

  const handleCheckIn = (userId: string) => {
    setUsers(prevUsers =>
      prevUsers.map(user =>
        user.id === userId
          ? { 
              ...user, 
              isCheckedIn: true, 
              checkInTime: new Date().toLocaleTimeString('pt-BR', { 
                hour: '2-digit', 
                minute: '2-digit' 
              })
            }
          : user
      )
    );
  };

  const handleCheckOut = (userId: string) => {
    setUsers(prevUsers =>
      prevUsers.map(user =>
        user.id === userId
          ? { ...user, isCheckedIn: false, checkInTime: undefined }
          : user
      )
    );
  };

  const checkedInCount = users.filter(u => u.isCheckedIn).length;
  const checkedInUsers = users.filter(u => u.isCheckedIn);

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Check-in / Check-out</h1>
        <p className="text-gray-600 mt-1">Registre sua presença no espaço</p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <QRScanner
            currentUser={currentUser}
            onCheckIn={handleCheckIn}
            onCheckOut={handleCheckOut}
          />
        </div>
        
        <div className="space-y-6">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 gap-4">
            <div className="bg-green-50 border border-green-200 rounded-xl p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-green-700 text-sm font-medium">Pessoas Presentes</p>
                  <p className="text-2xl font-bold text-green-900">{checkedInCount}</p>
                </div>
                <Users className="w-8 h-8 text-green-600" />
              </div>
            </div>
            
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-700 text-sm font-medium">Horário de Pico Hoje</p>
                  <p className="text-xl font-bold text-blue-900">15:30</p>
                  <p className="text-xs text-blue-600">82 pessoas</p>
                </div>
                <TrendingUp className="w-8 h-8 text-blue-600" />
              </div>
            </div>
            
            <div className="bg-purple-50 border border-purple-200 rounded-xl p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-purple-700 text-sm font-medium">Tempo Médio</p>
                  <p className="text-xl font-bold text-purple-900">6h 30m</p>
                  <p className="text-xs text-purple-600">permanência diária</p>
                </div>
                <Clock className="w-8 h-8 text-purple-600" />
              </div>
            </div>
          </div>
          
          {/* Currently Present */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Presentes Agora</h3>
            <div className="space-y-3">
              {checkedInUsers.map((user) => (
                <div key={user.id} className="flex items-center space-x-3">
                  <img
                    src={user.avatar}
                    alt={user.name}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900">{user.name}</p>
                    <p className="text-xs text-gray-500">
                      Check-in: {user.checkInTime}
                    </p>
                  </div>
                  <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                </div>
              ))}
              
              {checkedInUsers.length === 0 && (
                <p className="text-sm text-gray-500 text-center py-4">
                  Nenhuma pessoa presente no momento
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckIn;