import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import './TripDetails.css';

const TripDetails = () => {
  const { id } = useParams();
  const [trip, setTrip] = useState(null);

  useEffect(() => {
    const fetchTripDetails = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/${id}`);
        if (response.data && response.data.data) {
          setTrip(response.data.data); 
        } else {
          console.error('No trip details found in response');
        }
      } catch (error) {
        console.error('Error fetching trip details:', error);
      }
    };

    fetchTripDetails();
  }, [id]);

  if (!trip) {
    return <div>Loading...</div>;
  }

  return (
    <div className="trip-details-container">
      <Link to="/" className="back-home-link">Back to Home</Link>
      <h2>Trip Details</h2>
      <h3>Driver: {trip.driver_name}</h3>
      <p><strong>Pickup Location:</strong> {trip.pickup_location}</p>
      <p><strong>Dropoff Location:</strong> {trip.dropoff_location}</p>
      <p><strong>Pickup Date:</strong> {trip.pickup_date}</p>
      <p><strong>Dropoff Date:</strong> {trip.dropoff_date || 'N/A'}</p>
      <p><strong>Status:</strong> {trip.status}</p>
      <p><strong>Type:</strong> {trip.type}</p>
      <p><strong>Cost:</strong> {trip.cost} {trip.cost_unit}</p>
      <p><strong>Distance:</strong> {trip.distance} {trip.distance_unit}</p>
      <p><strong>Duration:</strong> {trip.duration} {trip.duration_unit}</p>
      <div className="images-container">
        <div className="image-wrapper">
          <img src={trip.driver_pic} alt="Driver" className="driver-image" />
          <p>Driver Picture</p>
        </div>
        <div className="image-wrapper">
          <img src={trip.car_pic} alt="Car" className="car-image" />
          <p>Car Picture</p>
        </div>
      </div>
    </div>
  );
};

export default TripDetails;
