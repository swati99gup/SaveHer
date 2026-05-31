function ContactForm({
  formData,
  handleChange,
  addContact
}) {
  return (
    <div className="contact-form-box">

      <h2 className="contact-form-heading">
        Add Emergency Contact
      </h2>

      <input
        type="text"
        name="name"
        placeholder="Enter Name"
        value={formData.name}
        onChange={handleChange}
        className="contact-input"
      />

      <input
        type="email"
        name="email"
        placeholder="Enter Contact Email"
        value={formData.email}
        onChange={handleChange}
        className="contact-input"
      />

      <button
        onClick={addContact}
        className="contact-submit-btn"
      >
        Add Contact
      </button>

    </div>
  );
}

export default ContactForm;