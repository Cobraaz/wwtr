import { useEffect, useState } from "react";
import { Element } from "react-scroll";
import { Button } from "reactstrap";
import { allParameters } from "./Parameters.helper";
import { categoryArrayElement } from "utils/helper.function";
import ParametersElement from "./ParametersElement";
import ResetModal from "./ResetModal/ResetModal";
import { useHistory } from "react-router-dom";
const ShowParameter = ({
  submitParameters,
  selectParameters,
  setSelectParameters,
}) => {
  const [parametersArray, setParametersArray] = useState([]);
  const [showResetModal, setShowResetModal] = useState(false);
  const history = useHistory();
  const toggleResetModal = () => setShowResetModal(!showResetModal);

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
      <ResetModal
        history={history}
        showResetModal={showResetModal}
        toggleResetModal={toggleResetModal}
      />
      {categoryArrayElement.map(({ categoryName }, i) => (
        <ParametersElement
          key={i}
          categoryName={categoryName}
          parameters={parametersArray}
          toggleWarning={toggleWarning}
          handleClick={handleClick}
          selectParameters={selectParameters}
        />
      ))}
      <Element style={{ display: "flex", flexDirection: "column" }}>
        <div
          className="AB-container col-10 pb-5"
          style={{ display: "flex", flexDirection: "row-reverse" }}
        >
          <Button
            onClick={submitParameters}
            color="info"
            className="float-right AB-submit-button ml-5"
          >
            Submit
          </Button>
          <Button
            onClick={toggleResetModal}
            color="warning"
            style={{ fontWeight: "bold" }}
            className="float-right"
          >
            Reset
          </Button>
        </div>
      </Element>
    </>
  );
};

export default ShowParameter;
