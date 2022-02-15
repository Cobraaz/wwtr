import styles from "./table.module.css";
const TableHead = () => {
  return (
    <thead className={`${styles.abTableHead}`}>
      <tr>
        <th style={{ width: "10%", textAlign: "center" }}>
          S.No.&nbsp;
          <i className="ri-sort-desc" style={{ verticalAlign: "middle" }}></i>
        </th>
        <th style={{ width: "100%" }}>
          Name&nbsp;
          <i className="ri-sort-desc" style={{ verticalAlign: "middle" }}></i>
        </th>
        <th style={{ textAlign: "center" }}>Action</th>
        <th></th>
      </tr>
    </thead>
  );
};

export default TableHead;
