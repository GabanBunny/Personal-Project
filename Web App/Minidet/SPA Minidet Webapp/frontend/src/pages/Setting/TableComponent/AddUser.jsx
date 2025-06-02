import React from "react";

export const AddUser = ({ setButtonClicked }) => {
  return (
    <div style={{ paddingRight: "20px" }}>
      <button
        onClick={() => {
          setButtonClicked(true);
        }}
        style={{
          backgroundColor: "#00C853",
          color: "white",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
        >
          <path fill="#fff" d="M11 13H5v-2h6V5h2v6h6v2h-6v6h-2z" />
        </svg>
        CREATE NEW USER
      </button>
    </div>
  );
};
