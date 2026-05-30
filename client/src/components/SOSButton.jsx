import axios from "axios";

import { useState } from "react";

function SOSButton({

  handleSOS,

  loading,

  message

}) {

  return (

    <div style={styles.container}>

      <button

        onClick={handleSOS}

        disabled={loading}

        style={

          loading

          ?

          {
            ...styles.button,
            background: "#ff4d4d",
            transform: "scale(0.95)"
          }

          :

          styles.button
        }
      >

        {

          loading

          ?

          "Sending..."

          :

          "SOS"
        }

      </button>

      {

        message && (

          <p style={styles.message}>

            {message}

          </p>
        )
      }

    </div>
  );
}
const styles = {

  container: {

    display: "flex",

    flexDirection: "column",

    alignItems: "center",

    gap: "20px"
  },

  button: {

    width: "180px",

    height: "180px",

    borderRadius: "50%",

    border: "none",

    background: "red",

    color: "white",

    fontSize: "40px",

    fontWeight: "bold",

    cursor: "pointer",

    transition: "0.2s",

    boxShadow:
      "0px 0px 25px rgba(255,0,0,0.7)"
  },

  message: {

    fontSize: "18px",

    fontWeight: "bold"
  }
};

export default SOSButton;