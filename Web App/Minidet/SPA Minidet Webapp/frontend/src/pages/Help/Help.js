import QueryBar from "./HelpComponent/QueryBar";
import Pagination from "./HelpComponent/Pagination";
import { Chapters } from "./HelpComponent/Chapters";
import chaptersContent from "./HelpComponent/ChapterContent";
import React, { useEffect } from "react";

function Help() {
  // Highlight chapters for query bar
  const [highlightedChapter, setHighLightedChapter] = React.useState(new Set());

  // Store chapter object
  const [expandedChapters, setExpandedChapters] = React.useState({
    chapter1: true,
    chapter2: true,
    chapter3: true,
    chapter4: true,
    chapter5: true,
    chapter6: true,
    chapter7: true,
    chapter8: true,
  });

  const [chapterIndex, setChapterIndex] = React.useState(0);

  // Change specific chapter state
  const toggleChapter = (chapterId) => {
    setExpandedChapters((prev) => ({
      ...prev,
      [chapterId]: !prev[chapterId],
    }));
  };

  // TOC style
  const TOCStyle = {
    padding: "10px",
    display: "inline-block", //better display
    width: "fit-content",
    transition: "background 0.3s ease-in-out",
  };

  // Automatically open the first highlighted result of the documentation page
  useEffect(() => {
    if (highlightedChapter.size != 0) {
      setChapterIndex(highlightedChapter.values().next().value.slice(-1) - 1);
    }
  }, [highlightedChapter]);

  return (
    <div
      style={{
        height: "100vh",
        backgroundColor: "white",
        paddingBottom: "20px",
        paddingRight: "20px",
      }}
    >
      <div style={{ paddingLeft: "20px" }}>
        <div
          style={{
            display: "flex",
            flexDirection: "row-reverse",
            justifyContent: "space-between",
            paddingTop: "20px",
          }}
        >
          <QueryBar setHighLightedChapter={setHighLightedChapter} />
          <h2>Table of Contents</h2>
        </div>
        <ul style={{ listStyleType: "none" }}>
          {/* Chapter 1 */}
          <li
            style={{
              ...TOCStyle,
              backgroundColor: highlightedChapter.has("chapter1")
                ? " #FFFF66"
                : "transparent",
            }}
            onClick={() => {
              setChapterIndex(0);
              highlightedChapter.delete("chapter1"); //Remove highlight after clicked
            }}
          >
            <a href="#chapter1">Chapter 1: Introduction</a>
          </li>
          {/* Chapter 2 */}
          <li
            style={{
              ...TOCStyle,
              backgroundColor: highlightedChapter.has("chapter2")
                ? " #FFFF66"
                : "transparent",
            }}
            onClick={() => {
              setChapterIndex(1);
              highlightedChapter.delete("chapter2");
            }}
          >
            <a href="#chapter2">Chapter 2: Logging In</a>
          </li>
          {/* Chapter 3 */}
          <li
            style={{
              ...TOCStyle,
              backgroundColor: highlightedChapter.has("chapter3")
                ? " #FFFF66"
                : "transparent",
            }}
            onClick={() => {
              setChapterIndex(2);
              highlightedChapter.delete("chapter3");
            }}
          >
            <a href="#chapter3">Chapter 3: Homepage Overview</a>
          </li>
          {/* Chapter 4 */}
          <li
            style={{
              ...TOCStyle,
              backgroundColor: highlightedChapter.has("chapter4")
                ? " #FFFF66"
                : "transparent",
            }}
            onClick={() => {
              setChapterIndex(3);
              highlightedChapter.delete("chapter4");
            }}
          >
            <a href="#chapter4">Chapter 4: Data Page</a>
          </li>
          {/* Chapter 5 */}
          <li
            style={{
              ...TOCStyle,
              backgroundColor: highlightedChapter.has("chapter5")
                ? " #FFFF66"
                : "transparent",
            }}
            onClick={() => {
              setChapterIndex(4);
              highlightedChapter.delete("chapter5");
            }}
          >
            <a href="#chapter5">Chapter 5: User Settings</a>
          </li>
          {/* Chapter 6 */}
          <li
            style={{
              ...TOCStyle,
              backgroundColor: highlightedChapter.has("chapter6")
                ? " #FFFF66"
                : "transparent",
            }}
            onClick={() => {
              setChapterIndex(5);
              highlightedChapter.delete("chapter6");
            }}
          >
            <a href="#chapter5">Chapter 6: Help</a>
          </li>
          {/* Chapter 7 */}
          <li
            style={{
              ...TOCStyle,
              backgroundColor: highlightedChapter.has("chapter7")
                ? " #FFFF66"
                : "transparent",
            }}
            onClick={() => {
              setChapterIndex(6);
              highlightedChapter.delete("chapter7");
            }}
          >
            <a href="#chapter5">Chapter 7: Logging Out and Editing Profile</a>
          </li>
          {/* Chapter 8 */}
          <li
            style={{
              ...TOCStyle,
              backgroundColor: highlightedChapter.has("chapter8")
                ? " #FFFF66"
                : "transparent",
            }}
            onClick={() => {
              setChapterIndex(7);
              highlightedChapter.delete("chapter8");
            }}
          >
            <a href="#chapter5">Chapter 8: FAQ</a>
          </li>
        </ul>
        <Chapters
          expandedChapters={expandedChapters}
          toggleChapter={toggleChapter}
          chapterIndex={chapterIndex}
        />
        <Pagination
          setChapterIndex={setChapterIndex}
          chaptersContent={chaptersContent}
          chapterIndex={chapterIndex}
        />
      </div>
    </div>
  );
}
export default Help;
