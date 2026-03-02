import { useState } from 'react';
import { useRoute, Link } from 'wouter';
import { motion, AnimatePresence } from 'framer-motion';
import { getCareerById, CAREERS } from '../data/careers';
import CareerCard from '../components/CareerCard';
import type { Career, TacticStep } from '../types';
import type { ProgressItem } from '../types';

interface CareerExploreProps {
  onComplete: (item: Omit<ProgressItem, 'id' | 'completedAt'>) => void;
  completedTacticIds: string[];
}

// Explore list view (no career selected)
function ExploreList() {
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');

  const categories = ['all', 'tech', 'automotive', 'real estate', 'wellness', 'finance', 'trades', 'consulting', 'media'];

  const filtered = CAREERS.filter((c: Career) => {
    const matchSearch = c.title.toLowerCase().includes(search.toLowerCase()) ||
      c.tagline.toLowerCase().includes(search.toLowerCase());
    const matchCat = activeCategory === 'all' || c.categories.includes(activeCategory);
    return matchSearch && matchCat;
  });

  return (
    <div className="min-h-screen bg-[#080810] text-white pb-24">
      <div className="px-5 pt-14 pb-4">
        <h1 className="text-2xl font-black mb-4">Explore Careers</h1>

        <input
          type="search"
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Search careers..."
          className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/20 focus:outline-none focus:border-[#BDFF00]/30 mb-4"
        />

        <div className="flex gap-2 overflow-x-auto pb-2 -mx-1 px-1 scrollbar-hide">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`flex-shrink-0 px-3 py-1.5 rounded-full text-xs font-semibold capitalize transition-all ${
                activeCategory === cat
                  ? 'bg-[#BDFF00] text-black'
                  : 'bg-white/5 text-white/50 border border-white/10'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div className="px-5 space-y-2">
        {filtered.map((career: Career) => (
          <CareerCard key={career.id} career={career} variant="list" />
        ))}
        {filtered.length === 0 && (
          <p className="text-white/30 text-center py-10">No careers match that search. Try something broader.</p>
        )}
      </div>
    </div>
  );
}

export default function CareerExplore({ onComplete, completedTacticIds }: CareerExploreProps) {
  const [, params] = useRoute('/explore/:id');
  const careerId = params?.id;

  if (!careerId) {
    return <ExploreList />;
  }

  const career = getCareerById(careerId);

  if (!career) {
    return (
      <div className="min-h-screen bg-[#080810] text-white flex flex-col items-center justify-center px-6 text-center">
        <div className="text-6xl mb-4">🤔</div>
        <h2 className="text-xl font-bold mb-2">Career not found</h2>
        <p className="text-white/40 mb-6">That one doesn't exist. Yet.</p>
        <Link href="/explore">
          <button className="bg-[#BDFF00] text-black font-bold px-6 py-3 rounded-xl">← Back</button>
        </Link>
      </div>
    );
  }

  return <CareerDetail career={career} onComplete={onComplete} completedTacticIds={completedTacticIds} />;
}

function CareerDetail({
  career,
  onComplete,
  completedTacticIds,
}: {
  career: Career;
  onComplete: (item: Omit<ProgressItem, 'id' | 'completedAt'>) => void;
  completedTacticIds: string[];
}) {
  const [tab, setTab] = useState<'overview' | 'tactics' | 'questions'>('overview');
  const [markedDone, setMarkedDone] = useState<Set<string>>(new Set(completedTacticIds));
  const [showConfetti, setShowConfetti] = useState<string | null>(null);

  function handleDone(tactic: TacticStep) {
    if (markedDone.has(tactic.id)) return;
    setMarkedDone(prev => new Set([...prev, tactic.id]));
    setShowConfetti(tactic.id);
    setTimeout(() => setShowConfetti(null), 2000);
    onComplete({
      careerId: career.id,
      tacticId: tactic.id,
      actionLabel: tactic.action,
    });
  }

  const DIFF_COLORS: Record<Career['difficulty'], string> = {
    starter: 'text-emerald-400 bg-emerald-400/10',
    medium: 'text-yellow-400 bg-yellow-400/10',
    committed: 'text-orange-400 bg-orange-400/10',
    'beast-mode': 'text-red-400 bg-red-400/10',
  };

  const COST_MAP: Record<Career['startupCost'], string> = {
    minimal: '< $500',
    low: '$500–$2K',
    medium: '$2K–$20K',
    high: '$20K+',
  };

  const CATEGORY_ICONS: Record<string, string> = {
    research: '🔍',
    setup: '⚙️',
    outreach: '📣',
    learn: '📚',
    build: '🔨',
    money: '💰',
  };

  return (
    <div className="min-h-screen bg-[#080810] text-white pb-24">
      {/* Header */}
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-b from-[#1A1A2E] to-[#080810]" />
        <div className="relative px-5 pt-12 pb-6">
          <Link href="/explore">
            <button className="text-white/40 text-sm mb-4 flex items-center gap-1">← All Careers</button>
          </Link>

          <div className="flex items-start gap-4">
            <span className="text-5xl">{career.emoji}</span>
            <div>
              <h1 className="text-2xl font-black leading-tight">{career.title}</h1>
              <p className="text-white/50 text-sm mt-1">{career.tagline}</p>
            </div>
          </div>

          {/* Key stats */}
          <div className="flex flex-wrap gap-2 mt-4">
            <span className="text-xs bg-[#BDFF00]/10 text-[#BDFF00] px-3 py-1.5 rounded-full font-semibold">
              💰 ${(career.incomeRange.min / 1000).toFixed(0)}K–${(career.incomeRange.max / 1000).toFixed(0)}K/yr
            </span>
            <span className="text-xs bg-white/5 text-white/60 px-3 py-1.5 rounded-full">
              ⏱ {career.timeToFirstIncome}
            </span>
            <span className={`text-xs px-3 py-1.5 rounded-full ${DIFF_COLORS[career.difficulty]}`}>
              {career.difficulty === 'beast-mode' ? '💀 Beast mode' :
               career.difficulty === 'committed' ? '💪 Committed' :
               career.difficulty === 'medium' ? '🎯 Some ramp-up' : '🟢 Low barrier'}
            </span>
            <span className="text-xs bg-white/5 text-white/60 px-3 py-1.5 rounded-full">
              💸 {COST_MAP[career.startupCost]} to start
            </span>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex px-5 gap-2 mb-5">
        {(['overview', 'tactics', 'questions'] as const).map(t => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`flex-1 py-2.5 rounded-xl text-sm font-semibold capitalize transition-all ${
              tab === t ? 'bg-[#BDFF00] text-black' : 'bg-white/5 text-white/50'
            }`}
          >
            {t === 'overview' ? '📋 Overview' : t === 'tactics' ? '⚡ Actions' : '💭 Questions'}
          </button>
        ))}
      </div>

      <div className="px-5">
        <AnimatePresence mode="wait">
          {tab === 'overview' && (
            <motion.div
              key="overview"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="space-y-5"
            >
              {/* Pitch */}
              <div className="bg-[#1A1A2E] rounded-2xl p-4">
                <h3 className="text-white/40 text-xs font-semibold uppercase tracking-wider mb-2">What it is</h3>
                <p className="text-white/80 text-sm leading-relaxed">{career.pitch}</p>
              </div>

              {/* Income detail */}
              {career.incomeRange.note && (
                <div className="bg-[#BDFF00]/5 border border-[#BDFF00]/10 rounded-2xl p-4">
                  <h3 className="text-[#BDFF00] text-xs font-semibold uppercase tracking-wider mb-1">Income note</h3>
                  <p className="text-white/70 text-sm">{career.incomeRange.note}</p>
                </div>
              )}

              {/* Skills */}
              <div className="bg-[#1A1A2E] rounded-2xl p-4">
                <h3 className="text-white/40 text-xs font-semibold uppercase tracking-wider mb-3">Skills needed</h3>
                <div className="space-y-2">
                  {career.skillsRequired.map(s => (
                    <div key={s} className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-[#BDFF00] flex-shrink-0" />
                      <span className="text-white/80 text-sm capitalize">{s}</span>
                      <span className="text-white/30 text-xs ml-auto">Required</span>
                    </div>
                  ))}
                  {career.skillsHelpful.map(s => (
                    <div key={s} className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-white/20 flex-shrink-0" />
                      <span className="text-white/50 text-sm capitalize">{s}</span>
                      <span className="text-white/20 text-xs ml-auto">Helpful</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Fun fact */}
              <div className="bg-[#1A1A2E] rounded-2xl p-4">
                <h3 className="text-white/40 text-xs font-semibold uppercase tracking-wider mb-2">Fun fact</h3>
                <p className="text-white/70 text-sm leading-relaxed">{career.funFact}</p>
              </div>

              {/* Snark */}
              <div className="bg-white/3 border border-white/5 rounded-2xl p-4">
                <p className="text-white/40 text-sm italic leading-relaxed">"{career.snarkyComment}"</p>
              </div>

              <button
                onClick={() => setTab('tactics')}
                className="w-full bg-[#BDFF00] text-black font-bold py-4 rounded-2xl text-lg"
              >
                See Action Steps ⚡
              </button>
            </motion.div>
          )}

          {tab === 'tactics' && (
            <motion.div
              key="tactics"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="space-y-3"
            >
              <p className="text-white/30 text-sm mb-4">
                {markedDone.size} of {career.tactics.length} steps taken.
                {markedDone.size === 0 ? " Time to move." : markedDone.size === career.tactics.length ? " 🔥 You did them all!" : " Keep going."}
              </p>

              {career.tactics.map((tactic, i) => {
                const done = markedDone.has(tactic.id);
                return (
                  <motion.div
                    key={tactic.id}
                    layout
                    className={`rounded-2xl p-4 border transition-all ${
                      done
                        ? 'bg-[#BDFF00]/8 border-[#BDFF00]/20'
                        : 'bg-[#1A1A2E] border-white/5'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div className={`flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold mt-0.5 ${
                        done ? 'bg-[#BDFF00] text-black' : 'bg-white/10 text-white/40'
                      }`}>
                        {done ? '✓' : i + 1}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-sm">{CATEGORY_ICONS[tactic.category] ?? '📌'}</span>
                          <span className="text-white/30 text-xs uppercase tracking-wider">{tactic.category}</span>
                          <span className="text-white/20 text-xs ml-auto">⏱ {tactic.timeEstimate}</span>
                        </div>
                        <h4 className={`font-bold text-base leading-snug ${done ? 'text-[#BDFF00]' : 'text-white'}`}>
                          {tactic.action}
                        </h4>
                        <p className="text-white/50 text-sm mt-1 leading-relaxed">{tactic.detail}</p>

                        {!done && (
                          <button
                            onClick={() => handleDone(tactic)}
                            className="mt-3 bg-white/8 border border-white/10 text-white/70 text-sm font-semibold px-4 py-2 rounded-xl transition-all active:scale-[0.97]"
                          >
                            Mark Done ✓
                          </button>
                        )}

                        {showConfetti === tactic.id && (
                          <motion.p
                            initial={{ opacity: 0, y: -5 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="mt-2 text-[#BDFF00] text-xs font-semibold"
                          >
                            ✨ Progress logged. Your future self approves.
                          </motion.p>
                        )}
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          )}

          {tab === 'questions' && (
            <motion.div
              key="questions"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="space-y-3"
            >
              <p className="text-white/40 text-sm mb-4">
                Sit with these before committing. Or just skim them and start anyway — both are valid.
              </p>

              {career.questions.map((q, i) => (
                <div key={i} className="bg-[#1A1A2E] rounded-2xl p-4 border border-white/5">
                  <div className="flex items-start gap-3">
                    <span className="text-[#BDFF00] font-black text-lg flex-shrink-0">{i + 1}</span>
                    <p className="text-white/80 text-sm leading-relaxed pt-0.5">{q}</p>
                  </div>
                </div>
              ))}

              <div className="bg-white/3 border border-white/5 rounded-2xl p-4 mt-4">
                <p className="text-white/40 text-sm italic">
                  "You don't need to have all the answers before you start. You just need to start."
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
