import React, { useState, useEffect } from 'react';
import { X, Save } from 'lucide-react';
import type { Event, EventType } from '@/types';
import Alert from '../common/Alert';

interface EventModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (event: Omit<Event, 'id' | 'attendees'>) => void;
  event?: Event | null;
}

const EventModal: React.FC<EventModalProps> = ({ isOpen, onClose, onSave, event }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    date: '',
    startTime: '',
    endTime: '',
    location: '',
    organizer: '',
    maxAttendees: 0,
    type: 'workshop' as EventType,
    image: '',
  });
  const [alert, setAlert] = useState<{ message: string; type: 'success' | 'error' | 'warning' } | null>(null);

  useEffect(() => {
    if (event) {
      setFormData({
        title: event.title,
        description: event.description,
        date: event.date,
        startTime: event.startTime,
        endTime: event.endTime,
        location: event.location,
        organizer: event.organizer,
        maxAttendees: event.maxAttendees,
        type: event.type,
        image: event.image,
      });
    } else {
      setFormData({
        title: '',
        description: '',
        date: '',
        startTime: '',
        endTime: '',
        location: '',
        organizer: '',
        maxAttendees: 10,
        type: 'workshop',
        image: '',
      });
    }
  }, [event, isOpen]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: name === 'maxAttendees' ? parseInt(value, 10) : value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    for (const key in formData) {
        if (formData[key as keyof typeof formData] === '' && key !== 'image') {
            setAlert({ message: `O campo ${key} é obrigatório.`, type: 'warning' });
            return;
        }
    }

    onSave(formData);
    setAlert({ message: 'Evento salvo com sucesso!', type: 'success' });
    setTimeout(() => {
        onClose();
    }, 1500);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[95vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">{event ? 'Editar Evento' : 'Criar Novo Evento'}</h2>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors">
              <X className="w-6 h-6" />
            </button>
          </div>

          {alert && (
            <div className="mb-4">
              <Alert message={alert.message} type={alert.type} onClose={() => setAlert(null)} />
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Título do Evento</label>
                <input type="text" name="title" value={formData.title} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-lg" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Organizador</label>
                <input type="text" name="organizer" value={formData.organizer} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-lg" />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Descrição</label>
              <textarea name="description" value={formData.description} onChange={handleChange} rows={3} className="w-full p-2 border border-gray-300 rounded-lg"></textarea>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Data</label>
                <input type="date" name="date" value={formData.date} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-lg" />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Início</label>
                  <input type="time" name="startTime" value={formData.startTime} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-lg" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Fim</label>
                  <input type="time" name="endTime" value={formData.endTime} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-lg" />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Local</label>
                    <input type="text" name="location" value={formData.location} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-lg" />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Tipo de Evento</label>
                    <select name="type" value={formData.type} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-lg">
                        <option value="workshop">Workshop</option>
                        <option value="networking">Networking</option>
                        <option value="presentation">Apresentação</option>
                        <option value="social">Social</option>
                    </select>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Capacidade Máxima</label>
                    <input type="number" name="maxAttendees" value={formData.maxAttendees} onChange={handleChange} min="1" className="w-full p-2 border border-gray-300 rounded-lg" />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">URL da Imagem</label>
                    <input type="text" name="image" value={formData.image} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-lg" />
                </div>
            </div>

            <div className="flex justify-end space-x-3 pt-4">
              <button type="button" onClick={onClose} className="px-6 py-2 border hover:scale-101s border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50">
                Cancelar
              </button>
              <button type="submit" className="inline-flex items-center hover:scale-101 space-x-2 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                <Save className="w-5 h-5" />
                <span>Salvar Evento</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EventModal;