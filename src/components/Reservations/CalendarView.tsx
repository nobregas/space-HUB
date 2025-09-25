import React from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { ChevronLeft, ChevronRight } from 'lucide-react';

type ValuePiece = Date | null;
type Value = ValuePiece | [ValuePiece, ValuePiece];

interface CalendarViewProps {
  selectedDate: Date;
  onDateChange: (date: Date) => void;
  onRangeChange?: (range: { start: Date; end: Date }) => void;
}

const CalendarView: React.FC<CalendarViewProps> = ({ selectedDate, onDateChange, onRangeChange }) => {
  const handleDateChange = (value: Value) => {
    if (value instanceof Date) {
      onDateChange(value);
      return;
    }
    if (Array.isArray(value) && value[0] instanceof Date && value[1] instanceof Date) {
      if (onRangeChange) {
        onRangeChange({ start: value[0] as Date, end: value[1] as Date });
      }
    }
  };

  const isWeekend = (date: Date) => {
    const day = date.getDay();
    return day === 0 || day === 6;
  };

  const isFixedBrazilHoliday = (date: Date) => {
    const month = date.getMonth() + 1; // 1-12
    const day = date.getDate();
    const mmdd = `${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    const fixed = new Set([
      '01-01', // Confraternização Universal
      '04-21', // Tiradentes
      '05-01', // Dia do Trabalho
      '09-07', // Independência do Brasil
      '10-12', // Nossa Senhora Aparecida
      '11-02', // Finados
      '11-15', // Proclamação da República
      '12-25', // Natal
    ]);
    return fixed.has(mmdd);
  };

  const tileClassName = ({ date, view }: { date: Date; view: string }) => {
    if (view !== 'month') return null;

    const classes = ['relative', 'flex', 'items-center', 'justify-center', 'h-9', 'w-9', 'sm:h-10', 'sm:w-10', 'md:h-11', 'md:w-11', 'rounded-full', 'transition-colors', 'duration-150', 'text-[11px]', 'md:text-xs'];

    const isToday = date.toDateString() === new Date().toDateString();
    const isSelected = date.toDateString() === selectedDate.toDateString();
    const weekend = isWeekend(date);
    const holiday = isFixedBrazilHoliday(date);

    if (isSelected) {
      classes.push('bg-primary-600', 'text-white', 'font-medium', 'shadow');
    } else if (isToday) {
      classes.push('ring-2', 'ring-primary-500', 'text-gray-900', 'font-medium');
    } else {
      classes.push('hover:bg-gray-100', 'text-gray-700');
    }

    if (holiday) {
      classes.push('ring-2', 'ring-primary-300');
    } else if (weekend) {
      classes.push('text-gray-500');
    }

    return classes.join(' ');
  };

  const tileContent = ({ date, view }: { date: Date; view: string }) => {
    if (view !== 'month') return null;
    if (isFixedBrazilHoliday(date)) {
      return (
        <span className="absolute bottom-0.5 h-1 w-1 rounded-full bg-primary-500" />
      );
    }
    if (isWeekend(date)) {
      return <span className="absolute bottom-0.5 h-1 w-1 rounded-full bg-gray-300" />;
    }
    return null;
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-3 sm:p-4 md:p-6">
      <style>
        {`
          .react-calendar {
            width: 100%;
            background: transparent;
          }
          .react-calendar__navigation {
            display: grid;
            grid-template-columns: auto 1fr auto;
            align-items: center;
            margin-bottom: 0.75rem;
          }
          .react-calendar__navigation__label {
            pointer-events: none;
          }
          .react-calendar__tile { padding: 0.2rem; }
          @media (min-width: 640px) { .react-calendar__tile { padding: 0.3rem; } }
          @media (min-width: 1024px) { .react-calendar__tile { padding: 0.35rem; } }
          .react-calendar__month-view__weekdays__weekday {
            text-align: center;
          }
          .react-calendar__month-view__weekdays__weekday abbr {
            text-decoration: none;
            font-size: 0.75rem;
            font-weight: 600;
            text-transform: uppercase;
            color: #6b7280;
          }
          .react-calendar__tile:disabled,
          .react-calendar__tile--disabled {
            background: #f3f4f6;
            color: #9ca3af;
            cursor: not-allowed;
          }
          .react-calendar__tile--range,
          .react-calendar__tile--rangeStart,
          .react-calendar__tile--rangeEnd {
            background: rgba(37, 99, 235, 0.08);
          }
          .react-calendar__tile--rangeStart .react-calendar__tile-content,
          .react-calendar__tile--rangeEnd .react-calendar__tile-content {
            font-weight: 700;
          }
        `}
      </style>
      <Calendar
        onChange={handleDateChange}
        value={selectedDate}
        minDate={new Date()}
        locale="pt-BR"
        className="!border-0"
        selectRange
        navigationLabel={({ label }) => (
          <span className="font-semibold text-lg sm:text-xl text-gray-800 tracking-wide">{label}</span>
        )}
        next2Label={null}
        prev2Label={null}
        nextLabel={<ChevronRight className="h-6 w-6 text-gray-500 hover:text-primary-600 transition-colors" />}
        prevLabel={<ChevronLeft className="h-6 w-6 text-gray-500 hover:text-primary-600 transition-colors" />}
        tileClassName={tileClassName}
        tileContent={tileContent as any}
      />
    </div>
  );
};

export default CalendarView;