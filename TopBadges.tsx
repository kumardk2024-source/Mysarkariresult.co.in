import React from 'react';
import { VacancyItem } from '../types';

interface TopBadgesProps {
  vacancies: VacancyItem[];
  onSelectJob: (job: VacancyItem) => void;
}

export const TopBadges: React.FC<TopBadgesProps> = ({ vacancies, onSelectJob }) => {
  // Grab the top vacancies
  const topVacancies = vacancies.filter(v => v.isTopVacancy).slice(0, 8);

  const badgeThemes = [
    { bg: 'bg-[#000066] hover:bg-blue-900', border: 'border-blue-950', tag: 'Top Online Form' },
    { bg: 'bg-[#cc0000] hover:bg-red-800', border: 'border-red-950', tag: 'New Update' },
    { bg: 'bg-green-700 hover:bg-green-800', border: 'border-green-950', tag: 'Trending' },
    { bg: 'bg-amber-600 hover:bg-amber-700', border: 'border-amber-900', tag: 'Hot Vacancy' },
    { bg: 'bg-[#000066] hover:bg-blue-900', border: 'border-blue-950', tag: 'Govt Job Alert' },
    { bg: 'bg-teal-700 hover:bg-teal-800', border: 'border-teal-950', tag: 'Admit Card' },
    { bg: 'bg-[#cc0000] hover:bg-red-800', border: 'border-red-950', tag: 'Result Out' },
    { bg: 'bg-slate-800 hover:bg-slate-900', border: 'border-slate-950', tag: 'Important' },
  ];

  if (topVacancies.length === 0) return null;

  return (
    <div className="w-full my-2">
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
        {topVacancies.map((job, index) => {
          const theme = badgeThemes[index % badgeThemes.length];
          return (
            <button
              key={job.id}
              id={`top-badge-${job.id}`}
              onClick={() => onSelectJob(job)}
              className={`${theme.bg} text-white p-2.5 sm:p-3 text-center rounded border-b-4 ${theme.border} shadow-sm flex flex-col justify-between items-center transition-all cursor-pointer min-h-[72px] text-left`}
            >
              <div className="flex items-center justify-center gap-1.5 w-full">
                <p className="text-[10px] sm:text-xs uppercase font-bold tracking-wider opacity-90">
                  {theme.tag}
                </p>
                {job.isNew && (
                  <span className="animate-blink bg-yellow-300 text-red-900 text-[9px] font-black px-1.5 py-0.2 rounded shadow-sm">
                    NEW
                  </span>
                )}
              </div>
              <p className="text-xs sm:text-sm font-bold leading-tight line-clamp-2 mt-0.5 text-center">
                {job.shortName || job.title}
              </p>
              <span className="text-[9px] bg-black/20 px-1.5 py-0.2 rounded mt-1 font-semibold">
                {job.totalPosts || 'Check Details'}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
