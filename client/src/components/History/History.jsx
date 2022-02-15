import styles from "./history.module.css";
import HistoryHeader from "./HistoryHeader";
import HistoryTable from "./Table/HistoryTable";

const History = () => {
  return (
    <div className={`admin-wrap ${styles.abHistory} mt-5`}>
      <div
        className="col-11"
        style={{ display: "block", margin: "auto", backgroundColor: "white" }}
      >
        <HistoryHeader />
        <div className="mt-5">
          <HistoryTable />
        </div>
      </div>
    </div>
  );
};

export default History;
