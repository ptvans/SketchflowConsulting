import { Link } from 'wouter';
import type { Career } from '../types';

const DIFFICULTY_LABELS: Record<Career['difficulty'], { label: string; color: string }> = {
  starter: { label: 'Low barrier', color: 'text-emerald-400' },
  medium: { label: 'Some ramp-up', color: 'text-yellow-400' },
  committed: { label: 'Takes commitment', color: 'text-orange-400' },
  'beast-mode': { label: 'Beast mode', color: 'text-red-400' },
};

const COST_LABELS: Record<Career['startupCost'], string> = {
  minimal: '< $500 to start',
  low: '$500–$2K to start',
  medium: '$2K–$20K to start',
  high: '$20K+ to start',
};

interface CareerCardProps {
  career: Career;
  variant?: 'top-pick' | 'wild-card' | 'list';
  completedCount?: number;
}

export default function CareerCard({ career, variant = 'list', completedCount = 0 }: CareerCardProps) {
  const diff = DIFFICULTY_LABELS[career.difficulty];

  if (variant === 'wild-card') {
    return (
      <Link href={`/explore/${career.id}`}>
        <div className="relative bg-gradient-to-br from-[#1A1A2E] to-[#16213E] border border-[#BDFF00]/20 rounded-2xl p-4 cursor-pointer active:scale-[0.98] transition-transform">
          <div className="flex items-start gap-3">
            <span className="text-3xl">{career.emoji}</span>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-[10px] font-bold text-[#BDFF00] uppercase tracking-wider bg-[#BDFF00]/10 px-2 py-0.5 rounded-full">
                  Wild Card
                </span>
              </div>
              <h3 className="text-white font-bold text-base leading-tight">{career.title}</h3>
              <p className="text-white/50 text-xs mt-1 leading-relaxed line-clamp-2">{career.tagline}</p>
              <div className="flex items-center gap-3 mt-2">
                <span className="text-[#BDFF00] text-xs font-semibold">
                  ${(career.incomeRange.min / 1000).toFixed(0)}K–${(career.incomeRange.max / 1000).toFixed(0)}K/yr
                </span>
                <span className="text-white/30 text-xs">·</span>
                <span className="text-white/40 text-xs">{career.timeToFirstIncome}</span>
              </div>
            </div>
            <span className="text-white/30 text-lg mt-1">›</span>
          </div>
        </div>
      </Link>
    );
  }

  if (variant === 'top-pick') {
    return (
      <Link href={`/explore/${career.id}`}>
        <div className="relative bg-[#1A1A2E] border border-white/10 rounded-2xl p-5 cursor-pointer active:scale-[0.98] transition-transform overflow-hidden">
          {/* Subtle glow */}
          <div className="absolute top-0 right-0 w-24 h-24 bg-[#BDFF00]/5 rounded-full -translate-y-8 translate-x-8 blur-xl" />

          <div className="relative">
            <div className="flex items-start justify-between mb-3">
              <span className="text-4xl">{career.emoji}</span>
              {completedCount > 0 && (
                <span className="text-[10px] font-bold text-emerald-400 bg-emerald-400/10 px-2 py-1 rounded-full">
                  {completedCount} done ✓
                </span>
              )}
            </div>

            <h3 className="text-white font-bold text-xl leading-tight mb-1">{career.title}</h3>
            <p className="text-white/50 text-sm leading-relaxed mb-4 line-clamp-2">{career.tagline}</p>

            <div className="flex flex-wrap gap-2 mb-4">
              <span className="text-xs bg-white/5 text-white/60 px-2.5 py-1 rounded-full">
                💰 ${(career.incomeRange.min / 1000).toFixed(0)}K–${(career.incomeRange.max / 1000).toFixed(0)}K
              </span>
              <span className="text-xs bg-white/5 text-white/60 px-2.5 py-1 rounded-full">
                ⏱ {career.timeToFirstIncome}
              </span>
              <span className={`text-xs bg-white/5 px-2.5 py-1 rounded-full ${diff.color}`}>
                {diff.label}
              </span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-white/30 text-xs">{COST_LABELS[career.startupCost]}</span>
              <span className="text-[#BDFF00] text-sm font-semibold">Explore →</span>
            </div>
          </div>
        </div>
      </Link>
    );
  }

  // List variant
  return (
    <Link href={`/explore/${career.id}`}>
      <div className="flex items-center gap-3 bg-[#1A1A2E] border border-white/5 rounded-xl p-3 cursor-pointer active:scale-[0.98] transition-transform">
        <span className="text-2xl">{career.emoji}</span>
        <div className="flex-1 min-w-0">
          <h4 className="text-white font-semibold text-sm leading-tight">{career.title}</h4>
          <p className="text-white/40 text-xs mt-0.5 truncate">{career.tagline}</p>
        </div>
        <div className="text-right flex-shrink-0">
          <p className="text-white/60 text-xs font-semibold">
            ${(career.incomeRange.min / 1000).toFixed(0)}K+
          </p>
          <span className="text-white/30 text-xs">›</span>
        </div>
      </div>
    </Link>
  );
}
