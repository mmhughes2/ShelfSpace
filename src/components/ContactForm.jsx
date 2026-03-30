import { useState } from "react";
import "./ContactForm.css";

const initialForm = {
  name: "",
  email: "",
  topic: "",
  message: "",
};

function ContactForm() {
  const [formData, setFormData] = useState(initialForm);
  const [status, setStatus] = useState({
    tone: "idle",
    message: "Send a message without leaving the site.",
  });
  const [isSending, setIsSending] = useState(false);

  function handleChange(event) {
    const { name, value } = event.target;
    setFormData((current) => ({ ...current, [name]: value }));
  }

  async function handleSubmit(event) {
    event.preventDefault();

    const form = event.currentTarget;
    if (!form.checkValidity()) {
      form.reportValidity();
      setStatus({
        tone: "error",
        message: "Please complete every field with a valid email address.",
      });
      return;
    }

    setIsSending(true);
    setStatus({ tone: "idle", message: "Submitting your message..." });

    const payload = new FormData();
    payload.append("name", formData.name);
    payload.append("email", formData.email);
    payload.append("topic", formData.topic);
    payload.append("message", formData.message);
    payload.append("_subject", "ShelfSpace Contact Form Submission");
    payload.append("_captcha", "false");

    try {
      const response = await fetch(
        "https://formsubmit.co/ajax/kenhughes925@gmail.com",
        {
          method: "POST",
          headers: {
            Accept: "application/json",
          },
          body: payload,
        }
      );

      if (!response.ok) {
        throw new Error(`Request failed with ${response.status}`);
      }

      setStatus({
        tone: "success",
        message:
          "Message sent successfully. Check your inbox for the FormSubmit verification email if this is the first submission.",
      });
      setFormData(initialForm);
    } catch (error) {
      setStatus({
        tone: "error",
        message:
          "There was a problem sending your message. Please try again in a moment.",
      });
    } finally {
      setIsSending(false);
    }
  }

  return (
    <form className="contact-form" onSubmit={handleSubmit}>
      <label>
        <span>Name</span>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />
      </label>

      <label>
        <span>Email</span>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
      </label>

      <label>
        <span>Topic</span>
        <input
          type="text"
          name="topic"
          value={formData.topic}
          onChange={handleChange}
          required
        />
      </label>

      <label className="message-field">
        <span>Message</span>
        <textarea
          name="message"
          rows="6"
          value={formData.message}
          onChange={handleChange}
          required
        ></textarea>
      </label>

      <div className="form-actions">
        <button className="contact-submit" type="submit" disabled={isSending}>
          {isSending ? "Sending..." : "Send Message"}
        </button>
        <p className={`form-status form-status-${status.tone}`}>{status.message}</p>
      </div>
    </form>
  );
}

export default ContactForm;
