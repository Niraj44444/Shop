import React, { useState } from "react";
import { db } from "../firebase";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { useAuth } from "../Context/AuthContext.jsx"; 

function Contact() {
  const { currentUser } = useAuth(); 
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [status, setStatus] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("Sending...");

    try {
      await addDoc(collection(db, "contacts"), {
        ...formData,
        userId: currentUser ? currentUser.uid : null,
        createdAt: serverTimestamp(),
      });

      setStatus("✅ Message sent successfully!");
      setFormData({ name: "", email: "", message: "" }); 
    } catch (error) {
      console.error("Error sending message:", error);
      setStatus("❌ Failed to send. Try again.");
    }
  };

  return (
    <div className="content-card" id="contact" style={{ padding: '20px', marginTop: '20px' }}>
      <h2>Contact Us</h2>
      <p>Have questions? Please fill out the form below.</p>

      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '10px' }}>
          <input
            className="form-input"
            type="text"
            name="name"
            placeholder="Your Name"
            required
            value={formData.name}
            onChange={handleChange}
          />
        </div>
        <div style={{ marginBottom: '10px' }}>
          <input
            className="form-input"
            type="email"
            name="email"
            placeholder="Your Email"
            required
            value={formData.email}
            onChange={handleChange}
          />
        </div>
        <div style={{ marginBottom: '10px' }}>
          <textarea
            className="form-input"
            name="message"
            placeholder="Your Message"
            required
            value={formData.message}
            onChange={handleChange}
            style={{ width: '100%', minHeight: '100px' }}
          ></textarea>
        </div>

        <button className="btn btn-primary" type="submit">
          Send Message
        </button>
      </form>

      {status && <p className="mt-2">{status}</p>}
    </div>
  );
}

export default Contact;