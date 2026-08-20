import { useEffect, useState } from "react";
import LocationMap from "../components/LocationMap";
import axios from "axios";
import {requestPermission}from "../services/notification";
import ShakeDetector from "../components/ShakeDetector";
import Navbar from "../components/Navbar";

import SOSButton from "../components/SOSButton";

import ContactForm from "../components/ContactForm";

import ContactList from "../components/ContactList";

function Dashboard() {

  const [contacts, setContacts] =
    useState([]);
const [loading, setLoading] =
  useState(false);

const [message, setMessage] =
  useState("");
  const [motionLevel, setMotionLevel] =
  useState(0);


  const [formData, setFormData] =
  useState({
    name: "",
    email: ""
  });
  const token =
    localStorage.getItem("token");

  useEffect(() => {

  requestPermission();

  if (token) {
    fetchContacts();
  }

}, []);
  const fetchContacts = async () => {

    try {

      const res = await axios.get(

        "https://saveher.onrender.com/api/contacts",

        {
          headers: {
            Authorization: token
          }
        }
      );

      setContacts(res.data);

    } catch (err) {

      console.log(err);
    }
  };

  const handleChange = (e) => {

    setFormData({

      ...formData,

      [e.target.name]:
      e.target.value
    });
  };

  const addContact = async () => {

    try {

      await axios.post(

        "https://saveher.onrender.com/api/contacts",

        formData,

        {
          headers: {
            Authorization: token
          }
        }
      );

      fetchContacts();

      setFormData({
  name: "",
  email: ""
});

    } catch (err) {

      console.log(err);
    }
  };

  const deleteContact = async (id) => {

    try {

      await axios.delete(

        `https://saveher.onrender.com/api/contacts/${id}`,

        {
          headers: {
            Authorization: token
          }
        }
      );

      fetchContacts();

    } catch (err) {

      console.log(err);
    }
  };
const handleSOS = () => {

  if (loading) return;

  setLoading(true);
  setMessage("");

  console.log("🚨 SOS button clicked");

  navigator.geolocation.getCurrentPosition(

    async (position) => {

      const latitude =
        position.coords.latitude;

      const longitude =
        position.coords.longitude;

      console.log(
        "📍 Location:",
        latitude,
        longitude
      );

      try {

        const res = await axios.post(
          "https://saveher.onrender.com/api/sos",

          {
            latitude,
            longitude
          },

          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json"
            },

            timeout: 15000
          }
        );

        console.log(
          "✅ SOS RESPONSE:",
          res.data
        );

        setMessage(
          "🚨 SOS Sent Successfully"
        );

      } catch (err) {

        console.error(
          "❌ SOS ERROR:",
          err
        );

        console.error(
          "Response:",
          err.response?.data
        );

        setMessage(
          err.response?.data?.message ||
          "❌ SOS Failed"
        );

      } finally {

        setLoading(false);
      }
    },

    (error) => {

      console.error(
        "❌ Location Error:",
        error
      );

      setMessage(
        "❌ Location permission denied"
      );

      setLoading(false);
    },

    {
      enableHighAccuracy: true,
      timeout: 10000,
      maximumAge: 0
    }
  );
};
  return (

    <div>

      <Navbar />

      <div className="dashboard">
<div className="welcome-card">
    <h2>Welcome Back

</h2>

    <p>
      Your safety companion is active.
SOS alerts, live tracking and emergency assistance are ready. 
    </p>
  </div>
  <div className="stats-grid">

  <div className="stat-card">
    <h2>{contacts.length}</h2>
    <p>Emergency Contacts</p>
  </div>

  <div className="stat-card">
    <h2>Active</h2>
    <p>Protection Status</p>
  </div>

</div>

  <div className="hero-section">
    <SOSButton
      handleSOS={handleSOS}
      loading={loading}
      message={message}
    />
  </div>

  <div className="feature-grid">

    <div className="feature-card">
      <h3>📍 Live Location</h3>
      <LocationMap />
    </div>

    <div className="feature-card">
  <h3>📳 Shake Detection</h3>

  <div className="shake-status">
    <div className="status-dot"></div>

    <h3>Protection Active</h3>

    <p>
      Shake your phone to trigger an
      emergency SOS alert.
    </p>

    <div className="motion-container">
      <h4>Motion Detection</h4>

      <div className="motion-bar">
        <div
          className="motion-fill"
          style={{
            width: `${motionLevel}%`
          }}
        ></div>
      </div>

      <p>{motionLevel}%</p>

      <p>
  {motionLevel < 40
    ? "🟢 Safe"
    : motionLevel < 70
    ? "🟡 Alert"
    : "🔴 SOS Ready"}
</p>
    </div>

  </div>

  <ShakeDetector
    onShake={handleSOS}
    onMotionChange={setMotionLevel}
  />
</div>
  </div>
  <div className="contacts-grid">

  <div className="contact-form-card">
    

    <ContactForm
      formData={formData}
      handleChange={handleChange}
      addContact={addContact}
    />
  </div>

  <div className="contact-list-card">
    <ContactList
      contacts={contacts}
      deleteContact={deleteContact}
    />
  </div>

</div>
</div>
    </div>
  );
}




export default Dashboard;
