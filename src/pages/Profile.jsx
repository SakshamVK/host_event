import React from "react";
import "../styles/Profile.css"; // Assuming you have a CSS file for styling

const Profile = () => {
  const ngoData = {
    name: "Helping Hands NGO",
    logo: "https://thumbs.dreamstime.com/b/recycling-electrical-items-sign-separate-e-waste-logo-template-icon-258275519.jpg", // Replace with actual logo URL
    establishedDate: "2024",
    mission: "Our mission is to foster a sustainable future by responsibly managing electronic waste through innovative solutions that promote recycling, reduce environmental impact, and empower communities to contribute towards a cleaner and greener planet.",
    vision: "Our vision is to create a world where e-waste is no longer a burden on the environment but a resource for sustainable development, fostering a circular economy where electronic products are responsibly recycled, reused, and repurposed to protect our planet for future generations.",
    programs: [
      {
        title: "E-Waste Collection and Recycling Program",
        description: "A nationwide or community-based initiative focused on collecting discarded electronic devices from households, businesses, and institutions. The collected items are safely dismantled, and reusable components are separated for recycling. This program aims to reduce landfill waste and ensure the proper disposal of hazardous materials in e-waste.",
      },
      {
        title: "E-Waste Awareness and Education Campaign",
        description: "A program aimed at educating the public on the environmental impact of improper e-waste disposal and the importance of recycling electronics. This includes workshops, school outreach, and digital campaigns to spread awareness about how to manage e-waste properly, encourage repair and reuse, and provide information on local drop-off points for e-waste.",
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
    </div>
  );
};

export default Profile;
