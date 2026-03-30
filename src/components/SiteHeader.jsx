import { useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import BrandMark from "./BrandMark";
import SocialIcons from "./SocialIcons";
import "./SiteHeader.css";

const navItems = [
  { to: "/", label: "Home" },
  { to: "/myshelf", label: "My Shelf" },
  { to: "/explore", label: "Explore" },
  { to: "/profile", label: "Profile" },
  { to: "/about", label: "About" },
];

function SiteHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  return (
    <header className="site-header">
      <BrandMark />

      <button
        className="menu-toggle"
        type="button"
        aria-expanded={isMenuOpen}
        aria-controls="site-navigation"
        aria-label={isMenuOpen ? "Close navigation menu" : "Open navigation menu"}
        onClick={() => setIsMenuOpen((open) => !open)}
      >
        <span aria-hidden="true">{isMenuOpen ? "\u{1F891}" : "\u{1F893}"}</span>
      </button>

      <nav
        id="site-navigation"
        className={isMenuOpen ? "site-nav site-nav-open" : "site-nav"}
        aria-label="Main navigation"
      >
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              isActive ? "nav-link nav-link-active" : "nav-link"
            }
            onClick={() => setIsMenuOpen(false)}
          >
            {item.label}
          </NavLink>
        ))}
      </nav>

      <SocialIcons />
    </header>
  );
}

export default SiteHeader;
