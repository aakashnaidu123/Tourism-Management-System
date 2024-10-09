import React, { useState, useEffect, useRef, useCallback } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import axios from "axios";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-routing-machine/dist/leaflet-routing-machine.css";
import "leaflet-routing-machine";
import "./Accommodation.css";

// Fix for Leaflet default icon issue with React
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
});

// Custom Icon for Tourist's Location (Red Marker)
const touristIcon = new L.Icon({
  iconUrl: "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

const Accommodation = () => {
  const [touristLocation, setTouristLocation] = useState(null);
  const [accommodations, setAccommodations] = useState([]);
  const [selectedAccommodation, setSelectedAccommodation] = useState(null);
  const [searchLocation, setSearchLocation] = useState("");
  const mapRef = useRef();

  // Fetch tourist's current location using useCallback
  const fetchCurrentLocation = useCallback(() => {
    const handleLocationSuccess = (position) => {
      const { latitude, longitude } = position.coords;
      const currentLocation = { lat: latitude, lon: longitude };
      setTouristLocation(currentLocation);
      fetchNearbyAccommodations(currentLocation);

      // Ensure the map is defined before calling setView
      if (mapRef.current) {
        mapRef.current.setView([latitude, longitude], 15);
      }
    };

    const handleLocationError = () => {
      alert("Unable to retrieve your location.");
    };

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(handleLocationSuccess, handleLocationError, {
        enableHighAccuracy: true,
        timeout: 10000,
      });
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  }, []); // Dependencies array is empty; fetchCurrentLocation doesn't depend on any state or props

  // Automatically fetch the current location when the component mounts
  useEffect(() => {
    fetchCurrentLocation();
  }, [fetchCurrentLocation]); // Added fetchCurrentLocation to dependencies

  // Fetch nearby accommodations based on location
  const fetchNearbyAccommodations = async (location) => {
    try {
      const query = `
        [out:json];
        (
          node["tourism"="hotel"](around:10000,${location.lat},${location.lon});
          node["tourism"="motel"](around:10000,${location.lat},${location.lon});
          node["tourism"="guest_house"](around:10000,${location.lat},${location.lon});
        );
        out body;
      `;
      const url = `https://overpass-api.de/api/interpreter?data=${encodeURIComponent(query)}`;
      const response = await axios.get(url);
      const places = response.data.elements;

      const formattedAccommodations = places.map((place) => {
        const accommodationLatLng = L.latLng(place.lat, place.lon);
        const touristLatLng = L.latLng(location.lat, location.lon);

        const distanceInMeters = touristLatLng.distanceTo(accommodationLatLng);
        const distanceInKilometers = (distanceInMeters / 1000).toFixed(2);

        return {
          id: place.id,
          name: place.tags.name || "Unnamed Place",
          lat: place.lat,
          lon: place.lon,
          address: place.tags["addr:street"] || "Address not available",
          type: place.tags.tourism,
          distance: distanceInKilometers,
        };
      });

      setAccommodations(formattedAccommodations);
    } catch (error) {
      console.error("Error fetching nearby accommodations:", error);
    }
  };

  // Handle search button click to find accommodations near the searched location
  const handleSearch = async () => {
    try {
      const response = await axios.get(
        `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(searchLocation)}&format=json`
      );
      if (response.data.length > 0) {
        const location = {
          lat: parseFloat(response.data[0].lat),
          lon: parseFloat(response.data[0].lon),
        };
        fetchNearbyAccommodations(location);
        setTouristLocation(location); // Update the touristLocation state
        mapRef.current.setView([location.lat, location.lon], 15);
      } else {
        alert("Location not found. Please try again.");
      }
    } catch (error) {
      console.error("Error fetching searched location:", error);
    }
  };

  // Display the route on the map
  const DisplayRoute = ({ from, to }) => {
    const map = useMap();
    const routingControlRef = useRef(null);

    useEffect(() => {
      if (from && to && map) {
        if (routingControlRef.current) {
          routingControlRef.current.getPlan().setWaypoints([]);
        }

        routingControlRef.current = L.Routing.control({
          waypoints: [L.latLng(from.lat, from.lon), L.latLng(to.lat, to.lon)],
          lineOptions: {
            styles: [{ color: "blue", weight: 4 }],
          },
          createMarker: () => null,
        }).addTo(map);

        return () => {
          if (map && routingControlRef.current) {
            map.removeControl(routingControlRef.current);
          }
        };
      }
    }, [from, to, map]);

    return null;
  };

  // Handle clicking "Book Now"
  const handleBookNow = (accommodation) => {
    setSelectedAccommodation(accommodation);
  };

  // Filter accommodations to only show the selected one and type "rooms" or "hostels" on the map
  const filteredAccommodations = selectedAccommodation
    ? accommodations.filter((acc) => acc.id === selectedAccommodation.id || acc.type === "rooms" || acc.type === "hostel")
    : accommodations;

  return (
    <div className="accommodation-container">
      <div className="map-section">
        <h1>Available Accommodations Near You</h1>

        {/* Search Input and Button */}
        <div className="search-bar">
          <input
            type="text"
            placeholder="Enter a location"
            value={searchLocation}
            onChange={(e) => setSearchLocation(e.target.value)}
            className="search-input"
          />
          <button onClick={handleSearch} className="search-button">
            Search
          </button>
          <button onClick={fetchCurrentLocation} className="my-location-button">
            My Location
          </button>
        </div>

        {touristLocation ? (
          <MapContainer
            center={[touristLocation.lat, touristLocation.lon]}
            zoom={15}
            scrollWheelZoom={false}
            style={{ height: "400px", width: "100%" }}
            ref={mapRef}
          >
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            <Marker
              position={[touristLocation.lat, touristLocation.lon]}
              icon={touristIcon}
            >
              <Popup>Your Location</Popup>
            </Marker>

            {/* Display only the selected accommodation and type "rooms" or "hostels" markers if one is selected */}
            {filteredAccommodations.map((accommodation) => (
              <Marker
                key={accommodation.id}
                position={[accommodation.lat, accommodation.lon]}
                onClick={() => setSelectedAccommodation(accommodation)}
              >
                <Popup>
                  <div>
                    <strong>{accommodation.name}</strong>
                    <p>Address: {accommodation.address}</p>
                    <p>Distance: {accommodation.distance} km</p>
                    <button onClick={() => handleBookNow(accommodation)}>Book Now</button>
                  </div>
                </Popup>
              </Marker>
            ))}

            {selectedAccommodation && (
              <DisplayRoute
                from={touristLocation}
                to={selectedAccommodation}
              />
            )}
          </MapContainer>
        ) : (
          <p>Fetching your location...</p>
        )}
      </div>

      <div className="accommodation-cards">
        <h2>Nearby Accommodations</h2>
        {selectedAccommodation ? (
          <div className="accommodation-details">
            <h3>{selectedAccommodation.name}</h3>
            <p>Address: {selectedAccommodation.address}</p>
            <p>Distance: {selectedAccommodation.distance} km</p>
            {/* Additional details can be added here */}
            <button onClick={() => setSelectedAccommodation(null)}>Back to List</button>
          </div>
        ) : (
          accommodations.length > 0 &&
          accommodations.map((accommodation) => (
            <div key={accommodation.id} className="accommodation-card">
              <h3>{accommodation.name}</h3>
              <p>Address: {accommodation.address}</p>
              <p>Distance: {accommodation.distance} km</p>
              <button onClick={() => handleBookNow(accommodation)}>Book Now</button>
            </div>
          ))
        )}
        {accommodations.length === 0 && !selectedAccommodation && (
          <p>No accommodations available.</p>
        )}
      </div>
    </div>
  );
};

export default Accommodation;
