import { useState } from "react";
import { Table } from "reactstrap";
import styles from "../detailed.numerical.module.css";
import { sortNumber } from "./detailed.numerical.helper";
const DetailedNumericalElement = ({
  parameters,
  totalScore,
  avgScore,
  comparisonScore,
  name,
  setParametersName,
}) => {
  const [updatedParameters, setUpdatedParameters] = useState(parameters);
  const [isascending, setIsascending] = useState({
    score: false,
    weight: false,
    weightedScore: false,
  });
  // useEffect(() => {
  //   setUpdatedParameters(para)
  // }, []);

  return (
    <div className="col">
      <div className={`${styles.abTableHead} mb-2`}>{name || null}</div>
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
              Weight{" "}
              <span className="cursor-pointer" onClick={() => {}}>
                <i
                  className={`${
                    isascending.weight ? "ri-sort-desc" : "ri-sort-asc"
                  }  align-middle`}
                  style={{ fontSize: "18px", fontWeight: "normal" }}
                  onClick={() => {
                    sortNumber(
                      updatedParameters.map((x) => x),
                      setUpdatedParameters,
                      isascending.weight,
                      setParametersName,
                      "weight"
                    );
                    setIsascending({
                      ...isascending,
                      weight: !isascending.weight,
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
          {updatedParameters.map(({ score, weight, weightedScore }, index) => (
            <tr
              key={index}
              style={{
                backgroundColor: "#fff",
              }}
            >
              <td>{score}</td>
              <td>{weight}</td>
              <td>{weightedScore}</td>
            </tr>
          ))}
          <tr>
            <td>{totalScore.score}</td>
            <td></td>
            <td>{totalScore.weightedScore}</td>
          </tr>
          <tr>
            <td>{avgScore.score}</td>
            <td></td>
            <td>{avgScore.weightedScore}</td>
          </tr>
          <tr>
            <td>{comparisonScore.score}</td>
            <td></td>
            <td>{comparisonScore.weightedScore}</td>
          </tr>
        </tbody>
      </Table>
    </div>
  );
};

export default DetailedNumericalElement;
