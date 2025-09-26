import React from "react";
import { Plus, Trash2 } from "lucide-react";
import ConfirmationModal from "@/components/common/ConfirmationModal";
import { defaultRoles } from "@/data/mockdata";
import type { Role, CustomField } from "@/types";

type UserSettingsProps = {
  onSaved?: () => void;
};

const UserSettings: React.FC<UserSettingsProps> = ({ onSaved }) => {
  const [roles, setRoles] = React.useState<Role[]>(defaultRoles);
  const [newRole, setNewRole] = React.useState<Role>({
    id: "",
    name: "",
    permissions: [],
  });
  const [customFields, setCustomFields] = React.useState<CustomField[]>([]);
  const [newField, setNewField] = React.useState<CustomField>({
    id: "",
    label: "",
    type: "text",
  });

  const [modalState, setModalState] = React.useState<{
    isOpen: boolean;
    idToDelete: string | null;
    type: "role" | "field" | null;
  }>({ isOpen: false, idToDelete: null, type: null });

  const addRole = () => {
    if (!newRole.name.trim()) return;
    const id = newRole.name.toLowerCase().replace(/\s+/g, "_");
    setRoles((prev) => [...prev, { ...newRole, id }]);
    setNewRole({ id: "", name: "", permissions: [] });
  };

  const handleRemoveClick = (id: string, type: "role" | "field") => {
    setModalState({ isOpen: true, idToDelete: id, type });
  };

  const confirmRemove = () => {
    if (!modalState.idToDelete || !modalState.type) return;

    if (modalState.type === "role") {
      setRoles((prev) => prev.filter((r) => r.id !== modalState.idToDelete));
    } else if (modalState.type === "field") {
      setCustomFields((prev) =>
        prev.filter((f) => f.id !== modalState.idToDelete)
      );
    }

    setModalState({ isOpen: false, idToDelete: null, type: null });
  };

  const togglePermission = (roleId: string, permission: string) => {
    setRoles((prev) =>
      prev.map((r) =>
        r.id === roleId
          ? {
              ...r,
              permissions: r.permissions.includes(permission)
                ? r.permissions.filter((p) => p !== permission)
                : [...r.permissions, permission],
            }
          : r
      )
    );
  };

  const addField = () => {
    if (!newField.label.trim()) return;
    const id = newField.label.toLowerCase().replace(/\s+/g, "_");
    setCustomFields((prev) => [...prev, { ...newField, id }]);
    setNewField({ id: "", label: "", type: "text" });
  };

  const closeModal = () => {
    setModalState({ isOpen: false, idToDelete: null, type: null });
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("User settings saved:", { roles, customFields });
    onSaved?.();
  };

  const availablePermissions = [
    "reservar",
    "checkin",
    "gerir_usuarios",
    "gerir_reservas",
    "relatorios",
  ];

  return (
    <form id="user-settings-form" onSubmit={handleSave} className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
        <div className="p-4 sm:p-6 bg-white rounded-xl border border-gray-200">
          <h2 className="text-base sm:text-lg font-semibold text-gray-900 mb-4">
            Tipos de Acesso
          </h2>
          <div className="space-y-6">
            <div className="p-4 border rounded-lg bg-gray-50/50">
              <h3 className="font-medium text-gray-800 mb-3">
                Adicionar Novo Tipo de Acesso
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <input
                  placeholder="Nome do tipo (ex: Supervisor)"
                  value={newRole.name}
                  onChange={(e) =>
                    setNewRole((p) => ({ ...p, name: e.target.value }))
                  }
                  className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                />
                <div className="sm:col-span-2 flex flex-wrap items-center gap-2">
                  <span className="text-sm text-gray-600 mr-2">
                    Permissões:
                  </span>
                  {availablePermissions.map((perm) => (
                    <button
                      key={`new-${perm}`}
                      type="button"
                      onClick={() => {
                        const newPermissions = newRole.permissions.includes(
                          perm
                        )
                          ? newRole.permissions.filter((p) => p !== perm)
                          : [...newRole.permissions, perm];
                        setNewRole({ ...newRole, permissions: newPermissions });
                      }}
                      className={`px-2.5 py-1 text-xs rounded- border transition hover:scale-105 ${
                        newRole.permissions.includes(perm)
                          ? "bg-primary-100 text-primary-800 border-primary-200"
                          : "bg-white text-gray-700 hover:bg-gray-100 border-gray-300"
                      }`}
                    >
                      {perm}
                    </button>
                  ))}
                </div>
              </div>
              <div className="mt-4 flex justify-end">
                <button
                  type="button"
                  onClick={addRole}
                  className="inline-flex items-center justify-center gap-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-transform duration-200 hover:scale-101"
                >
                  <Plus className="w-4 h-4" />
                  <span>Adicionar Tipo</span>
                </button>
              </div>
            </div>

            <div className="space-y-3">
              {roles.map((role) => (
                <div
                  key={role.id}
                  className="p-4 border rounded-lg transition hover:shadow-sm hover:border-primary-300"
                >
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="font-semibold text-gray-800">{role.name}</h4>
                    <button
                      type="button"
                      onClick={() => handleRemoveClick(role.id, "role")}
                      className="text-red-500 hover:text-red-700 p-1.5 rounded-full hover:bg-red-100 transition"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="flex flex-wrap items-center gap-2">
                    {availablePermissions.map((perm) => (
                      <button
                        key={`${role.id}-${perm}`}
                        type="button"
                        onClick={() => togglePermission(role.id, perm)}
                        className={`px-2.5 py-1 text-xs rounded-full border transition hover:scale-105 ${
                          role.permissions.includes(perm)
                            ? "bg-primary-100 text-primary-800 border-primary-200"
                            : "bg-white text-gray-700 hover:bg-gray-100 border-gray-300"
                        }`}
                      >
                        {perm}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
              {roles.length === 0 && (
                <div className="p-5 text-center text-sm text-gray-500 border rounded-lg border-dashed">
                  Nenhum tipo de acesso configurado.
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="p-4 sm:p-6 bg-white rounded-xl border border-gray-200">
          <h2 className="text-base sm:text-lg font-semibold text-gray-900 mb-4">
            Campos Personalizados
          </h2>
          <div className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <input
                placeholder="Rótulo (ex: Empresa)"
                value={newField.label}
                onChange={(e) =>
                  setNewField((p) => ({ ...p, label: e.target.value }))
                }
                className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              />
              <select
                value={newField.type}
                onChange={(e) =>
                  setNewField((p) => ({
                    ...p,
                    type: e.target.value as CustomField["type"],
                  }))
                }
                className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              >
                <option value="text">Texto</option>
                <option value="number">Número</option>
                <option value="date">Data</option>
              </select>
              <button
                type="button"
                onClick={addField}
                className="inline-flex items-center justify-center gap-2 px-3 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-transform duration-200 hover:scale-101"
              >
                <Plus className="w-5 h-5" />
                Adicionar Campo
              </button>
            </div>

            <div className="divide-y divide-gray-200 border rounded-lg">
              {customFields.map((field) => (
                <div
                  key={field.id}
                  className="group flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition"
                >
                  <div className="text-gray-900">
                    {field.label}{" "}
                    <span className="text-gray-500 text-sm">
                      ({field.type})
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleRemoveClick(field.id, "field")}
                    className="text-red-500 hover:text-red-700 p-1 rounded-full hover:bg-red-100 transition"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
              {customFields.length === 0 && (
                <div className="p-4 text-sm text-gray-600">
                  Nenhum campo personalizado
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <ConfirmationModal
        isOpen={modalState.isOpen}
        onClose={closeModal}
        onConfirm={confirmRemove}
        title={`Confirmar Exclusão de ${
          modalState.type === "role" ? "Tipo de Acesso" : "Campo"
        }`}
        message={`Tem certeza de que deseja remover este ${
          modalState.type === "role" ? "tipo de acesso" : "campo"
        }? Esta ação não pode ser desfeita.`}
      />
    </form>
  );
};

export default UserSettings;
