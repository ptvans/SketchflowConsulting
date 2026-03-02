import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  SKILL_OPTIONS,
  INCOME_OPTIONS,
  WORK_STYLE_OPTIONS,
  INTEREST_OPTIONS,
  DEALBREAKER_OPTIONS,
} from '../data/onboardingData';
import type { UserProfile, OnboardingStep } from '../types';

interface OnboardingProps {
  onComplete: (profile: UserProfile) => void;
}

const STEPS: OnboardingStep[] = ['welcome', 'skills', 'income', 'workstyle', 'interests', 'dealbreakers', 'done'];

export default function Onboarding({ onComplete }: OnboardingProps) {
  const [step, setStep] = useState<OnboardingStep>('welcome');
  const [name, setName] = useState('');
  const [skills, setSkills] = useState<string[]>([]);
  const [incomeGoal, setIncomeGoal] = useState(100000);
  const [workStyles, setWorkStyles] = useState<string[]>([]);
  const [interests, setInterests] = useState<string[]>([]);
  const [dealbreakers, setDealbreakers] = useState<string[]>([]);

  const stepIndex = STEPS.indexOf(step);
  const progress = ((stepIndex) / (STEPS.length - 1)) * 100;

  function next() {
    const nextStep = STEPS[stepIndex + 1];
    if (nextStep) setStep(nextStep);
  }

  function toggleItem(arr: string[], setArr: (v: string[]) => void, id: string) {
    setArr(arr.includes(id) ? arr.filter(x => x !== id) : [...arr, id]);
  }

  function finish() {
    const profile: UserProfile = {
      name: name.trim() || 'You',
      skills,
      incomeGoal,
      workStyles,
      interests,
      dealbreakers,
      exploredCareers: [],
      createdAt: new Date().toISOString(),
    };
    onComplete(profile);
  }

  const slideVariants = {
    enter: { opacity: 0, x: 40 },
    center: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -40 },
  };

  return (
    <div className="min-h-screen bg-[#080810] text-white flex flex-col">
      {/* Progress bar */}
      {step !== 'welcome' && step !== 'done' && (
        <div className="fixed top-0 left-0 right-0 h-1 bg-white/10 z-50">
          <motion.div
            className="h-full bg-[#BDFF00]"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.4 }}
          />
        </div>
      )}

      <AnimatePresence mode="wait">
        {step === 'welcome' && (
          <motion.div
            key="welcome"
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.3 }}
            className="flex-1 flex flex-col items-center justify-center px-6 text-center"
          >
            <div className="text-7xl mb-6">🔀</div>
            <h1 className="text-4xl font-black mb-3 leading-tight">
              Plot Twist.<br />
              <span className="text-[#BDFF00]">Your career.</span>
            </h1>
            <p className="text-white/50 text-lg mb-2 max-w-xs">
              You're here because something isn't working.
            </p>
            <p className="text-white/30 text-base mb-10 max-w-xs">
              Good. Let's figure out what's next.
            </p>

            <div className="w-full max-w-xs mb-6">
              <label className="block text-white/50 text-sm mb-2 text-left">What should I call you?</label>
              <input
                type="text"
                value={name}
                onChange={e => setName(e.target.value)}
                placeholder="Your name (or alias if you're shy)"
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/20 focus:outline-none focus:border-[#BDFF00]/50 transition-colors"
              />
            </div>

            <button
              onClick={next}
              className="w-full max-w-xs bg-[#BDFF00] text-black font-bold text-lg py-4 rounded-2xl active:scale-[0.97] transition-transform"
            >
              Let's Go →
            </button>

            <p className="text-white/20 text-xs mt-6">
              Your data stays on your device. No accounts, no nonsense.
            </p>
          </motion.div>
        )}

        {step === 'skills' && (
          <motion.div
            key="skills"
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.3 }}
            className="flex-1 flex flex-col px-5 pt-10 pb-28"
          >
            <h2 className="text-2xl font-black mb-1">What can you actually do?</h2>
            <p className="text-white/40 text-sm mb-6">Pick everything that applies. Your mom isn't watching.</p>

            <div className="grid grid-cols-2 gap-2 flex-1 overflow-y-auto">
              {SKILL_OPTIONS.map(skill => {
                const selected = skills.includes(skill.id);
                return (
                  <button
                    key={skill.id}
                    onClick={() => toggleItem(skills, setSkills, skill.id)}
                    className={`flex items-center gap-2 p-3 rounded-xl border text-left transition-all active:scale-[0.97] ${
                      selected
                        ? 'bg-[#BDFF00]/15 border-[#BDFF00]/50 text-[#BDFF00]'
                        : 'bg-white/3 border-white/8 text-white/70'
                    }`}
                  >
                    <span className="text-xl">{skill.emoji}</span>
                    <span className="text-xs font-semibold leading-tight">{skill.label}</span>
                  </button>
                );
              })}
            </div>

            <div className="fixed bottom-0 left-0 right-0 p-5 bg-[#080810]/95 backdrop-blur-sm">
              <button
                onClick={next}
                disabled={skills.length === 0}
                className="w-full bg-[#BDFF00] disabled:bg-white/10 disabled:text-white/30 text-black font-bold text-lg py-4 rounded-2xl transition-all"
              >
                {skills.length === 0 ? 'Pick at least one' : `Next (${skills.length} selected) →`}
              </button>
            </div>
          </motion.div>
        )}

        {step === 'income' && (
          <motion.div
            key="income"
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.3 }}
            className="flex-1 flex flex-col px-5 pt-10 pb-28"
          >
            <h2 className="text-2xl font-black mb-1">How much do you need?</h2>
            <p className="text-white/40 text-sm mb-8">To feel like a functioning adult. Annually.</p>

            <div className="space-y-3 flex-1">
              {INCOME_OPTIONS.map(opt => {
                const selected = incomeGoal === opt.value;
                return (
                  <button
                    key={opt.value}
                    onClick={() => setIncomeGoal(opt.value)}
                    className={`w-full flex items-center justify-between p-4 rounded-2xl border transition-all active:scale-[0.98] ${
                      selected
                        ? 'bg-[#BDFF00]/15 border-[#BDFF00]/60'
                        : 'bg-white/3 border-white/8'
                    }`}
                  >
                    <div className="text-left">
                      <p className={`font-bold text-xl ${selected ? 'text-[#BDFF00]' : 'text-white'}`}>
                        {opt.label}
                      </p>
                      <p className="text-white/40 text-sm">{opt.description}</p>
                    </div>
                    {selected && <span className="text-[#BDFF00] text-xl">✓</span>}
                  </button>
                );
              })}
            </div>

            <div className="fixed bottom-0 left-0 right-0 p-5 bg-[#080810]/95 backdrop-blur-sm">
              <button
                onClick={next}
                className="w-full bg-[#BDFF00] text-black font-bold text-lg py-4 rounded-2xl"
              >
                Next →
              </button>
            </div>
          </motion.div>
        )}

        {step === 'workstyle' && (
          <motion.div
            key="workstyle"
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.3 }}
            className="flex-1 flex flex-col px-5 pt-10 pb-28"
          >
            <h2 className="text-2xl font-black mb-1">Where do you want to work?</h2>
            <p className="text-white/40 text-sm mb-6">Pick all that work for you.</p>

            <div className="space-y-3 flex-1">
              {WORK_STYLE_OPTIONS.map(opt => {
                const selected = workStyles.includes(opt.id);
                return (
                  <button
                    key={opt.id}
                    onClick={() => toggleItem(workStyles, setWorkStyles, opt.id)}
                    className={`w-full flex items-center gap-4 p-4 rounded-2xl border transition-all active:scale-[0.98] ${
                      selected
                        ? 'bg-[#BDFF00]/15 border-[#BDFF00]/60'
                        : 'bg-white/3 border-white/8'
                    }`}
                  >
                    <span className="text-3xl">{opt.emoji}</span>
                    <div className="text-left flex-1">
                      <p className={`font-bold ${selected ? 'text-[#BDFF00]' : 'text-white'}`}>{opt.label}</p>
                      <p className="text-white/40 text-sm">{opt.description}</p>
                    </div>
                    {selected && <span className="text-[#BDFF00]">✓</span>}
                  </button>
                );
              })}
            </div>

            <div className="fixed bottom-0 left-0 right-0 p-5 bg-[#080810]/95 backdrop-blur-sm">
              <button
                onClick={next}
                disabled={workStyles.length === 0}
                className="w-full bg-[#BDFF00] disabled:bg-white/10 disabled:text-white/30 text-black font-bold text-lg py-4 rounded-2xl transition-all"
              >
                {workStyles.length === 0 ? 'Pick at least one' : 'Next →'}
              </button>
            </div>
          </motion.div>
        )}

        {step === 'interests' && (
          <motion.div
            key="interests"
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.3 }}
            className="flex-1 flex flex-col px-5 pt-10 pb-28"
          >
            <h2 className="text-2xl font-black mb-1">What actually gets you going?</h2>
            <p className="text-white/40 text-sm mb-6">Beyond the paycheck. (Pick your top interests.)</p>

            <div className="grid grid-cols-2 gap-2 flex-1 overflow-y-auto">
              {INTEREST_OPTIONS.map(opt => {
                const selected = interests.includes(opt.id);
                return (
                  <button
                    key={opt.id}
                    onClick={() => toggleItem(interests, setInterests, opt.id)}
                    className={`flex items-center gap-2 p-3 rounded-xl border text-left transition-all active:scale-[0.97] ${
                      selected
                        ? 'bg-[#BDFF00]/15 border-[#BDFF00]/50 text-[#BDFF00]'
                        : 'bg-white/3 border-white/8 text-white/70'
                    }`}
                  >
                    <span className="text-xl">{opt.emoji}</span>
                    <span className="text-xs font-semibold leading-tight">{opt.label}</span>
                  </button>
                );
              })}
            </div>

            <div className="fixed bottom-0 left-0 right-0 p-5 bg-[#080810]/95 backdrop-blur-sm">
              <button
                onClick={next}
                className="w-full bg-[#BDFF00] text-black font-bold text-lg py-4 rounded-2xl"
              >
                Next →
              </button>
            </div>
          </motion.div>
        )}

        {step === 'dealbreakers' && (
          <motion.div
            key="dealbreakers"
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.3 }}
            className="flex-1 flex flex-col px-5 pt-10 pb-28"
          >
            <h2 className="text-2xl font-black mb-1">Hard nopes?</h2>
            <p className="text-white/40 text-sm mb-6">What would make you stay miserable in your current job instead?</p>

            <div className="space-y-2 flex-1">
              {DEALBREAKER_OPTIONS.map(opt => {
                const selected = dealbreakers.includes(opt.id);
                return (
                  <button
                    key={opt.id}
                    onClick={() => toggleItem(dealbreakers, setDealbreakers, opt.id)}
                    className={`w-full flex items-center gap-3 p-3.5 rounded-xl border transition-all active:scale-[0.98] ${
                      selected
                        ? 'bg-red-500/15 border-red-500/50 text-red-400'
                        : 'bg-white/3 border-white/8 text-white/70'
                    }`}
                  >
                    <span className="text-xl">{opt.emoji}</span>
                    <span className="font-semibold text-sm">{opt.label}</span>
                    {selected && <span className="ml-auto text-red-400">✗</span>}
                  </button>
                );
              })}
            </div>

            <div className="fixed bottom-0 left-0 right-0 p-5 bg-[#080810]/95 backdrop-blur-sm">
              <button
                onClick={next}
                className="w-full bg-[#BDFF00] text-black font-bold text-lg py-4 rounded-2xl"
              >
                Build My Career List →
              </button>
            </div>
          </motion.div>
        )}

        {step === 'done' && (
          <motion.div
            key="done"
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.3 }}
            className="flex-1 flex flex-col items-center justify-center px-6 text-center"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', stiffness: 200, damping: 12, delay: 0.2 }}
              className="text-7xl mb-6"
            >
              🎯
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
              <h2 className="text-3xl font-black mb-3">
                {name ? `Alright, ${name}.` : 'Alright.'}
              </h2>
              <p className="text-white/50 text-lg mb-3 max-w-xs">
                I've analyzed your skills, ambitions, and your deeply specific dealbreakers.
              </p>
              <p className="text-white/40 text-base mb-10 max-w-xs">
                Your personalized career shortlist is ready. New picks every day.
              </p>

              <button
                onClick={finish}
                className="w-full max-w-xs bg-[#BDFF00] text-black font-bold text-xl py-5 rounded-2xl active:scale-[0.97] transition-transform"
              >
                See My Careers ✨
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
