import { X, Sun, Sunset, Moon, Coffee } from 'lucide-react';
import { ShiftType } from '@/data/schedule2025';
import { cn } from '@/lib/utils';

interface AdjustmentModalProps {
  date: Date;
  currentShift: ShiftType;
  onSelect: (shift: ShiftType) => void;
  onClose: () => void;
}

const monthNames = [
  'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
  'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
];

const shiftOptions: { type: ShiftType; label: string; icon: React.ReactNode; time: string }[] = [
  { type: 'm', label: 'Manhã', icon: <Sun className="w-6 h-6" />, time: '06:50 - 15:10' },
  { type: 't', label: 'Tarde', icon: <Sunset className="w-6 h-6" />, time: '14:50 - 23:10' },
  { type: 'n', label: 'Noite', icon: <Moon className="w-6 h-6" />, time: '22:50 - 07:10' },
  { type: 'f', label: 'Folga', icon: <Coffee className="w-6 h-6" />, time: 'Dia livre' },
];

const shiftColors: Record<ShiftType, { bg: string; text: string; icon: string; selected: string }> = {
  m: { 
    bg: 'bg-shift-morning', 
    text: 'text-shift-morning-foreground', 
    icon: 'text-shift-morning-icon',
    selected: 'ring-2 ring-shift-morning-icon'
  },
  t: { 
    bg: 'bg-shift-afternoon', 
    text: 'text-shift-afternoon-foreground', 
    icon: 'text-shift-afternoon-icon',
    selected: 'ring-2 ring-shift-afternoon-icon'
  },
  n: { 
    bg: 'bg-shift-night', 
    text: 'text-shift-night-foreground', 
    icon: 'text-shift-night-icon',
    selected: 'ring-2 ring-shift-night-icon'
  },
  f: { 
    bg: 'bg-shift-off', 
    text: 'text-shift-off-foreground', 
    icon: 'text-shift-off-icon',
    selected: 'ring-2 ring-shift-off-icon'
  },
};

export function AdjustmentModal({ date, currentShift, onSelect, onClose }: AdjustmentModalProps) {
  return (
    <div 
      className="fixed inset-0 z-50 flex items-end justify-center bg-foreground/20 backdrop-blur-sm animate-fade-in"
      onClick={onClose}
    >
      <div 
        className="w-full max-w-md bg-card rounded-t-3xl p-6 pb-10 shadow-2xl animate-slide-up"
        onClick={e => e.stopPropagation()}
      >
        <div className="w-12 h-1 bg-muted rounded-full mx-auto mb-4" />
        
        <div className="flex items-center justify-between mb-6">
          <div>
            <p className="text-sm text-muted-foreground">Ajustar escala para</p>
            <h2 className="text-xl font-semibold text-foreground">
              {date.getDate()} de {monthNames[date.getMonth()]}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center hover:bg-accent transition-colors"
          >
            <X className="w-5 h-5 text-muted-foreground" />
          </button>
        </div>

        <div className="space-y-3">
          {shiftOptions.map((option) => {
            const colors = shiftColors[option.type];
            const isSelected = option.type === currentShift;
            
            return (
              <button
                key={option.type}
                onClick={() => onSelect(option.type)}
                className={cn(
                  "w-full rounded-xl p-4 flex items-center gap-4 transition-all active:scale-[0.98]",
                  colors.bg,
                  isSelected && colors.selected
                )}
              >
                <div className={colors.icon}>
                  {option.icon}
                </div>
                <div className="text-left flex-1">
                  <p className={cn("font-medium", colors.text)}>{option.label}</p>
                  <p className={cn("text-sm opacity-70", colors.text)}>{option.time}</p>
                </div>
                {isSelected && (
                  <div className={cn("w-6 h-6 rounded-full bg-background/30 flex items-center justify-center", colors.text)}>
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                )}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
