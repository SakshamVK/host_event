import React from "react";
import "./NGOProfile.css"; // Assuming you have a CSS file for styling

const NGOProfile = () => {
  const ngoData = {
    name: "Helping Hands NGO",
    logo: "logo-url.png", // Replace with actual logo URL
    establishedDate: "2010",
    mission: "To empower underprivileged communities through education and healthcare.",
    vision: "A world where everyone has access to quality education and health services.",
    programs: [
      {
        title: "Education for All",
        description: "Providing free education to children in rural areas.",
      },
      {
        title: "Health Care Services",
        description: "Offering free medical check-ups and health awareness camps.",
      },
    ],
    contact: {
      address: "123 NGO Lane, City, Country",
      phone: "123-456-7890",
      email: "info@helpinghands.org",
    },
  };

  return (
    <div className="ngo-profile-container">
      <header className="profile-header">
        <img src={ngoData.logo} alt="NGO Logo" className="ngo-logo" />
        <h1>{ngoData.name}</h1>
        <p>Established: {ngoData.establishedDate}</p>
      </header>

      <section className="mission-vision">
        <h2>Mission</h2>
        <p>{ngoData.mission}</p>
        <h2>Vision</h2>
        <p>{ngoData.vision}</p>
      </section>

      <section className="programs">
        <h2>Programs</h2>
        <ul>
          {ngoData.programs.map((program, index) => (
            <li key={index}>
              <h3>{program.title}</h3>
              <p>{program.description}</p>
            </li>
          ))}
        </ul>
      </section>

      <section className="contact">
        <h2>Contact Us</h2>
        <p>Address: {ngoData.contact.address}</p>
        <p>Phone: {ngoData.contact.phone}</p>
        <p>Email: <a href={`mailto:${ngoData.contact.email}`}>{ngoData.contact.email}</a></p>
      </section>

      <section className="contact-form">
        <h2>Get In Touch</h2>
        <form>
          <input type="text" placeholder="Your Name" required />
          <input type="email" placeholder="Your Email" required />
          <textarea placeholder="Your Message" required></textarea>
          <button type="submit">Send Message</button>
        </form>
      </section>
    </div>
  );
};

export default NGOProfile;
