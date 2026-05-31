function ContactList({ contacts, deleteContact }) {
  return (
    <div className="contact-list-box">

      <h2 className="contact-list-heading">
        👥 Emergency Contacts
      </h2>

      {
        contacts.length === 0 ?

        <p className="contact-empty">
          No emergency contacts added
        </p>

        :

        contacts.map((contact) => (

          <div
            key={contact._id}
            className="contact-item"
          >

            <div>
              <h3 className="contact-name">
                {contact.name}
              </h3>

              <p className="contact-email">
                📧 {contact.email}
              </p>
            </div>

            <button
              onClick={() =>
                deleteContact(contact._id)
              }
              className="delete-btn"
            >
              🗑 Delete
            </button>

          </div>
        ))
      }

    </div>
  );
}

export default ContactList;