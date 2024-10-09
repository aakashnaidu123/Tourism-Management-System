// src/pages/PlaceDetails.js
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './PlaceDetails.css';

const PlaceDetails = () => {
  const { placeName } = useParams(); // Get place name from the URL
  const [placeInfo, setPlaceInfo] = useState(null);

  useEffect(() => {
    // Fetch information from an API (e.g., Wikipedia)
    const fetchPlaceDetails = async () => {
      try {
        const response = await axios.get(
          `https://en.wikipedia.org/api/rest_v1/page/summary/${placeName}`
        );
        setPlaceInfo(response.data);
      } catch (error) {
        console.error("Error fetching place details:", error);
      }
    };

    fetchPlaceDetails();
  }, [placeName]);

  if (!placeInfo) {
    return <p>Loading...</p>;
  }

  return (
    <div className="place-details">
      <h1>{placeInfo.title}</h1>
      <img src={placeInfo.thumbnail?.source} alt={placeInfo.title} />
      <p>{placeInfo.extract}</p>
      <a href={placeInfo.content_urls?.desktop?.page} target="_blank" rel="noopener noreferrer">
        Read more on Wikipedia
      </a>
    </div>
  );
};

export default PlaceDetails;
