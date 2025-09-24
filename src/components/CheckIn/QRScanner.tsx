import React, { useState } from "react";
import { QrCode, UserCheck, LogOut, Clock } from "lucide-react";
import type { User } from "@/types";

interface QRScannerProps {
  currentUser: User | null;
  onCheckIn: (userId: string) => void;
  onCheckOut: (userId: string) => void;
}

const QRScanner: React.FC<QRScannerProps> = ({
  currentUser,
  onCheckIn,
  onCheckOut,
}) => {
  const [manualCode, setManualCode] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);

  const handleManualEntry = () => {
    if (manualCode.length >= 6) {
      // Simular check-in/out baseado no código
      if (currentUser?.isCheckedIn) {
        onCheckOut(currentUser.id);
      } else {
        onCheckIn("1"); // Simular usuário atual
      }
      setManualCode("");
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
    }
  };

  const handleQuickAction = () => {
    if (currentUser?.isCheckedIn) {
      onCheckOut(currentUser.id);
    } else {
      onCheckIn("1");
    }
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  return (
    <div className="max-w-md mx-auto">
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 text-center">
        <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <QrCode className="w-8 h-8 text-blue-600" />
        </div>

        <h2 className="text-xl font-semibold text-gray-900 mb-2">
          {currentUser?.isCheckedIn ? "Check-out" : "Check-in"}
        </h2>

        {currentUser?.isCheckedIn && (
          <div className="mb-4 p-3 bg-green-50 rounded-lg">
            <div className="flex items-center justify-center space-x-2 text-green-700">
              <Clock className="w-4 h-4" />
              <span className="text-sm">
                Check-in realizado às {currentUser.checkInTime}
              </span>
            </div>
          </div>
        )}

        <p className="text-gray-600 mb-6">
          {currentUser?.isCheckedIn
            ? "Confirme sua saída do espaço"
            : "Escaneie o QR Code ou digite seu código de acesso"}
        </p>

        {/* Área de QR Code simulada */}
        <div className="mb-6 p-8 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
          <div className="w-32 h-32 bg-white border-4 border-gray-400 mx-auto rounded-lg flex items-center justify-center">
            <QrCode className="w-16 h-16 text-gray-400" />
          </div>
          <p className="text-sm text-gray-500 mt-2">Posicione o QR Code aqui</p>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Ou digite seu código:
            </label>
            <div className="flex space-x-2">
              <input
                type="text"
                value={manualCode}
                onChange={(e) =>
                  setManualCode(e.target.value.replace(/\D/g, "").slice(0, 6))
                }
                placeholder="123456"
                className="flex-1 p-3 text-center text-lg font-mono border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                maxLength={6}
              />
              <button
                onClick={handleManualEntry}
                disabled={manualCode.length < 6}
                className={`px-6 py-3 rounded-lg font-medium transition-colors duration-200 ${
                  manualCode.length >= 6
                    ? "bg-blue-600 text-white hover:bg-blue-700"
                    : "bg-gray-200 text-gray-500 cursor-not-allowed"
                }`}
              >
                OK
              </button>
            </div>
          </div>

          <div className="border-t pt-4">
            <button
              onClick={handleQuickAction}
              className={`w-full py-3 px-4 rounded-lg font-medium transition-colors duration-200 flex items-center justify-center space-x-2 ${
                currentUser?.isCheckedIn
                  ? "bg-orange-600 text-white hover:bg-orange-700"
                  : "bg-green-600 text-white hover:bg-green-700"
              }`}
            >
              {currentUser?.isCheckedIn ? (
                <>
                  <LogOut className="w-5 h-5" />
                  <span>Check-out Rápido</span>
                </>
              ) : (
                <>
                  <UserCheck className="w-5 h-5" />
                  <span>Check-in Rápido</span>
                </>
              )}
            </button>
          </div>
        </div>

        {showSuccess && (
          <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg">
            <div className="flex items-center justify-center space-x-2 text-green-700">
              <UserCheck className="w-5 h-5" />
              <span className="font-medium">
                {currentUser?.isCheckedIn ? "Check-out" : "Check-in"} realizado
                com sucesso!
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default QRScanner;
