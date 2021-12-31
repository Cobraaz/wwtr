import Alert from "components/Shared/Alert";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Redirect, useParams } from "react-router-dom";

import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { resetUserPassword } from "store/slices/authSlice";
import { useFormik } from "formik";
import * as Yup from "yup";
import { FormFeedback, Input, Label } from "reactstrap";

const ResetPassword = () => {
  const formik = useFormik({
    initialValues: {
      new_password: "",
      confirm_password: "",
    },
    validationSchema: Yup.object({
      new_password: Yup.string()
        .required("Password is required")
        .matches(
          // eslint-disable-next-line
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
          "Password must have at least one alphabet letter, one number, and one special character"
        ),
      confirm_password: Yup.string()
        .required("Confirm Password is required")
        .matches(
          // eslint-disable-next-line
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
          "Password must have at least one alphabet letter, one number, and one special character"
        )
        .oneOf([Yup.ref("new_password"), null], "Passwords must match"),
    }),
    onSubmit: (values) => {
      dispatch(resetUserPassword({ password: values, token }));
    },
  });

  const { token } = useParams();
  const auth = useSelector((state) => state.auth);

  const [showPassword, setShowPassword] = useState({
    password: false,
    confirm_password: false,
  });

  const dispatch = useDispatch();

  if (auth.token) return <Redirect to="/" />;

  // const onSubmit = (e) => {
  //   e.preventDefault();
  //   if (isLength(new_password))
  //     return dispatch(setAlert("Password is required.", "danger"));
  //   if (isLength(confirm_password))
  //     return dispatch(setAlert("Password is required.", "danger"));
  //   if (new_password !== confirm_password) {
  //     return dispatch(setAlert("Confirm password did not match.", "danger"));
  //   }
  //   dispatch(resetUserPassword({ password, token }));
  // };
  return (
    <>
      <div className="login-page col-12 px-0">
        <div className="row">
          <div className="col-md-6 left-side">
            <div className="pt-4 pl-4">
              <Link className="d-flex py-2" to="/">
                <img
                  className="logo change-image justify-content-center align-self-center"
                  src="/images/logo.png"
                  width="133"
                  height="28"
                  alt=""
                  title=""
                />
              </Link>
              <h1 className="text-white mt-4">
                <strong style={{ fontSize: "90px" }}>
                  Waste Water <br />
                  Treatment Referee
                </strong>
              </h1>
            </div>
          </div>
          <div className="col-md-6 right-side form-wrapper pr-5 d-flex align-items-center justify-content-center">
            <div className="login-center" style={{ minHeight: "700px" }}>
              <Alert />
              <div className="col-12 px-0 right-side form-wrapper">
                <div className="row">
                  <div className="col-12 px-0 mt-3">
                    <h2
                      className={"d-block mb-4 pb-3 login-heading active-title"}
                    >
                      Reset Password
                    </h2>
                    <form
                      className="row form-height"
                      onSubmit={formik.handleSubmit}
                    >
                      <div className="col-12 form-scroll-min-height">
                        <div className="row">
                          <div className="col-12 mb-3">
                            <Label className="label-text required">
                              New Password{" "}
                            </Label>
                            <div className="customePassShow d-flex">
                              <Input
                                autoComplete="off"
                                type={
                                  showPassword.password ? "text" : "password"
                                }
                                name="new_password"
                                className="w-100 form-control"
                                placeholder="New Password"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.new_password}
                                invalid={
                                  !!(
                                    formik.touched.new_password &&
                                    formik.errors.new_password
                                  )
                                }
                                required
                              />
                              <i
                                className={
                                  showPassword.password
                                    ? "ri-eye-line"
                                    : "ri-eye-off-line"
                                }
                                style={{
                                  marginLeft: `${
                                    formik.touched.new_password &&
                                    formik.errors.new_password
                                      ? "-60px"
                                      : "-30px"
                                  } `,
                                  cursor: "pointer",
                                  paddingTop: "4px",
                                }}
                                onClick={() =>
                                  setShowPassword({
                                    ...showPassword,
                                    password: !showPassword.password,
                                  })
                                }
                              ></i>
                            </div>
                            {formik.touched.new_password &&
                            formik.errors.new_password ? (
                              <FormFeedback style={{ display: "block" }}>
                                {formik.errors.new_password}
                              </FormFeedback>
                            ) : null}
                          </div>
                          <div className="col-12 mb-3">
                            <Label className="label-text required">
                              Confirm Password{" "}
                            </Label>
                            <div className="customePassShow d-flex">
                              <Input
                                autoComplete="off"
                                type={
                                  showPassword.confirm_password
                                    ? "text"
                                    : "password"
                                }
                                name="confirm_password"
                                className="w-100 form-control"
                                placeholder="Confirm Password"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.confirm_password}
                                invalid={
                                  !!(
                                    formik.touched.confirm_password &&
                                    formik.errors.confirm_password
                                  )
                                }
                                required
                              />
                              <i
                                className={
                                  showPassword.confirm_password
                                    ? "ri-eye-line"
                                    : "ri-eye-off-line"
                                }
                                style={{
                                  marginLeft: `${
                                    formik.touched.confirm_password &&
                                    formik.errors.confirm_password
                                      ? "-60px"
                                      : "-30px"
                                  } `,
                                  cursor: "pointer",
                                  paddingTop: "4px",
                                }}
                                onClick={() =>
                                  setShowPassword({
                                    ...showPassword,
                                    confirm_password:
                                      !showPassword.confirm_password,
                                  })
                                }
                              ></i>
                            </div>
                            {formik.touched.confirm_password &&
                            formik.errors.confirm_password ? (
                              <FormFeedback style={{ display: "block" }}>
                                {formik.errors.confirm_password}
                              </FormFeedback>
                            ) : null}
                          </div>
                        </div>
                      </div>

                      <div className="col-12 text-center">
                        <button
                          type="submit"
                          className="btn w-75 btn-style text-white shadow-sm px-5 py-2 text-uppercase"
                        >
                          Submit
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ResetPassword;
