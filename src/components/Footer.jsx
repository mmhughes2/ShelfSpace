import BrandMark from "./BrandMark";
import "./Footer.css";

function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-topline">
        <BrandMark />
        <div className="footer-links">
          <a href="#">Contact</a>
          <a href="#">Download</a>
        </div>
      </div>
      <div className="footer-wordmark">SHELFSPACE</div>
    </footer>
  );
}

export default Footer;
