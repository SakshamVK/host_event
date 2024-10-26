import React, { useState, useCallback, useEffect } from 'react';
import { GoogleMap, LoadScript, Marker, DirectionsRenderer } from '@react-google-maps/api';
import '../styles/Garbage.css';

// Import bin images
import redBin from '../assets/red-bin.png'; // Adjust the path according to your project structure
import greenBin from '../assets/green-bin.png'; // Adjust the path according to your project structure

const mapStyles = {
  height: '400px',
  width: '100%',
};

const defaultCenter = {
  lat: 40.7128,
  lng: -74.006,
};

// Mock data for trucks
const mockTrucks = [
  {
    id: 1,
    location: { lat: 40.7128, lng: -74.006 },
    status: 'In Transit',
    driver: 'John Doe',
    nextStop: { lat: 40.758, lng: -73.9855 },
    route: [
      { lat: 40.7128, lng: -74.006 },
      { lat: 40.748817, lng: -73.985428 },
      { lat: 40.758, lng: -73.9855 },
    ],
  },
  {
    id: 2,
    location: { lat: 40.758, lng: -73.9855 },
    status: 'Collecting',
    driver: 'Jane Smith',
    nextStop: { lat: 40.748817, lng: -73.985428 },
    route: [
      { lat: 40.758, lng: -73.9855 },
      { lat: 40.761, lng: -73.9865 },
      { lat: 40.764, lng: -73.9825 },
    ],
  },
];

// Function to generate bins along truck routes
const generateBinsAlongRoute = (trucks) => {
  const bins = [];
  trucks.forEach(truck => {
    truck.route.forEach((point) => {
      for (let i = 0; i < 2; i++) { // Adjust the number of bins generated near each route point
        const latOffset = (Math.random() - 0.5) / 100; // Small random offset for latitude
        const lngOffset = (Math.random() - 0.5) / 100; // Small random offset for longitude
        
        const randomPoint = {
          lat: point.lat + latOffset,
          lng: point.lng + lngOffset,
        };

        // Randomly assign status
        const status = Math.random() < 0.5 ? 'Full' : 'Empty';
        bins.push({
          id: bins.length + 1,
          location: randomPoint,
          status,
          lastCollected: '2024-10-25',
        });
      }
    });
  });

  // Add Bin 12 at Truck 2's location permanently, ensuring it is only added once
  const bin12Exists = bins.some(bin => bin.id === 12);
  if (!bin12Exists) {
    const bin12 = {
      id: 12,
      location: mockTrucks[1].location, // Location of Truck 2
      status: 'Empty', // Initial status (can be updated via API)
      lastCollected: '2024-10-25',
    };
    bins.push(bin12);
  }

  return bins;
};

const Garbage = () => {
  const [directions, setDirections] = useState(null);
  const [selectedTruck, setSelectedTruck] = useState(null);
  const [map, setMap] = useState(null);
  const [mockBins, setMockBins] = useState(generateBinsAlongRoute(mockTrucks)); // Initialize bins

  // Function to fetch Bin 12 status from the API
  const fetchBinStatus = async () => {
    try {
      const response = await fetch("https://getpantry.cloud/apiv1/pantry/6a63afc9-b82b-4e17-a319-17d5ab82e9cd/basket/bin-0001"); // Your API endpoint
      const data = await response.json();

      // Update Bin 12 status based on response
      setMockBins((prevBins) => 
        prevBins.map(bin =>
          bin.id === 12 ? { ...bin, status: data.status === 'full' ? 'Full' : 'Empty' } : bin
        )
      );
    } catch (error) {
      console.error('Error fetching bin status:', error);
    }
  };

  useEffect(() => {
    // Fetch Bin 12 status every 10 seconds
    const intervalId = setInterval(fetchBinStatus, 10000);
    // Fetch immediately on component mount
    fetchBinStatus();

    return () => clearInterval(intervalId); // Cleanup on unmount
  }, []);

  // Update Bin 12 location to follow Truck 2
  useEffect(() => {
    const updateBinLocation = () => {
      setMockBins((prevBins) => 
        prevBins.map(bin => 
          bin.id === 12 ? { ...bin, location: mockTrucks[1].location } : bin
        )
      );
    };

    updateBinLocation();
    
    // Optionally, you can also add an interval to keep updating the bin's location based on any changes to Truck 2's location
    const locationUpdateInterval = setInterval(updateBinLocation, 10000); // every 10 seconds for example

    return () => clearInterval(locationUpdateInterval); // Cleanup on unmount
  }, []);

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
          {/* Render Bin Markers with Custom Images */}
          {mockBins.map((bin) => (
            <Marker
              key={bin.id}
              position={bin.location}
              icon={bin.status === 'Full' ? redBin : greenBin} // Use red or green bin images based on status
              label={`Bin #${bin.id} (${bin.status})`} // Label showing bin ID and status
            />
          ))}

          {/* Render Truck Markers */}
          {mockTrucks.map((truck) => (
            <Marker
              key={truck.id}
              position={truck.location}
              icon={'https://img.icons8.com/color/48/000000/truck.png'} // Keep truck icon from URL
              label={`Truck #${truck.id}`}
              onClick={() => handleTruckClick(truck)}
            />
          ))}

          {/* Display Directions Renderer if a Truck is Selected */}
          {directions && <DirectionsRenderer directions={directions} />}
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

      <div className="bin-container">
        {mockBins.map((bin) => (
          <div key={bin.id} className="bin-tile">
            <img
              src={bin.status === 'Full' ? redBin : greenBin}
              alt="Bin"
              className="bin-icon"
            />
            <div className="bin-details">
              <div className="bin-title">Bin #{bin.id}</div>
              <div className="bin-status">Status: {bin.status}</div>
              <div className="bin-location">Location: Lat {bin.location.lat}, Lng {bin.location.lng}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Garbage;
