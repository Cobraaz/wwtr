import { useDispatch } from "react-redux";
import { FormFeedback, Input, Label } from "reactstrap";

import { forgetUserPassword } from "store/slices/authSlice";
import { useFormik } from "formik";
import * as Yup from "yup";

const Forgetpassword = () => {
  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Please provide a valid email")
        .required("Email is required"),
    }),
    onSubmit: (values, { resetForm }) => {
      dispatch(forgetUserPassword(values.email));
      resetForm({ values: "" });
    },
  });

  return (
    <>
      <div className="col-12 px-0 right-side form-wrapper">
        <div className="row">
          <div className="col-12 px-0 mt-3">
            <form className="row form-height" onSubmit={formik.handleSubmit}>
              <div className="col-12 form-scroll-min-height">
                <div className="row">
                  <div className="col-12 mb-3">
                    <Label className="label-text required">Email ID </Label>
                    <Input
                      autoComplete="off"
                      type="email"
                      className="form-control"
                      id="email"
                      name="email"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.email}
                      invalid={formik.touched.email && formik.errors.email}
                      placeholder="Enter Your Email ID"
                      required
                    />
                    {formik.touched.email && formik.errors.email ? (
                      <FormFeedback>{formik.errors.email}</FormFeedback>
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
    </>
  );
};

export default Forgetpassword;
