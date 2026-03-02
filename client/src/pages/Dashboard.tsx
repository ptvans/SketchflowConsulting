import { useMemo } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'wouter';
import CareerCard from '../components/CareerCard';
import { DAILY_GREETINGS } from '../data/onboardingData';
import { CAREERS } from '../data/careers';
import { matchCareers } from '../lib/careerMatcher';
import type { UserProfile } from '../types';
import type { ProgressItem } from '../types';

interface DashboardProps {
  profile: UserProfile;
  progress: ProgressItem[];
  streak: number;
}

function getDailyGreeting(): string {
  const dayOfYear = Math.floor(
    (Date.now() - new Date(new Date().getFullYear(), 0, 0).getTime()) / 86400000
  );
  return DAILY_GREETINGS[dayOfYear % DAILY_GREETINGS.length];
}

function getGreetingTime(): string {
  const h = new Date().getHours();
  if (h < 12) return 'Good morning';
  if (h < 17) return 'Good afternoon';
  return 'Good evening';
}

export default function Dashboard({ profile, progress, streak }: DashboardProps) {
  const ranked = useMemo(() => matchCareers(profile), [profile.skills, profile.incomeGoal]);

  const topPicks = ranked.slice(0, 2);
  const wildCard = ranked.slice(5, 15)[
    new Date().getDate() % Math.min(ranked.slice(5, 15).length, 10)
  ] ?? ranked[ranked.length - 1] ?? CAREERS[0];

  const completedByCareer = useMemo(() => {
    const map: Record<string, number> = {};
    progress.forEach(p => {
      map[p.careerId] = (map[p.careerId] ?? 0) + 1;
    });
    return map;
  }, [progress]);

  const totalToday = progress.filter(p => {
    const today = new Date().toDateString();
    return new Date(p.completedAt).toDateString() === today;
  }).length;

  return (
    <div className="min-h-screen bg-[#080810] text-white pb-24">
      {/* Header */}
      <div className="px-5 pt-14 pb-2">
        <div className="flex items-center justify-between mb-1">
          <p className="text-white/40 text-sm">{getGreetingTime()}{profile.name !== 'You' ? `, ${profile.name}` : ''}</p>
          {streak > 0 && (
            <span className="text-xs font-bold text-orange-400 bg-orange-400/10 px-2.5 py-1 rounded-full">
              🔥 {streak} day{streak !== 1 ? 's' : ''}
            </span>
          )}
        </div>
        <h1 className="text-2xl font-black leading-snug">
          {getDailyGreeting()}
        </h1>
      </div>

      {/* Stats row */}
      {progress.length > 0 && (
        <div className="flex gap-3 px-5 mt-4 mb-2">
          <div className="flex-1 bg-white/5 rounded-xl p-3 text-center">
            <p className="text-2xl font-black text-[#BDFF00]">{progress.length}</p>
            <p className="text-white/40 text-xs mt-0.5">Total Actions</p>
          </div>
          <div className="flex-1 bg-white/5 rounded-xl p-3 text-center">
            <p className="text-2xl font-black text-[#BDFF00]">{new Set(progress.map(p => p.careerId)).size}</p>
            <p className="text-white/40 text-xs mt-0.5">Careers Explored</p>
          </div>
          <div className="flex-1 bg-white/5 rounded-xl p-3 text-center">
            <p className="text-2xl font-black text-[#BDFF00]">{totalToday}</p>
            <p className="text-white/40 text-xs mt-0.5">Today</p>
          </div>
        </div>
      )}

      {/* Today's Top Picks */}
      <div className="px-5 mt-6">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-lg font-bold">Today's Top Picks</h2>
          <span className="text-white/30 text-xs">Based on your skills</span>
        </div>

        <div className="space-y-3">
          {topPicks.map((career, i) => (
            <motion.div
              key={career.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
            >
              <CareerCard
                career={career}
                variant="top-pick"
                completedCount={completedByCareer[career.id] ?? 0}
              />
            </motion.div>
          ))}
        </div>
      </div>

      {/* Wild Card */}
      {wildCard && (
        <div className="px-5 mt-6">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-lg font-bold">Something Different</h2>
            <span className="text-white/30 text-xs">Surprise pick</span>
          </div>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
            <CareerCard career={wildCard} variant="wild-card" />
          </motion.div>
        </div>
      )}

      {/* Helena callout if relevant */}
      {profile.skills.includes('product-design') || profile.skills.includes('front-end-code') ? (
        <div className="mx-5 mt-6 bg-gradient-to-br from-purple-900/40 to-[#1A1A2E] border border-purple-500/20 rounded-2xl p-4">
          <div className="flex items-center gap-2 mb-1">
            <span>🧠</span>
            <span className="text-purple-400 text-xs font-bold uppercase tracking-wider">In Progress</span>
          </div>
          <h3 className="text-white font-bold mb-1">Helena — SaaS for Therapists</h3>
          <p className="text-white/40 text-xs leading-relaxed">
            Keep building. Every other career on this list is a bridge — Helena is the destination.
          </p>
        </div>
      ) : null}

      {/* Browse all */}
      <div className="px-5 mt-6">
        <Link href="/explore">
          <button className="w-full border border-white/10 text-white/60 font-semibold py-3.5 rounded-xl text-sm hover:border-white/20 transition-colors">
            Browse All {CAREERS.length} Career Paths →
          </button>
        </Link>
      </div>
    </div>
  );
}
