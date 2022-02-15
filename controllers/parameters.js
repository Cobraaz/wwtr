import parametersModel from "../models/parameters.js";
import resultModel from "../models/results.js";
import { parametersArray } from "../utils/Parameters.js";
import { v4 as uuidv4 } from "uuid";
import { validationResult } from "express-validator";

export const addParameters = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.error(errors.array());
    return res.status(400).json({ err: errors.array() });
  }
  try {
    const { parameters, optionName, parameterName } = req.body;
    const findResult = await resultModel.findOne({
      user: req.user.id,
    });

    const creatingResult = {
      name: `Evaluation_${new Date().toLocaleDateString()}_${new Date().toLocaleTimeString()}`,
      parameters: parameters.map((para) => {
        delete para._id;
        para.optionName = para.optionName.map((opName) => {
          delete opName._id;
          return opName;
        });
        return para;
      }),
      optionName,
    };

    if (findResult) {
      let findingNewResult;
      if (parameterName) {
        const cloneResult = JSON.parse(JSON.stringify(findResult.results));

        const updatingResult = cloneResult.map((res) => {
          if (res.name === parameterName) {
            return {
              ...creatingResult,
              name: parameterName,
            };
          }
          return res;
        });
        findResult.results = updatingResult;

        const saveResult = await findResult.save();
        findingNewResult = saveResult.results.find(
          ({ name }) => name === parameterName
        );
      } else {
        findResult.results.unshift(creatingResult);
        const saveResult = await findResult.save();
        findingNewResult = saveResult.results.find(
          ({ name }) => name === creatingResult.name
        );
      }

      return res.json({
        parameters: findingNewResult.parameters,
        optionName: findingNewResult.optionName,
        name: findingNewResult.name,
      });
    } else {
      const newResult = new resultModel({
        user: req.user.id,
        results: [creatingResult],
      });
      const saveResult = await newResult.save();

      return res.json({
        parameters: saveResult.results[0].parameters,
        optionName: saveResult.results[0].optionName,
        name: saveResult.results[0].name,
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ err: [{ msg: "Server error." }] });
  }
};
// export const getParameters = async (req, res) => {
//   try {
//     const parameters = await parametersModel.findOne({ user: req.user.id });
//     if (parameters === null)
//       return res.json({
//         noParams:
//           "You have to select the parameters first to select weightage.",
//       });
//     res.json({
//       parameters: parameters.parameters,
//       optionName: parameters.optionName,
//     });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ err: "Server error" });
//   }
// };

// export const addWeightages = async (req, res) => {
//   try {
//     const { weightages } = req.body;

//     const parameters = weightages.map((para) => {
//       delete para.error;
//       return para;
//     });

//     const updatedParameters = await parametersModel.findOneAndUpdate(
//       { user: req.user.id },
//       { parameters },
//       { new: true }
//     );

//     res.json(updatedParameters);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ err: [{ msg: "Server error." }] });
//   }
// };

export const allParameters = async (req, res) => {
  try {
    res.json({
      parameters: parametersArray.map((parameter, i) => ({
        ...parameter,
        index: i,
        _id: uuidv4(),
      })),
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ err: [{ msg: "Server error." }] });
  }
};

// export const addOptionName = async (req, res) => {
//   try {
//     const { name } = req.body;

//     const { parameters } = await parametersModel.findOne({ user: req.user.id });
//     const paraOptionName = name.map((name) => ({ name, score: 0 }));

//     const cloneParameters = parameters.map((para) => para);

//     const updatingParameters = cloneParameters
//       .map((para) => {
//         let temp = [];
//         if (
//           para.optionName.length &&
//           para.optionName.length === paraOptionName.length
//         ) {
//           temp = para.optionName;
//         } else {
//           para.optionName.push(...paraOptionName.slice(para.optionName.length));
//           temp = para.optionName;
//         }

//         para.optionName = temp.slice(0, name.length);
//         return para;
//       })
//       .map((para) => {
//         para.optionName.map((opName, index) => {
//           opName.name = name[index];
//           return opName;
//         });
//         return para;
//       });

//     const updatedParameters = await parametersModel.findOneAndUpdate(
//       { user: req.user.id },
//       { optionName: name, parameters: updatingParameters },
//       { new: true }
//     );
//     res.json(updatedParameters);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ err: [{ msg: "Server error." }] });
//   }
// };

// export const addScores = async (req, res) => {
//   try {
//     const { scores } = req.body;
//     const updatedParameters = await parametersModel.findOneAndUpdate(
//       { user: req.user.id },
//       { parameters: scores },
//       { new: true }
//     );

//     res.json(updatedParameters);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ err: [{ msg: "Server error." }] });
//   }
// };

// export const resetParameters = async (req, res) => {
//   try {
//     await parametersModel.findOneAndDelete({ user: req.user.id });
//     res.json({});
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ err: [{ msg: "Server error." }] });
//   }
// };
