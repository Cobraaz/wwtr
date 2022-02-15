import ModalParamsWeightage from "components/Shared/ModalParamsWeightage";
import WeightagesNavbar from "components/Shared/ProgressBar";
import { useEffect, useState } from "react";
import { Button } from "reactstrap";
import { addWeightages } from "store/slices/paramWeightagesSlice";
import WeightageElement from "./WeightageElement/WeightageElement";
import { scroller } from "react-scroll";
import { setNotify } from "store/slices/notifySlice";
import ModalWeightages from "./ModalWeightages/ModalWeightages";
import { categoryArrayElement } from "utils/helper.function";
import "./Weightages.component.css";

const Weightages = ({ paramsWeightages, dispatch, history }) => {
  const initialStateAvailablities = [
    Infinity, //NA
    Infinity, //NA
    Infinity, //NA
    Infinity, //NA
    6, //5
    5, //6
    4, //7
    3, //8
    2, //9
    1, //10
  ];

  const [showModal, setShowModal] = useState("");
  const [orginalParameters, setOrginalParameters] = useState([]);
  const [updateParameters, setUpdateParameters] = useState([]);
  const [showSelectModal, setShowSelectModal] = useState([]);
  const [horizontalLine, setHorizontalLine] = useState("");
  const [textArea, setTextArea] = useState();
  const [availablities, setAvailablities] = useState();
  const [showSelectOptionModal, setShowSelectOptionModal] = useState(false);
  const toggleSelectOptionModal = () =>
    setShowSelectOptionModal(!showSelectOptionModal);

  const [optionName, setOptionName] = useState([]);

  useEffect(() => {
    if (paramsWeightages.parameters.length) {
      function compare(a, b) {
        if (a.index < b.index) {
          return -1;
        }
        if (a.index > b.index) {
          return 1;
        }
        return 0;
      }
      setOrginalParameters(paramsWeightages.parameters.slice().sort(compare));
      if (paramsWeightages.optionName.length) {
        setOptionName(paramsWeightages.optionName);
      }
    } else {
      setShowModal(
        "You have to select the parameters first to select weightage."
      );
    }
  }, [paramsWeightages]);

  useEffect(() => {
    if (orginalParameters.length) {
      const lastElement = orginalParameters[orginalParameters.length - 1];
      setHorizontalLine(lastElement.type);
      setUpdateParameters(
        orginalParameters.map((para) => ({ ...para, error: false }))
      );
      setShowSelectModal(
        orginalParameters.map((para) => ({
          id: para._id,
          selectModal: false,
        }))
      );

      setTextArea(
        orginalParameters
          .map((para) => ({ _id: para._id, comment: para.comment }))
          .reduce(function (o, val) {
            o[val._id] = val.comment;
            return o;
          }, {})
      );
      const oldAvailabilities = orginalParameters.map((para) => para.weightage);
      const updatingAvailabilites = initialStateAvailablities.slice();
      oldAvailabilities.forEach(
        (o1) =>
          (updatingAvailabilites[o1 - 1] = updatingAvailabilites[o1 - 1] - 1)
      );
      setAvailablities(updatingAvailabilites);
    }
    // eslint-disable-next-line
  }, [orginalParameters]);

  // useEffect(() => {
  //   if (!paramsWeightages.parameters.length > 0) {
  //     dispatch(getParameters());
  //   }
  // }, [
  //   dispatch,
  //   paramsWeightages.parameters,
  //   paramsWeightages.parameters.length,
  // ]);

  const handleSelect = (key, parameterId) => {
    if (availablities[key - 1] > 0) {
      const selectParameterIndex = orginalParameters.findIndex(
        (para) => para._id === parameterId
      );
      const oldWeigtage = updateParameters[selectParameterIndex].weightage;
      if (oldWeigtage > 0) {
        const updateAvailability = availablities;
        updateAvailability[oldWeigtage - 1] += 1;
        setAvailablities(updateAvailability);
      }

      const newArray = [...updateParameters];

      newArray[selectParameterIndex] = {
        ...newArray[selectParameterIndex],
        weightage: key,
      };
      setUpdateParameters(newArray);
      const updateWeightage = newArray[selectParameterIndex].weightage;
      const updateAvailability = availablities;
      updateAvailability[updateWeightage - 1] -= 1;
      setAvailablities(updateAvailability);
    }
  };

  const handleChangeTextArea = (e) => {
    const { name, value } = e.target;
    setTextArea({ ...textArea, [name]: value });
  };

  const handleSubmit = () => {
    const unWeightage = updateParameters.map((para) => {
      if (para.weightage === 0) {
        return { ...para, error: true };
      } else {
        return { ...para, error: false };
      }
    });
    setUpdateParameters(unWeightage);
    const checkError = unWeightage.filter((para) => para.weightage === 0);
    if (checkError.length) {
      dispatch(
        setNotify({
          error: "Please enter the weightages for all the parameters.",
        })
      );

      return scroller.scrollTo(checkError[0]._id, {
        duration: 700,
        delay: 100,
        smooth: true,

        offset: -300,
      });
    } else if (!checkError.length) {
      let weightages = updateParameters.map((para) => ({
        ...para,
        comment: textArea[para._id],
      }));
      weightages = weightages.map((para) => {
        delete para.error;
        return para;
      });

      dispatch(
        addWeightages({ parameters: weightages, setShowSelectOptionModal })
      );
    }
  };
  const closeSelectModal = () => {
    if (showSelectModal.find((o) => o.selectModal === true)) {
      const closeSelectModal = showSelectModal.map((para) => ({
        ...para,
        selectModal: false,
      }));
      setShowSelectModal(closeSelectModal);
    }
  };

  if (showModal)
    return <ModalParamsWeightage text={showModal} path="/parameters" />;
  return (
    <div className="admin-wrap AB-weightages mt-5" onClick={closeSelectModal}>
      {showSelectOptionModal && (
        <ModalWeightages
          showSelectOptionModal={showSelectOptionModal}
          toggleSelectOptionModal={toggleSelectOptionModal}
          history={history}
          optionName={optionName}
          parameters={paramsWeightages.parameters}
        />
      )}
      <div className="col-12">
        <h2 className="mb-5 font-weight-bold">
          Please select the weightage for selected parameters
        </h2>
        <div
          className="col-10"
          style={{ display: "block", margin: "auto", backgroundColor: "white" }}
        >
          <WeightagesNavbar />
          <div className="mt-5">
            {categoryArrayElement.map(
              ({ categoryName }, i) =>
                orginalParameters.find((o) => o.category === categoryName) && (
                  <WeightageElement
                    key={i}
                    updateParameters={updateParameters}
                    categoryName={categoryName}
                    horizontalLine={horizontalLine}
                    availablities={availablities}
                    handleSelect={handleSelect}
                    showSelectModal={showSelectModal}
                    setShowSelectModal={setShowSelectModal}
                    textArea={textArea}
                    handleChange={handleChangeTextArea}
                  />
                )
            )}
          </div>
          <div className="row mb-5">
            <div className="col-12">
              <Button
                onClick={handleSubmit}
                className="float-right mr-5 AB-submit"
              >
                Submit
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Weightages;
