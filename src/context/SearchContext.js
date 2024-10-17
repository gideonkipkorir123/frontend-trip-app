// src/context/SearchContext.js
import React, { createContext, useContext, useState } from 'react';

const SearchContext = createContext();

export const useSearch = () => {
    return useContext(SearchContext);
};

export const SearchProvider = ({ children }) => {
    const [searchParams, setSearchParams] = useState({
        keyword: '',
        minDistance: '',
        maxDistance: '',
        pickupDate: '',
        includeCanceled: false,
    });

    return (
        <SearchContext.Provider value={{ searchParams, setSearchParams }}>
            {children}
        </SearchContext.Provider>
    );
};
