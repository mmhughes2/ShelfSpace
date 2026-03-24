function SocialIcons() {
  return (
    <div className="socials" aria-label="Social media">
      <a href="#" aria-label="Instagram">
        <svg viewBox="0 0 24 24">
          <rect x="3" y="3" width="18" height="18" rx="5"></rect>
          <circle cx="12" cy="12" r="4.2"></circle>
          <circle cx="17.6" cy="6.4" r="1"></circle>
        </svg>
      </a>
      <a href="#" aria-label="LinkedIn">
        <svg viewBox="0 0 24 24">
          <rect x="3" y="3" width="18" height="18" rx="2"></rect>
          <path d="M8 10v7"></path>
          <circle cx="8" cy="7.5" r="1"></circle>
          <path d="M12 17v-4.1c0-1.7 1-2.4 2.1-2.4 1.2 0 1.9 2.3V17"></path>
        </svg>
      </a>
      <a href="#" aria-label="X">
        <svg viewBox="0 0 24 24">
          <path d="M4 4l16 16"></path>
          <path d="M20 4 4 20"></path>
        </svg>
      </a>
    </div>
  );
}

export default SocialIcons;
