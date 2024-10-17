import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

export const fetchTrips = async (params) => {
  const response = await axios.get(API_URL, { params });
  return response.data.data;
};

export const fetchTripById = async (id) => {
  const response = await axios.get(`${API_URL}/${id}`);
  return response.data.data;
};
