import React, { useEffect } from "react";
import "./base.css";
import logo from "./logo.png";
import UserEditor from "./HeaderComponent/userEditor";
import DropBox from "./HeaderComponent/dropBox";
import { useLocation } from "react-router-dom";

function Header({ saveLogin, setLoggedIn, location, setLocation }) {
  // Edit user scale
  const [scale, setScale] = React.useState(1);

  // User Clicked profile icon
  const [buttonClicked, setButtonClicked] = React.useState(false);

  // User Click Edit profile icon
  const [UserProfileButtonClicked, UserProfileSetButtonClicked] =
    React.useState(false);

  // User data
  const [userData, setUserData] = React.useState("");
  // Update edit user size
  useEffect(() => {
    const ratio = 0.8 + (window.innerWidth / 1920) * 0.45;

    setScale(ratio);
  }, [window.innerWidth]);

  // get user data
  const fetchData = async () => {
    const endpoint = `/api/user/info?userData=${saveLogin}`;
    try {
      const response = await fetch(endpoint);
      if (response.ok) {
        const data = await response.json();
        setUserData(data);
      }
    } catch (error) {
      console.error("Error retrieving user info", error);
    }
  };

  useEffect(() => {
    if (buttonClicked) {
      fetchData();
    }
  }, [buttonClicked]);

  return (
    <>
      {/* Toggle drop down settings */}
      {buttonClicked ? (
        <DropBox
          setLoggedIn={setLoggedIn}
          setButtonClicked={UserProfileSetButtonClicked}
        />
      ) : null}

      {/* Toggle Edit profile settings */}
      {UserProfileButtonClicked ? (
        <div style={{ transform: `scale(${scale})` }}>
          <UserEditor
            saveLogin={saveLogin}
            userData={userData}
            setButtonClicked={UserProfileSetButtonClicked}
            setLocation={setLocation}
            fetchData={fetchData}
          />
        </div>
      ) : null}

      <div className="header">
        <div style={{ border: "1px solid #dddddd" }}>
          <div id="imageNav">
            <img id="image" src={logo} alt="Company Logo" />
          </div>
        </div>
        <div
          id="headerLogo"
          style={{
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "center",
            width: "100%",
            paddingRight: "20px",
          }}
        >
          <button
            onClick={() => setButtonClicked(!buttonClicked)}
            onMouseDown={(e) =>
              (e.currentTarget.style.backgroundColor = "#d3d3d3")
            }
            onMouseUp={(e) =>
              (e.currentTarget.style.backgroundColor = "transparent")
            }
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = "#d3d3d3";
            }}
            onMouseLeave={(e) =>
              (e.currentTarget.style.backgroundColor = "transparent")
            }
            style={{
              backgroundColor: "transparent",
              border: "none",
              borderRadius: "20px",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="35"
              height="35"
              viewBox="0 0 16 16"
            >
              <path
                fill="#000"
                d="M16 7.992C16 3.58 12.416 0 8 0S0 3.58 0 7.992c0 2.43 1.104 4.62 2.832 6.09c.016.016.032.016.032.032c.144.112.288.224.448.336c.08.048.144.111.224.175A8 8 0 0 0 8.016 16a8 8 0 0 0 4.48-1.375c.08-.048.144-.111.224-.16c.144-.111.304-.223.448-.335c.016-.016.032-.016.032-.032c1.696-1.487 2.8-3.676 2.8-6.106m-8 7.001c-1.504 0-2.88-.48-4.016-1.279c.016-.128.048-.255.08-.383a4.2 4.2 0 0 1 .416-.991c.176-.304.384-.576.64-.816c.24-.24.528-.463.816-.639c.304-.176.624-.304.976-.4A4.2 4.2 0 0 1 8 10.342a4.18 4.18 0 0 1 2.928 1.166q.552.552.864 1.295q.168.432.24.911A7.03 7.03 0 0 1 8 14.993m-2.448-7.4a2.5 2.5 0 0 1-.208-1.024c0-.351.064-.703.208-1.023s.336-.607.576-.847s.528-.431.848-.575s.672-.208 1.024-.208c.368 0 .704.064 1.024.208s.608.336.848.575c.24.24.432.528.576.847c.144.32.208.672.208 1.023c0 .368-.064.704-.208 1.023a2.8 2.8 0 0 1-.576.848a2.8 2.8 0 0 1-.848.575a2.72 2.72 0 0 1-2.064 0a2.8 2.8 0 0 1-.848-.575a2.5 2.5 0 0 1-.56-.848zm7.424 5.306c0-.032-.016-.048-.016-.08a5.2 5.2 0 0 0-.688-1.406a4.9 4.9 0 0 0-1.088-1.135a5.2 5.2 0 0 0-1.04-.608a3 3 0 0 0 .464-.383a4.2 4.2 0 0 0 .624-.784a3.6 3.6 0 0 0 .528-1.934a3.7 3.7 0 0 0-.288-1.47a3.8 3.8 0 0 0-.816-1.199a3.9 3.9 0 0 0-1.2-.8a3.7 3.7 0 0 0-1.472-.287a3.7 3.7 0 0 0-1.472.288a3.6 3.6 0 0 0-1.2.815a3.8 3.8 0 0 0-.8 1.199a3.7 3.7 0 0 0-.288 1.47q0 .528.144 1.007c.096.336.224.64.4.927c.16.288.384.544.624.784q.216.216.48.383a5 5 0 0 0-1.04.624c-.416.32-.784.703-1.088 1.119a5 5 0 0 0-.688 1.406c-.016.032-.016.064-.016.08C1.776 11.636.992 9.91.992 7.992C.992 4.14 4.144.991 8 .991s7.008 3.149 7.008 7.001a6.96 6.96 0 0 1-2.032 4.907"
              />
            </svg>
          </button>
        </div>
      </div>
    </>
  );
}

export default Header;
