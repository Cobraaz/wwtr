import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setNotify } from "store/slices/notifySlice";
import { addOptionName } from "store/slices/paramWeightagesSlice";
import SelectOptionModal from "./SelectOptionModal";

const ModalWeightages = ({
  showSelectOptionModal,
  toggleSelectOptionModal,
  history,
  optionName,
}) => {
  const initialState = {
    optionOne: "",
    optionTwo: "",
    optionThree: "",
    optionFour: "",
  };
  const [noOfOptions] = useState([1, 2, 3, 4]);
  const [setOption, setSetOption] = useState([]);
  const [initialName, setInitialName] = useState(initialState);
  const dispatch = useDispatch();
  const selectNoOfOptions = (option) => {
    setSetOption(Array.from(Array(option).keys()));
  };

  useEffect(() => {
    // var i = 0;
    // for (var key in initialName) {
    //   if (initialName.hasOwnProperty(key)) {
    //     initialName[key] = optionName[i];
    //     i++;
    //   }
    // }

    if (optionName.length) {
      setInitialName({
        optionOne: optionName[0] || "",
        optionTwo: optionName[1] || "",
        optionThree: optionName[2] || "",
        optionFour: optionName[3] || "",
      });
      selectNoOfOptions(optionName.length);
    }
  }, [optionName]);

  const handleSubmit = (optionNameObj) => {
    const name = Object.values(optionNameObj);
    const newName = name.filter((c, index) => {
      return name.indexOf(c) !== index;
    });
    if (!name.length) {
      return dispatch(setNotify({ error: "Please fill the option name" }));
    }
    if (newName.length) {
      return dispatch(
        setNotify({ error: "No duplicates option name are allowed" })
      );
    }
    dispatch(addOptionName({ name, history }));
  };
  return (
    <>
      <SelectOptionModal
        setOption={setOption}
        noOfOptions={noOfOptions}
        selectNoOfOptions={selectNoOfOptions}
        showSelectOptionModal={showSelectOptionModal}
        toggleSelectOptionModal={toggleSelectOptionModal}
        handleSubmit={handleSubmit}
        initialName={initialName}
      />
    </>
  );
};

export default ModalWeightages;
