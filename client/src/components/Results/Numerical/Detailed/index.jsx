import { useState } from "react";
import { Element } from "react-scroll";
import { Table } from "reactstrap";
import styles from "./detailed.numerical.module.css";
import DetailedNumericalElement from "./DetailedNumericalElement";

const DetailedNumerical = ({
  result: { parametersType, name, detailedData },
  optionValue,
}) => {
  const emptyRow = [1, 2, 3, 4];
  const [parametersName, setParametersName] = useState(parametersType);

  return (
    <>
      <Element name={name} className="row mb-4 mt-5">
        <div className="col">
          {/* Just to set the alignment  */}
          <div
            className={`${styles.abTableHead} mb-2`}
            style={{ color: "#fff" }}
          >
            .
          </div>
          <div className={`${styles.abTableHead}`} style={{ color: "#fff" }}>
            .
          </div>
          {/* Just to set the alignment end's here */}
          <Table className={`text-right h6 small`} borderless>
            <thead className={styles.abHead}>
              <tr>
                <th>{name}</th>
              </tr>
            </thead>
            <tbody className={styles.abTableData}>
              {parametersName.map((para, index) => (
                <tr key={index}>
                  <td>{para}</td>
                </tr>
              ))}
              <tr>
                <td>{name} Score</td>
              </tr>
              <tr>
                <td>{name} Weighted Avg. Score</td>
              </tr>
              <tr>
                <td>{name} Comparison Score</td>
              </tr>
            </tbody>
          </Table>
        </div>
        {optionValue.length &&
          detailedData.optionName.map(
            (
              { parameters, totalScore, avgScore, comparisonScore, name },
              index
            ) =>
              optionValue.includes(index) && (
                <DetailedNumericalElement
                  parameters={parameters}
                  totalScore={totalScore}
                  avgScore={avgScore}
                  comparisonScore={comparisonScore}
                  name={name}
                  key={index}
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
      </Element>
    </>
  );
};

export default DetailedNumerical;
