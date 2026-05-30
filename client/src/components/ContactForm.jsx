function ContactForm({

  formData,
  handleChange,
  addContact

}) {

  return (

    <div style={styles.box}>

      <h2 style={styles.heading}>
        Add Emergency Contact
      </h2>

      <input
        type="text"
        name="name"
        placeholder="Enter Name"
        value={formData.name}
        onChange={handleChange}
        style={styles.input}
      />

      <input

  type="email"

  name="email"

  placeholder="Enter Contact Email"

  value={formData.email}

  onChange={handleChange}

  style={styles.input}
/>

      <button
  onClick={addContact}
  style={styles.button}
  onMouseEnter={(e) => {
    e.target.style.transform =
      "translateY(-3px)";
  }}
  onMouseLeave={(e) => {
    e.target.style.transform =
      "translateY(0)";
  }}
>
        Add Contact
      </button>

    </div>
  );
}

const styles = {

  box: {

    width: "420px",

    display: "flex",

    flexDirection: "column",

    gap: "15px",

    padding: "30px",

    background: "rgba(255,255,255,0.08)",

    backdropFilter: "blur(12px)",

    border: "1px solid rgba(255,255,255,0.2)",

    borderRadius: "20px",

    boxShadow:
      "0 8px 25px rgba(0,0,0,0.3)"
  },

  heading: {

    color: "white",

    textAlign: "center",

    fontSize: "32px",

    marginBottom: "10px"
  },

  input: {

    padding: "14px",

    borderRadius: "10px",

    border: "1px solid #ddd",

    fontSize: "16px",

    outline: "none"
  },

  button: {

    padding: "14px",

    borderRadius: "10px",

    border: "none",

    background:
      "linear-gradient(135deg,#ff4f8b,#ff2f75)",

    color: "white",

    fontSize: "16px",

    fontWeight: "bold",

    cursor: "pointer",

    transition: "0.3s",

    boxShadow:
      "0 4px 15px rgba(255,79,139,0.4)"
  }
};
export default ContactForm;