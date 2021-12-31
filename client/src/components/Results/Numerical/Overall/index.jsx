import { useState } from "react";
import { Table } from "reactstrap";
import styles from "../Detailed/detailed.numerical.module.css";
import OverallNumericalElement from "./OverallNumericalElement";

const OverallNumerical = ({
  overviewNumerical,
  optionValue,
  optionName,
  name,
}) => {
  const emptyRow = [1, 2, 3, 4];
  const [parametersName, setParametersName] = useState(name);

  return (
    <>
      <div className="row mb-4 mt-5">
        <div className="col-sm-2">
          {/* Just to set the alignment  */}
          <div
            className={`${styles.abTableHead} mb-2`}
            style={{ color: "#fff" }}
          >
            .
          </div>
          <Table className={`text-right h6 small`} borderless>
            <thead className={styles.abHead}>
              <tr>
                <th>Parameters Evalution</th>
              </tr>
            </thead>
            <tbody className={styles.abTableData}>
              {parametersName.map((name, index) => (
                <tr key={index}>
                  <td>{name}</td>
                </tr>
              ))}
              <tr>
                <td>Overall Option Score</td>
              </tr>
            </tbody>
          </Table>
        </div>
        {overviewNumerical.map(
          ({ result }, index) =>
            optionValue.includes(index) && (
              <OverallNumericalElement
                key={index}
                optionName={optionName}
                index={index}
                lastValue={result[result.length - 1]}
                result={result.slice(0, -1)}
                setParametersName={setParametersName}
              />
            )
        )}
        {emptyRow.map((_, i) => {
          if (i < 4 - optionValue.length) {
            return <div key={i} className="col"></div>;
          }
          return null;
        })}
      </div>
    </>
  );
};

export default OverallNumerical;
