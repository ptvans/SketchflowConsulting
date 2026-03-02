import { useState, useEffect } from 'react';
import { saveDailyPicks } from '../lib/storage';
import { getDailyPicks as computePicks } from '../lib/careerMatcher';
import type { UserProfile, Career } from '../types';

interface DailyPicksResult {
  picks: { topPicks: Career[]; wildCard: Career } | null;
  loading: boolean;
  refresh: () => void;
}

function todayStr() {
  return new Date().toISOString().split('T')[0];
}

export function useDailyPicks(profile: UserProfile | null): DailyPicksResult {
  const [picks, setPicks] = useState<{ topPicks: Career[]; wildCard: Career } | null>(null);
  const [loading, setLoading] = useState(true);

  function compute() {
    if (!profile) {
      setLoading(false);
      return;
    }

    const result = computePicks(profile, profile.exploredCareers ?? []);
    saveDailyPicks({
      date: todayStr(),
      topPicks: result.topPicks.map(c => c.id),
      wildCard: result.wildCard.id,
    });
    setPicks(result);
    setLoading(false);
  }

  useEffect(() => {
    compute();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [profile?.skills?.join(','), profile?.incomeGoal]);

  return { picks, loading, refresh: compute };
}
