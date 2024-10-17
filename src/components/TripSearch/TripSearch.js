import React, { useCallback, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import Loader from '../Loader/Loader'; 
import './TripSearch.css';

const TripSearch = ({ setTrips, allTrips }) => {
  const { register, handleSubmit, reset } = useForm();
  const [loading, setLoading] = useState(false); 
  const [matchingCount, setMatchingCount] = useState(0);

  useEffect(() => {
    const completedTrips = allTrips.filter(trip => trip.status === 'COMPLETED');
    setTrips(completedTrips); 
  }, [allTrips, setTrips]);

  const handleSearch = useCallback((data) => {
    setLoading(true); 
    let filteredTrips = allTrips; 

    if (data.keyword) {
      const keywordTrimmed = data.keyword.trim();
      const regex = new RegExp(keywordTrimmed, 'i');

      filteredTrips = filteredTrips.filter(trip =>
        regex.test(trip.pickup_location) ||
        regex.test(trip.dropoff_location) ||
        regex.test(trip.type) ||
        regex.test(trip.driver_name) ||
        regex.test(trip.car_make) ||
        regex.test(trip.car_model) ||
        regex.test(trip.car_number)
      );
    }

    const minDistance = parseFloat(data.minDistance);
    const maxDistance = parseFloat(data.maxDistance);

    if (!isNaN(minDistance) && minDistance >= 0) {
      filteredTrips = filteredTrips.filter(trip => trip.distance >= minDistance);
    }

    if (!isNaN(maxDistance) && maxDistance >= 0) {
      filteredTrips = filteredTrips.filter(trip => trip.distance <= maxDistance);
    }

    if (data.pickupDate) {
      const selectedDate = new Date(data.pickupDate);
      selectedDate.setHours(0, 0, 0, 0);
      filteredTrips = filteredTrips.filter(trip => {
        const tripPickupDate = new Date(trip.pickup_date);
        tripPickupDate.setHours(0, 0, 0, 0);
        return tripPickupDate.getTime() === selectedDate.getTime();
      });
    }

    if (!data.includeCanceled) {
      filteredTrips = filteredTrips.filter(trip => trip.status === 'COMPLETED');
    }

    setTrips(filteredTrips);
    setMatchingCount(filteredTrips.length); 
    setLoading(false); 
  }, [setTrips, allTrips]);

  const handleShowCanceledTrips = () => {
    const canceledTrips = allTrips.filter(trip => trip.status === 'CANCELED');
    setTrips(canceledTrips); 
    setMatchingCount(canceledTrips.length); 
  };

  const handleShowCompletedTrips = () => {
    const completedTrips = allTrips.filter(trip => trip.status === 'COMPLETED');
    setTrips(completedTrips); 
    setMatchingCount(completedTrips.length); 
  };

  const handleReset = () => {
    reset(); 
    const completedTrips = allTrips.filter(trip => trip.status === 'COMPLETED'); 
    setTrips(completedTrips);
    setMatchingCount(completedTrips.length); 
  };

  return (
    <div className="search-container">
      {loading ? (
        <Loader />
      ) : (
        <>
          <form onSubmit={handleSubmit(handleSearch)}>
            <h2>Trip Search</h2>
            <input
              type="text"
              placeholder="Search by location, driver, or trip type..."
              {...register('keyword')}
            />
            <input
              type="number"
              id="minDistance"
              placeholder="Min Distance (km)"
              {...register('minDistance')}
            />
            <input
              type="number"
              id="maxDistance"
              placeholder="Max Distance (km)"
              {...register('maxDistance')}
            />
            <div className="date-input">
              <label>Pickup Date</label>
              <input
                type="date"
                {...register('pickupDate')}
              />
            </div>
            <label>
              <input
                type="checkbox"
                {...register('includeCanceled')}
              />
              Include Canceled Trips
            </label>
            <button type="button" onClick={handleReset} className="reset-button">Reset</button>
            <button type="submit">Search</button>
          </form>
          <div className="button-container">
            <button onClick={handleShowCanceledTrips} className="canceled-trips-button">
              Show Canceled Trips
            </button>
            <button onClick={handleShowCompletedTrips} className="completed-trips-button">
              Show Completed Trips
            </button>
          </div>
          {matchingCount > 0 && (
            <div className="result-count">
              <p>Number of matching trips: {matchingCount}</p>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default TripSearch;
