import { useState, useEffect, useCallback } from 'react';
import { Team, ShiftType, getTeamShift, getShiftInfo } from '@/data/schedule2025';

const STORAGE_KEY = 'minha-escala-team';
const ADJUSTMENTS_KEY = 'minha-escala-adjustments';

export interface ShiftAdjustment {
  date: string; // ISO date string
  shift: ShiftType;
}

export function useSchedule() {
  const [team, setTeam] = useState<Team | null>(null);
  const [adjustments, setAdjustments] = useState<ShiftAdjustment[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Load team and adjustments from localStorage
  useEffect(() => {
    const savedTeam = localStorage.getItem(STORAGE_KEY) as Team | null;
    const savedAdjustments = localStorage.getItem(ADJUSTMENTS_KEY);
    
    if (savedTeam) {
      setTeam(savedTeam);
    }
    
    if (savedAdjustments) {
      try {
        setAdjustments(JSON.parse(savedAdjustments));
      } catch {
        setAdjustments([]);
      }
    }
    
    setIsLoading(false);
  }, []);

  // Save team to localStorage
  const selectTeam = useCallback((selectedTeam: Team) => {
    localStorage.setItem(STORAGE_KEY, selectedTeam);
    setTeam(selectedTeam);
  }, []);

  // Clear team selection
  const clearTeam = useCallback(() => {
    localStorage.removeItem(STORAGE_KEY);
    localStorage.removeItem(ADJUSTMENTS_KEY);
    setTeam(null);
    setAdjustments([]);
  }, []);

  // Get shift for a specific date (considering adjustments)
  const getShiftForDate = useCallback((date: Date): ShiftType => {
    if (!team) return 'f';
    
    const dateStr = date.toISOString().split('T')[0];
    const adjustment = adjustments.find(a => a.date === dateStr);
    
    if (adjustment) {
      return adjustment.shift;
    }
    
    return getTeamShift(team, date);
  }, [team, adjustments]);

  // Add manual adjustment
  const addAdjustment = useCallback((date: Date, shift: ShiftType) => {
    const dateStr = date.toISOString().split('T')[0];
    
    setAdjustments(prev => {
      const filtered = prev.filter(a => a.date !== dateStr);
      const newAdjustments = [...filtered, { date: dateStr, shift }];
      localStorage.setItem(ADJUSTMENTS_KEY, JSON.stringify(newAdjustments));
      return newAdjustments;
    });
  }, []);

  // Remove adjustment
  const removeAdjustment = useCallback((date: Date) => {
    const dateStr = date.toISOString().split('T')[0];
    
    setAdjustments(prev => {
      const filtered = prev.filter(a => a.date !== dateStr);
      localStorage.setItem(ADJUSTMENTS_KEY, JSON.stringify(filtered));
      return filtered;
    });
  }, []);

  // Calculate stats for a month
  const getMonthStats = useCallback((year: number, month: number) => {
    if (!team) return { morning: 0, afternoon: 0, night: 0, off: 0, total: 0 };
    
    const stats = { morning: 0, afternoon: 0, night: 0, off: 0, total: 0 };
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(year, month, day);
      const shift = getShiftForDate(date);
      stats.total++;
      
      switch (shift) {
        case 'm': stats.morning++; break;
        case 't': stats.afternoon++; break;
        case 'n': stats.night++; break;
        case 'f': stats.off++; break;
      }
    }
    
    return stats;
  }, [team, getShiftForDate]);

  return {
    team,
    isLoading,
    selectTeam,
    clearTeam,
    getShiftForDate,
    getShiftInfo,
    addAdjustment,
    removeAdjustment,
    getMonthStats,
    hasAdjustment: (date: Date) => {
      const dateStr = date.toISOString().split('T')[0];
      return adjustments.some(a => a.date === dateStr);
    },
  };
}
