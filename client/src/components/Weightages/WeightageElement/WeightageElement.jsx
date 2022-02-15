import { Element } from "react-scroll";
import "./WeightageElement.css";
import SelectModal from "./SelectModal";

const WeightageElement = ({
  updateParameters,
  categoryName,
  horizontalLine,
  availablities,
  handleSelect,
  showSelectModal,
  setShowSelectModal,
  textArea,
  handleChange,
}) => {
  let horizontalLineShow = true;
  const toggleWarning = (warningdiv) => {
    if (document.getElementById(warningdiv).style.display === "none") {
      return (document.getElementById(warningdiv).style.display = "block");
    } else {
      return (document.getElementById(warningdiv).style.display = "none");
    }
  };

  const toggleSelect = (parameterId) => {
    const elementsIndex = showSelectModal.findIndex(
      (para) => para.id === parameterId
    );
    let newArray = [...showSelectModal];
    newArray = newArray.map((para) =>
      para.id !== parameterId ? { id: para.id, selectModal: false } : para
    );

    newArray[elementsIndex] = {
      ...newArray[elementsIndex],
      selectModal: !newArray[elementsIndex].selectModal,
    };

    setShowSelectModal(newArray);
  };

  const showModalfun = (parameterId) => {
    const showModal = showSelectModal.filter((para) => para.id === parameterId);

    return showModal[0].selectModal;
  };

  return (
    <>
      <Element name={categoryName}>
        <div className="row">
          <div className="col-6">
            <label className="pl-4 ml-4">Parameters</label>
          </div>
          <div className="col-2">
            <label>Weightage</label>
          </div>
          <div className="col-4">
            <label>Comments</label>
          </div>
        </div>
        {updateParameters.map((parameter, i) => {
          if (
            parameter.category.toLowerCase() === categoryName.toLowerCase() &&
            parameter.type === horizontalLine
          ) {
            horizontalLineShow = false;
          }

          return (
            parameter.category.toLowerCase() === categoryName.toLowerCase() && (
              <div key={i} className="AB-weightage-parent">
                <div className="AB-parameters-parent">
                  <i
                    onClick={() => toggleWarning(`warning-${parameter._id}`)}
                    className="ri-error-warning-line ri-error-warning-line-weightage"
                  ></i>
                  <span
                    style={{
                      backgroundColor: `${
                        showModalfun(parameter._id) ? "#03a9f4" : "#f9faff"
                      }`,
                      color: `${
                        showModalfun(parameter._id) ? "white" : "#2e384d"
                      }`,
                    }}
                    className="AB-Parameters"
                  >
                    {parameter.type}
                  </span>
                  <div
                    id={`warning-${parameter._id}`}
                    className="AB-Weightage-warning-div"
                    style={{ display: "none" }}
                  >
                    {parameter.warning}
                  </div>
                </div>
                <Element
                  name={parameter._id.toString()}
                  style={{
                    borderColor: `${parameter.error ? "red" : "#e0e7ff"}`,
                  }}
                  className="AB-Weightage"
                  onClick={() => toggleSelect(parameter._id)}
                >
                  <div>
                    {parameter.weightage ? parameter.weightage : "Select"}
                    <i className="ri-arrow-down-s-line float-right"></i>
                  </div>

                  {showModalfun(parameter._id) && (
                    <SelectModal
                      toggle={() => toggleSelect(parameter._id)}
                      availablities={availablities}
                      handleSelect={handleSelect}
                      parameter={parameter}
                    />
                  )}
                </Element>

                <textarea
                  rows="3"
                  name={parameter._id}
                  value={textArea[parameter._id]}
                  onChange={handleChange}
                  className="AB-Comments"
                  placeholder="(Optional)"
                ></textarea>
              </div>
            )
          );
        })}
      </Element>
      {horizontalLineShow && <hr className="pb-5" />}
    </>
  );
};

export default WeightageElement;
