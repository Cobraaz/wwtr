import Alert from "components/Shared/Alert";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setAlert } from "store/slices/alertSlice";
import { setNotify } from "store/slices/notifySlice";
import { postData } from "utils/fetchData";
import { validateEmail as isEmail } from "utils/valid";

import "./Contact.component.css";
const Contact = ({ toggleContactForm }) => {
  const initialState = {
    fullname: "",
    email: "",
    message: "",
  };
  const [userData, setUserData] = useState(initialState);
  const { fullname, email, message } = userData;
  const auth = useSelector((state) => state.auth);

  useEffect(() => {
    if (auth.user && auth.user.name) {
      setUserData({
        ...userData,
        fullname: auth.user.name,
        email: auth.user.email,
      });
    } else {
      setUserData({
        ...userData,
        fullname: "",
        email: "",
      });
    }
    // eslint-disable-next-line
  }, [auth.user]);

  const dispatch = useDispatch();

  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!fullname || !email || !message)
      return dispatch(setAlert("Please add all fields.", "danger"));
    if (!isEmail(email))
      return dispatch(setAlert("Please include a valid email", "danger"));

    const res = await postData("users/contact_us", userData);
    if (res.err) {
      return res.err.forEach((error) =>
        dispatch(setAlert(error.msg, "danger"))
      );
    }

    dispatch(setNotify({ success: res.msg }));
    setTimeout(() => toggleContactForm(), 3000);
    setUserData(initialState);

    toggleContactForm();
  };
  return (
    <div className="nb-form" id="nb-form">
      <p className="title" style={{ display: "flex", flexDirection: "row" }}>
        <img src="/images/Small_Logo.png" alt="" className="user-icon" />
        Contact Us
      </p>
      <form className="mt-4" onSubmit={handleSubmit}>
        <Alert />
        {!auth.user.name && (
          <>
            <input
              type="text"
              name="fullname"
              className="form-control"
              placeholder="Enter your name (Required)"
              value={fullname}
              onChange={handleChangeInput}
              required
            />
            <input
              type="email"
              name="email"
              className="form-control"
              placeholder="Enter your Email Id"
              value={email}
              onChange={handleChangeInput}
              required
            />
          </>
        )}
        <textarea
          className="form-control"
          name="message"
          placeholder="Type your Message..."
          value={message}
          onChange={handleChangeInput}
          required
        ></textarea>
        <button className="submit-button ml-auto" type="submit">
          <i className="ri-send-plane-fill"></i>
        </button>
      </form>
    </div>
  );
};

export default Contact;
