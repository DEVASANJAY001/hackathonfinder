import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Filter, RotateCcw } from 'lucide-react';
import { FilterOptions, Theme, Platform } from '../types/event';
import { useEvents } from '../hooks/useEvents';

interface FilterBarProps {
  filters: FilterOptions;
  onFilterChange: (filters: FilterOptions) => void;
  platforms?: Platform[];
}

export const FilterBar = ({ filters, onFilterChange, platforms = [] }: FilterBarProps) => {
  const themes: (Theme | 'all')[] = [
    'all', 'AI', 'Web3', 'Mobile', 'Web Development', 'Data Science', 
    'Blockchain', 'IoT', 'Gaming', 'Fintech', 'Healthcare', 
    'Sustainability', 'Education', 'Open Source'
  ];

  const resetFilters = () => {
    onFilterChange({
      theme: 'all',
      platform: 'all',
      date: 'all',
      mode: 'all'
    });
  };

  return (
    <section className="py-4 md:py-8 bg-muted/30 border-b border-border">
      <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-8">
        <div className="flex flex-col gap-3">
          {/* Filter Icon and Title - Mobile */}
          <div className="flex items-center justify-between md:hidden">
            <div className="flex items-center space-x-2 text-foreground font-medium text-sm">
              <Filter className="w-4 h-4" />
              <span>Filters</span>
            </div>
          </div>

          {/* Desktop Layout */}
          <div className="hidden md:flex md:flex-row items-center gap-4">
            <div className="flex items-center space-x-2 text-foreground font-semibold">
              <Filter className="w-5 h-5" />
              <span>Filter Events:</span>
            </div>
          </div>

          {/* Filter Controls - Mobile: 2x2 Grid, Desktop: Row */}
          <div className="grid grid-cols-2 gap-2 md:flex md:flex-row md:items-center md:gap-4 md:flex-1">
            {/* Theme Filter */}
            <div className="w-full md:w-auto md:min-w-[180px]">
              <Select 
                value={filters.theme} 
                onValueChange={(value: Theme | 'all') => 
                  onFilterChange({ ...filters, theme: value })
                }
              >
                <SelectTrigger className="bg-background h-9 text-xs md:h-10 md:text-sm">
                  <SelectValue placeholder="Theme" />
                </SelectTrigger>
                <SelectContent className="bg-background border border-border">
                  {themes.map((theme) => (
                  <SelectItem key={theme} value={theme} className="text-xs md:text-sm">
                    {theme === 'all' ? 'All Themes' : theme}
                  </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Platform Filter */}
            <div className="w-full md:w-auto md:min-w-[180px]">
              <Select 
                value={filters.platform} 
                onValueChange={(value) => 
                  onFilterChange({ ...filters, platform: value })
                }
              >
                <SelectTrigger className="bg-background h-9 text-xs md:h-10 md:text-sm">
                  <SelectValue placeholder="Platform" />
                </SelectTrigger>
                <SelectContent className="bg-background border border-border">
                  <SelectItem value="all" className="text-xs md:text-sm">All Platforms</SelectItem>
                  {platforms.filter(platform => platform.id && platform.id.trim() !== '').map((platform) => (
                    <SelectItem key={platform.id} value={platform.id} className="text-xs md:text-sm">
                      {platform.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Date Filter */}
            <div className="w-full md:w-auto md:min-w-[150px]">
              <Select 
                value={filters.date} 
                onValueChange={(value: 'all' | 'today' | 'week' | 'month') => 
                  onFilterChange({ ...filters, date: value })
                }
              >
                <SelectTrigger className="bg-background h-9 text-xs md:h-10 md:text-sm">
                  <SelectValue placeholder="Date" />
                </SelectTrigger>
                <SelectContent className="bg-background border border-border">
                  <SelectItem value="all" className="text-xs md:text-sm">All Dates</SelectItem>
                  <SelectItem value="today" className="text-xs md:text-sm">Today</SelectItem>
                  <SelectItem value="week" className="text-xs md:text-sm">This Week</SelectItem>
                  <SelectItem value="month" className="text-xs md:text-sm">This Month</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Mode Filter */}
            <div className="w-full md:w-auto md:min-w-[150px]">
              <Select 
                value={filters.mode} 
                onValueChange={(value: 'all' | 'Online' | 'Offline' | 'Hybrid') => 
                  onFilterChange({ ...filters, mode: value })
                }
              >
                <SelectTrigger className="bg-background h-9 text-xs md:h-10 md:text-sm">
                  <SelectValue placeholder="Mode" />
                </SelectTrigger>
                <SelectContent className="bg-background border border-border">
                  <SelectItem value="all" className="text-xs md:text-sm">All Modes</SelectItem>
                  <SelectItem value="Online" className="text-xs md:text-sm">Online</SelectItem>
                  <SelectItem value="Offline" className="text-xs md:text-sm">Offline</SelectItem>
                  <SelectItem value="Hybrid" className="text-xs md:text-sm">Hybrid</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Reset Button - Full width on mobile */}
          <div className="w-full md:w-auto md:ml-4">
            <Button
              variant="outline"
              onClick={resetFilters}
              className="w-full md:w-auto flex items-center justify-center space-x-2 h-9 text-xs md:h-10 md:text-sm"
            >
              <RotateCcw className="w-3 h-3 md:w-4 md:h-4" />
              <span>Reset</span>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};