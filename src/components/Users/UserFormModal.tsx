import type { User } from '@/types';
import React, { useState, useEffect } from 'react';

interface UserFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (user: User) => void;
  user?: User | null; // Optional: for editing existing user
}

const UserFormModal: React.FC<UserFormModalProps> = ({ isOpen, onClose, onSubmit, user }) => {
  const [formData, setFormData] = useState<User>({
    id: '',
    name: '',
    email: '',
    company: '',
    isActive: true,
    avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=100', // Default avatar
    isCheckedIn: false,
    skills: [],
    interests: [],
    role: '',
  });

  useEffect(() => {
    if (user) {
      setFormData(user);
    } else {
      // Reset form for new user
      setFormData({
        id: '',
        name: '',
        email: '',
        company: '',
        isActive: true,
        avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=100',
        isCheckedIn: false,
        skills: [],
        interests: [],
        role: '',
      });
    }
  }, [user, isOpen]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox') {
      setFormData({ ...formData, [name]: (e.target as HTMLInputElement).checked });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex justify-center items-center">
      <div className="bg-white p-8 rounded-lg shadow-xl max-w-md w-full">
        <h2 className="text-2xl font-bold mb-4">{user ? 'Editar Usuário' : 'Adicionar Novo Usuário'}</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
              Nome
            </label>
            <input
              type="text"
              name="name"
              id="name"
              value={formData.name}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
              Email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              value={formData.email}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="company">
              Empresa
            </label>
            <input
              type="text"
              name="company"
              id="company"
              value={formData.company || ''}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="mb-4 flex items-center">
            <input
              type="checkbox"
              name="isActive"
              id="isActive"
              checked={formData.isActive}
              onChange={handleChange}
              className="mr-2 leading-tight cursor-pointer"
            />
            <label className="text-gray-700 text-sm font-bold" htmlFor="isActive">
              Ativo
            </label>
          </div>
          <div className="flex justify-end">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-300 hover:bg-gray-400 text-black font-bold py-2 px-4 rounded mr-2 cursor-pointer"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded cursor-pointer"
            >
              {user ? 'Salvar Alterações' : 'Adicionar Usuário'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserFormModal;
