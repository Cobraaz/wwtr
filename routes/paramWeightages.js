import express from "express";
const router = express.Router();
import { check } from "express-validator";
import {
  addParameters,
  // getParameters,
  // addWeightages,
  allParameters,
  // addOptionName,
  // addScores,
  // resetParameters,
} from "../controllers/parameters.js";

import Authenticated from "../middleware/Authenticated.js";

router.get("/all_parameters", allParameters);
// router.get("/", Authenticated, getParameters);
router.post(
  "/add_parameters",
  [
    check("parameters.*.index").not().isEmpty(),
    check("parameters.*.warning").not().isEmpty(),
    check("parameters.*.type").not().isEmpty(),
    check("parameters.*.category").not().isEmpty(),
    check("parameters.*.weightage").isNumeric().not().isEmpty(),
    check("parameters.*.score.*").isString().not().isEmpty(),
    check("parameters.*.optionName.*.name").isString().not().isEmpty(),
    check("parameters.*.optionName.*.score").isNumeric().not().isEmpty(),
    check("optionName.*").not().isEmpty(),
    check("parameterName").isString(),
  ],
  Authenticated,
  addParameters
);
// router.patch("/add_weightages", Authenticated, addWeightages);
// router.patch("/add_optionname", Authenticated, addOptionName);
// router.patch("/add_scores", Authenticated, addScores);
// router.delete("/reset_parameters", Authenticated, resetParameters);
export default router;
