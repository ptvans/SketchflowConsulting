import { CAREERS } from '../data/careers';
import type { UserProfile, Career } from '../types';

// Map onboarding skill IDs to career skill keywords
const SKILL_MAP: Record<string, string[]> = {
  'product-design': ['product design', 'ux', 'design'],
  'front-end-code': ['front end', 'code', 'development'],
  'breathwork': ['breathwork', 'facilitation', 'wellness'],
  'car-sales': ['car', 'negotiating', 'automotive'],
  'fixing-building': ['fixing', 'building', 'trades', 'construction'],
  'vehicle-transport': ['transport', 'vehicle', 'driving'],
  'finance': ['finance', 'accounting', 'financial'],
  'real-estate': ['real estate'],
  'investing': ['investing', 'wealth'],
  'on-camera': ['on-camera', 'video', 'social media'],
  'writing': ['writing', 'content'],
  'sales': ['sales', 'business dev'],
  'management': ['management', 'managing'],
  'teaching': ['teaching', 'training', 'education'],
  'back-end-code': ['code', 'development', 'tech'],
  'data-analysis': ['data', 'analytics'],
  'marketing': ['marketing', 'branding'],
  'healthcare': ['healthcare', 'medical'],
};

const DEALBREAKER_MAP: Record<string, (career: Career) => boolean> = {
  'high-risk': (c) => c.startupCost === 'high' || c.difficulty === 'beast-mode',
  'weekends': (c) => c.workStyles.includes('in-person') && !c.workStyles.includes('remote'),
  'on-camera': (c) => c.skillsRequired.includes('on-camera presence'),
  'physical-labor': (c) => c.categories.includes('trades') || c.categories.includes('building'),
  'large-investment': (c) => c.startupCost === 'high' || c.startupCost === 'medium',
  'certifications': (c) => c.difficulty === 'committed' || c.difficulty === 'beast-mode',
  'managing-people': (c) => c.categories.includes('operations') || c.id === 'self-storage-operator',
  'travel-required': (c) => c.id === 'vehicle-transport',
  'slow-income': (c) => c.timeToFirstIncome.includes('month') && parseInt(c.timeToFirstIncome) > 3,
};

function scoreCareer(career: Career, profile: UserProfile): number {
  let score = 0;

  // Income alignment (0–30 points)
  if (career.incomeRange.max >= profile.incomeGoal) score += 20;
  if (career.incomeRange.min >= profile.incomeGoal * 0.6) score += 10;

  // Skill match (0–40 points)
  const allCareerSkills = [
    ...career.skillsRequired.map(s => s.toLowerCase()),
    ...career.skillsHelpful.map(s => s.toLowerCase()),
  ].join(' ');

  profile.skills.forEach(skillId => {
    const keywords = SKILL_MAP[skillId] || [];
    const matches = keywords.filter(kw => allCareerSkills.includes(kw));
    if (matches.length > 0) {
      // Required skill match = 8 pts, helpful = 4 pts
      const isRequired = career.skillsRequired.some(s =>
        keywords.some(kw => s.toLowerCase().includes(kw))
      );
      score += isRequired ? 8 : 4;
    }
  });

  // Work style match (0–15 points)
  const styleOverlap = profile.workStyles.filter(ws =>
    career.workStyles.includes(ws as Career['workStyles'][number])
  );
  score += styleOverlap.length * 5;

  // Dealbreaker penalty (-50 each)
  profile.dealbreakers.forEach(db => {
    const checkFn = DEALBREAKER_MAP[db];
    if (checkFn && checkFn(career)) score -= 50;
  });

  // Startup cost penalty for high income goal
  if (career.startupCost === 'high' && profile.incomeGoal <= 75000) score -= 10;

  // Recency penalty: deprioritize recently explored
  if (profile.exploredCareers.includes(career.id)) score -= 15;

  return score;
}

export function matchCareers(profile: UserProfile): Career[] {
  return [...CAREERS]
    .map(c => ({ career: c, score: scoreCareer(c, profile) }))
    .filter(({ score }) => score > 0)
    .sort((a, b) => b.score - a.score)
    .map(({ career }) => career);
}

export function getDailyPicks(
  profile: UserProfile,
  excludeIds: string[] = []
): { topPicks: Career[]; wildCard: Career } {
  const ranked = matchCareers(profile).filter(c => !excludeIds.includes(c.id));

  // Top 2 best matches
  const topPicks = ranked.slice(0, 2);

  // Wild card: a random career from the lower tier (rank 6–15) or unmatched
  const wildCandidates = ranked.slice(5, 15);
  const wild =
    wildCandidates.length > 0
      ? wildCandidates[Math.floor(Math.random() * wildCandidates.length)]
      : ranked[ranked.length - 1] ?? CAREERS[0];

  return { topPicks, wildCard: wild };
}
