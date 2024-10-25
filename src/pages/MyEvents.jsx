import React, { useState } from 'react';
import { 
  Calendar, 
  Users, 
  Star, 
  Edit, 
  Share2, 
  Link2,
  MessageCircle, 
  Mail, 
  Facebook,
  Check,
  X,
  MapPin,
  Clock
} from 'lucide-react';

const MyEvents = () => {
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [activeTab, setActiveTab] = useState('details');
  const [shareModalOpen, setShareModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);

  // Mock data
  const events = [
    {
      id: 1,
      title: "Tech Conference 2024",
      date: "2024-07-15",
      time: "09:00 AM",
      location: "Convention Center, New York",
      description: "Annual technology conference featuring latest innovations and breakthrough technologies. Join industry leaders and innovators for an immersive experience.",
      attendees: [
        { id: 1, name: "John Doe", status: "confirmed", avatar: "/api/placeholder/32/32" },
        { id: 2, name: "Jane Smith", status: "pending", avatar: "/api/placeholder/32/32" },
      ],
      reviews: [
        { id: 1, user: "John Doe", rating: 5, comment: "Great event!" },
        { id: 2, user: "Jane Smith", rating: 4, comment: "Very informative" },
      ]
    }
  ];

  const ShareModal = ({ event, onClose }) => (
    <div className="modal-overlay">
      <div className="modal-content">
        <h3>Share Event</h3>
        <div className="share-options">
          <button className="share-btn">
            <Link2 size={20} />
            Copy Link
          </button>
          <button className="share-btn">
            <MessageCircle size={20} />
            WhatsApp
          </button>
          <button className="share-btn">
            <Mail size={20} />
            Email
          </button>
          <button className="share-btn">
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
            <textarea defaultValue={event.description}></textarea>
          </div>
          <div className="modal-actions">
            <button type="submit" className="save-btn">Save Changes</button>
            <button type="button" onClick={onClose} className="cancel-btn">Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );

  const TabContent = ({ event }) => {
    switch(activeTab) {
      case 'details':
        return (
          <div className="space-y-4 p-6 bg-black/40 rounded-lg">
            <div className="flex items-center gap-3 text-emerald-400">
              <Clock size={18} />
              <span>{event.time}</span>
            </div>
            <div className="flex items-center gap-3 text-emerald-400">
              <MapPin size={18} />
              <span>{event.location}</span>
            </div>
            <p className="text-gray-300 leading-relaxed">{event.description}</p>
          </div>
        );
      case 'attendees':
        return (
          <div className="space-y-4 p-6 bg-black/40 rounded-lg">
            {event.attendees.map(attendee => (
              <div key={attendee.id} className="flex items-center justify-between p-3 bg-black/60 rounded-lg">
                <div className="flex items-center gap-3">
                  <img src={attendee.avatar} alt={attendee.name} className="w-8 h-8 rounded-full" />
                  <span className="text-gray-200">{attendee.name}</span>
                </div>
                <span className={`flex items-center gap-2 ${attendee.status === 'confirmed' ? 'text-emerald-400' : 'text-yellow-400'}`}>
                  {attendee.status === 'confirmed' ? <Check size={16} /> : <Clock size={16} />}
                  {attendee.status}
                </span>
              </div>
            ))}
          </div>
        );
      case 'reviews':
        return (
          <div className="space-y-4 p-6 bg-black/40 rounded-lg">
            {event.reviews.map(review => (
              <div key={review.id} className="p-4 bg-black/60 rounded-lg">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-emerald-400 font-medium">{review.user}</span>
                  <div className="flex gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star 
                        key={i} 
                        size={16} 
                        fill={i < review.rating ? "#10b981" : "none"} 
                        color={i < review.rating ? "#10b981" : "#4b5563"}
                      />
                    ))}
                  </div>
                </div>
                <p className="text-gray-300">{review.comment}</p>
              </div>
            ))}
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8 font-sans">
      <h1 className="text-4xl font-bold text-center mb-12 text-emerald-400">My Events</h1>
      
      <div className="max-w-4xl mx-auto grid gap-8">
        {events.map(event => (
          <div key={event.id} className="bg-black/80 backdrop-blur-lg rounded-xl border border-emerald-600/20 overflow-hidden transition-all duration-300 hover:border-emerald-400/50 hover:shadow-lg hover:shadow-emerald-900/20">
            <div className="p-6 border-b border-emerald-900/30">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-semibold text-emerald-400">{event.title}</h3>
                <div className="flex gap-3">
                  <button 
                    onClick={() => {
                      setSelectedEvent(event);
                      setEditModalOpen(true);
                    }}
                    className="p-2 rounded-lg bg-emerald-950/50 hover:bg-emerald-900/50 transition-colors"
                  >
                    <Edit size={18} className="text-emerald-400" />
                  </button>
                  <button 
                    onClick={() => {
                      setSelectedEvent(event);
                      setShareModalOpen(true);
                    }}
                    className="p-2 rounded-lg bg-emerald-950/50 hover:bg-emerald-900/50 transition-colors"
                  >
                    <Share2 size={18} className="text-emerald-400" />
                  </button>
                </div>
              </div>
              
              <div className="grid grid-cols-3 gap-4">
                <div className="flex items-center gap-2 text-gray-300">
                  <Calendar size={18} className="text-emerald-400" />
                  <span>{new Date(event.date).toLocaleDateString()}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-300">
                  <Users size={18} className="text-emerald-400" />
                  <span>{event.attendees.length} attendees</span>
                </div>
                <div className="flex items-center gap-2 text-gray-300">
                  <Star size={18} className="text-emerald-400" />
                  <span>{event.reviews.length} reviews</span>
                </div>
              </div>
            </div>

            <div className="flex border-b border-emerald-900/30">
              {['details', 'attendees', 'reviews'].map((tab) => (
                <button 
                  key={tab} 
                  onClick={() => setActiveTab(tab)} 
                  className={`w-full py-4 px-6 text-center ${activeTab === tab ? 'text-emerald-400 border-b-2 border-emerald-400' : 'text-gray-300'}`}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </button>
              ))}
            </div>

            <TabContent event={event} />
          </div>
        ))}
      </div>

      {shareModalOpen && <ShareModal event={selectedEvent} onClose={() => setShareModalOpen(false)} />}
      {editModalOpen && <EditModal event={selectedEvent} onClose={() => setEditModalOpen(false)} />}
    </div>
  );
};

export default MyEvents;
