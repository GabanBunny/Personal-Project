import React from "react";

export const Pagination = ({
  setChapterIndex,
  chaptersContent,
  chapterIndex,
}) => {
  const divStyle = {
    width: "50%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  };

  const buttonStyle = {
    width: "100%",
    height: "50px",
    backgroundColor: "#007BFF", // Primary color
    color: "#FFFFFF", // Text color
    border: "none",
    borderRadius: "5px", // Rounded corners
    fontSize: "16px",
    cursor: "pointer",
    transition: "background-color 0.3s ease", // Smooth transition
  };

  const disabledButtonStyle = {
    ...buttonStyle,
    backgroundColor: "#CCCCCC", // Disabled color
    cursor: "not-allowed",
  };

  return (
    <div
      style={{
        paddingTop: "20px",
        paddingBottom: "20px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {/* Previous */}
      <div style={divStyle}>
        <button
          disabled={chapterIndex === 0}
          style={chapterIndex === 0 ? disabledButtonStyle : buttonStyle}
          onClick={() => {
            if (chapterIndex > 0) {
              setChapterIndex(chapterIndex - 1);
            }
          }}
          onMouseDown={(e) =>
            (e.currentTarget.style.backgroundColor = "#d3d3d3")
          }
          onMouseUp={(e) => (e.currentTarget.style.backgroundColor = "#007BFF")}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = "#d3d3d3";
          }}
          onMouseLeave={(e) => {
            chapterIndex === 0
              ? null
              : (e.currentTarget.style.backgroundColor = "#007BFF");
          }}
        >
          Previous
        </button>
      </div>
      {/* Next */}
      <div style={divStyle}>
        <button
          disabled={chapterIndex === chaptersContent.length - 1}
          style={
            chapterIndex === chaptersContent.length - 1
              ? disabledButtonStyle
              : buttonStyle
          }
          onClick={() => {
            if (chapterIndex < chaptersContent.length - 1) {
              setChapterIndex(chapterIndex + 1);
            }
          }}
          onMouseDown={(e) =>
            (e.currentTarget.style.backgroundColor = "#d3d3d3")
          }
          onMouseUp={(e) => (e.currentTarget.style.backgroundColor = "#007BFF")}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = "#d3d3d3";
          }}
          onMouseLeave={(e) => {
            chapterIndex === chaptersContent.length - 1
              ? null
              : (e.currentTarget.style.backgroundColor = "#007BFF");
          }}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Pagination;
