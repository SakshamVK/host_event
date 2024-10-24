import { collection, addDoc } from "firebase/firestore";
import { db } from "../firebase"; // Assuming your firebase.js is at this path

const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    // Prepare event data to send to Firestore
    const docRef = await addDoc(collection(db, "events"), {
      name: eventData.name,
      description: eventData.description,
      category: eventData.category,
      viewing: eventData.viewing,
      date: eventData.date,
      time: eventData.time,
      location: eventData.location,
      isRsvpRequired: eventData.isRsvpRequired,
      contactDetails: eventData.contactDetails,
      // File uploads like images/banners should be handled separately
      images: eventData.images,
      banner: eventData.banner,
      createdAt: new Date(), // Add timestamp if needed
    });

    console.log("Event created with ID: ", docRef.id);
    // Optionally, you can show a success message or redirect the user
  } catch (error) {
    console.error("Error adding document: ", error);
    // Optionally, you can show an error message to the user
  }
};
