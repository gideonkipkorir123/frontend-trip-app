import React from 'react';
import './TripList.css';

const TripList = ({ trips }) => {
  return (
    <ul>
      {trips.length > 0 ? (
        trips.map((trip) => (
          <li key={trip.id} className="trip-card">
            <div className="card-header">
              <h3>{trip.driver_name}</h3>
              <img src={trip.driver_pic} alt={`${trip.driver_name}`} />
            </div>
            <p><strong>Pickup Location:</strong> {trip.pickup_location}</p>
            <p><strong>Dropoff Location:</strong> {trip.dropoff_location}</p>
            <p><strong>Status:</strong> {trip.status}</p>
            <p><strong>Pickup Date:</strong> {trip.pickup_date}</p>
            <p><strong>Dropoff Date:</strong> {trip.dropoff_date || 'N/A'}</p>
            <p><strong>Type:</strong> {trip.type}</p>
            <p><strong>Driver Rating:</strong> {trip.driver_rating || 'N/A'}</p>
            <div className="trip-details">
              <div className="trip-info">
                <p><strong>Car:</strong> {trip.car_make} {trip.car_model} ({trip.car_year})</p>
                <p><strong>Car Number:</strong> {trip.car_number}</p>
                <p><strong>Duration:</strong> {trip.duration} {trip.duration_unit}</p>
                <p><strong>Distance:</strong> {trip.distance} {trip.distance_unit}</p>
                <p><strong>Cost:</strong> {trip.cost} {trip.cost_unit}</p>
              </div>
              <img src={trip.car_pic} alt={`${trip.car_make} ${trip.car_model}`} className="car-image" />
            </div>
            <a href={`/trip/${trip.id}`} className="details-link">View Details</a>
          </li>
        ))
      ) : (
        <p>No trips found.</p>
      )}
    </ul>
  );
};

export default TripList;
