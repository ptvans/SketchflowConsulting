import { useState, useCallback } from 'react';
import { getProgress, addProgressItem, removeProgressItem, updateStreak, getStreak } from '../lib/storage';
import type { ProgressItem } from '../types';

export function useProgress() {
  const [progress, setProgress] = useState<ProgressItem[]>(() => {
    updateStreak();
    return getProgress();
  });
  const [streak] = useState(() => getStreak());

  const completeAction = useCallback((item: Omit<ProgressItem, 'id' | 'completedAt'>) => {
    const newItem: ProgressItem = {
      ...item,
      id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
      completedAt: new Date().toISOString(),
    };
    addProgressItem(newItem);
    setProgress(prev => [...prev, newItem]);
    return newItem;
  }, []);

  const undoAction = useCallback((id: string) => {
    removeProgressItem(id);
    setProgress(prev => prev.filter(p => p.id !== id));
  }, []);

  const getProgressForCareer = useCallback(
    (careerId: string) => progress.filter(p => p.careerId === careerId),
    [progress]
  );

  const totalActions = progress.length;
  const uniqueCareers = new Set(progress.map(p => p.careerId)).size;

  return { progress, streak, totalActions, uniqueCareers, completeAction, undoAction, getProgressForCareer };
}
