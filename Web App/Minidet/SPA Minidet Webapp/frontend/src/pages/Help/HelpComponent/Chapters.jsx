import React from "react";
import { chaptersContent } from "./ChapterContent";

export const Chapters = ({ expandedChapters, toggleChapter, chapterIndex }) => {
  return (
    <>
      {/* Chapter 1 */}
      <div
        style={{ cursor: "pointer", fontWeight: "bold", paddingTop: "20px" }}
        onClick={() => toggleChapter(chaptersContent[chapterIndex].id)}
      >
        {chaptersContent[chapterIndex].title}
        {expandedChapters[chaptersContent[chapterIndex].id] ? "▼" : "▶"}
      </div>
      {expandedChapters[chaptersContent[chapterIndex].id] && (
        <div style={{ marginLeft: "20px" }}>
          <div
            // Render Raw HTML
            dangerouslySetInnerHTML={{
              __html: chaptersContent[chapterIndex].content,
            }}
          />
        </div>
      )}
    </>
  );
};

export default Chapters;
