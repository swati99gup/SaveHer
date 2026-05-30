function ContactList({

  contacts,
  deleteContact

}) {

  return (

    <div style={styles.box}>

      <h2 style={styles.heading}>
        👥 Emergency Contacts
      </h2>

      {

        contacts.length === 0

        ?

        <p style={styles.empty}>
          No emergency contacts added
        </p>

        :

        contacts.map((contact) => (

          <div
            key={contact._id}
            style={styles.contact}
          >

            <div>

              <h3 style={styles.name}>
                {contact.name}
              </h3>

              <p style={styles.email}>
                📧 {contact.email}
              </p>

            </div>

            <button

              onClick={() =>
                deleteContact(
                  contact._id
                )
              }

              style={styles.delete}

              onMouseEnter={(e) => {

                e.target.style.transform =
                  "scale(1.05)";

                e.target.style.background =
                  "#ff1744";
              }}

              onMouseLeave={(e) => {

                e.target.style.transform =
                  "scale(1)";

                e.target.style.background =
                  "#ff4f8b";
              }}

            >

              🗑 Delete

            </button>

          </div>
        ))
      }

    </div>
  );
}

const styles = {

  box: {

    width: "450px",

    display: "flex",

    flexDirection: "column",

    gap: "15px",

    padding: "25px",

    background:
      "rgba(255,255,255,0.08)",

    backdropFilter: "blur(12px)",

    border:
      "1px solid rgba(255,255,255,0.2)",

    borderRadius: "20px",

    boxShadow:
      "0 8px 25px rgba(0,0,0,0.3)"
  },

  heading: {

    color: "white",

    textAlign: "center",

    marginBottom: "10px",

    fontSize: "30px"
  },

  contact: {

    background:
      "rgba(255,255,255,0.06)",

    border:
      "1px solid rgba(255,255,255,0.15)",

    borderRadius: "15px",

    padding: "15px",

    display: "flex",

    justifyContent:
      "space-between",

    alignItems: "center",

    transition: "0.3s"
  },

  name: {

    margin: 0,

    color: "white"
  },

  email: {

    marginTop: "5px",

    color: "#d1d5db",

    fontSize: "14px"
  },

  delete: {

    background: "#ff4f8b",

    color: "white",

    border: "none",

    padding: "10px 15px",

    borderRadius: "8px",

    cursor: "pointer",

    fontWeight: "bold",

    transition: "0.3s"
  },

  empty: {

    color: "#d1d5db",

    textAlign: "center"
  }
};

export default ContactList;