import React from "react";
import logo from "./logo.png";
import { CountDownTimer } from "./CountDownTimer";

export const Login = ({
  setLoggedIn,
  saveLogin,
  setSaveLogin,
  setLoginAttempts,
  loginAttempts,
  location,
}) => {
  // Save Password content
  const [savePassword, setSavePassword] = React.useState("");

  // Show and hide password
  const [showPassword, setShowPassword] = React.useState(false);

  // Login failed
  const [loginFailed, setLoginFailed] = React.useState(false);

  const maxLoginAttempts = 5;

  const queryLogin = async () => {
    const endpoint = `/api/Login`;
    const settings = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ saveLogin, savePassword }),
    };
    try {
      const response = await fetch(endpoint, settings);
      if (response.ok) {
        const data = await response.json();
        if (data.status === "success") {
          setLoggedIn(true);
        } else {
          setLoginFailed(true);
        }
      } else {
        console.error("Failed to fetch login ");
      }
    } catch (error) {
      console.error("Error fetching login", error);
    }
  };

  return (
    <div
      style={{
        backgroundColor: "white",
        width: "300px",
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
        boxShadow: "0 0 8px rgba(0, 0, 0, 0.1)",
      }}
    >
      <nav style={{ margin: "30px 5px 5px 5px", height: "50px" }}>
        <img src={logo} alt="Company Logo" />
      </nav>
      <div
        style={{
          margin: " 5px 5px 5px 5px",
          fontSize: "30px",
          fontWeight: "600",
        }}
      ></div>
      {/* Lock log in */}
      {loginAttempts >= maxLoginAttempts ? (
        <div
          style={{
            backgroundColor: "#fedce0",
            borderRadius: "5px",
            width: "270px",
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <div
            style={{
              fontSize: "13px",
              margin: "5px",
              color: "#8e2b25",
              textAlign: "left",
              width: "100%",
            }}
          >
            Your account as been temporarily locked, please try again after
            <CountDownTimer
              setLoginAttempts={setLoginAttempts}
              location={location}
            />
          </div>
        </div>
      ) : null}
      {/* Invalid Username and password */}
      {loginFailed && loginAttempts < maxLoginAttempts ? (
        <div
          style={{
            backgroundColor: "#fedce0",
            borderRadius: "5px",
            width: "250px",
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <div
            style={{
              fontSize: "13px",
              margin: "5px",
              color: "#8e2b25",
            }}
          >
            Invalid username or password
          </div>
          <button
            style={{
              background: "transparent",
              border: "none",
              marginRight: "5px",
            }}
            onClick={() => setLoginFailed(false)}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24">
              <path
                fill="#8e2b25"
                d="M6.4 19L5 17.6l5.6-5.6L5 6.4L6.4 5l5.6 5.6L17.6 5L19 6.4L13.4 12l5.6 5.6l-1.4 1.4l-5.6-5.6z"
              />
            </svg>
          </button>
        </div>
      ) : (
        <div></div>
      )}
      <form
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          marginBottom: "30px",
          width: "100%",
        }}
        action="#"
      >
        <div
          style={{
            display: "flex",
            alignItems: "left" /* Email and pass word left */,
            flexDirection: "column" /* stack on each other */,
            marginBottom: "10px" /* spacing */,
            height: "45px",
            marginLeft: "25px" /* Ensure this matches the button */,
            marginRight: "30px",
          }}
        >
          <label
            style={{
              fontSize: "18px",
            }}
          >
            Username
          </label>
          <input
            style={{
              width: " 250px",
              height: "100%",
              border: "1px solid silver",
              borderRadius: 20,
              paddingLeft:
                "3px" /* Optional: add padding for better appearance */,
            }}
            type="text"
            onChange={(e) => setSaveLogin(e.target.value)}
            required
          />
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "left" /* Email and pass word left */,
            flexDirection: "column" /* stack on each other */,
            marginBottom: "10px" /* spacing */,
            height: "45px",
            marginLeft: "25px" /* Ensure this matches the button */,
            marginRight: "30px",
          }}
        >
          <label
            style={{
              fontSize: "18px",
            }}
          >
            Password
          </label>
          <input
            style={{
              borderRadius: 20,
              width: " 250px",
              height: "100%",
              border: "1px solid silver",
              paddingLeft:
                "3px" /* Optional: add padding for better appearance */,
            }}
            type={showPassword ? "input" : "password"}
            placeholder="Enter your password"
            onChange={(e) => setSavePassword(e.target.value)}
            required
          />
        </div>

        <div
          style={{
            width: "100%",
          }}
        >
          <div
            style={{
              marginLeft: "5px",
              display: "flex",
              justifyContent: "flex-start",
              alignItems: "center",
            }}
          >
            <input
              style={{
                marginLeft: "10px",
                width: "30px",
                height: "100%",
                border: "1px solid silver",
              }}
              type="checkbox"
              onChange={(e) => setShowPassword(e.target.checked)}
            />
            Show password
          </div>
        </div>
        {/* Sign in button */}
        <div
          style={{
            margin: " 0px",
            height: "45px",
            width: "100%",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <button
            style={{
              alignSelf: "center",
              width: "25%",
              height: "70%",
            }}
            type="submit"
            onClick={() => {
              if (loginAttempts < maxLoginAttempts) {
                queryLogin();
                setLoginAttempts((prev) => prev + 1);
              }
            }}
          >
            Sign in
          </button>
        </div>
      </form>
    </div>
  );
};
