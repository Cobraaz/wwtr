import styles from "../table.module.css";
import TableRow from "./TableRow";

const TableBody = () => {
  return (
    <tbody className={styles.abTableData}>
      <TableRow />
      <TableRow />
      <TableRow />
    </tbody>
  );
};

export default TableBody;
