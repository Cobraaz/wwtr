import { Button } from "reactstrap";
import "./SelectModal.component.css";
const SelectModal = ({ availablities, handleSelect, parameter, toggle }) => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        marginTop: "10px",
      }}
    >
      <div className="AB-select-parent">
        <i
          onClick={toggle}
          className="ri-close-circle-fill cursor-pointer"
          style={{
            position: "absolute",
            top: "0",
            right: "0",
            fontSize: "2rem",
            paddingTop: "-10px",
            marginTop: "-15px",
            marginRight: "-5px",
          }}
        ></i>
        <div className="d-flex align-self-center mb-3">
          <div style={{ display: "flex", flexFlow: "column" }}>
            <span className="mr-1 ml-1 AB-select-tag-weight">Weight</span>
            <span
              className="mr-1 ml-1 AB-select-tag-weight"
              style={{
                padding: "0.375rem 0rem",
              }}
            >
              Availability
            </span>
          </div>
          {availablities.map((availability, i) => (
            <div key={i} style={{ display: "flex", flexFlow: "column" }}>
              <Button
                disabled={availability === 0}
                onClick={() => {
                  const key = i + 1;
                  handleSelect(key, parameter._id);
                  toggle();
                }}
                className="mr-1 ml-1 AB-select-btn"
              >
                {i + 1}
              </Button>
              <span className="AB-select-span">
                {isFinite(availability) ? availability : "NA"}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SelectModal;
