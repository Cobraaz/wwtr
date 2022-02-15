import { allParameters } from "components/Parameters/Parameters.helper";
import { useEffect, useState } from "react";
import Download from "./DownloadExcel";

const Excel = (props) => {
  const [parametersArray, setParametersArray] = useState([]);

  useEffect(() => {
    let active = true;
    if (props.viewValue !== 3) load();
    return () => {
      active = false;
    };

    async function load() {
      const res = await allParameters();
      if (!active) {
        return;
      }
      setParametersArray(res);
    }
  }, [props.viewValue]);

  if (parametersArray.length || props.viewValue === 3) {
    return (
      <>
        <Download props={props} parametersArray={parametersArray} />
      </>
    );
  }
  return <div>Loading</div>;
};

export default Excel;
