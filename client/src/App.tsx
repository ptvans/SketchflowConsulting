import { Switch, Route, useLocation } from 'wouter';
import { useState, useCallback } from 'react';
import { Toaster } from '@/components/ui/toaster';
import BottomNav from './components/BottomNav';
import Onboarding from './pages/Onboarding';
import Dashboard from './pages/Dashboard';
import CareerExplore from './pages/CareerExplore';
import Progress from './pages/Progress';
import Settings from './pages/Settings';
import { useUserProfile } from './hooks/useUserProfile';
import { useProgress } from './hooks/useProgress';
import type { UserProfile } from './types';

function App() {
  const { profile, onboarded, saveUserProfile, updateProfile } = useUserProfile();
  const { progress, streak, totalActions, uniqueCareers, completeAction, getProgressForCareer } = useProgress();
  const [, navigate] = useLocation();

  const handleOnboardingComplete = useCallback((newProfile: UserProfile) => {
    saveUserProfile(newProfile);
    navigate('/');
  }, [saveUserProfile, navigate]);

  const handleReset = useCallback(() => {
    window.location.reload();
  }, []);

  const handleMarkDone = useCallback((item: Parameters<typeof completeAction>[0]) => {
    const newItem = completeAction(item);
    // Update explored careers in profile
    if (profile && !profile.exploredCareers.includes(item.careerId)) {
      updateProfile({ exploredCareers: [...(profile.exploredCareers ?? []), item.careerId] });
    }
    return newItem;
  }, [completeAction, profile, updateProfile]);

  // Show onboarding if not onboarded
  if (!onboarded || !profile) {
    return (
      <>
        <Onboarding onComplete={handleOnboardingComplete} />
        <Toaster />
      </>
    );
  }

  const completedTacticIds = progress.map(p => p.tacticId);

  return (
    <div className="max-w-lg mx-auto relative">
      <Switch>
        <Route path="/">
          <Dashboard profile={profile} progress={progress} streak={streak} />
        </Route>

        <Route path="/explore">
          <CareerExplore onComplete={handleMarkDone} completedTacticIds={completedTacticIds} />
        </Route>

        <Route path="/explore/:id">
          {(params) => (
            <CareerExplore onComplete={handleMarkDone} completedTacticIds={completedTacticIds} />
          )}
        </Route>

        <Route path="/progress">
          <Progress
            progress={progress}
            streak={streak}
            totalActions={totalActions}
            uniqueCareers={uniqueCareers}
          />
        </Route>

        <Route path="/settings">
          <Settings profile={profile} totalActions={totalActions} onReset={handleReset} />
        </Route>

        <Route>
          <div className="min-h-screen bg-[#080810] text-white flex flex-col items-center justify-center px-6 text-center">
            <div className="text-6xl mb-4">🗺️</div>
            <h2 className="text-xl font-bold mb-2">Lost?</h2>
            <p className="text-white/40 mb-6">This page doesn't exist. Your career does, though.</p>
            <a href="/" className="bg-[#BDFF00] text-black font-bold px-6 py-3 rounded-xl">← Home</a>
          </div>
        </Route>
      </Switch>

      <BottomNav />
      <Toaster />
    </div>
  );
}

export default App;
