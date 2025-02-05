import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import Home from "./pages/Home/Home";
import DataPage from "./pages/Data/Data";
import UserSettings from "./pages/Setting/Setting";
import HelpPage from "./pages/Help/Help";
import { Login } from "./pages/Home/Login/Login.jsx";

function App() {
  const [location, setLocation] = React.useState("Asia/Ho_Chi_Minh");

  const [hasLoggedIn, setLoggedIn] = React.useState(false);

  // Save Login content
  const [saveLogin, setSaveLogin] = React.useState("");

  // Login attempts counter
  const [loginAttempts, setLoginAttempts] = React.useState(0);

  return (
    <Router>
      <div className="app-container">
        {!hasLoggedIn ? (
          <div
            style={{
              backgroundColor: "black",
              maxWidth: screen.width,
              height: screen.height,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <div style={{ transform: "scale(1.5)" }}>
              <Login
                setLoggedIn={setLoggedIn}
                saveLogin={saveLogin}
                setSaveLogin={setSaveLogin}
                setLoginAttempts={setLoginAttempts}
                loginAttempts={loginAttempts}
                location={location}
              />
            </div>
          </div>
        ) : (
          <div>
            <Header
              saveLogin={saveLogin}
              setLoggedIn={setLoggedIn}
              location={location}
              setLocation={setLocation}
            />
            <Sidebar />
            <main>
              <Routes>
                {/* "/" root path */}
                <Route path="/" element={<Home location={location} />} />
                <Route path="/data" element={<DataPage />} />
                <Route path="/settings" element={<UserSettings />} />
                <Route path="/help" element={<HelpPage />} />
              </Routes>
            </main>
          </div>
        )}
      </div>
    </Router>
  );
}

export default App;
