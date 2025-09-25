import React from "react";
import {
  BarChart3,
  Calendar,
  Clock,
  Home,
  LogIn,
  Settings,
  Users,
  Eclipse,
} from "lucide-react";
import { NavLink } from "react-router-dom";

interface SidebarProps {
  isOpen?: boolean; // controla visibilidade no mobile
  onClose?: () => void; // fecha ao clicar fora ou em um item
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen = true, onClose }) => {
  const menuItems = [
    { id: "dashboard", label: "Dashboard", icon: Home, path: "/dashboard" },
    { id: "reservations", label: "Reservas", icon: Calendar, path: "/reservations" },
    { id: "checkin", label: "Check-in", icon: LogIn, path: "/checkin" },
    { id: "users", label: "Usuários", icon: Users, path: "/users" },
    { id: "reports", label: "Relatórios", icon: BarChart3, path: "/reports" },
    { id: "events", label: "Eventos", icon: Clock, path: "/events" },
    { id: "settings", label: "Configurações", icon: Settings, path: "/settings" },
  ];

  return (
    <>
    {/* Overlay para mobile */}
    <div
      className={`fixed inset-0 bg-black/40 transition-opacity duration-300 lg:hidden ${
        isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
      }`}
      onClick={onClose}
    />
    <div
      className={`fixed top-0 left-0 z-40 h-[100dvh] w-64 bg-white shadow-lg flex flex-col transform transition-transform duration-300 ease-in-out
      ${isOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0 lg:sticky lg:top-0 lg:h-[100dvh]`}
    >
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10  rounded-lg flex items-center justify-center">
            <Eclipse className="w-6 h-6 text-gray-900" />
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

            return (
              <li key={item.id}>
                <NavLink
                  to={item.path}
                  className={({ isActive }) =>
                    `w-full flex items-center space-x-3 px-4 py-3 rounded-lg hover:scale-101 hover:shadow-md transition-colors duration-200 cursor-pointer ${
                      isActive
                        ? "bg-blue-50 text-blue-700 border-r-3 border-blue-700"
                        : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                    }`
                  }
                  onClick={onClose}
                >
                  <Icon className="w-5 h-5" />
                  <span className="font-medium">{item.label}</span>
                </NavLink>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
    </>
  );
};

export default Sidebar;
