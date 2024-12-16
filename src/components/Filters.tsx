import React, { useState, useEffect } from 'react';
import { fetchCategories, fetchSources } from '../services/filtersService.ts';

interface FiltersProps {
  onDateChange: (date: string) => void;
  onCategoryChange: (category: string) => void;
  onSourceChange: (source: string) => void;
  selectedCategory: string;
  selectedSource: string;
  selectedDate: string;
}

const Filters: React.FC<FiltersProps> = ({
  onDateChange,
  onCategoryChange,
  onSourceChange,
  selectedCategory,
  selectedSource,
  selectedDate,
}) => {
  const [categories, setCategories] = useState<string[]>([]);
  const [sources, setSources] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    const fetchFilters = async () => {
      setLoading(true);
      setError('');
      try {
        const [categoriesData, sourcesData] = await Promise.all([
          fetchCategories(),
          fetchSources(),
        ]);
        setCategories(categoriesData);
        setSources(sourcesData);
      } catch (err) {
        setError('Failed to load filters. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchFilters();
  }, []);

  if (loading) return <div>Loading filters...</div>;
  if (error)
    return (
      <div className="text-red-500">
        {error}{' '}
        <button
          onClick={() => window.location.reload()}
          className="text-blue-500 underline"
        >
          Retry
        </button>
      </div>
    );

  return (
    <div className="flex flex-wrap gap-4 mb-6 justify-start">
      <div className="w-full sm:w-auto">
        <select
          value={selectedDate}
          id="date-filter"
          onChange={(e) => onDateChange(e.target.value)}
          className="p-2 border border-gray-300 rounded-lg w-full sm:w-auto"
        >
          <option value="">Select Date</option>
          <option value="today">Today</option>
          <option value="this_week">This Week</option>
          <option value="this_month">This Month</option>
        </select>
      </div>

      <div className="w-full sm:w-auto">
        <select
          id="source-filter"
          onChange={(e) => onSourceChange(e.target.value)}
          className="p-2 border border-gray-300 rounded-lg w-full sm:w-auto"
          value={selectedSource}
        >
          <option value="">Select Source</option>
          {sources.map((source) => (
            <option key={source} value={source}>
              {source}
            </option>
          ))}
        </select>
      </div>

      <div className="w-full sm:w-auto">
        <select
          id="category-filter"
          onChange={(e) => onCategoryChange(e.target.value)}
          className="p-2 border border-gray-300 rounded-lg w-full sm:w-auto"
          value={selectedCategory}
        >
          <option value="">Select Category</option>
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default Filters;
