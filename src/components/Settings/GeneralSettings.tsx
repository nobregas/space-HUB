import React from "react";
import { ImagePlus } from "lucide-react";

type GeneralSettingsProps = {
  onSaved?: () => void;
};

const GeneralSettings: React.FC<GeneralSettingsProps> = ({ onSaved }) => {
  const [form, setForm] = React.useState({
    spaceName: "Space-Hub Coworking",
    address: "",
    contactEmail: "",
    contactPhone: "",
    description: "",
    openTime: "08:00",
    closeTime: "18:00",
    logoFile: null as File | null,
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] ?? null;
    setForm((prev) => ({ ...prev, logoFile: file }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Placeholder: integrar com backend/local storage futuramente
    console.log("General settings saved:", form);
    onSaved?.();
  };

  return (
    <form id="general-settings-form" onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
        <div className="lg:col-span-2 p-4 sm:p-6 bg-white rounded-xl border border-gray-200">
          <h2 className="text-base sm:text-lg font-semibold text-gray-900 mb-4">
            Informações do Coworking
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Nome do espaço</label>
              <input
                name="spaceName"
                value={form.spaceName}
                onChange={handleChange}
                className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                placeholder="Ex: Space-Hub Coworking"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Telefone de contato</label>
              <input
                name="contactPhone"
                value={form.contactPhone}
                onChange={handleChange}
                className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                placeholder="Ex: (11) 99999-9999"
              />
            </div>
            <div className="sm:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">Endereço</label>
              <input
                name="address"
                value={form.address}
                onChange={handleChange}
                className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                placeholder="Rua Exemplo, 123 - Bairro - Cidade"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">E-mail de contato</label>
              <input
                type="email"
                name="contactEmail"
                value={form.contactEmail}
                onChange={handleChange}
                className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                placeholder="contato@spacehub.com"
              />
            </div>
            <div className="sm:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">Descrição</label>
              <textarea
                name="description"
                value={form.description}
                onChange={handleChange}
                rows={4}
                className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                placeholder="Fale um pouco sobre o seu espaço..."
              />
            </div>
          </div>
        </div>

        <div className="p-4 sm:p-6 bg-white rounded-xl border border-gray-200">
          <h2 className="text-base sm:text-lg font-semibold text-gray-900 mb-4">
            Logo e Identidade Visual
          </h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Upload do logo</label>
              <label
                htmlFor="logoUpload"
                className="inline-flex items-center gap-2 px-3 py-2 border border-gray-300 rounded-lg bg-white text-gray-700 hover:bg-gray-50 cursor-pointer"
              >
                <ImagePlus className="w-4 h-4" />
                <span>Selecionar arquivo</span>
              </label>
              <input
                id="logoUpload"
                type="file"
                accept="image/*"
                onChange={handleLogoChange}
                className="hidden"
              />
            </div>
            {form.logoFile && (
              <div className="text-sm text-gray-600">Arquivo selecionado: {form.logoFile.name}</div>
            )}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Horário de funcionamento</label>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <span className="block text-xs text-gray-500 mb-1">Abertura</span>
                  <input
                    type="time"
                    name="openTime"
                    value={form.openTime}
                    onChange={handleChange}
                    className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  />
                </div>
                <div>
                  <span className="block text-xs text-gray-500 mb-1">Fechamento</span>
                  <input
                    type="time"
                    name="closeTime"
                    value={form.closeTime}
                    onChange={handleChange}
                    className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      
    </form>
  );
};

export default GeneralSettings;


