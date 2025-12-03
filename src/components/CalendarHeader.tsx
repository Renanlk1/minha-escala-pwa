import { ChevronLeft, ChevronRight, Settings } from 'lucide-react';
import { Team } from '@/data/schedule2025';

interface CalendarHeaderProps {
  currentDate: Date;
  team: Team;
  onPrevMonth: () => void;
  onNextMonth: () => void;
  onOpenSettings: () => void;
}

const monthNames = [
  'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
  'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
];

export function CalendarHeader({ 
  currentDate, 
  team, 
  onPrevMonth, 
  onNextMonth,
  onOpenSettings 
}: CalendarHeaderProps) {
  const month = currentDate.getMonth();
  const year = currentDate.getFullYear();

  return (
    <header className="px-4 pt-4 pb-2">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center">
            <span className="text-primary-foreground font-semibold">{team}</span>
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Equipe</p>
            <p className="font-medium text-foreground">Turma {team}</p>
          </div>
        </div>
        
        <button 
          onClick={onOpenSettings}
          className="w-10 h-10 rounded-xl bg-secondary flex items-center justify-center hover:bg-accent transition-colors"
        >
          <Settings className="w-5 h-5 text-muted-foreground" />
        </button>
      </div>

      <div className="flex items-center justify-between">
        <button
          onClick={onPrevMonth}
          className="w-10 h-10 rounded-xl bg-secondary flex items-center justify-center hover:bg-accent transition-colors active:scale-95"
        >
          <ChevronLeft className="w-5 h-5 text-foreground" />
        </button>
        
        <div className="text-center">
          <h2 className="text-xl font-semibold text-foreground">{monthNames[month]}</h2>
          <p className="text-sm text-muted-foreground">{year}</p>
        </div>
        
        <button
          onClick={onNextMonth}
          className="w-10 h-10 rounded-xl bg-secondary flex items-center justify-center hover:bg-accent transition-colors active:scale-95"
        >
          <ChevronRight className="w-5 h-5 text-foreground" />
        </button>
      </div>
    </header>
  );
}
