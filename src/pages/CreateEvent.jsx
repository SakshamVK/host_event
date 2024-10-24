import React, { useState } from "react";
import { Calendar, Clock, MapPin, Image, Phone, Mail, Tag,Eye } from "lucide-react";
import"../styles/CreateEvent.css"
const CreateEvent = () => {
  const [eventData, setEventData] = useState({
    name: "",
    description: "",
    category: "",
    viewing: "public",
    date: "",
    time: "",
    location: "",
    isRsvpRequired: false,
    images: [],
    banner: null,
    contactDetails: "",
  });

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

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(eventData);
  };

  return (
    <div className="create-event-container">
      <h1>Create Your Event</h1>
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
            <label htmlFor="category">
              <Tag className="icon" />
              Category
            </label>
            <input
              type="text"
              id="category"
              name="category"
              value={eventData.category}
              onChange={handleChange}
              required
              placeholder="Event category"
            />
          </div>
          <div className="form-group">
            <label htmlFor="viewing">
              <Eye className="icon" />
              Viewing
            </label>
            <select
              id="viewing"
              name="viewing"
              value={eventData.viewing}
              onChange={handleChange}
            >
              <option value="public">Public</option>
              <option value="private">Private</option>
            </select>
          </div>
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
          <label htmlFor="images" className="file-input-label">
            <Image className="icon" />
            Upload Images/Videos
          </label>
          <input
            type="file"
            id="images"
            name="images"
            multiple
            onChange={handleChange}
          />
        </div>
        <div className="form-group file-input-group">
          <label htmlFor="banner" className="file-input-label">
            <Image className="icon" />
            Upload Banner
          </label>
          <input
            type="file"
            id="banner"
            name="banner"
            onChange={handleChange}
            required
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
        <button type="submit" className="create-event-button">
          Create Event
        </button>
      </form>
    </div>
  );
};

export default CreateEvent;