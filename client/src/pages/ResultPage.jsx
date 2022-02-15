import { useSelector } from "react-redux";
import Results from "components/Results/Results";

const ResultPage = () => {
  const paramsWeightages = useSelector((state) => state.paramsWeightages);
  const LoggedInUserName = useSelector((state) => state.auth.user.name);

  return (
    <>
      <Results
        paramsWeightages={paramsWeightages}
        LoggedInUserName={LoggedInUserName}
      />
    </>
  );
};

export default ResultPage;
