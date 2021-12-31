import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";

import { registerUser } from "store/slices/authSlice";
import { capitalize } from "utils/helper.function";

import { useFormik } from "formik";
import * as Yup from "yup";
import { FormFeedback, Input, Label } from "reactstrap";

const Register = () => {
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      fullname: "",
      email: "",
      company_name: "",
      job_profile: "consultant",
      password: "",
      confirm_password: "",
    },
    validationSchema: Yup.object({
      fullname: Yup.string()
      .required("Full name is required"),
      email: Yup.string()
        .email("Please provide a valid email")
        .required("Email is required"),
      company_name: Yup.string().required("Company Name is required"),
      password: Yup.string()
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
        .oneOf([Yup.ref("password"), null], "Passwords must match"),
    }),
    onSubmit: (values, { resetForm }) => {
      values.fullname = capitalize(values.fullname);
      dispatch(
        registerUser({
          userData: values,
          clearInput: () => {
            resetForm({ values: "" });
          },
        })
      );
    },
  });

  const [showPassword, setShowPassword] = useState({
    password: false,
    confirm_password: false,
  });

  return (
    <>
      <div className="col-12 px-0 right-side form-wrapper ">
        <div className="row ">
          <div className="col-12 px-0 mt-3">
            <form
              className="row form-height"
              autoComplete="off"
              onSubmit={formik.handleSubmit}
            >
              <div className="col-12">
                <div className="row">
                  <div className="col-12 mb-3">
                    <Label className="label-text required">Full Name</Label>
                    <Input
                      type="text"
                      className="form-control form-controlfocus  brdr-radius mb-1 required"
                      id="fullName"
                      placeholder="Enter Your full Name"
                      name="fullname"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.fullname}
                      invalid={
                        !!(formik.touched.fullname && formik.errors.fullname)
                      }
                      required
                    />
                    {formik.touched.fullname && formik.errors.fullname ? (
                      <FormFeedback>{formik.errors.fullname}</FormFeedback>
                    ) : null}
                  </div>

                  <div className="col-12 mb-3">
                    <Label className="label-text required">Email ID</Label>
                    <Input
                      type="email"
                      className="form-control"
                      id="email"
                      placeholder="Enter Your Email ID"
                      name="email"
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
                    <Label className="label-text required">Company Name</Label>
                    <Input
                      type="text"
                      className="form-control"
                      id="companyName"
                      placeholder="Enter Your Company Name"
                      name="company_name"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.company_name}
                      invalid={
                        !!(
                          formik.touched.company_name &&
                          formik.errors.company_name
                        )
                      }
                      required
                    />
                    {formik.touched.company_name &&
                    formik.errors.company_name ? (
                      <FormFeedback>{formik.errors.company_name}</FormFeedback>
                    ) : null}
                  </div>
                  <div className="col-12 mb-3">
                    <label className="label-text required">Job Profile</label>
                    <select
                      className="form-control"
                      id="jobProfile"
                      name="job_profile"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.job_profile}
                    >
                      <option value="consultant">Consultant</option>
                      <option value="engineer">Engineer </option>
                      <option value="manager">Manager </option>
                      <option value="operator">Operator </option>
                    </select>
                  </div>

                  <div className="col-12 mb-3">
                    <Label className="label-text required">Password</Label>
                    <div className="customePassShow d-flex">
                      <Input
                        type={showPassword.password ? "text" : "password"}
                        className="w-100 form-control"
                        name="password"
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
                          showPassword.password
                            ? "ri-eye-line"
                            : "ri-eye-off-line"
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
                          setShowPassword({
                            ...showPassword,
                            password: !showPassword.password,
                          })
                        }
                      ></i>
                    </div>
                    {formik.touched.password && formik.errors.password ? (
                      <FormFeedback
                        style={{ display: "block" }}
                        className="invalid-feedback"
                      >
                        {formik.errors.password}
                      </FormFeedback>
                    ) : null}
                  </div>
                  <div className="col-12 mb-3">
                    <Label className="label-text required">
                      Confirm Password
                    </Label>
                    <div className="customePassShow d-flex">
                      <Input
                        type={
                          showPassword.confirm_password ? "text" : "password"
                        }
                        className="w-100 form-control"
                        name="confirm_password"
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
                            confirm_password: !showPassword.confirm_password,
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
              <div className="col-12 mb-3 text-center">
                <button
                  type="submit"
                  className="btn w-75 btn-style text-white shadow-sm px-5 py-2"
                >
                  CONTINUE
                </button>
                <label className="text-center mt-2">
                  Already Have An Account?{" "}
                  <Link to="/authentication/login" className="blue-color ">
                    <strong> Log In </strong>{" "}
                  </Link>
                </label>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
