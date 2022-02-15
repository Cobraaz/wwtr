import styles from "../table.module.css";

const TableRow = () => {
  return (
    <tr>
      <th scope="row" className="text-center">
        1
      </th>
      <td
        style={{
          color: "#03a9f4",
          textDecoration: "underline",
          cursor: "pointer",
        }}
      >
        Evaluation_21/02/2021
      </td>
      <td className="text-center font-weight-light">
        <i class="ri-delete-bin-4-line cursor-pointer"></i>
      </td>
    </tr>
  );
};

export default TableRow;
