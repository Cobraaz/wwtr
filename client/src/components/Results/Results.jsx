import ModalParamsWeightage from "components/Shared/ModalParamsWeightage";
import ProgressBar from "components/Shared/ProgressBar";
import { useEffect, useState } from "react";
import { v4 } from "uuid";
import DetailedGraphical from "./Graphical/Detailed/DetailedGraphical";
import DetailedNumerical from "./Numerical/Detailed/DetailedNumerical";
import OverallNumerical from "./Numerical/Overall/OverallNumerical";

import ResultHeader from "./Header/ResultHeader";
import OverallGraphical from "./Graphical/Overall/OverallGraphical";
import { getResult } from "./results.helper";
import DownloadPDF from "./Download/PDF/DownloadPDF";
import DownloadExcel from "./Download/Excel/Excel";
const Results = ({ paramsWeightages, LoggedInUserName }) => {
  const [detailedResult, setDetailedResult] = useState([]);

  const [showModal, setShowModal] = useState({
    text: "",
    path: "/parameters",
  });
  const [optionValue, setOptionValue] = useState([]);
  const [viewValue, setViewValue] = useState(1);
  const [overviewNumerical, setOverviewNumerical] = useState({
    name: [],
    overallResult: [],
  });
  const [isPDFDownload, setIsPDFDownload] = useState(false);
  const [isEXCELDownload, setIsEXCELDownload] = useState(false);

  useEffect(() => {
    const generateResult = async () => {
      if (paramsWeightages.parameters.length) {
        const checkForShowModal = paramsWeightages.parameters.map(
          (para) => para.weightage
        );
        const checkForShowModal2 = paramsWeightages.parameters.map(
          (para) => para.optionName.length
        );
        let checkForShowModal3 = paramsWeightages.parameters.map(
          (para) => para.optionName
        );
        checkForShowModal3 = [].concat
          .apply([], checkForShowModal3)
          .map((sc) => sc.score);

        const check = checkForShowModal.every((e) => e > 0);
        const check2 = checkForShowModal2.every((e) => e > 0);
        const check3 = checkForShowModal3.every((e) => e > 0);
        if (
          !check ||
          !paramsWeightages.optionName.length ||
          !check2 ||
          !check3
        ) {
          return setShowModal({
            text: "You have to select the parameters, weightage and score first to see the result.",
            path: "/weightages",
          });
        }
        const result = await getResult(paramsWeightages);
        setDetailedResult(result.detailedResult);
        setOverviewNumerical(result.overviewResult);
        setOptionValue(
          Array.from(Array(paramsWeightages.optionName.length).keys())
        );
      } else {
        setShowModal((s) => ({
          ...s,
          text: "You have to select the parameters, weightage and score first to see the result.",
        }));
      }
    };
    generateResult();
    // eslint-disable-next-line
  }, [paramsWeightages]);

  if (showModal.text) {
    return <ModalParamsWeightage text={showModal.text} path={showModal.path} />;
  }
  if (!detailedResult.length && !overviewNumerical.overallResult.length)
    return (
      <div className="admin-wrap AB-weightages mt-5">
        <div className="col-12">
          <ResultHeader
            setOptionValue={setOptionValue}
            optionValue={optionValue}
            optionName={paramsWeightages.optionName}
            setViewValue={setViewValue}
            viewValue={viewValue}
          />
          <div
            className="col-10"
            style={{
              display: "block",
              margin: "auto",
              backgroundColor: "white",
            }}
          >
            <ProgressBar />
          </div>
          <div></div>
        </div>
      </div>
    );
  return (
    <div className="admin-wrap AB-weightages mt-5">
      <div className="col-12">
        <ResultHeader
          setOptionValue={setOptionValue}
          optionValue={optionValue}
          optionName={paramsWeightages.optionName}
          setViewValue={setViewValue}
          viewValue={viewValue}
          setIsPDFDownload={setIsPDFDownload}
          setIsEXCELDownload={setIsEXCELDownload}
        />
        <div
          className="col-10"
          style={{ display: "block", margin: "auto", backgroundColor: "white" }}
        >
          <ProgressBar dataScrollTo={detailedResult.map(({ name }) => name)} />

          {optionValue.length && overviewNumerical.name.length
            ? viewValue === 3 && (
                <div className="mt-5">
                  <OverallNumerical
                    overviewNumerical={overviewNumerical.overallResult}
                    optionValue={optionValue}
                    optionName={paramsWeightages.optionName}
                    name={overviewNumerical.name}
                  />
                </div>
              )
            : null}
          {optionValue.length
            ? viewValue === 4 && (
                <div className="mt-5">
                  {detailedResult.map((result, index) =>
                    result.parametersType.length ? (
                      <div key={index + v4()}>
                        <DetailedNumerical
                          result={result}
                          optionValue={optionValue}
                        />
                        <hr />
                      </div>
                    ) : null
                  )}
                </div>
              )
            : null}
          {optionValue.length && overviewNumerical.name.length
            ? viewValue === 1 && (
                <OverallGraphical
                  optionValue={optionValue}
                  detailedResult={detailedResult}
                  overviewNumerical={overviewNumerical.overallResult}
                  optionName={paramsWeightages.optionName}
                  name={overviewNumerical.name}
                />
              )
            : null}
          {optionValue.length && detailedResult.length && viewValue === 2 && (
            <DetailedGraphical
              optionValue={optionValue}
              detailedResult={detailedResult}
              optionName={paramsWeightages.optionName}
            />
          )}
        </div>
      </div>
      {overviewNumerical.name.length && isPDFDownload && (
        <DownloadPDF
          optionValue={optionValue}
          detailedResult={detailedResult
            .filter((data) => data.parametersType.length)
            .slice()}
          overviewNumerical={JSON.parse(JSON.stringify(overviewNumerical))}
          optionName={paramsWeightages.optionName}
          setIsPDFDownload={setIsPDFDownload}
          viewValue={viewValue}
        />
      )}
      {isEXCELDownload && (
        <DownloadExcel
          LoggedInUserName={LoggedInUserName}
          detailedResult={detailedResult
            .filter((data) => data.parametersType.length)
            .slice()}
          overviewNumerical={JSON.parse(JSON.stringify(overviewNumerical))}
          optionName={paramsWeightages.optionName}
          viewValue={viewValue}
          setIsEXCELDownload={setIsEXCELDownload}
          optionValue={optionValue}
        />
      )}
    </div>
  );
};

export default Results;
