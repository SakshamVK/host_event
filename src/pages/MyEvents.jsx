import React, { useState } from 'react';
import { 
  Calendar, 
  Users, 
  Star, 
  Edit, 
  Share2, 
  Link, 
  MessageCircle, 
  Mail, 
  Facebook,
  Check,
  X,
  ChevronDown,
  MapPin,
  Clock
} from 'lucide-react';
import '../styles/MyEvents.css';

const MyEvents = () => {
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [activeTab, setActiveTab] = useState(null); // Updated logic to handle tabs for each event
  const [shareModalOpen, setShareModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);

  // Mock data - replace with your actual data
  const events = [
    {
      id: 1,
      title: "Tech Conference 2024",
      date: "2024-07-15",
      time: "09:00 AM",
      location: "Convention Center, New York",
      description: "Annual technology conference featuring latest innovations",
      attendees: [
        { id: 1, name: "John Doe", status: "confirmed", avatar: "/api/placeholder/32/32" },
        { id: 2, name: "Jane Smith", status: "pending", avatar: "/api/placeholder/32/32" },
      ],
      reviews: [
        { id: 1, user: "John Doe", rating: 5, comment: "Great event!" },
        { id: 2, user: "Jane Smith", rating: 4, comment: "Very informative" },
      ]
    },
    // Add more events as needed
  ];

  const TabContent = ({ event }) => {
    switch(activeTab) {
      case 'details':
        return (
          <div className="event-details">
            <div className="detail-item">
              <Clock size={18} />
              <span>{event.time}</span>
            </div>
            <div className="detail-item">
              <MapPin size={18} />
              <span>{event.location}</span>
            </div>
            <p className="description">{event.description}</p>
          </div>
        );
      case 'attendees':
        return (
          <div className="attendees-list">
            {event.attendees.map(attendee => (
              <div key={attendee.id} className="attendee-item">
                <img src={attendee.avatar} alt={attendee.name} className="attendee-avatar" />
                <span className="attendee-name">{attendee.name}</span>
                <span className={`status ${attendee.status}`}>
                  {attendee.status === 'confirmed' ? <Check size={16} /> : <Clock size={16} />}
                  {attendee.status}
                </span>
              </div>
            ))}
          </div>
        );
      case 'reviews':
        return (
          <div className="reviews-list">
            {event.reviews.map(review => (
              <div key={review.id} className="review-item">
                <div className="review-header">
                  <span className="reviewer-name">{review.user}</span>
                  <div className="rating">
                    {[...Array(5)].map((_, i) => (
                      <Star 
                        key={i} 
                        size={16} 
                        fill={i < review.rating ? "#FFD700" : "none"} 
                        color={i < review.rating ? "#FFD700" : "#CBD5E0"}
                      />
                    ))}
                  </div>
                </div>
                <p className="review-comment">{review.comment}</p>
              </div>
            ))}
          </div>
        );
      default:
        return null;
    }
  };

  const ShareModal = ({ event, onClose }) => (
    <div className="modal-overlay">
      <div className="modal-content">
        <h3>Share Event</h3>
        <div className="share-options">
          <button className="share-btn copy">
            <Link size={20} />
            Copy Link
          </button>
          <button className="share-btn whatsapp">
            <MessageCircle size={20} />
            WhatsApp
          </button>
          <button className="share-btn email">
            <Mail size={20} />
            Email
          </button>
          <button className="share-btn facebook">
            <Facebook size={20} />
            Facebook
          </button>
        </div>
        <button className="close-btn" onClick={onClose}>
          <X size={20} />
        </button>
      </div>
    </div>
  );

  const EditModal = ({ event, onClose }) => (
    <div className="modal-overlay">
      <div className="modal-content">
        <h3>Edit Event</h3>
        <form className="edit-form">
          <div className="form-group">
            <label>Event Date</label>
            <input type="date" defaultValue={event.date} />
          </div>
          <div className="form-group">
            <label>Event Time</label>
            <input type="time" defaultValue={event.time} />
          </div>
          <div className="form-group">
            <label>Location</label>
            <input type="text" defaultValue={event.location} />
          </div>
          <div className="form-group">
            <label>Description</label>
            <textarea defaultValue={event.description} />
          </div>
          <div className="modal-actions">
            <button type="submit" className="save-btn">Save Changes</button>
            <button type="button" className="cancel-btn" onClick={onClose}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );

  return (
    <div className="my-events-container">
      <h1>My Events</h1>
      
      <div className="events-grid">
        {events.map(event => (
          <div key={event.id} className="event-card">
            <div className="event-header">
              <h3>{event.title}</h3>
              <div className="event-actions">
                <button onClick={() => {
                  setSelectedEvent(event);
                  setEditModalOpen(true);
                }}>
                  <Edit size={18} />
                </button>
                <button onClick={() => {
                  setSelectedEvent(event);
                  setShareModalOpen(true);
                }}>
                  <Share2 size={18} />
                </button>
              </div>
            </div>
            
            <div className="event-info">
              <div className="info-item">
                <Calendar size={18} />
                <span>{new Date(event.date).toLocaleDateString()}</span>
              </div>
              <div className="info-item">
                <Users size={18} />
                <span>{event.attendees.length} attendees</span>
              </div>
              <div className="info-item">
                <Star size={18} />
                <span>{event.reviews.length} reviews</span>
              </div>
            </div>

            <div className="tabs">
              <button 
                className={`tab ${activeTab === 'details' ? 'active' : ''}`}
                onClick={() => setActiveTab('details')}
              >
                Details
              </button>
              <button 
                className={`tab ${activeTab === 'attendees' ? 'active' : ''}`}
                onClick={() => setActiveTab('attendees')}
              >
                Attendees
              </button>
              <button 
                className={`tab ${activeTab === 'reviews' ? 'active' : ''}`}
                onClick={() => setActiveTab('reviews')}
              >
                Reviews
              </button>
            </div>

            <div className="tab-content">
              <TabContent event={event} />
            </div>
          </div>
        ))}
      </div>

      {shareModalOpen && selectedEvent && (
        <ShareModal event={selectedEvent} onClose={() => setShareModalOpen(false)} />
      )}

      {editModalOpen && selectedEvent && (
        <EditModal event={selectedEvent} onClose={() => setEditModalOpen(false)} />
      )}
    </div>
  );
};

export default MyEvents;
