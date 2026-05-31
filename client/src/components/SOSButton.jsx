import axios from "axios";

import { useState } from "react";
function SOSButton({
  handleSOS,
  loading,
  message
}) {
  return (
    <div className="sos-container">

      <button
        onClick={handleSOS}
        disabled={loading}
        className={`sos-btn ${
          loading ? "sos-loading" : ""
        }`}
      >
        {loading ? "Sending..." : "SOS"}
      </button>

      <p className="sos-description">
        Tap to alert emergency contacts
        with your live location.
      </p>

      {message && (
        <p className="sos-message">
          {message}
        </p>
      )}

    </div>
  );
}

export default SOSButton;
