import { useState, useCallback } from 'react';
import { getProfile, saveProfile, isOnboarded, setOnboarded } from '../lib/storage';
import type { UserProfile } from '../types';

export function useUserProfile() {
  const [profile, setProfileState] = useState<UserProfile | null>(() => getProfile());
  const [onboarded, setOnboardedState] = useState(() => isOnboarded());

  const saveUserProfile = useCallback((newProfile: UserProfile) => {
    saveProfile(newProfile);
    setOnboarded();
    setProfileState(newProfile);
    setOnboardedState(true);
  }, []);

  const updateProfile = useCallback((updates: Partial<UserProfile>) => {
    const current = getProfile();
    if (!current) return;
    const updated = { ...current, ...updates };
    saveProfile(updated);
    setProfileState(updated);
  }, []);

  return { profile, onboarded, saveUserProfile, updateProfile };
}
