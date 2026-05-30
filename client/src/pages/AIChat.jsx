import { useState, useEffect } from "react";

import axios from "axios";

import Navbar
from "../components/Navbar";

function AIChat() {

  const [message, setMessage] = useState("");
const [history, setHistory] = useState([]);
  const [reply, setReply] =useState("");

  const [loading, setLoading] =useState(false);
const clearChat = () => {
  setMessage("");
  setReply("");
};
  const askAI = async () => {

    if (!message) return;

    try {

      setLoading(true);
const token=localStorage.getItem("token");
console.log("TOKEN:", token);
      const res = await axios.post(

        "http://localhost:5000/api/ai",

        { message },
        {
          headers: {
  "Content-Type": "application/json",
  Authorization: `Bearer ${token}`
}
        }
      );

      setReply(
        res.data.response
      );

    } catch (err) {

      console.log(err);

    }

    setLoading(false);
  };
  

  return (

    <div>

      <Navbar />

      <div style={styles.container}>

        <h1>
          AI Safety Assistant 🤖
        </h1>

        <textarea

          value={message}

          onChange={(e) =>
            setMessage(
              e.target.value
            )
          }

          placeholder="Describe your situation..."

          style={styles.textarea}
        />

        <div style={styles.buttonContainer}>
 <button
  onClick={askAI}
  disabled={loading}
  style={{
    ...styles.button,
    opacity: loading ? 0.6 : 1,
    cursor: loading ? "not-allowed" : "pointer"
  }}
>
  {loading ? " Thinking..." : " Ask AI"}
</button>

  <button
    onClick={clearChat}
    style={styles.clearButton}
    onMouseOver={(e) =>
    e.target.style.transform = "scale(1.05)"
  }
  onMouseOut={(e) =>
    e.target.style.transform = "scale(1)"
  }
  >
     Clear
  </button>
</div>
        {

          reply && (

            <div style={styles.replyBox}>

              <h3>
                AI Response
              </h3>

              <p>
                {reply}
              </p>

            </div>

          )
        }
 {
        history.length > 0 && (

          <div style={styles.historyBox}>

            <h3>Previous Chats</h3>

            {
              history.map((chat) => (

                <div
                  key={chat._id}
                  style={styles.chatItem}
                >

                  <p>
                    <strong>You:</strong>
                    {" "}
                    {chat.message}
                  </p>

                  <p>
                    <strong>AI:</strong>
                    {" "}
                    {chat.response}
                  </p>
                    <hr />

                </div>
              ))
            }

          </div>

        )
      }
      </div>

    </div>
  );
}

const styles = {

  container: {

    display: "flex",

    flexDirection: "column",

    alignItems: "center",

    gap: "20px",

    marginTop: "40px",

    padding: "20px"
  },
textarea: {
  width: "80%",
  maxWidth: "700px",
  minHeight: "180px",
  padding: "18px",
  borderRadius: "16px",
  border: "2px solid #374151",
  background: "#111827",
  color: "#ffffff",
  fontSize: "16px",
  lineHeight: "1.6",
  resize: "vertical",
  outline: "none",
  boxShadow: "0 4px 15px rgba(0,0,0,0.25)"
},

 replyBox: {
  width: "80%",
  maxWidth: "600px",
  background: "#1f2937",
  color: "#ffffff",
  padding: "20px",
  borderRadius: "12px",
  boxShadow: "0 0 15px rgba(255,255,255,0.1)"
},
  buttonContainer: {
  display: "flex",
  gap: "12px",
},

button: {
  padding: "12px 24px",
  border: "none",
  borderRadius: "12px",
  background: "#ff4f8b",
  color: "white",
  fontWeight: "bold",
  fontSize: "16px",
  cursor: "pointer",
  boxShadow: "0 4px 12px rgba(255,79,139,0.4)"
},

clearButton: {
  padding: "12px 24px",
  border: "none",
  borderRadius: "12px",
  background: "#ef4444",
  color: "white",
  fontWeight: "bold",
  fontSize: "16px",
  cursor: "pointer",
  boxShadow: "0 4px 12px rgba(239,68,68,0.4)"
},
};

export default AIChat;