import { Element } from "react-scroll";
import TickSvg from "./TickSvg";

const ParametersElement = ({
  parameters,
  toggleWarning,
  handleClick,
  selectParameters,
  parameterName,
  horizontalLineShow,
}) => {
  return (
    <>
      <Element
        name={parameterName}
        style={{ display: "flex", flexDirection: "column" }}
      >
        {parameters.map((parameter, i) => (
          <div key={i} className="AB-container col-12">
            <div style={{ display: "flex", flexDirection: "row" }}>
              <div
                id={`warning-${parameter.type
                  .toLowerCase()
                  .replace(/\s+/g, "-")}`}
                className="AB-warning-div"
                style={{ display: "none" }}
              >
                {parameter.warning}
              </div>
              <i
                style={{
                  verticalAlign: "middle",
                  display: "table-cell",
                  paddingTop: "18px",
                  marginRight: "10px",
                  fontSize: "26px",
                  color: "#d8dadf",
                }}
                onClick={() =>
                  toggleWarning(
                    `warning-${parameter.type
                      .toLowerCase()
                      .replace(/\s+/g, "-")}`
                  )
                }
                className="ri-error-warning-line cursor-pointer"
              ></i>
              <div
                onClick={() => handleClick(parameter)}
                className={`AB-button ${
                  selectParameters.find(
                    ({ index }) => index === parameter.index
                  )
                    ? "AB-button-selected"
                    : ""
                }`}
              >
                <span className="float-left">{parameter.type}</span>
                {selectParameters.find(
                  ({ index }) => index === parameter.index
                ) && (
                  <span>
                    <TickSvg />
                  </span>
                )}
              </div>
            </div>
          </div>
        ))}
      </Element>
      {horizontalLineShow && <hr />}
    </>
  );
};

export default ParametersElement;
