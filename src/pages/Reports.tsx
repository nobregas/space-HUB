import React, { useState } from 'react';
import UsageChart from '../components/Reports/UsageChart';
import StatsCard from '../components/Dashboard/StatsCard';
import { BarChart3, Users, Calendar, Clock, Download } from 'lucide-react';

const Reports: React.FC = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('week');

  const weeklyData = [
    { period: 'Segunda', checkins: 45, reservations: 12, events: 2 },
    { period: 'Terça', checkins: 52, reservations: 15, events: 3 },
    { period: 'Quarta', checkins: 48, reservations: 11, events: 1 },
    { period: 'Quinta', checkins: 61, reservations: 18, events: 4 },
    { period: 'Sexta', checkins: 38, reservations: 8, events: 2 },
    { period: 'Sábado', checkins: 25, reservations: 6, events: 1 },
    { period: 'Domingo', checkins: 15, reservations: 3, events: 0 }
  ];

  const monthlyData = [
    { period: 'Janeiro', checkins: 1240, reservations: 320, events: 45 },
    { period: 'Fevereiro', checkins: 1180, reservations: 285, events: 38 },
    { period: 'Março', checkins: 1350, reservations: 340, events: 52 },
    { period: 'Abril', checkins: 1290, reservations: 315, events: 41 }
  ];

  const currentData = selectedPeriod === 'week' ? weeklyData : monthlyData;

  const totalCheckins = currentData.reduce((acc, item) => acc + item.checkins, 0);
  const totalReservations = currentData.reduce((acc, item) => acc + item.reservations, 0);
  const totalEvents = currentData.reduce((acc, item) => acc + item.events, 0);

  const mostPopularDay = currentData.reduce((prev, current) => 
    prev.checkins > current.checkins ? prev : current
  );

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Relatórios de Uso</h1>
          <p className="text-gray-600 mt-1">Análise detalhada da utilização do espaço</p>
        </div>
        
        <div className="flex space-x-3">
          <select
            value={selectedPeriod}
            onChange={(e) => setSelectedPeriod(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="week">Esta Semana</option>
            <option value="month">Este Mês</option>
          </select>
          
          <button className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200">
            <Download className="w-4 h-4" />
            <span>Exportar</span>
          </button>
        </div>
      </div>
      
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <StatsCard
          title="Total Check-ins"
          value={totalCheckins}
          subtitle={selectedPeriod === 'week' ? 'nesta semana' : 'neste mês'}
          icon={Users}
          color="blue"
        />
        
        <StatsCard
          title="Total Reservas"
          value={totalReservations}
          subtitle="salas reservadas"
          icon={Calendar}
          color="green"
        />
        
        <StatsCard
          title="Eventos Realizados"
          value={totalEvents}
          subtitle="workshops e encontros"
          icon={Clock}
          color="purple"
        />
        
        <StatsCard
          title="Dia Mais Popular"
          value={mostPopularDay.period}
          subtitle={`${mostPopularDay.checkins} check-ins`}
          icon={BarChart3}
          color="orange"
        />
      </div>
      
      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <UsageChart 
          data={currentData} 
          title={`Uso ${selectedPeriod === 'week' ? 'Semanal' : 'Mensal'}`} 
        />
        
        {/* Room Usage Stats */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Salas Mais Utilizadas</h3>
          <div className="space-y-4">
            {[
              { name: 'Innovation Hub', usage: 85, reservations: 24 },
              { name: 'Creative Space', usage: 70, reservations: 18 },
              { name: 'Focus Room', usage: 60, reservations: 15 },
              { name: 'Brainstorm Lab', usage: 45, reservations: 12 }
            ].map((room, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex justify-between text-sm mb-1">
                    <span className="font-medium text-gray-700">{room.name}</span>
                    <span className="text-gray-500">{room.usage}%</span>
                  </div>
                  <div className="w-full bg-gray-100 rounded-full h-2">
                    <div
                      className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${room.usage}%` }}
                    />
                  </div>
                  <div className="text-xs text-gray-500 mt-1">
                    {room.reservations} reservas
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Peak Hours Analysis */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Análise de Horários de Pico</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <Clock className="w-8 h-8 text-green-600" />
            </div>
            <h4 className="font-semibold text-gray-900">Manhã (8h-12h)</h4>
            <p className="text-2xl font-bold text-green-600 mt-1">35%</p>
            <p className="text-sm text-gray-500">da ocupação diária</p>
          </div>
          
          <div className="text-center">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <Clock className="w-8 h-8 text-blue-600" />
            </div>
            <h4 className="font-semibold text-gray-900">Tarde (12h-18h)</h4>
            <p className="text-2xl font-bold text-blue-600 mt-1">55%</p>
            <p className="text-sm text-gray-500">da ocupação diária</p>
          </div>
          
          <div className="text-center">
            <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <Clock className="w-8 h-8 text-purple-600" />
            </div>
            <h4 className="font-semibold text-gray-900">Noite (18h-22h)</h4>
            <p className="text-2xl font-bold text-purple-600 mt-1">10%</p>
            <p className="text-sm text-gray-500">da ocupação diária</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reports;