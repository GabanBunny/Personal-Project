import React from "react";
import chaptersContent from "./ChapterContent";

export const QueryBar = ({ setHighLightedChapter }) => {
  const [query, SetQuery] = React.useState("");

  const getChapter = (keywords) => {
    let ans = new Set([]);
    keywords = keywords
      .toLowerCase()
      .split(/\s+/) // split on one or more spaces
      .filter(Boolean) //since false == """
      .forEach((word) => {
        chaptersContent.forEach((chapter) => {
          if (chapter.content.includes(word)) {
            ans.add(chapter.id);
          }
        });
      });
    setHighLightedChapter(ans);
  };
  return (
    <div
      style={{
        borderRadius: "8px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        width: "500px",
        border: "1px solid",
      }}
    >
      <input
        style={{
          marginLeft: "20px",
          border: "none",
          outline: "none", //remove outline when clicked
          borderRadius: "5px",
          width: "480px",
          height: "24px",
        }}
        type="text"
        value={query}
        placeholder="Search Documentation"
        onChange={(e) => SetQuery(e.target.value)}
      />
      <button
        id="query"
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
          height: "30px",
          backgroundColor: "transparent",
          borderRadius: "5px",
          border: "none",
          outline: "none", //remove outline when clicked
        }}
        onClick={() => getChapter(query)}
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
export default QueryBar;
