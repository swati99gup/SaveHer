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

        "http://localhost:5000/api/contacts",

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

        "http://localhost:5000/api/contacts",

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

        `http://localhost:5000/api/contacts/${id}`,

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

  setLoading(true);

  setMessage("");

  navigator.geolocation.getCurrentPosition(

    async (position) => {

      const latitude =
        position.coords.latitude;

      const longitude =
        position.coords.longitude;

      try {

        const res = await axios.post(

          "http://localhost:5000/api/sos",

          {
            latitude,
            longitude
          },

          {
            headers: {
              Authorization: token
            }
          }
        );

        setMessage(
          "🚨 SOS Sent Successfully"
        );

      } catch (err) {

        console.log(err);

        setMessage(
          "❌ SOS Failed"
        );
      }

      setLoading(false);
    },

    (error) => {

      console.log(error);

      setMessage(
        "Location Permission Denied"
      );

      setLoading(false);
    }
  );
};
  return (

    <div>

      <Navbar />

      <div style={styles.container}>

<SOSButton
  handleSOS={handleSOS}
  loading={loading}
  message={message}
/>
<ShakeDetector
  onShake={handleSOS}
/>
<LocationMap />
        <ContactForm
          formData={formData}
          handleChange={handleChange}
          addContact={addContact}
        />

        <ContactList
          contacts={contacts}
          deleteContact={deleteContact}
        />

      </div>

    </div>
  );
}



const styles = {

  container: {

    display: "flex",

    flexDirection: "column",

    alignItems: "center",

    gap: "30px",

    marginTop: "30px"
  }
};

export default Dashboard;