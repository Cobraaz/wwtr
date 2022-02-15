import { useState } from "react";
import { useDispatch } from "react-redux";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Input,
} from "reactstrap";
import { setNotify } from "store/slices/notifySlice";
import { ReactComponent as PDFsvg } from "./Svg/pdficon.svg";
import { ReactComponent as EXCELsvg } from "./Svg/excelicon.svg";
import styles from "./result.header.module.css";

const ResultHeader = ({
  setOptionValue,
  optionValue,
  optionName,
  setViewValue,
  viewValue,
  setIsPDFDownload,
  setIsEXCELDownload,
}) => {
  const [isOpenOption, setIsOpenOption] = useState(false);
  const [isOpenViews, setIsOpenViews] = useState(false);
  const [isOpenExports, setIsOpenExports] = useState(false);
  const dispatch = useDispatch();

  const showText = () => {
    if (viewValue === 3) return "Numerical Results - Overview";
    if (viewValue === 4) return "Numerical Results - Detailed View";
    if (viewValue === 2) return "Graphical Results - Detailed View";
    if (viewValue === 1) return "Graphical Results - Overview";
  };

  return (
    <div className="row">
      <div className="col-md-9 col-sm-12">
        <h2 className="mb-5 font-weight-bold">{showText()}</h2>
      </div>
      <div className="col">
        <Dropdown
          size="lg"
          isOpen={isOpenOption}
          toggle={() => setIsOpenOption(!isOpenOption)}
        >
          <DropdownToggle color="primary" className={styles.abDropdown} caret>
            Options
          </DropdownToggle>
          <DropdownMenu>
            <DropdownItem
              className="ml-2 mr-2 mt-1"
              onClick={() => {
                setOptionValue(Array.from(Array(optionName.length).keys()));
              }}
            >
              <Input
                type="checkbox"
                defaultChecked={optionValue.length === optionName.length}
                readOnly
              />
              All
            </DropdownItem>
            <DropdownItem disabled></DropdownItem>
            {optionName.map((name, index) => (
              <div key={index}>
                <DropdownItem
                  disabled={
                    optionValue.includes(index) && optionValue.length === 1
                  }
                  className="mt-1"
                  onClick={() => {
                    if (optionValue.includes(index)) {
                      if (optionValue.length === 1) {
                        dispatch(
                          setNotify({
                            error: "Atleast one Option should be selected",
                          })
                        );
                        return;
                      }
                      return setOptionValue(
                        optionValue.filter((op) => op !== index)
                      );
                    }
                    setOptionValue(
                      [...optionValue, index].sort(function (a, b) {
                        return a - b;
                      })
                    );
                  }}
                >
                  <span className="ml-2">
                    <Input
                      disabled={
                        optionValue.includes(index) && optionValue.length === 1
                      }
                      defaultChecked={optionValue.includes(index)}
                      type="checkbox"
                    />
                    {name}
                  </span>
                </DropdownItem>
                <DropdownItem disabled></DropdownItem>
              </div>
            ))}
          </DropdownMenu>
        </Dropdown>
      </div>
      <div className="col">
        <Dropdown
          size="lg"
          isOpen={isOpenViews}
          toggle={() => setIsOpenViews(!isOpenViews)}
        >
          <DropdownToggle color="primary" className={styles.abDropdown} caret>
            Views
          </DropdownToggle>
          <DropdownMenu>
            <DropdownItem className={styles.abDropdownHeader} header>
              Graphical Data
            </DropdownItem>
            <DropdownItem onClick={() => setViewValue(1)}>
              <span className="ml-2">
                <Input
                  onChange={() => setViewValue(1)}
                  checked={Boolean(viewValue === 1)}
                  type="radio"
                />{" "}
                Overview
              </span>
            </DropdownItem>
            <DropdownItem disabled></DropdownItem>
            <DropdownItem onClick={() => setViewValue(2)}>
              <span className="ml-2">
                <Input
                  onChange={() => setViewValue(2)}
                  checked={Boolean(viewValue === 2)}
                  type="radio"
                />{" "}
                Detailed View
              </span>
            </DropdownItem>
            <DropdownItem disabled></DropdownItem>
            <DropdownItem className={styles.abDropdownHeader} header>
              Numerical Data
            </DropdownItem>
            <DropdownItem onClick={() => setViewValue(3)}>
              <span className="ml-2">
                <Input
                  checked={Boolean(viewValue === 3)}
                  onChange={() => setViewValue(3)}
                  type="radio"
                />{" "}
                Overview
              </span>
            </DropdownItem>
            <DropdownItem disabled></DropdownItem>
            <DropdownItem onClick={() => setViewValue(4)}>
              <span className="ml-2">
                <Input
                  onChange={() => setViewValue(4)}
                  checked={Boolean(viewValue === 4)}
                  type="radio"
                />{" "}
                Detailed View
              </span>
            </DropdownItem>
            <DropdownItem disabled></DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </div>
      <div className="col">
        <Dropdown
          size="lg"
          isOpen={isOpenExports}
          toggle={() => setIsOpenExports(!isOpenExports)}
        >
          <DropdownToggle color="primary" className={styles.abDropdown} caret>
            Export
          </DropdownToggle>
          <DropdownMenu>
            <DropdownItem
              onClick={() => setIsPDFDownload(true)}
              className={styles.abDropdownHeader}
            >
              <PDFsvg /> <span className="ml-2">PDF</span>
            </DropdownItem>
            <DropdownItem divider></DropdownItem>

            <DropdownItem
              onClick={() => setIsEXCELDownload(true)}
              className={styles.abDropdownHeader}
            >
              <EXCELsvg /> <span className="ml-2">EXCEL</span>
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </div>
    </div>
  );
};

export default ResultHeader;
