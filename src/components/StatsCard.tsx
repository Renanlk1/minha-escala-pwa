import { Sun, Sunset, Moon, Coffee } from 'lucide-react';
import { cn } from '@/lib/utils';

interface StatsCardProps {
  stats: {
    morning: number;
    afternoon: number;
    night: number;
    off: number;
    total: number;
  };
}

export function StatsCard({ stats }: StatsCardProps) {
  const worked = stats.morning + stats.afternoon + stats.night;
  const workedPercent = stats.total > 0 ? (worked / stats.total) * 100 : 0;
  const offPercent = stats.total > 0 ? (stats.off / stats.total) * 100 : 0;

  // Calculate individual percentages for the donut
  const morningPercent = stats.total > 0 ? (stats.morning / stats.total) * 100 : 0;
  const afternoonPercent = stats.total > 0 ? (stats.afternoon / stats.total) * 100 : 0;
  const nightPercent = stats.total > 0 ? (stats.night / stats.total) * 100 : 0;

  // SVG donut chart calculations
  const radius = 40;
  const circumference = 2 * Math.PI * radius;
  
  const morningOffset = 0;
  const afternoonOffset = (morningPercent / 100) * circumference;
  const nightOffset = ((morningPercent + afternoonPercent) / 100) * circumference;
  const offOffset = ((morningPercent + afternoonPercent + nightPercent) / 100) * circumference;

  return (
    <div className="mx-4 mb-4 p-4 bg-card rounded-2xl border border-border">
      <h3 className="text-sm font-medium text-muted-foreground mb-4">Resumo do Mês</h3>
      
      <div className="flex items-center gap-6">
        {/* Donut Chart */}
        <div className="relative w-24 h-24 flex-shrink-0">
          <svg className="w-24 h-24 -rotate-90" viewBox="0 0 100 100">
            {/* Background circle */}
            <circle
              cx="50"
              cy="50"
              r={radius}
              fill="none"
              stroke="hsl(var(--muted))"
              strokeWidth="12"
            />
            {/* Morning segment */}
            <circle
              cx="50"
              cy="50"
              r={radius}
              fill="none"
              stroke="hsl(var(--shift-morning-icon))"
              strokeWidth="12"
              strokeDasharray={`${(morningPercent / 100) * circumference} ${circumference}`}
              strokeDashoffset={-morningOffset}
            />
            {/* Afternoon segment */}
            <circle
              cx="50"
              cy="50"
              r={radius}
              fill="none"
              stroke="hsl(var(--shift-afternoon-icon))"
              strokeWidth="12"
              strokeDasharray={`${(afternoonPercent / 100) * circumference} ${circumference}`}
              strokeDashoffset={-afternoonOffset}
            />
            {/* Night segment */}
            <circle
              cx="50"
              cy="50"
              r={radius}
              fill="none"
              stroke="hsl(var(--shift-night-icon))"
              strokeWidth="12"
              strokeDasharray={`${(nightPercent / 100) * circumference} ${circumference}`}
              strokeDashoffset={-nightOffset}
            />
            {/* Off segment */}
            <circle
              cx="50"
              cy="50"
              r={radius}
              fill="none"
              stroke="hsl(var(--shift-off-icon))"
              strokeWidth="12"
              strokeDasharray={`${(offPercent / 100) * circumference} ${circumference}`}
              strokeDashoffset={-offOffset}
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-2xl font-semibold text-foreground">{worked}</span>
            <span className="text-xs text-muted-foreground">dias</span>
          </div>
        </div>

        {/* Legend */}
        <div className="flex-1 grid grid-cols-2 gap-2">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-shift-morning flex items-center justify-center">
              <Sun className="w-4 h-4 text-shift-morning-icon" />
            </div>
            <div>
              <p className="text-sm font-medium text-foreground">{stats.morning}</p>
              <p className="text-xs text-muted-foreground">Manhã</p>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-shift-afternoon flex items-center justify-center">
              <Sunset className="w-4 h-4 text-shift-afternoon-icon" />
            </div>
            <div>
              <p className="text-sm font-medium text-foreground">{stats.afternoon}</p>
              <p className="text-xs text-muted-foreground">Tarde</p>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-shift-night flex items-center justify-center">
              <Moon className="w-4 h-4 text-shift-night-icon" />
            </div>
            <div>
              <p className="text-sm font-medium text-foreground">{stats.night}</p>
              <p className="text-xs text-muted-foreground">Noite</p>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-shift-off flex items-center justify-center">
              <Coffee className="w-4 h-4 text-shift-off-icon" />
            </div>
            <div>
              <p className="text-sm font-medium text-foreground">{stats.off}</p>
              <p className="text-xs text-muted-foreground">Folgas</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
