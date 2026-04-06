import { useEffect, useState } from "react";
import "./Slideshow.css";

function Slideshow({ slides }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timerId = window.setInterval(() => {
      setCurrentIndex((index) => (index + 1) % slides.length);
    }, 4500);

    return () => window.clearInterval(timerId);
  }, [slides.length]);

  return (
    <section className="slideshow-section" aria-label="ShelfSpace slideshow">
      <div className="slideshow-copy">
        <h2>See how ShelfSpace moves from shelf tracking to shared reading.</h2>
        <p>
          ShelfSpace brings together personal reading goals, book discovery,
          and community moments in one welcoming space. Browse the slides to
          preview the different parts of the experience.
        </p>
      </div>

      <div className="slideshow-card">
        {slides.map((slide, index) => (
          <article
            key={slide.title}
            className={
              index === currentIndex
                ? "slide-panel slide-panel-active"
                : "slide-panel"
            }
            aria-hidden={index !== currentIndex}
          >
            <img src={slide.image} alt={slide.alt} />
            <div className="slide-caption">
              <strong>{slide.title}</strong>
              <p>{slide.description}</p>
            </div>
          </article>
        ))}

        <div className="slide-dots" aria-label="Select slide">
          {slides.map((slide, index) => (
            <button
              key={slide.title}
              type="button"
              className={index === currentIndex ? "slide-dot slide-dot-active" : "slide-dot"}
              onClick={() => setCurrentIndex(index)}
              aria-label={`Show ${slide.title}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default Slideshow;
