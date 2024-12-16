import React, { useState, useEffect } from 'react';

interface SearchBarProps {
  keyword: string;
  onKeywordChange: (keyword: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ keyword, onKeywordChange }) => {
  const [inputValue, setInputValue] = useState(keyword);

  useEffect(() => {
    const timer = setTimeout(() => {
      onKeywordChange(inputValue);
    }, 1500);

    return () => clearTimeout(timer);
  }, [inputValue, onKeywordChange]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  return (
    <div className="mb-6">
      <input
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        className="w-full p-2 border border-gray-300 rounded"
        placeholder="Search articles..."
      />
    </div>
  );
};

export default SearchBar;
