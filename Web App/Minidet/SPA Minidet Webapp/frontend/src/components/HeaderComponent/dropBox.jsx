import React, { useEffect } from "react";
const cancelButton = 32;

const DropBox = ({ setLoggedIn, setButtonClicked }) => {
  const buttonStyle = {
    width: "99%",
    height: cancelButton,
    backgroundColor: "transparent",
    borderRadius: "20px",
    border: "none",
  };
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        position: "fixed",
        top: "50px",
        left: "94%",
        transform: "translateX(-50%)",
        width: "170px",
        height: "70px",
        border: "solid",
        borderWidth: 0.2,
        zIndex: 5,
        fontSize: "20px",
        borderRadius: 20,
        backgroundColor: "white",
      }}
    >
      <nav style={{ flexGrow: 1, width: "170px" }}>
        <button
          style={buttonStyle}
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
          onClick={() => setButtonClicked(true)}
        >
          Edit profile
        </button>
      </nav>
      <nav style={{ flexGrow: 1, width: "170px" }}>
        <button
          style={buttonStyle}
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
          onClick={() => {
            setLoggedIn(false);
          }}
        >
          Logout
        </button>
      </nav>
    </div>
  );
};
export default DropBox;
