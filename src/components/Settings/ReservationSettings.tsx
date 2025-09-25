import React from "react";

type RoomDraft = {
  id: string;
  name: string;
  capacity: number;
  equipment: string[];
};

const defaultRooms: RoomDraft[] = [
  { id: "r-1", name: "Sala de Reunião Alpha", capacity: 8, equipment: ["TV", "Whiteboard"] },
  { id: "r-2", name: "Sala Beta", capacity: 4, equipment: ["Projetor"] },
];

const ReservationSettings: React.FC = () => {
  const [rooms, setRooms] = React.useState<RoomDraft[]>(defaultRooms);
  const [newRoom, setNewRoom] = React.useState<RoomDraft>({ id: "", name: "", capacity: 4, equipment: [] });
  const [policy, setPolicy] = React.useState({
    defaultDuration: 60,
    cancellationNoticeHours: 2,
    timeSlotInterval: 30,
  });

  const addRoom = () => {
    if (!newRoom.name.trim()) return;
    const roomToAdd: RoomDraft = {
      ...newRoom,
      id: `room-${Date.now()}`,
      equipment: newRoom.equipment.filter(Boolean),
    };
    setRooms((prev) => [...prev, roomToAdd]);
    setNewRoom({ id: "", name: "", capacity: 4, equipment: [] });
  };

  const removeRoom = (id: string) => {
    setRooms((prev) => prev.filter((r) => r.id !== id));
  };

  const updateEquipmentFromString = (value: string) => {
    setNewRoom((prev) => ({ ...prev, equipment: value.split(",").map((s) => s.trim()).filter(Boolean) }));
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Reservation settings saved:", { rooms, policy });
  };

  return (
    <form id="reservation-settings-form" onSubmit={handleSave} className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
        <div className="lg:col-span-2 p-4 sm:p-6 bg-white rounded-xl border border-gray-200">
          <h2 className="text-base sm:text-lg font-semibold text-gray-900 mb-4">Gestão de Salas de Reunião</h2>
          <div className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <input
                placeholder="Nome da sala"
                value={newRoom.name}
                onChange={(e) => setNewRoom((p) => ({ ...p, name: e.target.value }))}
                className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              />
              <input
                type="number"
                min={1}
                placeholder="Capacidade"
                value={newRoom.capacity}
                onChange={(e) => setNewRoom((p) => ({ ...p, capacity: Number(e.target.value) }))}
                className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              />
              <input
                placeholder="Recursos (ex: TV, Projetor)"
                value={newRoom.equipment.join(", ")}
                onChange={(e) => updateEquipmentFromString(e.target.value)}
                className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              />
            </div>
            <div className="flex justify-end">
              <button type="button" onClick={addRoom} className="px-3 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700">
                Adicionar sala
              </button>
            </div>

            <div className="divide-y divide-gray-200 border rounded-lg">
              {rooms.map((room) => (
                <div key={room.id} className="flex items-center justify-between p-3">
                  <div>
                    <div className="font-medium text-gray-900">{room.name}</div>
                    <div className="text-sm text-gray-600">Capacidade: {room.capacity} • {room.equipment.join(", ") || "Sem recursos"}</div>
                  </div>
                  <button type="button" onClick={() => removeRoom(room.id)} className="text-red-600 hover:text-red-700 text-sm">
                    Remover
                  </button>
                </div>
              ))}
              {rooms.length === 0 && (
                <div className="p-4 text-sm text-gray-600">Nenhuma sala cadastrada</div>
              )}
            </div>
          </div>
        </div>

        <div className="p-4 sm:p-6 bg-white rounded-xl border border-gray-200">
          <h2 className="text-base sm:text-lg font-semibold text-gray-900 mb-4">Políticas e Duração Padrão</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Duração padrão (min)</label>
              <input
                type="number"
                min={15}
                step={15}
                value={policy.defaultDuration}
                onChange={(e) => setPolicy((p) => ({ ...p, defaultDuration: Number(e.target.value) }))}
                className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Intervalo de horários (min)</label>
              <input
                type="number"
                min={15}
                step={15}
                value={policy.timeSlotInterval}
                onChange={(e) => setPolicy((p) => ({ ...p, timeSlotInterval: Number(e.target.value) }))}
                className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Aviso mínimo p/ cancelamento (horas)</label>
              <input
                type="number"
                min={0}
                step={1}
                value={policy.cancellationNoticeHours}
                onChange={(e) => setPolicy((p) => ({ ...p, cancellationNoticeHours: Number(e.target.value) }))}
                className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              />
            </div>
          </div>
        </div>
      </div>

    
    </form>
  );
};

export default ReservationSettings;


