import { NavLink } from "react-router-dom";
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
  return (
    <header className="site-header">
      <BrandMark />

      <nav className="site-nav" aria-label="Main navigation">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              isActive ? "nav-link nav-link-active" : "nav-link"
            }
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
