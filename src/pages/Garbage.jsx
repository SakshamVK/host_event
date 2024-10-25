// src/pages/Garbage.jsx
import React, { useState, useCallback } from 'react';
import { GoogleMap, LoadScript, Marker, DirectionsRenderer } from '@react-google-maps/api';
import '../styles/Garbage.css';

// Styles for the map container
const mapStyles = {
  height: '400px',
  width: '100%',
};

// Initial center of the map
const defaultCenter = {
  lat: 40.7128,
  lng: -74.006,
};

// Mock data for bins and trucks
const mockBins = [
  {
    id: 1,
    location: { lat: 40.7128, lng: -74.006 },
    status: 'Full',
    lastCollected: '2024-10-24',
  },
  {
    id: 2,
    location: { lat: 40.758, lng: -73.9855 },
    status: 'Empty',
    lastCollected: '2024-10-25',
  },
];

const mockTrucks = [
  {
    id: 1,
    location: { lat: 40.7128, lng: -74.006 },
    status: 'In Transit',
    driver: 'John Doe',
    nextStop: { lat: 40.758, lng: -73.9855 },
  },
  {
    id: 2,
    location: { lat: 40.758, lng: -73.9855 },
    status: 'Collecting',
    driver: 'Jane Smith',
    nextStop: { lat: 40.748817, lng: -73.985428 },
  },
];

const Garbage = () => {
  const [directions, setDirections] = useState(null);
  const [selectedTruck, setSelectedTruck] = useState(null);
  const [map, setMap] = useState(null);

  // Function to get map icons after Google Maps is loaded
  const getMapIcons = useCallback(() => {
    if (!window.google) return null;

    return {
      binIcon: {
        url: 'https://img.icons8.com/emoji/48/000000/wastebasket-emoji.png',
        scaledSize: new window.google.maps.Size(40, 40),
      },
      truckIcon: {
        url: 'https://img.icons8.com/color/48/000000/truck.png',
        scaledSize: new window.google.maps.Size(40, 40),
      },
    };
  }, []);

  // Function to fetch directions between truck and its next stop
  const fetchDirections = useCallback((truck) => {
    if (!window.google || !map) return;

    const directionsService = new window.google.maps.DirectionsService();
    directionsService.route(
      {
        origin: truck.location,
        destination: truck.nextStop,
        travelMode: window.google.maps.TravelMode.DRIVING,
      },
      (result, status) => {
        if (status === window.google.maps.DirectionsStatus.OK) {
          setDirections(result);
        } else {
          console.error(`Error fetching directions: ${result}`);
        }
      }
    );
  }, [map]);

  const onLoad = useCallback((map) => {
    setMap(map);
  }, []);

  const onUnmount = useCallback(() => {
    setMap(null);
  }, []);

  const handleTruckClick = useCallback((truck) => {
    setSelectedTruck(truck);
    fetchDirections(truck);
  }, [fetchDirections]);

  const mapIcons = getMapIcons();

  return (
    <div className="bg-black min-h-screen text-white">
      <h1 className="text-3xl font-bold p-4 text-center">Waste Management Dashboard</h1>

      <LoadScript googleMapsApiKey="AIzaSyB7VZLnFBTbPZkWnlvKsa5chOctCRqA4ms">
        <GoogleMap
          mapContainerStyle={mapStyles}
          zoom={12}
          center={defaultCenter}
          onLoad={onLoad}
          onUnmount={onUnmount}
        >
          {mapIcons && (
            <>
              {mockBins.map((bin) => (
                <Marker
                  key={bin.id}
                  position={bin.location}
                  icon={mapIcons.binIcon}
                  label={`Bin #${bin.id}`}
                />
              ))}

              {mockTrucks.map((truck) => (
                <Marker
                  key={truck.id}
                  position={truck.location}
                  icon={mapIcons.truckIcon}
                  label={`Truck #${truck.id}`}
                  onClick={() => handleTruckClick(truck)}
                />
              ))}

              {directions && <DirectionsRenderer directions={directions} />}
            </>
          )}
        </GoogleMap>
      </LoadScript>

      <div className="truck-container">
        {mockTrucks.map((truck) => (
          <div
            key={truck.id}
            className={`truck-tile ${selectedTruck?.id === truck.id ? 'selected-tile' : ''}`}
            onClick={() => handleTruckClick(truck)}
          >
            <div className="tile-content">
              <img
                src="https://img.icons8.com/color/48/000000/truck.png"
                alt="Truck"
                className="truck-icon"
              />
              <div className="truck-details">
                <div className="truck-title">Truck #{truck.id}</div>
                <div className="truck-driver">Driver: {truck.driver}</div>
                <div className="truck-status">Status: {truck.status}</div>
                <div className="truck-next-stop">
                  Next Stop: Lat {truck.nextStop.lat}, Lng {truck.nextStop.lng}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Garbage;
