import { useMemo } from 'react';
import { Link } from 'wouter';
import { motion } from 'framer-motion';
import { getCareerById } from '../data/careers';
import { PROGRESS_QUOTES } from '../data/onboardingData';
import type { ProgressItem } from '../types';

interface ProgressProps {
  progress: ProgressItem[];
  streak: number;
  totalActions: number;
  uniqueCareers: number;
}

function getQuote(total: number): string {
  const reversed = [...PROGRESS_QUOTES].reverse();
  const match = reversed.find(q => total >= q.threshold);
  return match?.quote ?? PROGRESS_QUOTES[0].quote;
}

export default function Progress({ progress, streak, totalActions, uniqueCareers }: ProgressProps) {
  const byCareer = useMemo(() => {
    const map: Record<string, ProgressItem[]> = {};
    progress.forEach(p => {
      if (!map[p.careerId]) map[p.careerId] = [];
      map[p.careerId].push(p);
    });
    return map;
  }, [progress]);

  const recentItems = [...progress]
    .sort((a, b) => new Date(b.completedAt).getTime() - new Date(a.completedAt).getTime())
    .slice(0, 10);

  if (progress.length === 0) {
    return (
      <div className="min-h-screen bg-[#080810] text-white flex flex-col items-center justify-center px-6 text-center pb-24">
        <div className="text-7xl mb-6">🌱</div>
        <h2 className="text-2xl font-black mb-3">Nothing yet.</h2>
        <p className="text-white/40 text-lg mb-2 max-w-xs">
          Your progress will show up here as you complete actions.
        </p>
        <p className="text-white/30 text-sm mb-10 max-w-xs">
          "Zero actions. My houseplant is also not making progress today. You have company."
        </p>
        <Link href="/">
          <button className="bg-[#BDFF00] text-black font-bold px-8 py-4 rounded-2xl">
            Go Make a Move →
          </button>
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#080810] text-white pb-24">
      <div className="px-5 pt-14 pb-6">
        <h1 className="text-2xl font-black mb-1">Your Progress</h1>
        <p className="text-white/40 text-sm italic">"{getQuote(totalActions)}"</p>
      </div>

      {/* Stats */}
      <div className="flex gap-3 px-5 mb-6">
        <div className="flex-1 bg-gradient-to-br from-[#1A1A2E] to-[#16213E] rounded-2xl p-4 text-center">
          <p className="text-3xl font-black text-[#BDFF00]">{totalActions}</p>
          <p className="text-white/40 text-xs mt-1">Total Actions</p>
        </div>
        <div className="flex-1 bg-gradient-to-br from-[#1A1A2E] to-[#16213E] rounded-2xl p-4 text-center">
          <p className="text-3xl font-black text-[#BDFF00]">{uniqueCareers}</p>
          <p className="text-white/40 text-xs mt-1">Paths Explored</p>
        </div>
        <div className="flex-1 bg-gradient-to-br from-[#1A1A2E] to-[#16213E] rounded-2xl p-4 text-center">
          <p className="text-3xl font-black text-orange-400">{streak}</p>
          <p className="text-white/40 text-xs mt-1">Day Streak 🔥</p>
        </div>
      </div>

      {/* By career */}
      <div className="px-5 mb-6">
        <h2 className="text-lg font-bold mb-3">By Career Path</h2>
        <div className="space-y-3">
          {Object.entries(byCareer).map(([careerId, items]) => {
            const career = getCareerById(careerId);
            if (!career) return null;
            return (
              <Link key={careerId} href={`/explore/${careerId}`}>
                <motion.div
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="bg-[#1A1A2E] rounded-2xl p-4 flex items-center gap-3 cursor-pointer active:scale-[0.98] transition-transform"
                >
                  <span className="text-3xl">{career.emoji}</span>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-white font-bold text-sm">{career.title}</h4>
                    <p className="text-white/40 text-xs mt-0.5">{items.length} action{items.length !== 1 ? 's' : ''} completed</p>
                    <div className="mt-2 flex gap-1">
                      {Array.from({ length: Math.min(career.tactics.length, 8) }, (_, i) => (
                        <div
                          key={i}
                          className={`h-1.5 flex-1 rounded-full ${
                            i < items.length ? 'bg-[#BDFF00]' : 'bg-white/10'
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                  <span className="text-white/30 text-lg">›</span>
                </motion.div>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Recent activity */}
      <div className="px-5">
        <h2 className="text-lg font-bold mb-3">Recent Activity</h2>
        <div className="space-y-2">
          {recentItems.map(item => {
            const career = getCareerById(item.careerId);
            const date = new Date(item.completedAt);
            const isToday = date.toDateString() === new Date().toDateString();
            const dateStr = isToday ? 'Today' : date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });

            return (
              <div key={item.id} className="flex items-start gap-3 py-2 border-b border-white/5">
                <span className="text-lg mt-0.5">{career?.emoji ?? '✅'}</span>
                <div className="flex-1 min-w-0">
                  <p className="text-white/80 text-sm font-medium leading-snug">{item.actionLabel}</p>
                  <p className="text-white/30 text-xs mt-0.5">{career?.title ?? item.careerId}</p>
                </div>
                <span className="text-white/20 text-xs flex-shrink-0">{dateStr}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
