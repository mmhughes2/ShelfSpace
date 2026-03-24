import "./TestimonialCard.css";

function TestimonialCard({ quote, text, author }) {
  return (
    <article className="testimonial">
      <p className="quote">"{quote}"</p>
      <p>{text}</p>
      <p className="author">- {author}</p>
    </article>
  );
}

export default TestimonialCard;
