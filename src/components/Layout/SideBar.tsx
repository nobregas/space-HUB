import React from "react";
import {
  BarChart3,
  Calendar,
  Clock,
  Home,
  LogIn,
  Settings,
  Wifi,
  Users,
} from "lucide-react";

interface SidebarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeTab, onTabChange }) => {
  const menuItems = [
    { id: "dashboard", label: "Dashboard", icon: Home },
    { id: "reservations", label: "Reservas", icon: Calendar },
    { id: "checkin", label: "Check-in", icon: LogIn },
    { id: "users", label: "Usuários", icon: Users },
    { id: "reports", label: "Relatórios", icon: BarChart3 },
    { id: "events", label: "Eventos", icon: Clock },
    { id: "settings", label: "Configurações", icon: Settings },
  ];

  return (
    <div className="w-64 bg-white shadow-lg h-full flex flex-col">
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
            <Wifi className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-gray-900">Space-Hub</h1>
            <p className="text-sm text-gray-500">Coworking Management</p>
          </div>
        </div>
      </div>

      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;

            return (
              <li key={item.id}>
                <button
                  onClick={() => onTabChange(item.id)}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors duration-200 cursor-pointer ${
                    isActive
                      ? "bg-blue-50 text-blue-700 border-r-3 border-blue-700"
                      : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span className="font-medium">{item.label}</span>
                </button>
              </li>
            );
          })}
        </ul>
      </nav>

    </div>
  );
};

export default Sidebar;
