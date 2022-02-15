import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import Weightages from "components/Weightages/Weightages";
const WeightagesPage = () => {
  const paramsWeightages = useSelector((state) => state.paramsWeightages);
  const dispatch = useDispatch();
  const history = useHistory();
  return (
    <Weightages
      paramsWeightages={paramsWeightages}
      dispatch={dispatch}
      history={history}
    />
  );
};

export default WeightagesPage;
