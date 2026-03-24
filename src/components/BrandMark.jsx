import { Link } from "react-router-dom";

function BrandMark() {
  return (
    <Link className="brand" to="/" aria-label="ShelfSpace home">
      <span className="brand-icon" aria-hidden="true">
        <svg viewBox="0 0 64 64">
          <g
            fill="none"
            stroke="currentColor"
            strokeWidth="3.5"
            strokeLinejoin="round"
          >
            <path d="M12 18 31 11l21 7-21 7-19-7Z" />
            <path d="M12 29 31 22l21 7-21 7-19-7Z" />
            <path d="M12 40 31 33l21 7-21 7-19-7Z" />
            <path d="M10 18v22" />
            <path d="M31 11v29" />
            <path d="M52 18v22" />
          </g>
        </svg>
      </span>
      <span className="brand-text">ShelfSpace</span>
    </Link>
  );
}

export default BrandMark;
