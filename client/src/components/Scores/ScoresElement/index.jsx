import { Element } from "react-scroll";
import "./ScoresElement.component.css";
import ScoresModal from "./ScoresModal";

const ScoresElement = ({
  weightageName,
  updateParameters,
  horizontalLine,
  fetchoptionName,
  textArea,
  handleChange,
  showSelectModal,
  setShowSelectModal,
  handleClick,
}) => {
  let horizontalLineShow = true;

  const toggleWarning = (warningdiv) => {
    if (document.getElementById(warningdiv).style.display === "none") {
      return (document.getElementById(warningdiv).style.display = "block");
    } else {
      return (document.getElementById(warningdiv).style.display = "none");
    }
  };

  const toggleSelect = (parameterId, optionNameId) => {
    const parameterIndexObject = showSelectModal.findIndex(
      (para) => para.id === parameterId
    );
    const selectModalelementsIndex = showSelectModal
      .find((para) => para.id === parameterId)
      .modal.findIndex((optionName) => optionName.id === optionNameId);

    const newArray = showSelectModal;
    const selectModalValue =
      newArray[parameterIndexObject].modal[selectModalelementsIndex]
        .selectModal;

    const makeEveryElseModalFalse = newArray.map((para) => ({
      id: para.id,
      modal: para.modal.map((modale) => ({ ...modale, selectModal: false })),
    }));
    makeEveryElseModalFalse[parameterIndexObject].modal[
      selectModalelementsIndex
    ].selectModal = !selectModalValue;

    setShowSelectModal(makeEveryElseModalFalse);
  };

  const showModalfun = (parameterId, optionNameId) => {
    let showModal = showSelectModal.filter((para) => para.id === parameterId);
    showModal = showModal[0].modal.filter(
      (optionName) => optionName.id === optionNameId
    );

    return showModal[0].selectModal;
  };

  return (
    <>
      <Element name={weightageName}>
        <div className="AB-weightage-parent-element">
          <div className="AB-parameters-parent">
            <label
              style={{ backgroundColor: "white", border: "none" }}
              className="AB-Parameters-Scores"
            >
              Parameters
            </label>
          </div>
          <div className="AB-Scores-Element">
            <label>Weightage</label>
          </div>
          {fetchoptionName.map((name) => (
            <div key={name} className="AB-Scores-Element">
              <label>{name}</label>
            </div>
          ))}
          <div className="AB-Comments">
            <label>Comments</label>
          </div>
        </div>
        {updateParameters.map((parameter, i) => {
          if (
            parameter.category.toLowerCase() === weightageName.toLowerCase() &&
            parameter.type === horizontalLine
          ) {
            horizontalLineShow = false;
          }

          return (
            parameter.category.toLowerCase() ===
              weightageName.toLowerCase() && (
              <div key={parameter._id} className="AB-weightage-parent">
                <div className="AB-parameters-parent">
                  <i
                    onClick={() => toggleWarning(`warning-${parameter._id}`)}
                    className="ri-error-warning-line ri-error-warning-line-weightage"
                  ></i>
                  <span
                    // style={{
                    //   backgroundColor: `${
                    //     showModalfun(parameter._id) ? "#03a9f4" : "#f9faff"
                    //   }`,
                    //   color: `${
                    //     showModalfun(parameter._id) ? "white" : "#2e384d"
                    //   }`,
                    // }}
                    className="AB-Parameters-Scores"
                  >
                    {parameter.type}
                  </span>
                  <div
                    id={`warning-${parameter._id}`}
                    className="AB-Score-warning-div"
                    style={{ display: "none" }}
                  >
                    {parameter.warning}
                  </div>
                </div>
                <div className="AB-Weightage-Scores">{parameter.weightage}</div>
                {parameter.optionName.map(
                  ({ score, _id: optionNameId, error }) => (
                    <Element
                      key={optionNameId}
                      name={optionNameId}
                      style={{
                        borderColor: `${error ? "red" : "#e0e7ff"}`,
                      }}
                      onClick={() => toggleSelect(parameter._id, optionNameId)}
                      className="AB-Scores-Element"
                    >
                      <div>
                        {score || "Select"}
                        <i className="ri-arrow-down-s-line float-right"></i>
                      </div>
                      {showModalfun(parameter._id, optionNameId) && (
                        <ScoresModal
                          parameterId={parameter._id}
                          optionNameId={optionNameId}
                          score={parameter.score}
                          handleClick={handleClick}
                          toggleSelect={toggleSelect}
                        />
                      )}
                    </Element>
                  )
                )}
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

export default ScoresElement;
