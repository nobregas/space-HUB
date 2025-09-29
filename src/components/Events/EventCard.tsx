import React from 'react';
import type { Event } from '@/types';
import { Calendar, Clock, MapPin, Users, User, Edit } from 'lucide-react';

interface EventCardProps {
  event: Event;
  onRSVP: (eventId: string) => void;
  onEdit: (event: Event) => void;
}

const EventCard: React.FC<EventCardProps> = ({ event, onRSVP, onEdit }) => {
  const getEventTypeColor = (type: string) => {
    switch (type) {
      case 'workshop': return 'bg-blue-100 text-blue-700';
      case 'networking': return 'bg-green-100 text-green-700';
      case 'presentation': return 'bg-purple-100 text-purple-700';
      case 'social': return 'bg-orange-100 text-orange-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  };

  const getAvailabilityColor = () => {
    const spotsLeft = event.maxAttendees - event.attendees;
    if (spotsLeft === 0) return 'text-red-600';
    if (spotsLeft < 5) return 'text-orange-600';
    return 'text-green-600';
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow duration-200 relative">
      <div className="aspect-[16/9] relative overflow-hidden">
        <img
          src={event.image}
          alt={event.title}
          className="w-full h-full object-cover"
        />
        <div className={`absolute top-3 left-3 px-2 py-1 rounded-full text-xs font-medium ${getEventTypeColor(event.type)}`}>
          {event.type.charAt(0).toUpperCase() + event.type.slice(1)}
        </div>
      </div>
      
      <div className="p-6">
        <h3 className="font-semibold text-gray-900 text-lg mb-2 line-clamp-2">
          {event.title}
        </h3>
        
        <p className="text-gray-600 text-sm mb-4 line-clamp-3">
          {event.description}
        </p>
        
        <div className="space-y-2 mb-4">
          <div className="flex items-center text-gray-600 text-sm">
            <Calendar className="w-4 h-4 mr-2" />
            <span>{formatDate(event.date)}</span>
          </div>
          
          <div className="flex items-center text-gray-600 text-sm">
            <Clock className="w-4 h-4 mr-2" />
            <span>{event.startTime} - {event.endTime}</span>
          </div>
          
          <div className="flex items-center text-gray-600 text-sm">
            <MapPin className="w-4 h-4 mr-2" />
            <span>{event.location}</span>
          </div>
          
          <div className="flex items-center text-gray-600 text-sm">
            <User className="w-4 h-4 mr-2" />
            <span>Organizado por {event.organizer}</span>
          </div>
        </div>
        
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center text-sm">
            <Users className="w-4 h-4 mr-1" />
            <span className={getAvailabilityColor()}>
              {event.attendees}/{event.maxAttendees} participantes
            </span>
          </div>
          
          {event.maxAttendees - event.attendees > 0 && (
            <span className="text-xs text-gray-500">
              {event.maxAttendees - event.attendees} vagas restantes
            </span>
          )}
        </div>
        
        <div className="flex items-center space-x-2">
            <button
              onClick={() => onRSVP(event.id)}
              disabled={event.attendees >= event.maxAttendees}
              className={`w-full py-2 px-4 rounded-lg font-medium transition-colors duration-200 ${
                event.attendees >= event.maxAttendees
                  ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                  : 'bg-blue-600 text-white hover:bg-blue-700'
              }`}
            >
              {event.attendees >= event.maxAttendees ? 'Lotado' : 'Confirmar Presença'}
            </button>
            <button
                onClick={() => onEdit(event)}
                className="p-2 bg-gray-100 text-gray-600 hover:bg-gray-200 rounded-lg transition-colors duration-200"
            >
                <Edit className="w-5 h-5" />
            </button>
        </div>
      </div>
    </div>
  );
};

export default EventCard;
