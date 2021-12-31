import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeAlert } from "store/slices/alertSlice";
import "./Alert.css";
const Alert = () => {
  const alerts = useSelector((state) => state.alerts);
  const dispatch = useDispatch();
  const alertIcon = (alertType) => {
    if (alertType === "warning") {
      return (
        <i className="ri-error-warning-fill" style={{ fontSize: "20px" }}></i>
      );
    } else if (alertType === "success") {
      return <i className="ri-check-line" style={{ fontSize: "20px" }}></i>;
    } else if (alertType === "danger") {
      return (
        <i className="ri-error-warning-fill" style={{ fontSize: "20px" }}></i>
      );
    }
  };
  return (
    alerts !== null &&
    alerts.length > 0 &&
    alerts.map((alert) => (
      <div key={alert.id} className={`alert alert-${alert.alertType} row`}>
        <div class="col-1 alert-div-center">{alertIcon(alert.alertType)}</div>
        <div class="col-10 pl-5">
          <div
            style={{
              fontWeight: "bold",
              fontSize: "small",
            }}
          >
            {alert.msg}
          </div>
        </div>
        <div class="col-1 alert-cancel-center">
          <i
            className="ri-close-line"
            style={{ cursor: "pointer", fontSize: "20px" }}
            onClick={() => dispatch(removeAlert(alert.id))}
          ></i>
        </div>
      </div>
    ))
  );
};

export default Alert;
