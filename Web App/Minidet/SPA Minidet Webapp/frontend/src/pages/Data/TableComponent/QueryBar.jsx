import React, { useState } from "react";

export const QueryBar = ({ queryData, setQueryData, pageIndex, pageSize }) => {
  const [query, SetQuery] = useState("");

  const queryDB = async (query) => {
    const endpoint = `/api/query?currentPage=${pageIndex}&pageSize=${pageSize}`;
    const settings = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(query),
    };

    try {
      const response = await fetch(endpoint, settings);
      if (response.ok) {
        const data = await response.json();
        setQueryData(data);
      } else {
        console.error("Failed to fetch queryDB data");
      }
    } catch (e) {
      console.error("Error fetching query:", e);
    }
  };

  return (
    <div
      style={{
        borderRadius: "8px",
        display: "flex",
        justifyContent: "space-between",
        width: "500px",
        border: "1px solid",
      }}
    >
      <input
        style={{
          marginLeft: "5px",
          border: "none",
          outline: "none", //remove outline when clicked
          borderRadius: "5px",
          width: "480px",
          height: "24px",
        }}
        type="text"
        value={query}
        onChange={(e) => SetQuery(e.target.value)}
      />
      <button
        onMouseUp={(e) =>
          (e.currentTarget.style.backgroundColor = "transparent")
        }
        onMouseEnter={(e) => {
          e.currentTarget.style.backgroundColor = "#d3d3d3";
        }}
        onMouseLeave={(e) =>
          (e.currentTarget.style.backgroundColor = "transparent")
        }
        id="query"
        style={{
          height: "24px",
          backgroundColor: "transparent",
          borderRadius: "5px",
          border: "none",
          outline: "none", //remove outline when clicked
        }}
        onClick={() => queryDB(query)}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width={24}
          height={24}
          viewBox="0 0 24 24"
        >
          <path
            fill="#000"
            d="m19.6 21l-6.3-6.3q-.75.6-1.725.95T9.5 16q-2.725 0-4.612-1.888T3 9.5t1.888-4.612T9.5 3t4.613 1.888T16 9.5q0 1.1-.35 2.075T14.7 13.3l6.3 6.3zM9.5 14q1.875 0 3.188-1.312T14 9.5t-1.312-3.187T9.5 5T6.313 6.313T5 9.5t1.313 3.188T9.5 14"
          ></path>
        </svg>
      </button>
    </div>
  );
};
