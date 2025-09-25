import React from "react";
import Sidebar from "@/components/Layout/SideBar";
import { Menu } from "lucide-react";

interface AppLayoutProps {
  children?: React.ReactNode;
}

const AppLayout: React.FC<AppLayoutProps> = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(false);

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
      <main className="flex-1 overflow-y-auto">
        <div className="sticky top-0 z-30 bg-white border-b border-gray-200 px-4 py-3 flex items-center gap-3">
          <button
            className="lg:hidden inline-flex items-center justify-center rounded-md p-2 hover:bg-gray-100 transition"
            onClick={() => setIsSidebarOpen((v) => !v)}
            aria-label="Abrir menu"
          >
            <Menu className="w-5 h-5" />
          </button>
          <h2 className="text-base sm:text-lg font-semibold text-gray-900">Space-Hub</h2>
        </div>
        {children}
      </main>
    </div>
  );
};

export default AppLayout;


