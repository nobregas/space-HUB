import React from "react";
import {Building2, CalendarClock, UsersRound, Mail, Save } from "lucide-react";
import GeneralSettings from "@/components/Settings/GeneralSettings.tsx";
import ReservationSettings from "@/components/Settings/ReservationSettings.tsx";
import UserSettings from "@/components/Settings/UserSettings.tsx";
import CommunicationSettings from "@/components/Settings/CommunicationSettings.tsx";
import Alert from "@/components/common/Alert";

type SettingsTab = "general" | "reservations" | "users" | "communications";

const Settings: React.FC = () => {
  const [activeTab, setActiveTab] = React.useState<SettingsTab>("general");
  const [alert, setAlert] = React.useState<{ message: string; type: 'success' | 'error' | 'warning' | 'info' } | null>(null);
  const dismissTimeoutRef = React.useRef<number | null>(null);

  const showSuccess = (msg: string) => {
    setAlert({ message: msg, type: 'success' });
    if (dismissTimeoutRef.current) {
      window.clearTimeout(dismissTimeoutRef.current);
    }
    dismissTimeoutRef.current = window.setTimeout(() => setAlert(null), 3500);
  };

  const tabs: Array<{
    id: SettingsTab;
    label: string;
    icon: React.ComponentType<{ className?: string }>;
  }> = [
    { id: "general", label: "Geral", icon: Building2 },
    { id: "reservations", label: "Salas", icon: CalendarClock },
    { id: "users", label: "Usuários", icon: UsersRound },
    { id: "communications", label: "Comunicação", icon: Mail },
  ];

  const currentFormId: Record<SettingsTab, string> = {
    general: "general-settings-form",
    reservations: "reservation-settings-form",
    users: "user-settings-form",
    communications: "communication-settings-form",
  };

  return (
    <div className="p-4 sm:p-6">
      <div className="mb-4 sm:mb-6 flex items-center justify-between gap-3">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-gray-900">Configurações</h1>
          <p className="text-gray-600 mt-1 text-sm sm:text-base">
            Personalize as preferências do seu coworking
          </p>
        </div>
        <button
          type="submit"
          form={currentFormId[activeTab]}
          className="inline-flex items-center gap-2 px-3 sm:px-4 py-2.5 bg-primary-600 hover:scale-101 text-white rounded-lg hover:bg-primary-700 transition"
        >
          <Save className="w-4 h-4" />
          <span>Salvar alterações</span>
        </button>
      </div>

      {alert && (
        <div className="mb-4">
          <Alert
            message={alert.message}
            type={alert.type}
            onClose={() => setAlert(null)}
          />
        </div>
      )}

      <div className="mb-4 border-b border-gray-200">
        <nav className="-mb-px flex flex-wrap gap-2 sm:gap-4" aria-label="Tabs">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                className={`inline-flex items-center gap-2 px-3 sm:px-4 py-2 border-b-2 text-sm font-medium hover:scale-101 focus:outline-none transition-colors ${
                  isActive
                    ? "border-primary-600 text-primary-700"
                    : "border-transparent text-gray-500 hover:scale-101 hover:text-gray-700 hover:border-gray-300"
                }`}
                onClick={() => setActiveTab(tab.id)}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </nav>
      </div>

      <div className="">
        {activeTab === "general" && (
          <GeneralSettings onSaved={() => showSuccess('Configurações gerais salvas com sucesso.')} />
        )}
        {activeTab === "reservations" && (
          <ReservationSettings onSaved={() => showSuccess('Configurações de salas salvas com sucesso.')} />
        )}
        {activeTab === "users" && (
          <UserSettings onSaved={() => showSuccess('Configurações de usuários salvas com sucesso.')} />
        )}
        {activeTab === "communications" && (
          <CommunicationSettings onSaved={() => showSuccess('Configurações de comunicação salvas com sucesso.')} />
        )}
      </div>
    </div>
  );
};

export default Settings;


