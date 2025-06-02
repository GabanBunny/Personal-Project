export const NumberOfRows = ({ setPagination, isDataTable }) => {
  return (
    <div
      style={{
        borderRadius: "8px",
        width: "65px",
        display: "flex",
        justifyContent: "space-evenly",
        border: "1px solid",
      }}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={24}
        height={24}
        viewBox="0 0 24 24"
      >
        <path
          fill="none"
          stroke="#000"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M3 6.5a1 1 0 0 1 1-1h16a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1zm0 8a1 1 0 0 1 1-1h16a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1z"
        ></path>
      </svg>
      <select
        style={{
          backgroundColor: "transparent",
          border: "none",
          width: "40px",
          outline: "none" /* Remove focus outline */,
        }}
        id="NumberOfRows"
        onChange={(e) =>
          setPagination({
            pageIndex: 0,
            pageSize: e.target.value,
          })
        }
      >
        {isDataTable ? (
          <>
            {" "}
            {/* React Fragment */}
            <option>10</option>
            <option>20</option>
            <option>30</option>
            <option>40</option>
            <option>50</option>
          </>
        ) : (
          <>
            <option>20</option>
            <option>30</option>
            <option>40</option>
            <option>50</option>
          </>
        )}
      </select>
    </div>
  );
};
