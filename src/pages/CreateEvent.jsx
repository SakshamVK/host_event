import React, { useState } from "react";
import { Calendar, Clock, MapPin, Image, Phone, Mail, Tag } from "lucide-react";
import { db, storage } from "../firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { v4 as uuidv4 } from 'uuid';
import "../styles/CreateEvent.css";

const CreateEvent = () => {
  const [eventData, setEventData] = useState({
    name: "",
    description: "",
    date: "",
    time: "",
    location: "",
    isRsvpRequired: false,
    banner: null,
    contactDetails: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    if (type === "file") {
      setEventData({
        ...eventData,
        [name]: files,
      });
    } else {
      setEventData({
        ...eventData,
        [name]: type === "checkbox" ? checked : value,
      });
    }
  };

  const uploadFile = async (file, path) => {
    const fileId = uuidv4();
    const fileRef = ref(storage, `${path}/${fileId}-${file.name}`);
    await uploadBytes(fileRef, file);
    return getDownloadURL(fileRef);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      // Upload banner
      let bannerUrl = null;
      if (eventData.banner && eventData.banner[0]) {
        bannerUrl = await uploadFile(eventData.banner[0], 'banners');
      }

      // Prepare event data for Firestore
      const eventDataToSave = {
        name: eventData.name,
        description: eventData.description,
        date: eventData.date,
        time: eventData.time,
        location: eventData.location,
        isRsvpRequired: eventData.isRsvpRequired,
        contactDetails: eventData.contactDetails,
        bannerUrl,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      };

      // Save to Firestore
      const docRef = await addDoc(collection(db, "events"), eventDataToSave);
      console.log("Event created with ID: ", docRef.id);
      
      // Reset form
      setEventData({
        name: "",
        description: "",
        date: "",
        time: "",
        location: "",
        isRsvpRequired: false,
        banner: null,
        contactDetails: "",
      });

      alert("Event created successfully!");
    } catch (err) {
      console.error("Error creating event: ", err);
      setError("Failed to create event. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="create-event-container">
      <h1>Create Your Event</h1>
      {error && <div className="error-message">{error}</div>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">
            <Tag className="icon" />
            Event Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={eventData.name}
            onChange={handleChange}
            required
            placeholder="Enter event name"
          />
        </div>
        <div className="form-group">
          <label htmlFor="description">
            <Mail className="icon" />
            Description
          </label>
          <textarea
            id="description"
            name="description"
            value={eventData.description}
            onChange={handleChange}
            required
            placeholder="Describe your event"
          />
        </div>
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="date">
              <Calendar className="icon" />
              Date
            </label>
            <input
              type="date"
              id="date"
              name="date"
              value={eventData.date}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="time">
              <Clock className="icon" />
              Time
            </label>
            <input
              type="time"
              id="time"
              name="time"
              value={eventData.time}
              onChange={handleChange}
              required
            />
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="location">
            <MapPin className="icon" />
            Location
          </label>
          <input
            type="text"
            id="location"
            name="location"
            value={eventData.location}
            onChange={handleChange}
            required
            placeholder="Event location"
          />
        </div>
        <div className="form-group checkbox-group">
          <input
            type="checkbox"
            id="isRsvpRequired"
            name="isRsvpRequired"
            checked={eventData.isRsvpRequired}
            onChange={handleChange}
          />
          <label htmlFor="isRsvpRequired">RSVP Required</label>
        </div>
        <div className="form-group file-input-group">
          <label htmlFor="banner" className="file-input-label">
            <Image className="icon" />
            Upload Banner/Poster
          </label>
          <input
            type="file"
            id="banner"
            name="banner"
            onChange={handleChange}
            required
            accept="image/*"
          />
        </div>
        <div className="form-group">
          <label htmlFor="contactDetails">
            <Phone className="icon" />
            Contact Details
          </label>
          <input
            type="text"
            id="contactDetails"
            name="contactDetails"
            value={eventData.contactDetails}
            onChange={handleChange}
            required
            placeholder="Your contact information"
          />
        </div>
        <button 
          type="submit" 
          className="create-event-button"
          disabled={isLoading}
        >
          {isLoading ? "Creating Event..." : "Create Event"}
        </button>
      </form>
    </div>
  );
};

export default CreateEvent;
