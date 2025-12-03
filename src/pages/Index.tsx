import { useState, useEffect } from 'react';
import { useSchedule } from '@/hooks/useSchedule';
import { OnboardingModal } from '@/components/OnboardingModal';
import { CalendarHeader } from '@/components/CalendarHeader';
import { CalendarGrid } from '@/components/CalendarGrid';
import { DayDetailModal } from '@/components/DayDetailModal';
import { AdjustmentModal } from '@/components/AdjustmentModal';
import { StatsCard } from '@/components/StatsCard';
import { SettingsModal } from '@/components/SettingsModal';
import { ShiftType } from '@/data/schedule2025';

const Index = () => {
  const {
    team,
    isLoading,
    selectTeam,
    getShiftForDate,
    addAdjustment,
    removeAdjustment,
    getMonthStats,
    hasAdjustment,
  } = useSchedule();

  const [currentDate, setCurrentDate] = useState(new Date(2025, new Date().getMonth(), 1));
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [showAdjustment, setShowAdjustment] = useState(false);
  const [showSettings, setShowSettings] = useState(false);

  // Initialize theme from localStorage
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      document.documentElement.classList.add('dark');
    }
  }, []);

  const handlePrevMonth = () => {
    setCurrentDate(prev => new Date(prev.getFullYear(), prev.getMonth() - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(prev => new Date(prev.getFullYear(), prev.getMonth() + 1, 1));
  };

  const handleSelectDate = (date: Date) => {
    setSelectedDate(date);
  };

  const handleAdjust = (shift: ShiftType) => {
    if (selectedDate) {
      addAdjustment(selectedDate, shift);
      setShowAdjustment(false);
    }
  };

  const handleRemoveAdjustment = () => {
    if (selectedDate) {
      removeAdjustment(selectedDate);
      setSelectedDate(null);
    }
  };

  const stats = team ? getMonthStats(currentDate.getFullYear(), currentDate.getMonth()) : null;

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* SEO */}
      <title>Minha Escala - Gestão de Turnos</title>
      <meta name="description" content="App para gestão pessoal de turnos de trabalho. Visualize seu calendário mensal e status de trabalho ou folga." />

      {!team && <OnboardingModal onSelectTeam={selectTeam} />}

      {team && (
        <div className="max-w-md mx-auto pb-safe">
          <CalendarHeader
            currentDate={currentDate}
            team={team}
            onPrevMonth={handlePrevMonth}
            onNextMonth={handleNextMonth}
            onOpenSettings={() => setShowSettings(true)}
          />

          <CalendarGrid
            currentDate={currentDate}
            getShiftForDate={getShiftForDate}
            hasAdjustment={hasAdjustment}
            onSelectDate={handleSelectDate}
          />

          {stats && <StatsCard stats={stats} />}

          {/* Legend */}
          <div className="mx-4 mb-8">
            <div className="flex items-center justify-center gap-4 text-xs text-muted-foreground">
              <div className="flex items-center gap-1.5">
                <div className="w-3 h-3 rounded bg-shift-morning" />
                <span>Manhã</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-3 h-3 rounded bg-shift-afternoon" />
                <span>Tarde</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-3 h-3 rounded bg-shift-night" />
                <span>Noite</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-3 h-3 rounded bg-shift-off" />
                <span>Folga</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Day Detail Modal */}
      {selectedDate && !showAdjustment && (
        <DayDetailModal
          date={selectedDate}
          shift={getShiftForDate(selectedDate)}
          hasAdjustment={hasAdjustment(selectedDate)}
          onClose={() => setSelectedDate(null)}
          onAdjust={() => setShowAdjustment(true)}
          onRemoveAdjustment={handleRemoveAdjustment}
        />
      )}

      {/* Adjustment Modal */}
      {selectedDate && showAdjustment && (
        <AdjustmentModal
          date={selectedDate}
          currentShift={getShiftForDate(selectedDate)}
          onSelect={handleAdjust}
          onClose={() => setShowAdjustment(false)}
        />
      )}

      {/* Settings Modal */}
      {showSettings && team && (
        <SettingsModal
          currentTeam={team}
          onChangeTeam={(newTeam) => {
            selectTeam(newTeam);
            setShowSettings(false);
          }}
          onClose={() => setShowSettings(false)}
        />
      )}
    </div>
  );
};

export default Index;
