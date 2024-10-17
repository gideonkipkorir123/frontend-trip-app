import { useState, useEffect } from 'react';
import axios from 'axios';

const useFetch = (url, params = {}) => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(url, { params });
        setData(response.data.data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [url, params]);

  return { data, error, loading };
};

export default useFetch;
