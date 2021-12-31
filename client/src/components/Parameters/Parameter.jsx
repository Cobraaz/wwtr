import { useEffect, useState } from "react";
import { Element } from "react-scroll";
import { Button } from "reactstrap";
import { allParameters, parametersArrayElement } from "./Parameters.helper";
import ParametersElement from "./ParametersElement";
const Parameter = ({
  submitParameters,
  selectParameters,
  setSelectParameters,
}) => {
  const [parametersArray, setParametersArray] = useState([]);
  const toggleWarning = (warningdiv) => {
    if (document.getElementById(warningdiv).style.display === "none") {
      return (document.getElementById(warningdiv).style.display = "block");
    } else {
      return (document.getElementById(warningdiv).style.display = "none");
    }
  };

  const handleClick = (parameter) => {
    function arrayRemove(arr, value) {
      return arr.filter(function (ele) {
        return ele.index !== value.index;
      });
    }
    if (selectParameters.find((e) => e.index === parameter.index)) {
      return setSelectParameters(arrayRemove(selectParameters, parameter));
    }

    setSelectParameters(selectParameters.concat(parameter));
  };

  useEffect(() => {
    let active = true;
    load();
    return () => {
      active = false;
    };

    async function load() {
      const res = await allParameters();
      if (!active) {
        return;
      }
      setParametersArray(res);
    }
  }, []);

  if (!parametersArray.length) return null;
  return (
    <>
      {parametersArrayElement.map(
        (
          { parameterName, parameterStart, parameterEnd },
          i,
          parametersArrayElement
        ) => (
          <ParametersElement
            key={i}
            parameterName={parameterName}
            parameters={parametersArray.slice(parameterStart, parameterEnd)}
            toggleWarning={toggleWarning}
            handleClick={handleClick}
            selectParameters={selectParameters}
            horizontalLineShow={
              parametersArrayElement.length - 1 === i ? false : true
            }
          />
        )
      )}
      <Element style={{ display: "flex", flexDirection: "column" }}>
        <div
          className="AB-container col-10 pb-5"
          style={{ display: "flex", flexDirection: "row-reverse" }}
        >
          <Button
            onClick={submitParameters}
            color="info"
            className="float-right AB-submit-button"
          >
            Submit
          </Button>
        </div>
      </Element>
    </>
  );
};

export default Parameter;
