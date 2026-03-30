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
        <p className="section-label">Featured Preview</p>
        <h2>See how ShelfSpace moves from shelf tracking to shared reading.</h2>
        <p>
          This slideshow is the Part 9 interactive feature. It rotates through
          key parts of the experience while still letting the user pick a slide
          manually.
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
