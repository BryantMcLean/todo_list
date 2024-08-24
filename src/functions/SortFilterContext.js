import React, { createContext, useState, useContext } from 'react';

const SortFilterContext = createContext();

export const SortFilterProvider = ({ children }) => {
  const [sortOption, setSortOption] = useState('creationDate');
  const [filterOption, setFilterOption] = useState('all');

  return (
    <SortFilterContext.Provider value={{ sortOption, setSortOption, filterOption, setFilterOption }}>
      {children}
    </SortFilterContext.Provider>
  );
};

export const useSortFilter = () => useContext(SortFilterContext);
