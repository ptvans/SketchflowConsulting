import { useState } from 'react';
import { clearAll } from '../lib/storage';
import type { UserProfile } from '../types';

interface SettingsProps {
  profile: UserProfile;
  totalActions: number;
  onReset: () => void;
}

const INCOME_LABELS: Record<number, string> = {
  50000: '$50K',
  75000: '$75K',
  100000: '$100K',
  150000: '$150K',
  200000: '$200K+',
};

export default function Settings({ profile, totalActions, onReset }: SettingsProps) {
  const [confirmReset, setConfirmReset] = useState(false);

  function handleReset() {
    if (!confirmReset) {
      setConfirmReset(true);
      setTimeout(() => setConfirmReset(false), 4000);
      return;
    }
    clearAll();
    onReset();
  }

  return (
    <div className="min-h-screen bg-[#080810] text-white pb-24">
      <div className="px-5 pt-14 pb-6">
        <h1 className="text-2xl font-black">Your Profile</h1>
        <p className="text-white/30 text-sm mt-1">How I'm calibrating your career picks.</p>
      </div>

      {/* Summary */}
      <div className="mx-5 bg-[#1A1A2E] rounded-2xl p-5 mb-5">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 bg-[#BDFF00]/20 rounded-full flex items-center justify-center text-2xl">
            👤
          </div>
          <div>
            <h2 className="text-white font-bold text-lg">{profile.name}</h2>
            <p className="text-white/40 text-sm">
              Income goal: {INCOME_LABELS[profile.incomeGoal] ?? `$${(profile.incomeGoal / 1000).toFixed(0)}K`}/yr
            </p>
          </div>
        </div>

        <div className="space-y-3">
          <div>
            <p className="text-white/30 text-xs uppercase tracking-wider mb-2">Skills</p>
            <div className="flex flex-wrap gap-1.5">
              {profile.skills.map(s => (
                <span key={s} className="text-xs bg-white/5 text-white/60 px-2.5 py-1 rounded-full capitalize">
                  {s.replace(/-/g, ' ')}
                </span>
              ))}
            </div>
          </div>

          <div>
            <p className="text-white/30 text-xs uppercase tracking-wider mb-2">Work style</p>
            <div className="flex flex-wrap gap-1.5">
              {profile.workStyles.map(s => (
                <span key={s} className="text-xs bg-white/5 text-white/60 px-2.5 py-1 rounded-full capitalize">
                  {s}
                </span>
              ))}
            </div>
          </div>

          {profile.dealbreakers.length > 0 && (
            <div>
              <p className="text-white/30 text-xs uppercase tracking-wider mb-2">Dealbreakers</p>
              <div className="flex flex-wrap gap-1.5">
                {profile.dealbreakers.map(s => (
                  <span key={s} className="text-xs bg-red-500/10 text-red-400/70 px-2.5 py-1 rounded-full">
                    {s.replace(/-/g, ' ')}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Stats */}
      <div className="mx-5 bg-[#1A1A2E] rounded-2xl p-4 mb-5">
        <p className="text-white/30 text-xs uppercase tracking-wider mb-3">Your Progress</p>
        <div className="flex gap-4">
          <div>
            <p className="text-2xl font-black text-[#BDFF00]">{totalActions}</p>
            <p className="text-white/40 text-xs">Actions Completed</p>
          </div>
          <div>
            <p className="text-2xl font-black text-[#BDFF00]">
              {Math.floor((Date.now() - new Date(profile.createdAt).getTime()) / 86400000)}
            </p>
            <p className="text-white/40 text-xs">Days Since Start</p>
          </div>
        </div>
      </div>

      {/* App info */}
      <div className="mx-5 bg-[#1A1A2E] rounded-2xl p-4 mb-5">
        <p className="text-white/30 text-xs uppercase tracking-wider mb-3">App Info</p>
        <p className="text-white/60 text-sm">Pivot — Career Exploration</p>
        <p className="text-white/30 text-xs mt-1">Version 1.0.0</p>
        <p className="text-white/30 text-xs mt-3 leading-relaxed">
          All data is stored on your device. No account required. No tracking.
        </p>
      </div>

      {/* Reset */}
      <div className="mx-5">
        <button
          onClick={handleReset}
          className={`w-full py-3.5 rounded-xl font-semibold text-sm transition-all ${
            confirmReset
              ? 'bg-red-500/20 border border-red-500/50 text-red-400'
              : 'bg-white/5 border border-white/10 text-white/40'
          }`}
        >
          {confirmReset ? 'Tap again to confirm reset (irreversible)' : 'Reset & Start Over'}
        </button>
        <p className="text-white/20 text-xs text-center mt-2">
          This deletes all your progress and profile data.
        </p>
      </div>
    </div>
  );
}
