import { sortNumber } from "../../Detailed/DetailedNumericalElement/detailed.numerical.helper";
import React, { useState } from "react";
import { Table } from "reactstrap";
import styles from "../../Detailed/detailed.numerical.module.css";
const OverallNumericalElement = ({
  optionName,
  index,
  result,
  lastValue,
  setParametersName,
}) => {
  const [updatedParameters, setUpdatedParameters] = useState(result);
  const [isascending, setIsascending] = useState({
    score: false,
    weightedScore: false,
  });

  return (
    <div className="col">
      <div className={`${styles.abTableHead} mb-2`}>{optionName[index]}</div>
      <Table borderless className={`text-center h6 small ${styles.abTable}`}>
        <thead className={styles.abTableHead}>
          <tr>
            <th>
              Score{" "}
              <span className="cursor-pointer" onClick={() => {}}>
                <i
                  className={`${
                    isascending.score ? "ri-sort-desc" : "ri-sort-asc"
                  }  align-middle`}
                  style={{ fontSize: "18px", fontWeight: "normal" }}
                  onClick={() => {
                    sortNumber(
                      updatedParameters.map((x) => x),
                      setUpdatedParameters,
                      isascending.score,
                      setParametersName,
                      "score"
                    );
                    setIsascending({
                      ...isascending,
                      score: !isascending.score,
                    });
                  }}
                ></i>
              </span>
            </th>
            <th>
              Weighted Score{" "}
              <span className="cursor-pointer" onClick={() => {}}>
                <i
                  className={`${
                    isascending.weightedScore ? "ri-sort-desc" : "ri-sort-asc"
                  }  align-middle`}
                  style={{ fontSize: "18px", fontWeight: "normal" }}
                  onClick={() => {
                    sortNumber(
                      updatedParameters.map((x) => x),
                      setUpdatedParameters,
                      isascending.weightedScore,
                      setParametersName,
                      "weightedScore"
                    );
                    setIsascending({
                      ...isascending,
                      weightedScore: !isascending.weightedScore,
                    });
                  }}
                ></i>
              </span>
            </th>
          </tr>
        </thead>
        <tbody className={styles.abTableData}>
          {updatedParameters.map(({ score, weightedScore }, index) => (
            <tr
              key={index}
              style={{
                backgroundColor: "#fff",
              }}
            >
              <td>{score}</td>
              <td>{weightedScore}</td>
            </tr>
          ))}
          {
            <tr>
              <td>{lastValue.score}</td>
              <td>{lastValue.weightedScore}</td>
            </tr>
          }
        </tbody>
      </Table>
    </div>
  );
};

export default OverallNumericalElement;
