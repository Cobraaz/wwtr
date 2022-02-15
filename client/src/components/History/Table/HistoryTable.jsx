import { Table } from "reactstrap";
import TableHead from "./TableHead";
import styles from "./table.module.css";
import TableBody from "./TableBody/TableBody";

const HistoryTable = () => {
  return (
    <Table
      // hover
      responsive
      borderless
      className={` h6 small ${styles.abTable}`}
    >
      <TableHead />
      <TableBody />
    </Table>
  );
};

export default HistoryTable;
