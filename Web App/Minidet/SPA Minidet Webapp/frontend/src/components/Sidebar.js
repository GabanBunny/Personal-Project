import "./base.css";
import { Link } from "react-router-dom";
import React, { useState } from "react";

const svgSize = "1.2em";

function Sidebar() {
  const [navClicked, setNavClicked] = useState(["/"]);
  return (
    <div className="sidebar">
      <nav onClick={(e) => setNavClicked(e.target.attributes.href.value)}>
        <Link
          to="/"
          style={{
            backgroundColor: navClicked == "/" ? "#ddddd1" : "transparent",
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width={svgSize}
            height={svgSize}
            viewBox="0 0 24 24"
          >
            <path fill="currentColor" d="M10 20v-6h4v6h5v-8h3L12 3L2 12h3v8z" />
          </svg>
          Home
        </Link>
        <Link
          to="/data"
          style={{
            backgroundColor: navClicked == "/data" ? "#ddddd1" : "transparent",
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width={svgSize}
            height={svgSize}
            viewBox="0 0 48 48"
            style={{ marginRight: 11 + "px" }}
          >
            <g
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="4"
            >
              <path d="M44 11v27c0 3.314-8.954 6-20 6S4 41.314 4 38V11" />
              <path d="M44 29c0 3.314-8.954 6-20 6S4 32.314 4 29m40-9c0 3.314-8.954 6-20 6S4 23.314 4 20" />
              <ellipse cx="24" cy="10" fill="currentColor" rx="20" ry="6" />
            </g>
          </svg>
          Data
        </Link>
        <Link
          to="/settings"
          style={{
            backgroundColor:
              navClicked == "/settings" ? "#ddddd1" : "transparent",
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width={svgSize}
            height={svgSize}
            viewBox="0 0 24 24"
          >
            <path
              fill="currentColor"
              d="M19.14 12.94c.04-.3.06-.61.06-.94c0-.32-.02-.64-.07-.94l2.03-1.58a.49.49 0 0 0 .12-.61l-1.92-3.32a.49.49 0 0 0-.59-.22l-2.39.96c-.5-.38-1.03-.7-1.62-.94l-.36-2.54a.484.484 0 0 0-.48-.41h-3.84c-.24 0-.43.17-.47.41l-.36 2.54c-.59.24-1.13.57-1.62.94l-2.39-.96c-.22-.08-.47 0-.59.22L2.74 8.87c-.12.21-.08.47.12.61l2.03 1.58c-.05.3-.09.63-.09.94s.02.64.07.94l-2.03 1.58a.49.49 0 0 0-.12.61l1.92 3.32c.12.22.37.29.59.22l2.39-.96c.5.38 1.03.7 1.62.94l.36 2.54c.05.24.24.41.48.41h3.84c.24 0 .44-.17.47-.41l.36-2.54c.59-.24 1.13-.56 1.62-.94l2.39.96c.22.08.47 0 .59-.22l1.92-3.32c.12-.22.07-.47-.12-.61zM12 15.6c-1.98 0-3.6-1.62-3.6-3.6s1.62-3.6 3.6-3.6s3.6 1.62 3.6 3.6s-1.62 3.6-3.6 3.6"
            />
          </svg>
          Settings
        </Link>
        <Link
          to="/help"
          style={{
            backgroundColor: navClicked == "/help" ? "#ddddd1" : "transparent",
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width={svgSize}
            height={svgSize}
            viewBox="0 0 24 24"
          >
            <path
              fill="currentColor"
              d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10s10-4.48 10-10S17.52 2 12 2m1 17h-2v-2h2zm2.07-7.75l-.9.92C13.45 12.9 13 13.5 13 15h-2v-.5c0-1.1.45-2.1 1.17-2.83l1.24-1.26c.37-.36.59-.86.59-1.41c0-1.1-.9-2-2-2s-2 .9-2 2H8c0-2.21 1.79-4 4-4s4 1.79 4 4c0 .88-.36 1.68-.93 2.25"
            />
          </svg>
          Help
        </Link>
      </nav>
    </div>
  );
}

export default Sidebar;
