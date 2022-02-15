import { Element } from "react-scroll";
import TickSvg from "./TickSvg/TickSvg";

const ParametersElement = ({
  parameters,
  toggleWarning,
  handleClick,
  selectParameters,
  categoryName,
}) => {
  let horizontalLineShow = true;
  return (
    <>
      <Element
        name={categoryName}
        style={{ display: "flex", flexDirection: "column" }}
      >
        {parameters.map((parameter, i) => {
          if (
            parameter.category.toLowerCase() === categoryName.toLowerCase() &&
            parameter.category === "community"
          ) {
            horizontalLineShow = false;
          }

          return (
            parameter.category.toLowerCase() === categoryName.toLowerCase() && (
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
            )
          );
        })}
      </Element>
      {horizontalLineShow && <hr />}
    </>
  );
};

export default ParametersElement;
