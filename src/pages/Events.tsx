import React, { useState } from 'react';
import EventCard from '../components/Events/EventCard';
import EventModal from '../components/Events/EventModal';
import { Plus, Search, Filter, Calendar } from 'lucide-react';
import { mockEvents } from '@/data/mockdata';
import type { Event } from '@/types';

const Events: React.FC = () => {
  const [events, setEvents] = useState(mockEvents);
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState('all');
  const [showFilters, setShowFilters] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);

  const filteredEvents = events.filter(event => {
    const matchesSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         event.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesType = typeFilter === 'all' || event.type === typeFilter;
    
    return matchesSearch && matchesType;
  });

  const handleRSVP = (eventId: string) => {
    setEvents(prevEvents =>
      prevEvents.map(event =>
        event.id === eventId && event.attendees < event.maxAttendees
          ? { ...event, attendees: event.attendees + 1 }
          : event
      )
    );
    
    const event = events.find(e => e.id === eventId);
    if (event) {
      alert(`Presença confirmada para: ${event.title}`);
    }
  };

  const handleSaveEvent = (eventData: Omit<Event, 'id' | 'attendees'>) => {
    if (selectedEvent) {
      // Edit existing event
      setEvents(prevEvents => prevEvents.map(e => e.id === selectedEvent.id ? { ...selectedEvent, ...eventData } : e));
    } else {
      // Create new event
      const newEvent: Event = {
        id: (events.length + 1).toString(),
        attendees: 0,
        ...eventData,
      };
      setEvents(prevEvents => [newEvent, ...prevEvents]);
    }
    setIsModalOpen(false);
    setSelectedEvent(null);
  };

  const handleCreateEvent = () => {
    setSelectedEvent(null);
    setIsModalOpen(true);
  };

  const handleEditEvent = (event: Event) => {
    setSelectedEvent(event);
    setIsModalOpen(true);
  };

  const upcomingEvents = filteredEvents.filter(event => new Date(event.date) >= new Date());
  const pastEvents = filteredEvents.filter(event => new Date(event.date) < new Date());

  return (
    <div className="p-6">
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Eventos</h1>
            <p className="text-gray-600 mt-1">Workshops, palestras e encontros da comunidade</p>
          </div>
          
          <button onClick={handleCreateEvent} className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 transform hover:scale-[1.01]">
            <Plus className="w-5 h-5" />
            <span>Criar Evento</span>
          </button>
        </div>
        
        <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Buscar eventos..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-white pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          
          <button
            onClick={() => {
              if (showFilters) {
                setTypeFilter('all');
                setSearchTerm('');
              }
              setShowFilters(!showFilters);
            }}
            className={`flex items-center space-x-2 px-4 py-3 border rounded-lg transition-colors duration-200 ${
              showFilters ? 'bg-blue-50 border-blue-300 text-blue-700' : 'bg-white border-gray-300 hover:bg-gray-50'
            }`}
          >
            <Filter className="w-5 h-5" />
            <span>Filtros</span>
          </button>
        </div>
        
        {showFilters && (
          <div className="mt-4 p-4 bg-white rounded-lg">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tipo de Evento
                </label>
                <select
                  value={typeFilter}
                  onChange={(e) => setTypeFilter(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="all">Todos</option>
                  <option value="workshop">Workshop</option>
                  <option value="networking">Networking</option>
                  <option value="presentation">Apresentação</option>
                  <option value="social">Social</option>
                </select>
              </div>
              
              <div className="flex items-end">
                <button
                  onClick={() => {
                    setTypeFilter('all');
                    setSearchTerm('');
                  }}
                  className="px-4 py-2 text-sm text-gray-600 hover:text-gray-900 transition-colors duration-200"
                >
                  Limpar Filtros
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
      
      {/* Upcoming Events */}
      {upcomingEvents.length > 0 && (
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
            <Calendar className="w-6 h-6 mr-2 text-blue-600" />
            Próximos Eventos ({upcomingEvents.length})
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {upcomingEvents.map((event) => (
              <EventCard
                key={event.id}
                event={event}
                onRSVP={handleRSVP}
                onEdit={() => handleEditEvent(event)}
              />
            ))}
          </div>
        </div>
      )}
      
      {/* Past Events */}
      {pastEvents.length > 0 && (
        <div>
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            Eventos Passados ({pastEvents.length})
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {pastEvents.map((event) => (
              <div key={event.id} className="opacity-75">
                <EventCard
                  event={{...event, maxAttendees: event.attendees}} // Desabilitar RSVP para eventos passados
                  onRSVP={() => {}}
                  onEdit={() => handleEditEvent(event)}
                />
              </div>
            ))}
          </div>
        </div>
      )}
      
      {filteredEvents.length === 0 && (
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Calendar className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">Nenhum evento encontrado</h3>
          <p className="text-gray-600 mb-4">Tente ajustar seus filtros de busca</p>
          <button onClick={handleCreateEvent} className="inline-flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 transform hover:scale-[1.01]">
            <Plus className="w-5 h-5" />
            <span>Criar Primeiro Evento</span>
          </button>
        </div>
      )}

      <EventModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveEvent}
        event={selectedEvent}
      />
    </div>
  );
};

export default Events;