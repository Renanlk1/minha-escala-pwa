import { useMemo } from 'react';
import { ShiftType } from '@/data/schedule2025';
import { cn } from '@/lib/utils';
import { Sun, Sunset, Moon, Coffee } from 'lucide-react';

interface CalendarGridProps {
  currentDate: Date;
  getShiftForDate: (date: Date) => ShiftType;
  hasAdjustment: (date: Date) => boolean;
  onSelectDate: (date: Date) => void;
}

const weekDays = ['D', 'S', 'T', 'Q', 'Q', 'S', 'S'];

const shiftConfig: Record<ShiftType, { 
  bg: string; 
  text: string; 
  icon: React.ReactNode;
  iconColor: string;
}> = {
  m: { 
    bg: 'bg-shift-morning', 
    text: 'text-shift-morning-foreground',
    iconColor: 'text-shift-morning-icon',
    icon: <Sun className="w-3.5 h-3.5" />
  },
  t: { 
    bg: 'bg-shift-afternoon', 
    text: 'text-shift-afternoon-foreground',
    iconColor: 'text-shift-afternoon-icon',
    icon: <Sunset className="w-3.5 h-3.5" />
  },
  n: { 
    bg: 'bg-shift-night', 
    text: 'text-shift-night-foreground',
    iconColor: 'text-shift-night-icon',
    icon: <Moon className="w-3.5 h-3.5" />
  },
  f: { 
    bg: 'bg-shift-off', 
    text: 'text-shift-off-foreground',
    iconColor: 'text-shift-off-icon',
    icon: <Coffee className="w-3.5 h-3.5" />
  },
};

export function CalendarGrid({ 
  currentDate, 
  getShiftForDate, 
  hasAdjustment,
  onSelectDate 
}: CalendarGridProps) {
  const calendarDays = useMemo(() => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startDayOfWeek = firstDay.getDay();
    
    const days: (Date | null)[] = [];
    
    // Add empty cells for days before the first day of the month
    for (let i = 0; i < startDayOfWeek; i++) {
      days.push(null);
    }
    
    // Add all days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(new Date(year, month, day));
    }
    
    return days;
  }, [currentDate]);

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  return (
    <div className="px-4 py-2">
      {/* Week day headers */}
      <div className="grid grid-cols-7 gap-1 mb-2">
        {weekDays.map((day, i) => (
          <div 
            key={i} 
            className={cn(
              "text-center text-xs font-medium py-2",
              i === 0 ? "text-destructive/70" : "text-muted-foreground"
            )}
          >
            {day}
          </div>
        ))}
      </div>

      {/* Calendar days */}
      <div className="grid grid-cols-7 gap-1.5">
        {calendarDays.map((date, index) => {
          if (!date) {
            return <div key={`empty-${index}`} className="aspect-square" />;
          }

          const shift = getShiftForDate(date);
          const config = shiftConfig[shift];
          const isToday = date.getTime() === today.getTime();
          const isAdjusted = hasAdjustment(date);

          return (
            <button
              key={date.toISOString()}
              onClick={() => onSelectDate(date)}
              className={cn(
                "aspect-square rounded-xl flex flex-col items-center justify-center gap-0.5",
                "transition-all duration-200 active:scale-95",
                config.bg,
                isToday && "ring-2 ring-primary ring-offset-2 ring-offset-background"
              )}
            >
              <span className={cn("text-sm font-medium", config.text)}>
                {date.getDate()}
              </span>
              <span className={config.iconColor}>
                {config.icon}
              </span>
              {isAdjusted && (
                <div className="absolute top-1 right-1 w-1.5 h-1.5 bg-primary rounded-full" />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
