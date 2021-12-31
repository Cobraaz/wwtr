import express from "express";
const router = express.Router();
import { check } from "express-validator";
import {
  addParameters,
  getParameters,
  addWeightages,
  allParameters,
  addOptionName,
  addScores,
} from "../controllers/parameters.js";

import Authenticated from "../middleware/Authenticated.js";

router.get("/all_parameters", allParameters);
router.get("/", Authenticated, getParameters);
router.post(
  "/add_parameters",
  [
    check("parameters.*.index").not().isEmpty(),
    check("parameters.*.warning").not().isEmpty(),
    check("parameters.*.type").not().isEmpty(),
    check("parameters.*.category").not().isEmpty(),
  ],
  Authenticated,
  addParameters
);
router.patch("/add_weightages", Authenticated, addWeightages);
router.patch("/add_optionname", Authenticated, addOptionName);
router.patch("/add_scores", Authenticated, addScores);
export default router;
