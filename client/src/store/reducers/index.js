import loaderSlice from "../slices/loaderSlice";
import alertSlice from "../slices/alertSlice";
import notifySlice from "store/slices/notifySlice";
import modalSlice from "store/slices/modalSlice";

import authSlice from "store/slices/authSlice";
import paramWeightagesSlice from "store/slices/paramWeightagesSlice";

const reducer = {
  auth: authSlice,
  paramsWeightages: paramWeightagesSlice,
  allModal: modalSlice,
  notify: notifySlice,
  alerts: alertSlice,
  loader: loaderSlice,
};
export default reducer;
