import type { UserProfile, DailyPicks, ProgressItem } from '../types';

const KEYS = {
  PROFILE: 'pivot_profile',
  DAILY_PICKS: 'pivot_daily_picks',
  PROGRESS: 'pivot_progress',
  ONBOARDED: 'pivot_onboarded',
  STREAK: 'pivot_streak',
  LAST_ACTIVE: 'pivot_last_active',
} as const;

export function getProfile(): UserProfile | null {
  try {
    const raw = localStorage.getItem(KEYS.PROFILE);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export function saveProfile(profile: UserProfile): void {
  localStorage.setItem(KEYS.PROFILE, JSON.stringify(profile));
}

export function getDailyPicks(): DailyPicks | null {
  try {
    const raw = localStorage.getItem(KEYS.DAILY_PICKS);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export function saveDailyPicks(picks: DailyPicks): void {
  localStorage.setItem(KEYS.DAILY_PICKS, JSON.stringify(picks));
}

export function getProgress(): ProgressItem[] {
  try {
    const raw = localStorage.getItem(KEYS.PROGRESS);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function addProgressItem(item: ProgressItem): void {
  const current = getProgress();
  localStorage.setItem(KEYS.PROGRESS, JSON.stringify([...current, item]));
}

export function removeProgressItem(id: string): void {
  const current = getProgress();
  localStorage.setItem(KEYS.PROGRESS, JSON.stringify(current.filter(p => p.id !== id)));
}

export function isOnboarded(): boolean {
  return localStorage.getItem(KEYS.ONBOARDED) === 'true';
}

export function setOnboarded(): void {
  localStorage.setItem(KEYS.ONBOARDED, 'true');
}

export function getStreak(): number {
  return parseInt(localStorage.getItem(KEYS.STREAK) || '0', 10);
}

export function updateStreak(): void {
  const lastActive = localStorage.getItem(KEYS.LAST_ACTIVE);
  const today = new Date().toDateString();
  const yesterday = new Date(Date.now() - 86400000).toDateString();

  if (lastActive === today) return; // already updated today

  const current = getStreak();
  if (lastActive === yesterday) {
    localStorage.setItem(KEYS.STREAK, String(current + 1));
  } else {
    localStorage.setItem(KEYS.STREAK, '1'); // reset
  }
  localStorage.setItem(KEYS.LAST_ACTIVE, today);
}

export function clearAll(): void {
  Object.values(KEYS).forEach(key => localStorage.removeItem(key));
}
