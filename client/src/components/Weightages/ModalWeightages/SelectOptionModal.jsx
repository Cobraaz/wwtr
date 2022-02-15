import { useEffect, useState } from "react";
import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Input,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
} from "reactstrap";
import { capitalize } from "utils/helper.function";

import "./SelectOptionModal.component.css";

const SelectOptionModal = ({
  showSelectOptionModal,
  toggleSelectOptionModal,
  noOfOptions,
  selectNoOfOptions,
  setOption,
  handleSubmit,
  initialName,
}) => {
  const [optionValue] = useState(Object.keys(initialName));
  const [optionName, setoptionName] = useState();
  const [isDropDown, setIsDropDown] = useState(false);
  // console.log(optionName, initialName, "optionName");
  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    if (value.endsWith(" ") || value.startsWith(" ") || !value)
      return setoptionName({ ...optionName, [name]: value });
    setoptionName({ ...optionName, [name]: capitalize(value) });
  };

  useEffect(() => {
    setoptionName(initialName);
  }, [initialName]);

  useEffect(() => {
    const initialState = {
      optionOne: "",
      optionTwo: "",
      optionThree: "",
      optionFour: "",
    };

    for (var i = 0; i < setOption.length; i++) {
      initialState[optionValue[i]] = initialName[optionValue[i]];
    }
    setoptionName(initialState);
    // eslint-disable-next-line
  }, [setOption.length, optionValue]);

  const onSubmit = () => {
    function clean(obj) {
      for (var propName in obj) {
        if (
          obj[propName] === null ||
          obj[propName] === undefined ||
          obj[propName] === ""
        ) {
          delete obj[propName];
        }
      }
      return obj;
    }
    handleSubmit(clean(optionName));
  };

  return (
    <Modal
      className="pr-5"
      isOpen={showSelectOptionModal}
      toggle={toggleSelectOptionModal}
    >
      <ModalHeader toggle={toggleSelectOptionModal}>
        <span className="AB-modal-header">Select Options</span>
      </ModalHeader>
      <ModalBody className="AB-modal-body">
        Please select the number of options to score and name them.
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            marginTop: "30px",
          }}
        >
          <span
            style={{
              color: "#03a9f4",
              fontWeight: "500",
              marginLeft: "auto",
              marginRight: "10px",
              paddingTop: "8px",
            }}
          >
            Number of Options
          </span>
          <Dropdown
            style={{
              marginRight: "auto",
            }}
            className="AB-dropdown"
            isOpen={isDropDown}
            toggle={() => setIsDropDown(!isDropDown)}
          >
            <DropdownToggle caret className="AB-dropdown-toggle" nav>
              {setOption.length > 0 ? setOption.length : "Select"}
            </DropdownToggle>
            <DropdownMenu>
              {noOfOptions.map((options) => (
                <DropdownItem
                  key={options}
                  onClick={() => {
                    selectNoOfOptions(options);
                  }}
                  className="AB-dropdown-item"
                >
                  0{options}
                </DropdownItem>
              ))}
            </DropdownMenu>
          </Dropdown>
        </div>
      </ModalBody>
      <ModalFooter
        style={{
          marginLeft: "auto",
          marginRight: "auto",
          display: "flex",
          flexDirection: "row",
          width: "100%",
        }}
      >
        {" "}
      </ModalFooter>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          textAlign: "center",
        }}
      >
        <span
          style={{
            textAlign: "center",
            color: "#03a9f4",
            fontWeight: "500",
            marginBottom: "10px",
          }}
        >
          Name of Options
        </span>
        {setOption.map((option) => (
          <div
            key={option}
            className="w-75 mt-2 mb-1"
            style={{
              display: "flex",
              flexDirection: "row",
              textAlign: "center",
              marginLeft: "auto",
              marginRight: "auto",
            }}
          >
            <span className="mr-3" style={{ minWidth: "10px" }}>
              {option + 1}
            </span>
            <Input
              style={{
                backgroundColor: "#f9faff",
              }}
              autoCapitalize="word"
              autoComplete="off"
              name={optionValue[option]}
              value={optionName[optionValue[option]]}
              onChange={handleChangeInput}
            />
          </div>
        ))}
        <div
          className="w-75 mt-2 mb-1"
          style={{
            display: "flex",
            flexDirection: "row",
            textAlign: "center",
            marginLeft: "auto",
            marginRight: "auto",
          }}
        >
          <span className="mr-3" style={{ minWidth: "10px" }}></span>
          <Button
            className="w-75 mt-1 mb-5"
            style={{
              marginLeft: "auto",
              marginRight: "auto",
              backgroundColor: "#03a9f4",
              outline: "none",
              border: "none",
              fontWeight: "bold",
            }}
            onClick={onSubmit}
          >
            PROCEED
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default SelectOptionModal;
