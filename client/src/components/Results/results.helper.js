const parameterArrayElement = [
  { weightageName: "permit consideration" },
  { weightageName: "design" },
  { weightageName: "implementation" },
  { weightageName: "operation" },
  { weightageName: "community" },
];
function sortParameters(a, b) {
  if (a.index < b.index) {
    return -1;
  }
  if (a.index > b.index) {
    return 1;
  }
  return 0;
}

export const getResult = async (paramsWeightages) => {
  let { parameters, optionName: initialOptionName } = paramsWeightages;
  parameters = parameters.slice().sort(sortParameters);

  let parametersType = [];
  for (let i = 0; i < parameterArrayElement.length; i++) {
    const weightageName = parameterArrayElement[i].weightageName;
    let parametersTypeTemp = [];
    for (let j = 0; j < parameters.length; j++) {
      if (parameters[j].category === weightageName) {
        parametersTypeTemp.push(parameters[j].type);
      }
    }
    parametersType.push(parametersTypeTemp);
  }
  let optionName = [];

  function roundTo4decimal(num) {
    return Math.round((num + Number.EPSILON) * 10000) / 10000;
  }

  for (let i = 0; i < parameterArrayElement.length; i++) {
    const weightageName = parameterArrayElement[i].weightageName;
    let parametersOptionTemp1 = [];
    for (let j = 0; j < initialOptionName.length; j++) {
      let parametersOptionTemp2 = [];

      for (let k = 0; k < parameters.length; k++) {
        if (parameters[k].category === weightageName) {
          parametersOptionTemp2.push({
            score: roundTo4decimal(parameters[k].optionName[j].score),
            weight: roundTo4decimal(parameters[k].weightage),
            weightedScore: roundTo4decimal(
              (parameters[k].weightage * parameters[k].optionName[j].score) / 10
            ),
            type: parameters[k].type,
            opName: parameters[k].optionName[j].name,
          });
        }
      }
      function sum(array, key) {
        return array.reduce((a, b) => a + (b[key] || 0), 0);
      }

      if (parametersOptionTemp2.length)
        parametersOptionTemp1.push({
          name: initialOptionName[j],
          parameters: parametersOptionTemp2,
          totalScore: {
            score: roundTo4decimal(sum(parametersOptionTemp2, "score")),
            weightedScore: roundTo4decimal(
              sum(parametersOptionTemp2, "weightedScore")
            ),
          },
          avgScore: {
            score: roundTo4decimal(
              sum(parametersOptionTemp2, "score") / parametersOptionTemp2.length
            ),
            weightedScore: roundTo4decimal(
              sum(parametersOptionTemp2, "weightedScore") /
                parametersOptionTemp2.length
            ),
            // type
          },
          comparisonScore: {
            score: roundTo4decimal(
              sum(parametersOptionTemp2, "score") /
                parametersOptionTemp2.length /
                Math.max.apply(
                  Math,
                  parametersOptionTemp2.map(function (o) {
                    return o.score;
                  })
                )
            ),
            weightedScore: roundTo4decimal(
              sum(parametersOptionTemp2, "weightedScore") /
                parametersOptionTemp2.length /
                Math.max.apply(
                  Math,
                  parametersOptionTemp2.map(function (o) {
                    return o.weightedScore;
                  })
                )
            ),
          },
        });
    }
    optionName.push({
      name: weightageName,
      optionName: parametersOptionTemp1,
    });
  }
  let result = [
    {
      name: "Permitting",
      category: "permit consideration",
      parametersType: parametersType[0],
      detailedData: optionName[0],
    },
    {
      name: "Design",
      category: "design",
      parametersType: parametersType[1],
      detailedData: optionName[1],
    },
    {
      name: "Implementation",
      category: "implementation",
      parametersType: parametersType[2],
      detailedData: optionName[2],
    },
    {
      name: "Operation",
      category: "operation",
      parametersType: parametersType[3],
      detailedData: optionName[3],
    },
    {
      name: "Community",
      category: "community",
      parametersType: parametersType[4],
      detailedData: optionName[4],
    },
  ];

  function sum(array, key) {
    return array.reduce((a, b) => a + (b[key] || 0), 0);
  }
  const resultForOverview = result.map((rOverview) => ({
    name: rOverview.name,
    optionName: rOverview.detailedData.optionName.map(
      (op) => op.comparisonScore
    ),
  }));
  const overallResult = [];
  const parametersName = [];
  for (let i = 0; i < resultForOverview.length; i++) {
    const temp1 = [];
    for (let j = 0; j < 5; j++) {
      if (resultForOverview[j].optionName[i]) {
        temp1.push({
          ...resultForOverview[j].optionName[i],
          type: resultForOverview[j].name,
        });
        parametersName.push(resultForOverview[j].name);
      }
    }
    const temp2 = temp1.filter((item) => item);
    const AverageComparsionScore = sum(temp2, "score") / 5;
    const AverageComparsionWeightedScore = sum(temp2, "weightedScore") / 5;
    if (AverageComparsionScore && AverageComparsionWeightedScore) {
      temp2.push({
        score: roundTo4decimal(AverageComparsionScore),
        weightedScore: roundTo4decimal(AverageComparsionWeightedScore),
        type: "Overall Option Score",
      });
      overallResult.push({ name: resultForOverview[i].name, result: temp2 });
    }
  }
  const overviewNumerical = {
    name: [...new Set(parametersName)],
    overallResult,
  };
  // setOverviewNumerical();
  return { detailedResult: result, overviewResult: overviewNumerical };
};
