import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useHistory } from "react-router-dom";
import { activateUserEmail } from "store/slices/authSlice";

const ActivateEmail = () => {
  const { activate_token } = useParams();
  const [err, setErr] = useState("");
  const [success, setSuccess] = useState("");
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const history = useHistory();
  useEffect(() => {
    let timer;
    if (activate_token) {
      const activationEmail = () => {
        dispatch(activateUserEmail({ activate_token }));

        if (auth.err) return setErr(auth.err);
        setSuccess("Account has been activated!");
        setTimeout(() => history.replace("/"), 3000);
      };
      activationEmail();
    }
    return () => {
      setSuccess("");
      
      setErr("");
      clearTimeout(timer);
    };
  }, [activate_token, dispatch, auth.err, history]);
  return (
    <div
      style={{
        marginTop: "200px",
        textAlign: "center",
        maxWidth: "70em",
        marginLeft: "auto",
        marginRight: "auto",
      }}
    >
      {" "}
      {err && <div className="errMsg">{err}</div>}
      {success && <div className="successMsg">{success}</div>}
      <style>{`
        .errMsg {
          background: rgb(214, 10, 10);
          color: #fff;
          text-align: center;
          padding: 10px 0;
          letter-spacing: 1.3px;
        }

        .successMsg {
          background: rgb(9, 158, 54);
          color: #fff;
          text-align: center;
          padding: 10px 0;
          letter-spacing: 1.3px;
        }
      `}</style>
    </div>
  );
};

export default ActivateEmail;
