import Scores from "components/Scores/Scores";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

const ScoresPage = () => {
  const paramsWeightages = useSelector((state) => state.paramsWeightages);
  const dispatch = useDispatch();
  const history = useHistory();
  return (
    <Scores
      paramsWeightages={paramsWeightages}
      dispatch={dispatch}
      history={history}
    />
  );
};

export default ScoresPage;
