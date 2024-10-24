// src/pages/Home.js
import React from 'react';
import '../styles/HomePage.css'; // CSS file for the home page styles
import eventImage1 from '../concert.jpg'; // Example images
import eventImage2 from '../concert3.jpg'; // Example images
import eventImage3 from '../concert2.jpeg'; // Example images

const Home = () => {
  return (
    <div className="home">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <div className="hero-text">
            <h1>Life is short, so It's Party Time</h1>
            <p>To get the best of your event, you just need to let us know, and we do the rest...</p>
            <button className="cta-button">Read More</button>
          </div>
          <div className="hero-image">
            <img src={eventImage3} alt="Party" />
          </div>
        </div>
      </section>

      {/* Recent Events Section */}
      <section className="recent-events">
        <h2>Our Successful Recent Events</h2>
        <div className="events-list">
          <div className="event-card">
            <img src={eventImage1} alt="Event 1" />
            <p>The Wedding Couple</p>
          </div>
          <div className="event-card">
            <img src={eventImage2} alt="Event 2" />
            <p>Concert Night</p>
          </div>
          <div className="event-card">
            <img src={eventImage3} alt="Event 3" />
            <p>Conference Gathering</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
