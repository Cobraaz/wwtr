import parametersModel from "../models/parameters.js";
import { parametersArray } from "../utils/Parameters.js";

export const addParameters = async (req, res) => {
  try {
    const { parameters } = req.body;
    const updatedParameters = await parametersModel.findOneAndUpdate(
      { user: req.user.id },
      { parameters: parameters },
      { new: true }
    );
    if (updatedParameters) return res.json(updatedParameters);

    const newParameters = new parametersModel({
      parameters: parameters,
      user: req.user.id,
    });
    const resParameters = await newParameters.save();
    return res.json(resParameters);
  } catch (error) {
    console.error(error);
    res.status(500).json({ err: [{ msg: "Server error." }] });
  }
};
export const getParameters = async (req, res) => {
  try {
    const parameters = await parametersModel.findOne({ user: req.user.id });
    if (parameters === null)
      return res.json({
        noParams:
          "You have to select the parameters first to select weightage.",
      });
    res.json({
      parameters: parameters.parameters,
      optionName: parameters.optionName,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ err: "Server error" });
  }
};

export const addWeightages = async (req, res) => {
  try {
    const { weightages } = req.body;

    const parameters = weightages.map((para) => {
      delete para.error;
      return para;
    });

    const updatedParameters = await parametersModel.findOneAndUpdate(
      { user: req.user.id },
      { parameters },
      { new: true }
    );

    res.json(updatedParameters);
  } catch (error) {
    console.error(error);
    res.status(500).json({ err: [{ msg: "Server error." }] });
  }
};
export const allParameters = async (req, res) => {
  try {
    res.json({ parameters: parametersArray });
  } catch (error) {
    console.error(error);
    res.status(500).json({ err: [{ msg: "Server error." }] });
  }
};

export const addOptionName = async (req, res) => {
  try {
    const { name } = req.body;

    const { parameters } = await parametersModel.findOne({ user: req.user.id });
    const paraOptionName = name.map((name) => ({ name, score: 0 }));

    const cloneParameters = parameters.map((para) => para);

    const updatingParameters = cloneParameters
      .map((para) => {
        let temp = [];
        if (
          para.optionName.length &&
          para.optionName.length === paraOptionName.length
        ) {
          temp = para.optionName;
        } else {
          para.optionName.push(...paraOptionName.slice(para.optionName.length));
          temp = para.optionName;
        }

        para.optionName = temp.slice(0, name.length);
        return para;
      })
      .map((para) => {
        para.optionName.map((opName, index) => {
          opName.name = name[index];
          return opName;
        });
        return para;
      });

    const updatedParameters = await parametersModel.findOneAndUpdate(
      { user: req.user.id },
      { optionName: name, parameters: updatingParameters },
      { new: true }
    );
    res.json(updatedParameters);
  } catch (error) {
    console.error(error);
    res.status(500).json({ err: [{ msg: "Server error." }] });
  }
};

export const addScores = async (req, res) => {
  try {
    const { scores } = req.body;
    const updatedParameters = await parametersModel.findOneAndUpdate(
      { user: req.user.id },
      { parameters: scores },
      { new: true }
    );

    res.json(updatedParameters);
  } catch (error) {
    console.error(error);
    res.status(500).json({ err: [{ msg: "Server error." }] });
  }
};
