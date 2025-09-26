import React from "react";

type Templates = {
  welcome: string;
  reservationConfirmation: string;
  eventReminder: string;
};

const defaultTemplates: Templates = {
  welcome: "Bem-vindo(a) {{nome}} ao Space-Hub!",
  reservationConfirmation:
    "Sua reserva para o inovation hub para {{data}} às {{hora}} foi confirmada.",
  eventReminder: "Lembrete: Evento '{{titulo}}' em {{data}} às {{hora}}.",
};

type CommunicationSettingsProps = {
  onSaved?: () => void;
};

const CommunicationSettings: React.FC<CommunicationSettingsProps> = ({
  onSaved,
}) => {
  const [templates, setTemplates] = React.useState<Templates>(defaultTemplates);
  const [notifications, setNotifications] = React.useState({
    checkinAlerts: true,
    checkoutAlerts: false,
    reservationEmails: true,
  });

  const handleTemplateChange = (key: keyof Templates, value: string) => {
    setTemplates((prev) => ({ ...prev, [key]: value }));
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Communication settings:", { templates, notifications });
    onSaved?.();
  };

  return (
    <form
      id="communication-settings-form"
      onSubmit={handleSave}
      className="space-y-6"
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
        <div className="p-4 sm:p-6 bg-white rounded-xl border border-gray-200">
          <h2 className="text-base sm:text-lg font-semibold text-gray-900 mb-4">
            Modelos de E-mail
          </h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Boas-vindas
              </label>
              <textarea
                value={templates.welcome}
                onChange={(e) =>
                  handleTemplateChange("welcome", e.target.value)
                }
                rows={3}
                className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Confirmação de reserva
              </label>
              <textarea
                value={templates.reservationConfirmation}
                onChange={(e) =>
                  handleTemplateChange(
                    "reservationConfirmation",
                    e.target.value
                  )
                }
                rows={3}
                className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Lembrete de evento
              </label>
              <textarea
                value={templates.eventReminder}
                onChange={(e) =>
                  handleTemplateChange("eventReminder", e.target.value)
                }
                rows={3}
                className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              />
            </div>
            <p className="text-xs text-gray-500">
              Use variáveis como {"{{nome}}"}, {"{{data}}"}, {"{{hora}}"},{" "}
              {"{{sala}}"}.
            </p>
          </div>
        </div>

        <div className="p-4 sm:p-6 bg-white rounded-xl border border-gray-200">
          <h2 className="text-base sm:text-lg font-semibold text-gray-900 mb-4">
            Notificações do Sistema
          </h2>
          <div className="space-y-4">
            <label className="flex items-center gap-3">
              <input
                type="checkbox"
                checked={notifications.checkinAlerts}
                onChange={(e) =>
                  setNotifications((p) => ({
                    ...p,
                    checkinAlerts: e.target.checked,
                  }))
                }
              />
              <span>Alertas de check-in</span>
            </label>
            <label className="flex items-center gap-3">
              <input
                type="checkbox"
                checked={notifications.checkoutAlerts}
                onChange={(e) =>
                  setNotifications((p) => ({
                    ...p,
                    checkoutAlerts: e.target.checked,
                  }))
                }
              />
              <span>Alertas de check-out</span>
            </label>
            <label className="flex items-center gap-3">
              <input
                type="checkbox"
                checked={notifications.reservationEmails}
                onChange={(e) =>
                  setNotifications((p) => ({
                    ...p,
                    reservationEmails: e.target.checked,
                  }))
                }
              />
              <span>Enviar e-mails de reserva</span>
            </label>
          </div>
        </div>
      </div>
    </form>
  );
};

export default CommunicationSettings;
