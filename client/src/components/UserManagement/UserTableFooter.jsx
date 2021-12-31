const UserTableFooter = ({
  pageSize,
  setPageSize,
  pageSized,
  pageIndex,
  pageOptions,
  previousPage,
  canPreviousPage,
  nextPage,
  canNextPage,
}) => {
  return (
    <div className="row-per-page" style={{ float: "right" }}>
      <span
        style={{
          color: "black",
          fontWeight: "bold",
        }}
      >
        Rows per Page
      </span>
      <select
        type="select"
        style={{ border: "none", fontWeight: "bold" }}
        value={pageSize}
        onChange={(e) => {
          setPageSize(Number(e.target.value));
        }}
      >
        {pageSized().map((pageSize) => (
          <option key={pageSize} style={{ border: "none" }} value={pageSize}>
            {pageSize}
          </option>
        ))}
      </select>
      <strong>
        {pageIndex + 1} of {pageOptions.length}
      </strong>
      <button
        className="btn"
        onClick={() => previousPage()}
        disabled={!canPreviousPage}
      >
        <i
          style={{ fontSize: "30px", height: "20px" }}
          className="ri-arrow-left-s-line"
        ></i>
      </button>
      <button
        className="btn"
        onClick={() => nextPage()}
        disabled={!canNextPage}
      >
        <i style={{ fontSize: "30px" }} className="ri-arrow-right-s-line"></i>
      </button>
    </div>
  );
};

export default UserTableFooter;
