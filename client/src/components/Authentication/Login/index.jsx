import { useState } from "react";
import { useDispatch } from "react-redux";

import { Link } from "react-router-dom";
import { loginUser } from "store/slices/authSlice";
import { useFormik } from "formik";
import * as Yup from "yup";
import { FormFeedback, Input, Label } from "reactstrap";

const Login = () => {
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      password: Yup.string()
        .required("Password is required")
        .matches(
          // eslint-disable-next-line
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
          "Password must have at least one alphabet letter, one number, and one special character"
        ),
      email: Yup.string()
        .email("Please provide a valid email")
        .required("Email is required"),
    }),
    onSubmit: (values) => {
      dispatch(loginUser(values));
    },
  });

  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();

  return (
    <>
      <div className="col-12 px-0 right-side form-wrapper">
        <div className="row">
          <div className="col-12 px-0 mt-3">
            <form className="row form-height" onSubmit={formik.handleSubmit}>
              <div className="col-12 form-scroll-min-height">
                <div className="row">
                  <div className="col-12 mb-3">
                    <Label
                      className="label-text required"
                      style={{ fontFamily: "segoe ui" }}
                    >
                      Email ID{" "}
                    </Label>
                    <Input
                      autoComplete="off"
                      type="email"
                      className="form-control"
                      id="email"
                      name="email"
                      placeholder="Enter Your Email ID"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.email}
                      invalid={!!(formik.touched.email && formik.errors.email)}
                      required
                    />
                    {formik.touched.email && formik.errors.email ? (
                      <FormFeedback>{formik.errors.email}</FormFeedback>
                    ) : null}
                  </div>
                  <div className="col-12 mb-3">
                    <Label className="label-text required">Password</Label>
                    <div className="customePassShow d-flex">
                      <Input
                        autoComplete="off"
                        type={showPassword ? "text" : "password"}
                        name="password"
                        className="w-100 form-control"
                        placeholder="Password"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.password}
                        invalid={
                          !!(formik.touched.password && formik.errors.password)
                        }
                        required
                      />
                      <i
                        className={
                          showPassword ? "ri-eye-line" : "ri-eye-off-line"
                        }
                        style={{
                          marginLeft: `${
                            formik.touched.password && formik.errors.password
                              ? "-60px"
                              : "-30px"
                          } `,
                          cursor: "pointer",
                          paddingTop: "4px",
                        }}
                        onClick={() =>
                          setShowPassword((prevState) => !prevState)
                        }
                      ></i>
                    </div>
                    {formik.touched.password && formik.errors.password ? (
                      <FormFeedback style={{ display: "block" }}>
                        {formik.errors.password}
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
                <Link
                  to="/authentication/forget_password"
                  className="text-center mt-2 d-block"
                >
                  <span>Forgot Password</span>
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
