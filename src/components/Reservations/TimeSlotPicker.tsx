
import React from 'react';
import type { Reservation, Room } from '@/types';

interface TimeSlotPickerProps {
  room: Room;
  selectedDate: string;
  reservations: Reservation[];
  selectedTimeRange: { start: string | null; end: string | null };
  onSelectTimeRange: (range: { start: string | null; end: string | null }) => void;
}

const TimeSlotPicker: React.FC<TimeSlotPickerProps> = ({ room, selectedDate, reservations, selectedTimeRange, onSelectTimeRange }) => {
  const timeSlots = Array.from({ length: 21 }, (_, i) => {
    const hour = Math.floor(i / 2) + 8;
    const minute = i % 2 === 0 ? '00' : '30';
    return `${String(hour).padStart(2, '0')}:${minute}`;
  });

  const getIsSlotOccupied = (slot: string) => {
    if (!selectedDate) return true;
    const slotTime = new Date(`${selectedDate}T${slot}:00`);
    return reservations.some(res => {
      if (res.roomId !== room.id || res.date !== selectedDate) return false;
      const resStartTime = new Date(`${res.date}T${res.startTime}:00`);
      const resEndTime = new Date(`${res.date}T${res.endTime}:00`);
      return slotTime >= resStartTime && slotTime < resEndTime;
    });
  };

  const handleSelectSlot = (slot: string) => {
    if (getIsSlotOccupied(slot)) {
      return;
    }

    const { start, end } = selectedTimeRange;

    if (start && end) {
      // A full range is selected, so reset and start a new selection
      onSelectTimeRange({ start: slot, end: null });
      return;
    }

    if (!start) {
      // Nothing selected yet, so set start time
      onSelectTimeRange({ start: slot, end: null });
      return;
    }

    if (start && !end) {
      // Start is selected, now select end
      const startIndex = timeSlots.indexOf(start);
      const endIndex = timeSlots.indexOf(slot);

      if (slot === start) {
        // User clicked the same slot again, so deselect
        onSelectTimeRange({ start: null, end: null });
        return;
      }

      if (endIndex < startIndex) {
        // User selected an end time before the start time, so reset and set new start time
        onSelectTimeRange({ start: slot, end: null });
        return;
      }

      // Check for occupied slots in the range
      for (let i = startIndex; i <= endIndex; i++) {
        if (getIsSlotOccupied(timeSlots[i])) {
          alert('O intervalo selecionado contém horários já ocupados.');
          onSelectTimeRange({ start: null, end: null });
          return;
        }
      }

      // Valid range, set end time
      onSelectTimeRange({ start, end: slot });
      return;
    }
  };

  const isSlotInRange = (slot: string) => {
    const { start, end } = selectedTimeRange;
    if (!start || !end) return false;
    const startIndex = timeSlots.indexOf(start);
    const endIndex = timeSlots.indexOf(end);
    const currentIndex = timeSlots.indexOf(slot);
    return currentIndex >= startIndex && currentIndex <= endIndex;
  };

  return (
    <div>
      <h4 className="font-medium text-gray-800 mb-3">Selecione um ou mais horários:</h4>
      {selectedTimeRange.start && !selectedTimeRange.end && (
        <p className="text-sm text-primary-700 mb-2">Selecione o horário de término.</p>
      )}
      <div className="grid grid-cols-4 gap-2">
        {timeSlots.map(slot => {
          const isOccupied = getIsSlotOccupied(slot);
          const isSelected = selectedTimeRange.start === slot || selectedTimeRange.end === slot;
          const isInRange = isSlotInRange(slot);

          return (
            <button
              key={slot}
              onClick={() => handleSelectSlot(slot)}
              disabled={isOccupied}
              className={`p-2 rounded-lg text-sm transition-colors duration-150 ${
                isOccupied
                  ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                  : isInRange
                  ? 'bg-primary-600 text-white font-semibold'
                  : isSelected
                  ? 'bg-primary-500 text-white'
                  : 'bg-primary-50 text-primary-700 hover:bg-primary-100'
              }`}
            >
              {slot}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default TimeSlotPicker;
