import { Link, useLocation } from 'wouter';

const tabs = [
  { path: '/', label: 'Today', icon: '✨' },
  { path: '/explore', label: 'Explore', icon: '🔍' },
  { path: '/progress', label: 'Progress', icon: '📈' },
  { path: '/settings', label: 'Profile', icon: '👤' },
];

export default function BottomNav() {
  const [location] = useLocation();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-[#0F0F1A] border-t border-white/10 pb-safe">
      <div className="flex items-center justify-around h-16 max-w-lg mx-auto px-2">
        {tabs.map(tab => {
          const active = location === tab.path || (tab.path !== '/' && location.startsWith(tab.path));
          return (
            <Link key={tab.path} href={tab.path}>
              <button
                className={`flex flex-col items-center gap-0.5 px-4 py-2 rounded-xl transition-all duration-200 ${
                  active
                    ? 'text-[#BDFF00]'
                    : 'text-white/40 hover:text-white/70'
                }`}
              >
                <span className="text-xl leading-none">{tab.icon}</span>
                <span
                  className={`text-[10px] font-semibold tracking-wide uppercase ${
                    active ? 'text-[#BDFF00]' : 'text-white/40'
                  }`}
                >
                  {tab.label}
                </span>
                {active && (
                  <span className="absolute bottom-2 w-1 h-1 rounded-full bg-[#BDFF00]" />
                )}
              </button>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
