const HistoryHeader = () => {
  return (
    <div
      style={{
        fontSize: "36px",
        fontWeight: "500",
        color: "#898989",
      }}
    >
      <span
        style={{
          color: "#03a9f4",
        }}
      >
        <span style={{ textDecoration: "underline" }}>Parameters</span>
        &nbsp;{">"}&nbsp;
      </span>
      <span>History</span>
    </div>
  );
};

export default HistoryHeader;
