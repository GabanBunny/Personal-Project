import React, { useState } from "react";

export const ColumnVisibilityDropdown = ({ TableInstance }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  return (
    <div
      style={{
        position: "relative",
        borderRadius: "8px",
        width: "100px",
        display: "flex",
        justifyContent: "space-evenly",
        border: "1px solid",
        zIndex: "1",
      }}
    >
      <button
        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        onMouseDown={(e) => (e.currentTarget.style.backgroundColor = "#d3d3d3")}
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
          width: "100%",
          border: "none",
          borderRadius: "8px",
          fontSize: "16px",
          outline: "none",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {/* Button to open/close dropdown */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width={24}
          height={24}
          viewBox="0 0 24 24"
        >
          <path
            fill="#000"
            d="M4 4h16a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2m12 2v12h4V6zM4 6v12h4V6zm6 0v12h4V6z"
          ></path>
        </svg>
        Columns
      </button>
      {/* Dropdown Menu */}
      {isDropdownOpen && (
        <div
          style={{
            position: "absolute",
            top: "100%",
            left: 0,
            backgroundColor: "#fff",
            boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
            borderRadius: "4px",
            width: "150px",
            padding: "10px",
          }}
        >
          {/* Select All Checkbox */}
          <label style={{ display: "block", marginBottom: "5px" }}>
            <input
              type="checkbox"
              checked={TableInstance.getIsAllColumnsVisible()}
              onChange={TableInstance.getToggleAllColumnsVisibilityHandler()}
            />
            Select All
          </label>

          {/* Individual Columns */}
          {TableInstance.getAllLeafColumns().map((column) => (
            <label
              key={column.id}
              style={{
                display: "block",
                marginBottom: "5px",
                cursor: "pointer",
              }}
            >
              <input
                type="checkbox"
                checked={column.getIsVisible()}
                onChange={column.getToggleVisibilityHandler()}
              />
              {column.columnDef.header}
            </label>
          ))}
        </div>
      )}
    </div>
  );
};
