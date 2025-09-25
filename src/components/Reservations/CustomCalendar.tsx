import React, { useMemo, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface CustomCalendarProps {
  selectedDate: Date;
  onDateChange: (date: Date) => void;
  onRangeChange?: (range: { start: Date; end: Date }) => void;
  unavailableDates?: string[]; // ISO dates (YYYY-MM-DD) esgotados
}

const WEEK_DAYS = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];

function startOfDay(date: Date) {
  const d = new Date(date);
  d.setHours(0, 0, 0, 0);
  return d;
}

function isSameDay(a: Date, b: Date) {
  return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();
}

const CustomCalendar: React.FC<CustomCalendarProps> = ({ selectedDate, onDateChange, onRangeChange, unavailableDates }) => {
  const [visibleMonth, setVisibleMonth] = useState<Date>(startOfDay(selectedDate));
  const [rangeStart, setRangeStart] = useState<Date | null>(null);
  const [rangeEnd, setRangeEnd] = useState<Date | null>(null);

  const today = useMemo(() => startOfDay(new Date()), []);

  const monthMatrix = useMemo(() => {
    const year = visibleMonth.getFullYear();
    const month = visibleMonth.getMonth();
    const firstDayOfMonth = new Date(year, month, 1);
    const lastDayOfMonth = new Date(year, month + 1, 0);

    const startWeekDay = (firstDayOfMonth.getDay() + 7) % 7; // 0=Dom
    const daysInMonth = lastDayOfMonth.getDate();

    const cells: { date: Date; inCurrentMonth: boolean }[] = [];

    // Days from previous month to fill grid start
    for (let i = 0; i < startWeekDay; i++) {
      const d = new Date(year, month, -i);
      d.setDate(1 - (startWeekDay - i));
      cells.push({ date: startOfDay(d), inCurrentMonth: false });
    }

    // Current month days
    for (let d = 1; d <= daysInMonth; d++) {
      cells.push({ date: startOfDay(new Date(year, month, d)), inCurrentMonth: true });
    }

    // Next month days to complete 42 cells (6 weeks)
    const remaining = 42 - cells.length;
    for (let i = 1; i <= remaining; i++) {
      cells.push({ date: startOfDay(new Date(year, month + 1, i)), inCurrentMonth: false });
    }

    return cells;
  }, [visibleMonth]);

  const handlePrev = () => {
    setVisibleMonth(new Date(visibleMonth.getFullYear(), visibleMonth.getMonth() - 1, 1));
  };

  const handleNext = () => {
    setVisibleMonth(new Date(visibleMonth.getFullYear(), visibleMonth.getMonth() + 1, 1));
  };

  const isInSelectedRange = (date: Date) => {
    if (!rangeStart || !rangeEnd) return false;
    const d = startOfDay(date).getTime();
    return d >= startOfDay(rangeStart).getTime() && d <= startOfDay(rangeEnd).getTime();
  };

  const handleSelectDate = (date: Date) => {
    const d = startOfDay(date);

    // Disable past dates
    if (d < today) return;

    if (!onRangeChange) {
      onDateChange(d);
      setRangeStart(null);
      setRangeEnd(null);
      return;
    }

    // Range selection flow
    if (!rangeStart) {
      setRangeStart(d);
      setRangeEnd(null);
      onDateChange(d);
      return;
    }

    if (rangeStart && !rangeEnd) {
      if (d < rangeStart) {
        setRangeStart(d);
        onDateChange(d);
        return;
      }
      setRangeEnd(d);
      onRangeChange({ start: rangeStart, end: d });
      return;
    }

    // Restart range
    setRangeStart(d);
    setRangeEnd(null);
    onDateChange(d);
  };

  const monthLabel = visibleMonth.toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' });

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-4 sm:p-5 md:p-6">
      <div className="flex items-center justify-between mb-3">
        <button onClick={handlePrev} className="p-2 rounded-lg hover:bg-gray-100 text-gray-600" aria-label="Mês anterior">
          <ChevronLeft className="w-5 h-5" />
        </button>
        <div className="font-semibold text-lg sm:text-xl text-gray-800 capitalize tracking-wide">
          {monthLabel}
        </div>
        <button onClick={handleNext} className="p-2 rounded-lg hover:bg-gray-100 text-gray-600" aria-label="Próximo mês">
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      <div className="grid grid-cols-7 gap-1 text-center text-[11px] md:text-xs text-gray-500 font-semibold uppercase">
        {WEEK_DAYS.map((d) => (
          <div key={d} className="py-1">{d}</div>
        ))}
      </div>

      <div className="mt-1 grid grid-cols-7 gap-1">
        {monthMatrix.map(({ date, inCurrentMonth }, idx) => {
          const isToday = isSameDay(date, today);
          const isSelected = isSameDay(date, selectedDate);
          const isPast = date < today;
          const inRange = isInSelectedRange(date);
          const iso = date.toISOString().split('T')[0];
          const isUnavailable = !!unavailableDates?.includes(iso);

          return (
            <button
              key={idx}
              onClick={() => handleSelectDate(date)}
              disabled={isPast}
              className={[
                'relative h-9 w-9 sm:h-10 sm:w-10 md:h-11 md:w-11 flex items-center justify-center rounded-full transition-colors',
                inCurrentMonth ? 'text-gray-800' : 'text-gray-400',
                isPast ? 'opacity-40 cursor-not-allowed' : 'hover:bg-gray-100',
                isSelected ? 'bg-primary-600 text-white font-medium shadow' : '',
                inRange && !isSelected ? 'bg-primary-100 text-primary-800' : '',
                isToday && !isSelected ? 'ring-2 ring-primary-500' : '',
                isUnavailable && !isSelected ? 'bg-red-50 text-red-700 ring-1 ring-red-200' : '',
              ].join(' ')}
              aria-label={isUnavailable ? 'Sem espaços disponíveis' : undefined}
            >
              {date.getDate()}
              {isUnavailable && !isSelected && (
                <span className="absolute bottom-0.5 right-0.5 inline-block h-1.5 w-1.5 rounded-full bg-red-500" />
              )}
            </button>
          );
        })}
      </div>

      <div className="mt-3 flex items-center gap-3 text-xs text-gray-500">
        <div className="flex items-center gap-1"><span className="inline-block h-3 w-3 rounded-full bg-primary-600" /> Selecionado</div>
        <div className="flex items-center gap-1"><span className="inline-block h-3 w-3 rounded-full bg-primary-100 border border-primary-300" /> Intervalo</div>
        <div className="flex items-center gap-1"><span className="inline-block h-3 w-3 rounded-full ring-2 ring-primary-500" /> Hoje</div>
        <div className="flex items-center gap-1"><span className="inline-block h-3 w-3 rounded-full bg-red-500" /> Esgotado</div>
      </div>
    </div>
  );
};

export default CustomCalendar;


