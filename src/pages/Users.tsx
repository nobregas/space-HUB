import React, { useState } from "react";
import { mockUsers } from "../data/mockdata";
import type { User } from "@/types";
import ConfirmationModal from "../components/common/ConfirmationModal";
import UserDetailsModal from "../components/Users/UserDetailsModal";

const Users: React.FC = () => {
  const [users, setUsers] = useState<User[]>(mockUsers);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [isAddModalOpen, setIsAddModalOpen] = useState<boolean>(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState<boolean>(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState<boolean>(false);
  const [userToDelete, setUserToDelete] = useState<User | null>(null);
  const [isToggleConfirmModalOpen, setIsToggleConfirmModalOpen] = useState<boolean>(false);
  const [userToToggle, setUserToToggle] = useState<User | null>(null);

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );


  // const handleAddUser = (newUser: User) => {
  //   setUsers([...users, { ...newUser, id: String(users.length + 1), isActive: true }]);
  //   setIsAddModalOpen(false);
  // };

  // const handleEditUser = (updatedUser: User) => {
  //   setUsers(users.map(user => (user.id === updatedUser.id ? updatedUser : user)));
  //   setIsEditModalOpen(false);
  //   setSelectedUser(null);
  // };

  const handleDeleteUser = () => {
    isAddModalOpen;
    isEditModalOpen;
    if (userToDelete) {
      setUsers(users.filter(user => user.id !== userToDelete.id));
      setIsConfirmModalOpen(false);
      setUserToDelete(null);
    }
  };

  const handleToggleActive = () => {
    if (userToToggle) {
      setUsers(users.map(user =>
        user.id === userToToggle.id ? { ...user, isActive: !userToToggle.isActive } : user
      ));
      setIsToggleConfirmModalOpen(false);
      setUserToToggle(null);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Gerenciamento de Usuários</h1>

      <div className="flex justify-between items-center mb-6">
        <input
          type="text"
          placeholder="Buscar por nome ou e-mail..."
          className="p-2 border border-gray-300 rounded-md w-1/3 bg-white"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 cursor-pointer"
          onClick={() => {
            setSelectedUser(null);
            setIsAddModalOpen(true);
          }}
        >
          Adicionar Novo Usuário
        </button>
      </div>

      {/* User List Table */}
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Nome
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Email
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Empresa
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Ações
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredUsers.map((user) => (
              <tr key={user.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  <button
                    onClick={() => {
                      setSelectedUser(user);
                      setIsDetailsModalOpen(true);
                    }}
                    className="text-blue-600 hover:text-blue-900"
                  >
                    {user.name}
                  </button>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {user.email}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {user.company || "N/A"}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  <span
                    className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      user.isActive
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {user.isActive ? "Ativo" : "Inativo"}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <button
                    className="text-indigo-600 hover:text-indigo-900 mr-4"
                    onClick={() => {
                      setSelectedUser(user);
                      setIsEditModalOpen(true);
                    }}
                  >
                    Editar
                  </button>
                  <button
                    className="text-red-600 hover:text-red-900 mr-4"
                    onClick={() => {
                      setUserToDelete(user);
                      setIsConfirmModalOpen(true);
                    }}
                  >
                    Deletar
                  </button>
                  <button
                    className={`${
                      user.isActive
                        ? "text-yellow-600 hover:text-yellow-900"
                        : "text-green-600 hover:text-green-900"
                    }`}
                    onClick={() => {
                      setUserToToggle(user);
                      setIsToggleConfirmModalOpen(true);
                    }}
                  >
                    {user.isActive ? "Desativar" : "Ativar"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {userToDelete && (
        <ConfirmationModal
          isOpen={isConfirmModalOpen}
          onClose={() => {
            setIsConfirmModalOpen(false);
            setUserToDelete(null);
          }}
          onConfirm={handleDeleteUser}
          message={`Tem certeza que deseja deletar o usuário ${userToDelete.name}? Esta ação não pode ser desfeita.`}
          title="Confirmar Exclusão"
        />
      )}

      {userToToggle && (
        <ConfirmationModal
          isOpen={isToggleConfirmModalOpen}
          onClose={() => { setIsToggleConfirmModalOpen(false); setUserToToggle(null); }}
          onConfirm={handleToggleActive}
          message={`Tem certeza que deseja ${userToToggle.isActive ? 'desativar' : 'ativar'} o usuário ${userToToggle.name}?`}
          title={`${userToToggle.isActive ? 'Desativar' : 'Ativar'} Usuário`}
          confirmButtonColor={userToToggle.isActive ? 'bg-red-600 hover:bg-red-700' : 'bg-green-600 hover:bg-green-700'}
        />
      )}

      <UserDetailsModal
        isOpen={isDetailsModalOpen}
        onClose={() => setIsDetailsModalOpen(false)}
        user={selectedUser}
      />
    </div>
  );
};

export default Users;
