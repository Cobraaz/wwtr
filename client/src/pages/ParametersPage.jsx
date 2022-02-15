import Parameters from "components/Parameters/Parameters";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

const ParametersPage = () => {
  const paramsWeightages = useSelector((state) => state.paramsWeightages);
  const dispatch = useDispatch();
  const history = useHistory();
  return (
    <Parameters
      paramsWeightages={paramsWeightages}
      dispatch={dispatch}
      history={history}
    />
  );
};

export default ParametersPage;
