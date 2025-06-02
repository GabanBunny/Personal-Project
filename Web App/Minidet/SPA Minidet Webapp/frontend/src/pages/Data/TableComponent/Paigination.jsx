export const PaginationComponent = ({ TableInstance }) => {
  return (
    <div id="pagination">
      {/* Previous */}
      <div id="paginationPrevious">
        <button
          onClick={() => TableInstance.setPageIndex(0)}
          disabled={!TableInstance.getCanPreviousPage()}
        >
          {"<<"}
        </button>
        <button
          onClick={() => TableInstance.previousPage()}
          disabled={!TableInstance.getCanPreviousPage()}
        >
          {"<"}
        </button>
      </div>

      {/* Middle */}
      <div id="paginationMiddle">
        Page: {TableInstance.options.state.pagination.pageIndex + 1}{" "}
      </div>

      {/* Next */}
      <div id="paginationNext">
        <button
          onClick={() => TableInstance.nextPage()}
          disabled={!TableInstance.getCanNextPage()}
        >
          {">"}
        </button>

        <button
          onClick={() =>
            TableInstance.setPageIndex(TableInstance.getPageCount() - 1)
          }
          disabled={!TableInstance.getCanNextPage()}
        >
          {">>"}
        </button>
      </div>
    </div>
  );
};
