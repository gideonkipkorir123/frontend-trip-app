// src/App.js
import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import TripSearch from './components/TripSearch/TripSearch';
import TripList from './components/TripList/TripList';
import TripDetails from './components/TripDetails/TripDetails';
import axios from 'axios';
import { SearchProvider } from './context/SearchContext';

const App = () => {
  const [trips, setTrips] = useState([]);
  const [allTrips, setAllTrips] = useState([]);

  useEffect(() => {
    const fetchTrips = async () => {
      try {
        const response = await axios.get(process.env.REACT_APP_API_URL);
        const fetchedTrips = response.data.data;

        const completedTrips = fetchedTrips.filter(trip => trip.status === 'COMPLETED');
        setTrips(completedTrips); 
        setAllTrips(fetchedTrips); 
      } catch (error) {
        console.error('Error fetching trips:', error);
      }
    };

    fetchTrips(); 
  }, []);

  return (
    <SearchProvider> {/* Wrap the Router with SearchProvider */}
      <Router>
        <Routes>
          <Route path="/" element={
            <>
              <TripSearch setTrips={setTrips} allTrips={allTrips} />
              <TripList trips={trips} />
            </>
          } />
          <Route path="/trip/:id" element={<TripDetails />} />
        </Routes>
      </Router>
    </SearchProvider>
  );
};

export default App;
