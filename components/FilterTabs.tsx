'use client';

import { FilterType } from '@/types';

interface FilterTabsProps {
  filter: FilterType;
  onFilterChange: (filter: FilterType) => void;
  allCount: number;
  activeCount: number;
  completedCount: number;
}

export default function FilterTabs({
  filter,
  onFilterChange,
  allCount,
  activeCount,
  completedCount,
}: FilterTabsProps) {
  const tabs: { label: string; value: FilterType; count: number }[] = [
    { label: 'All', value: 'all', count: allCount },
    { label: 'Active', value: 'active', count: activeCount },
    { label: 'Completed', value: 'completed', count: completedCount },
  ];

  return (
    <div className="flex gap-1 mb-4">
      {tabs.map((tab) => (
        <button
          key={tab.value}
          onClick={() => onFilterChange(tab.value)}
          className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
            filter === tab.value
              ? 'bg-violet-100 text-violet-700'
              : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'
          }`}
        >
          {tab.label}
          <span
            className={`text-xs px-1.5 py-0.5 rounded-full ${
              filter === tab.value
                ? 'bg-violet-200 text-violet-700'
                : 'bg-gray-100 text-gray-500'
            }`}
          >
            {tab.count}
          </span>
        </button>
      ))}
    </div>
  );
}
