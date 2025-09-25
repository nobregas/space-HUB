import React from "react";

type Role = {
  id: string;
  name: string;
  permissions: string[];
};

type CustomField = {
  id: string;
  label: string;
  type: "text" | "number" | "date";
};

const defaultRoles: Role[] = [
  { id: "member", name: "Membro", permissions: ["reservar", "checkin"] },
  { id: "admin", name: "Administrador", permissions: ["gerir_usuarios", "gerir_reservas", "relatorios"] },
  { id: "visitor", name: "Visitante", permissions: [] },
];

const UserSettings: React.FC = () => {
  const [roles, setRoles] = React.useState<Role[]>(defaultRoles);
  const [newRole, setNewRole] = React.useState<Role>({ id: "", name: "", permissions: [] });
  const [customFields, setCustomFields] = React.useState<CustomField[]>([]);
  const [newField, setNewField] = React.useState<CustomField>({ id: "", label: "", type: "text" });

  const addRole = () => {
    if (!newRole.name.trim()) return;
    const id = newRole.name.toLowerCase().replace(/\s+/g, "_");
    setRoles((prev) => [...prev, { ...newRole, id }]);
    setNewRole({ id: "", name: "", permissions: [] });
  };

  const removeRole = (id: string) => setRoles((prev) => prev.filter((r) => r.id !== id));

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

  const removeField = (id: string) => setCustomFields((prev) => prev.filter((f) => f.id !== id));

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("User settings saved:", { roles, customFields });
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
          <h2 className="text-base sm:text-lg font-semibold text-gray-900 mb-4">Tipos de Acesso</h2>
          <div className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <input
                placeholder="Nome do tipo (ex: Supervisor)"
                value={newRole.name}
                onChange={(e) => setNewRole((p) => ({ ...p, name: e.target.value }))}
                className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              />
              <select
                multiple
                value={newRole.permissions}
                onChange={(e) =>
                  setNewRole((p) => ({
                    ...p,
                    permissions: Array.from(e.target.selectedOptions).map((o) => o.value),
                  }))
                }
                className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              >
                {availablePermissions.map((perm) => (
                  <option key={perm} value={perm}>
                    {perm}
                  </option>
                ))}
              </select>
              <button type="button" onClick={addRole} className="px-3 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700">
                Adicionar tipo
              </button>
            </div>

            <div className="divide-y divide-gray-200 border rounded-lg">
              {roles.map((role) => (
                <div key={role.id} className="p-3 space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="font-medium text-gray-900">{role.name}</div>
                    <button type="button" onClick={() => removeRole(role.id)} className="text-red-600 hover:text-red-700 text-sm">
                      Remover
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {availablePermissions.map((perm) => (
                      <button
                        key={perm}
                        type="button"
                        onClick={() => togglePermission(role.id, perm)}
                        className={`px-2 py-1 text-xs rounded-md border ${
                          role.permissions.includes(perm)
                            ? "bg-primary-50 text-primary-700 border-primary-200"
                            : "text-gray-600 hover:bg-gray-50 border-gray-200"
                        }`}
                      >
                        {perm}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
              {roles.length === 0 && (
                <div className="p-4 text-sm text-gray-600">Nenhum tipo de acesso</div>
              )}
            </div>
          </div>
        </div>

        <div className="p-4 sm:p-6 bg-white rounded-xl border border-gray-200">
          <h2 className="text-base sm:text-lg font-semibold text-gray-900 mb-4">Campos Personalizados</h2>
          <div className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <input
                placeholder="Rótulo (ex: Empresa)"
                value={newField.label}
                onChange={(e) => setNewField((p) => ({ ...p, label: e.target.value }))}
                className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              />
              <select
                value={newField.type}
                onChange={(e) => setNewField((p) => ({ ...p, type: e.target.value as CustomField["type"] }))}
                className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              >
                <option value="text">Texto</option>
                <option value="number">Número</option>
                <option value="date">Data</option>
              </select>
              <button type="button" onClick={addField} className="px-3 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700">
                Adicionar campo
              </button>
            </div>

            <div className="divide-y divide-gray-200 border rounded-lg">
              {customFields.map((field) => (
                <div key={field.id} className="flex items-center justify-between p-3">
                  <div className="text-gray-900">
                    {field.label} <span className="text-gray-500 text-sm">({field.type})</span>
                  </div>
                  <button type="button" onClick={() => removeField(field.id)} className="text-red-600 hover:text-red-700 text-sm">
                    Remover
                  </button>
                </div>
              ))}
              {customFields.length === 0 && (
                <div className="p-4 text-sm text-gray-600">Nenhum campo personalizado</div>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-end">
        <button type="submit" className="px-4 py-2.5 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition">
          Salvar alterações
        </button>
      </div>
    </form>
  );
};

export default UserSettings;


