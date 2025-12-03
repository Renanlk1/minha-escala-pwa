import { X, Sun, Sunset, Moon, Coffee, Edit3 } from 'lucide-react';
import { ShiftType, SHIFT_TIMES } from '@/data/schedule2025';
import { cn } from '@/lib/utils';

interface DayDetailModalProps {
  date: Date;
  shift: ShiftType;
  hasAdjustment: boolean;
  onClose: () => void;
  onAdjust: () => void;
  onRemoveAdjustment: () => void;
}

const dayNames = ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'];
const monthNames = [
  'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
  'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
];

const shiftDetails: Record<ShiftType, {
  label: string;
  icon: React.ReactNode;
  bg: string;
  text: string;
  iconColor: string;
}> = {
  m: {
    label: 'Turno da Manhã',
    icon: <Sun className="w-8 h-8" />,
    bg: 'bg-shift-morning',
    text: 'text-shift-morning-foreground',
    iconColor: 'text-shift-morning-icon',
  },
  t: {
    label: 'Turno da Tarde',
    icon: <Sunset className="w-8 h-8" />,
    bg: 'bg-shift-afternoon',
    text: 'text-shift-afternoon-foreground',
    iconColor: 'text-shift-afternoon-icon',
  },
  n: {
    label: 'Turno da Noite',
    icon: <Moon className="w-8 h-8" />,
    bg: 'bg-shift-night',
    text: 'text-shift-night-foreground',
    iconColor: 'text-shift-night-icon',
  },
  f: {
    label: 'Dia de Folga',
    icon: <Coffee className="w-8 h-8" />,
    bg: 'bg-shift-off',
    text: 'text-shift-off-foreground',
    iconColor: 'text-shift-off-icon',
  },
};

export function DayDetailModal({ 
  date, 
  shift, 
  hasAdjustment,
  onClose, 
  onAdjust,
  onRemoveAdjustment
}: DayDetailModalProps) {
  const details = shiftDetails[shift];
  const shiftTime = SHIFT_TIMES[shift];

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
            <p className="text-sm text-muted-foreground">{dayNames[date.getDay()]}</p>
            <h2 className="text-2xl font-semibold text-foreground">
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

        <div className={cn("rounded-2xl p-6 mb-6", details.bg)}>
          <div className="flex items-center gap-4">
            <div className={cn("p-3 rounded-xl bg-background/20", details.iconColor)}>
              {details.icon}
            </div>
            <div>
              <p className={cn("text-lg font-semibold", details.text)}>
                {details.label}
              </p>
              {shiftTime.start && (
                <p className={cn("text-sm opacity-80", details.text)}>
                  {shiftTime.start} - {shiftTime.end}
                </p>
              )}
            </div>
          </div>
        </div>

        {hasAdjustment && (
          <div className="bg-primary/10 rounded-xl p-4 mb-4 flex items-center justify-between">
            <p className="text-sm text-primary">Ajuste manual aplicado</p>
            <button
              onClick={onRemoveAdjustment}
              className="text-sm text-destructive font-medium hover:underline"
            >
              Remover
            </button>
          </div>
        )}

        <button
          onClick={onAdjust}
          className={cn(
            "w-full py-4 rounded-xl font-medium flex items-center justify-center gap-2",
            "bg-secondary text-foreground hover:bg-accent transition-colors active:scale-[0.98]"
          )}
        >
          <Edit3 className="w-5 h-5" />
          Corrigir Escala
        </button>
      </div>
    </div>
  );
}
