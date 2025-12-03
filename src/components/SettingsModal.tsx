import { X, RefreshCw, Moon, Sun } from 'lucide-react';
import { Team } from '@/data/schedule2025';
import { cn } from '@/lib/utils';
import { useEffect, useState } from 'react';

interface SettingsModalProps {
  currentTeam: Team;
  onChangeTeam: (team: Team) => void;
  onClose: () => void;
}

const teams: Team[] = ['A', 'B', 'C', 'D', 'E'];

export function SettingsModal({ currentTeam, onChangeTeam, onClose }: SettingsModalProps) {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    setIsDark(document.documentElement.classList.contains('dark'));
  }, []);

  const toggleTheme = () => {
    const newIsDark = !isDark;
    setIsDark(newIsDark);
    document.documentElement.classList.toggle('dark', newIsDark);
    localStorage.setItem('theme', newIsDark ? 'dark' : 'light');
  };

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
          <h2 className="text-xl font-semibold text-foreground">Configurações</h2>
          <button
            onClick={onClose}
            className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center hover:bg-accent transition-colors"
          >
            <X className="w-5 h-5 text-muted-foreground" />
          </button>
        </div>

        <div className="space-y-6">
          {/* Team Selection */}
          <div>
            <label className="text-sm font-medium text-muted-foreground mb-3 block">
              Sua Equipe
            </label>
            <div className="grid grid-cols-5 gap-2">
              {teams.map((team) => (
                <button
                  key={team}
                  onClick={() => onChangeTeam(team)}
                  className={cn(
                    "aspect-square rounded-xl font-semibold text-lg transition-all active:scale-95",
                    team === currentTeam
                      ? "bg-primary text-primary-foreground"
                      : "bg-secondary text-foreground hover:bg-accent"
                  )}
                >
                  {team}
                </button>
              ))}
            </div>
          </div>

          {/* Theme Toggle */}
          <div>
            <label className="text-sm font-medium text-muted-foreground mb-3 block">
              Aparência
            </label>
            <button
              onClick={toggleTheme}
              className="w-full p-4 rounded-xl bg-secondary flex items-center justify-between hover:bg-accent transition-colors"
            >
              <div className="flex items-center gap-3">
                {isDark ? (
                  <Moon className="w-5 h-5 text-foreground" />
                ) : (
                  <Sun className="w-5 h-5 text-foreground" />
                )}
                <span className="font-medium text-foreground">
                  {isDark ? 'Modo Escuro' : 'Modo Claro'}
                </span>
              </div>
              <div className={cn(
                "w-12 h-7 rounded-full p-1 transition-colors",
                isDark ? "bg-primary" : "bg-muted"
              )}>
                <div className={cn(
                  "w-5 h-5 rounded-full bg-background transition-transform",
                  isDark && "translate-x-5"
                )} />
              </div>
            </button>
          </div>

          {/* App Info */}
          <div className="pt-4 border-t border-border">
            <p className="text-center text-sm text-muted-foreground">
              Minha Escala v1.0
            </p>
            <p className="text-center text-xs text-muted-foreground mt-1">
              Dados da escala 2025
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
