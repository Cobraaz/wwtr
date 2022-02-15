import ParameterNavbar from "components/Shared/ProgressBar";
import Parameter from "./ShowParameter";
import { addParameters } from "store/slices/paramWeightagesSlice";
import { useEffect, useState } from "react";
import { setNotify } from "store/slices/notifySlice";
import "./Parameters.component.css";

const Parameters = ({ paramsWeightages, dispatch, history }) => {
  const [selectParameters, setSelectParameters] = useState([]);

  const submitParameters = () => {
    if (!selectParameters.length) {
      return dispatch(setNotify({ error: "Please select the parameters" }));
    }

    dispatch(addParameters({ parameters: selectParameters, history }));
  };
  useEffect(() => {
    setSelectParameters(paramsWeightages.parameters);
  }, [paramsWeightages.parameters]);

  return (
    <div className="admin-wrap AB-parameters mt-5">
      <div className="col-12">
        <h2 className="mb-5 font-weight-bold">Please select the Parameters </h2>
        <div
          className="col-10"
          style={{ display: "block", margin: "auto", backgroundColor: "white" }}
        >
          <ParameterNavbar />
          <div className="mt-5 AB-parameters-data">
            <Parameter
              selectParameters={selectParameters}
              setSelectParameters={setSelectParameters}
              submitParameters={submitParameters}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Parameters;
