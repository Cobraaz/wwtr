import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Button } from "reactstrap";

import ModalParamsWeightage from "components/Shared/ModalParamsWeightage";
import WeightagesNavbar from "components/Shared/ProgressBar";
import ScoresElement from "./ScoresElement";

import { addScores, getParameters } from "store/slices/paramWeightagesSlice";
import { weightageArrayElement } from "components/Weightages/weightages.helper";
import "./scores.component.css";
import { setNotify } from "store/slices/notifySlice";
import { scroller } from "react-scroll";
import { useHistory } from "react-router";

const Scores = () => {
  const paramsWeightages = useSelector((state) => state.paramsWeightages);
  const [showModal, setShowModal] = useState({
    text: "",
    path: "/parameters",
  });
  const [orginalParameters, setOrginalParameters] = useState([]);
  const [fetchoptionName, setFetchOptionName] = useState([]);
  const [updateParameters, setUpdateParameters] = useState([]);
  const [showSelectModal, setShowSelectModal] = useState([]);
  const [horizontalLine, setHorizontalLine] = useState("");
  const [textArea, setTextArea] = useState({});
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    if (orginalParameters.length && fetchoptionName.length) {
      const lastElement = orginalParameters[orginalParameters.length - 1];
      const updatingParameters = orginalParameters.map((para) => ({
        ...para,
        optionName: para.optionName.map((op) => ({ ...op, error: false })),
      }));

      setUpdateParameters(updatingParameters);
      const modal = orginalParameters.map((para) => ({
        id: para._id,
        modal: para.optionName.map(({ _id }) => ({
          id: _id,
          selectModal: false,
        })),
      }));

      setShowSelectModal(modal);
      setHorizontalLine(lastElement.type);

      setTextArea(
        orginalParameters
          .map((para) => ({ _id: para._id, comment: para.comment }))
          .reduce(function (o, val) {
            o[val._id] = val.comment;
            return o;
          }, {})
      );
    }
    // eslint-disable-next-line
  }, [orginalParameters]);

  useEffect(() => {
    if (paramsWeightages.parameters.length) {
      const checkForShowModal = paramsWeightages.parameters.map(
        (para) => para.weightage
      );
      const checkForShowModal2 = paramsWeightages.parameters.map(
        (para) => para.optionName.length
      );

      const check = checkForShowModal.every((e) => e > 0);
      const check2 = checkForShowModal2.every((e) => e > 0);

      if (!check || !paramsWeightages.optionName.length || !check2) {
        return setShowModal({
          text: "You have to select the parameters and weightage first to select score.",
          path: "/weightages",
        });
      }

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
      setFetchOptionName(paramsWeightages.optionName);
    } else if (paramsWeightages.noParams) {
      setShowModal({
        ...showModal,
        text: "You have to select the parameters and weightage first to select score.",
      });
    }
    // eslint-disable-next-line
  }, [paramsWeightages]);

  useEffect(() => {
    if (!paramsWeightages.parameters.length > 0) {
      dispatch(getParameters());
    }
  }, [
    dispatch,
    paramsWeightages.parameters,
    paramsWeightages.parameters.length,
  ]);

  const handleChangeTextArea = (e) => {
    const { name, value } = e.target;
    setTextArea({ ...textArea, [name]: value });
  };

  const handleClick = (parameterId, optionNameId, score) => {
    const newParameters = updateParameters.map((para) => {
      if (para._id === parameterId) {
        const result = para.optionName.map((optionname) => {
          if (optionname._id === optionNameId) {
            return { ...optionname, score };
          } else {
            return optionname;
          }
        });
        return { ...para, optionName: result };
      } else {
        return para;
      }
    });
    setUpdateParameters(newParameters);
  };
  // const handleCloseAllModal = () => {
  //   const modal = orginalParameters.map((para) => ({
  //     id: para._id,
  //     modal: para.optionName.map(({ _id }) => ({
  //       id: _id,
  //       selectModal: false,
  //     })),
  //   }));
  //   setShowSelectModal(modal);
  // };

  const handleSubmit = () => {
    const unScore = updateParameters.map((para) => ({
      ...para,
      optionName: para.optionName.map((opName) =>
        !opName.score ? { ...opName, error: true } : { ...opName, error: false }
      ),
    }));
    setUpdateParameters(unScore);
    // const checkError = unScore.filter((para) => {
    //   const xyz = para.optionName.filter((opName) => opName.score === 0);
    //   if (xyz.score === 0) return xyz;
    //   console.log(xyz);
    // });
    let checkError = unScore.map((para) => para.optionName);
    checkError = [].concat.apply([], checkError);
    checkError = checkError.filter((opName) => opName.score === 0);

    if (checkError.length) {
      dispatch(
        setNotify({
          error: "Please enter all the scores for all the parameters.",
        })
      );
      return scroller.scrollTo(checkError[0]._id, {
        duration: 700,
        delay: 100,
        smooth: true,
        offset: -100,
      });
    } else if (!checkError.length) {
      const scores = updateParameters.map((para) => ({
        ...para,
        comment: textArea[para._id],
        optionName: para.optionName.map(({ name, score, _id }) => ({
          name,
          score,
          _id,
        })),
      }));
      dispatch(
        addScores({
          scores,
          history,
        })
      );
    }
  };

  if (showModal.text) {
    return <ModalParamsWeightage text={showModal.text} path={showModal.path} />;
  }
  return (
    <div
      // onClick={handleCloseAllModal}
      className="admin-wrap AB-weightages mt-5"
    >
      <div className="col-12">
        <h2 className="mb-5 font-weight-bold">
          Please score each option relative to the option
        </h2>
        <div
          className="col-10"
          style={{ display: "block", margin: "auto", backgroundColor: "white" }}
        >
          <WeightagesNavbar />

          <div className="mt-5">
            {weightageArrayElement.map(
              ({ weightageName }, i) =>
                orginalParameters.find((o) => o.category === weightageName) && (
                  <ScoresElement
                    key={i}
                    weightageName={weightageName}
                    updateParameters={updateParameters}
                    horizontalLine={horizontalLine}
                    fetchoptionName={fetchoptionName}
                    textArea={textArea}
                    showSelectModal={showSelectModal}
                    handleChange={handleChangeTextArea}
                    setShowSelectModal={setShowSelectModal}
                    handleClick={handleClick}
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

export default Scores;
