import { Team } from '@/data/schedule2025';
import { cn } from '@/lib/utils';

interface OnboardingModalProps {
  onSelectTeam: (team: Team) => void;
}

const teams: Team[] = ['A', 'B', 'C', 'D', 'E'];

export function OnboardingModal({ onSelectTeam }: OnboardingModalProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-foreground/20 backdrop-blur-sm animate-fade-in">
      <div className="w-full max-w-md bg-card rounded-t-2xl sm:rounded-2xl p-6 pb-10 sm:pb-6 shadow-2xl animate-slide-up">
        <div className="w-12 h-1 bg-muted rounded-full mx-auto mb-6 sm:hidden" />
        
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
          <h1 className="text-2xl font-semibold text-foreground mb-2">Minha Escala</h1>
          <p className="text-muted-foreground">Selecione sua equipe para começar</p>
        </div>

        <div className="grid grid-cols-5 gap-3">
          {teams.map((team) => (
            <button
              key={team}
              onClick={() => onSelectTeam(team)}
              className={cn(
                "aspect-square rounded-xl font-semibold text-lg",
                "bg-secondary hover:bg-primary hover:text-primary-foreground",
                "transition-all duration-200 active:scale-95",
                "focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background"
              )}
            >
              {team}
            </button>
          ))}
        </div>

        <p className="text-xs text-muted-foreground text-center mt-6">
          Você pode alterar sua equipe depois nas configurações
        </p>
      </div>
    </div>
  );
}
