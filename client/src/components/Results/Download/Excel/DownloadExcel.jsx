import ReactExport from "react-data-export";
import { categoryArrayElement } from "utils/helper.function";

const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;

const DownloadExcel = ({
  props: {
    detailedResult,
    overviewNumerical,
    element,
    optionName: oldOptionName,
    viewValue,
    setIsEXCELDownload,
    optionValue,
    LoggedInUserName,
  },
  parametersArray,
}) => {
  function load() {
    const responseAllParameters = parametersArray.map((parameter, i) => ({
      ...parameter,
      index: i,
    }));
    const getSelectedParameterWithName = detailedResult.map((dRes) => ({
      name: dRes.name,
      category: dRes.category,
      parametersType: dRes.parametersType,
    }));
    const UpdatedAllParameters = [];
    categoryArrayElement.map(({ categoryName }) => {
      const dummy2 = [];
      for (let j = 0; j < responseAllParameters.length; j++) {
        if (categoryName === responseAllParameters[j].category)
          dummy2.push(responseAllParameters[j].type);
      }
      UpdatedAllParameters.push({
        category: categoryName,
        parametersType: dummy2,
      });
      return null;
    });

    const dummy = [];

    categoryArrayElement.map(({ categoryName }, i) => {
      if (
        getSelectedParameterWithName.find((o) => o.category === categoryName)
      ) {
        return dummy.push(
          ...getSelectedParameterWithName.filter(
            (o) => o.category === categoryName
          )
        );
      }
      return dummy.push({
        category: categoryName,
        parametersType: [],
      });
    });

    getSelectedParameterWithName.splice(0, getSelectedParameterWithName.length);

    getSelectedParameterWithName.push(...dummy);

    const result = categoryArrayElement.map((_, i) => {
      let difference = UpdatedAllParameters[i].parametersType.filter(
        (x) => !getSelectedParameterWithName[i].parametersType.includes(x)
      );

      return {
        category: UpdatedAllParameters[i].category,
        parametersType: difference,
      };
    });
    // result difference
    // UpdatedAllParameters saare hai isme

    const xyzResult = categoryArrayElement.map(({ categoryName, name }, i) => {
      if (
        getSelectedParameterWithName.find((o) => o.category === categoryName)
          .parametersType.length > 0
      ) {
        if (result[i].parametersType.length > 0) {
          const findDetailedResult = detailedResult.find(
            ({ category }) => category === categoryName
          );
          const updatedDetailedResultValue =
            findDetailedResult.detailedData.optionName.map((opName) => {
              return {
                ...opName,
                parameters: UpdatedAllParameters[i].parametersType.map(
                  (paraType) => {
                    const findParameter = opName.parameters.find(
                      (e) => paraType === e.type
                    );
                    if (findParameter && findParameter.type) {
                      return findParameter;
                    } else {
                      return {
                        score: 0,
                        weight: 0,
                        weightedScore: 0,
                        type: paraType,
                        opName: opName.name,
                      };
                    }
                  }
                ),
              };
            });

          return {
            ...findDetailedResult,
            detailedData: {
              ...findDetailedResult.detailedData,
              optionName: updatedDetailedResultValue,
            },
          };
        } else {
          return detailedResult[i];
        }
      } else {
        return {
          name,
          category: categoryName,
          parametersType: result[i].parametersType,
          detailedData: {
            name: categoryName,
            optionName: oldOptionName.map((opName) => ({
              name: opName,
              parameters: result[i].parametersType.map((paraName) => ({
                score: 0,
                weight: 0,
                weightedScore: 0,
                type: paraName,
                opName: opName,
              })),
              totalScore: {
                score: 0,
                weightedScore: 0,
              },
              avgScore: {
                score: 0,
                weightedScore: 0,
              },
              comparisonScore: {
                score: 0,
                weightedScore: 0,
              },
            })),
          },
        };
      }
    });

    return xyzResult.filter((item) => item);
  }

  const multiDataSetDetailed = () => {
    const oldModifiedDetailedResult = load()
      .map(({ parametersType, name, detailedData }) => ({
        name,
        parametersType,
        optionName: detailedData.optionName.map((opName, index) => {
          if (optionValue.includes(index)) {
            return [
              ...opName.parameters,
              opName.totalScore,
              opName.avgScore,
              opName.comparisonScore,
            ];
          }
          return null;
        }),
      }))
      .map((opNameFilter) => ({
        ...opNameFilter,
        optionName: opNameFilter.optionName.filter(
          (filtering) => filtering && filtering.length
        ),
      }));

    const updatedDetailedResult = oldModifiedDetailedResult.map(
      ({ name, optionName }) => {
        const nestedOption1 = [];
        for (let i = 0; i < optionName[0].length; i++) {
          const nestedOption2 = [];
          for (let j = 0; j < optionName.length; j++) {
            nestedOption2.push(optionName[j][i]);
          }
          nestedOption1.push(nestedOption2);
        }
        return { name, optionName: nestedOption1 };
      }
    );
    let result = updatedDetailedResult.map(
      ({ name, optionName }, updatedDetailedResultIndex) => {
        const pushColumn = [];
        Array.from(Array(optionName[0].length).keys()).map(() =>
          pushColumn.push(
            {
              title: "",
            },
            {
              title: "Score (1-4) ",
              width: { wch: 10 },
              style: {
                font: { sz: "11", bold: true },
                alignment: {
                  wrapText: true,
                  horizontal: "center",
                  vertical: "top",
                },
                border: {
                  top: { style: "medium" },
                  bottom: { style: "thin" },
                  left: { style: "medium" },
                },
              },
            },
            {
              title: "Weight (0-10) ",
              width: { wch: 13 },
              style: {
                font: { sz: "11", bold: true },
                alignment: {
                  wrapText: true,
                  horizontal: "center",
                  vertical: "top",
                },
                border: {
                  top: { style: "medium" },
                  bottom: { style: "thin" },
                },
              },
            },
            {
              title: "Weighted Score",
              width: { wch: 15 },
              style: {
                font: { sz: "11", bold: true },
                alignment: {
                  wrapText: true,
                  horizontal: "center",
                  vertical: "top",
                },
                border: {
                  top: { style: "medium" },
                  bottom: { style: "thin" },
                  right: { style: "medium" },
                },
              },
            }
          )
        );
        const dataReturn = {
          columns: [
            {
              title: "Number",
              style: {
                font: { sz: "11", bold: true },
                alignment: {
                  wrapText: true,
                  horizontal: "center",
                  vertical: "top",
                },
                border: {
                  top: { style: "thin" },
                  bottom: { style: "thin" },
                  left: { style: "medium" },
                  right: { style: "medium" },
                },
              },
            },
            {
              title: "Parameters Evaluation",
              width: { wch: 35 },
              style: {
                font: { sz: "11", bold: true },
                alignment: {
                  wrapText: true,
                  horizontal: "center",
                  vertical: "top",
                },
                border: {
                  top: { style: "thin" },
                  bottom: { style: "thin" },
                  right: { style: "medium" },
                },
              },
            },
            ...pushColumn,
          ],
          data: optionName.map((opName, optionNameIndex) => {
            const pushData = [];
            opName.map((opName2, index) => {
              if (index === 0) {
                if (opName2.type) {
                  pushData.push({
                    value: optionNameIndex + 1,
                    style: {
                      alignment: {
                        wrapText: true,
                        horizontal: "center",
                        vertical: "top",
                      },
                      border: {
                        top: { style: "thin" },
                        bottom: { style: "thin" },
                        left: { style: "medium" },
                        right: { style: "medium" },
                      },
                    },
                  });
                  pushData.push({
                    value: opName2.type,
                    style: {
                      alignment: {
                        wrapText: true,
                        horizontal: "center",
                        vertical: "top",
                      },
                      border: {
                        left: { style: "medium" },
                        right: { style: "medium" },
                      },
                    },
                  });
                } else if (optionName.length - optionNameIndex === 3) {
                  pushData.push({
                    value: "",
                    style: {
                      border: {
                        top: { style: "thin" },
                        bottom: { style: "thin" },
                      },
                    },
                  });
                  pushData.push({
                    value: `${name} Score Total:`,
                    style: {
                      alignment: {
                        wrapText: true,
                        horizontal: "right",
                        vertical: "top",
                      },
                      border: {
                        top: { style: "medium" },
                        bottom: { style: "thin" },
                        left: { style: "medium" },
                        right: { style: "medium" },
                      },
                    },
                  });
                } else if (optionName.length - optionNameIndex === 2) {
                  pushData.push({
                    value: "",
                    style: {
                      border: {
                        top: { style: "thin" },
                        bottom: { style: "thin" },
                      },
                    },
                  });
                  pushData.push({
                    value: `${name} Weighted Avg. Score:`,
                    style: {
                      alignment: {
                        wrapText: true,
                        horizontal: "right",
                        vertical: "top",
                      },
                      border: {
                        top: { style: "thin" },
                        bottom: { style: "thin" },
                        left: { style: "medium" },
                        right: { style: "medium" },
                      },
                    },
                  });
                } else if (optionName.length - optionNameIndex === 1) {
                  pushData.push({
                    value: "",
                    style: {
                      border: {
                        top: { style: "thin" },
                        bottom: { style: "thin" },
                      },
                    },
                  });
                  pushData.push({
                    value: `${name} Comparison Score:`,
                    style: {
                      alignment: {
                        wrapText: true,
                        horizontal: "right",
                        vertical: "top",
                      },
                      border: {
                        top: { style: "thin" },
                        bottom: { style: "thin" },
                        left: { style: "medium" },
                        right: { style: "medium" },
                      },
                    },
                  });
                } else {
                  pushData.push({ value: "" });
                }
              }
              pushData.push({
                value: "",
              });

              if (optionName.length - optionNameIndex <= 3) {
                pushData.push({
                  value: opName2.score,
                  style: {
                    font: { sz: "11" },
                    alignment: {
                      wrapText: true,
                      horizontal: "center",
                      vertical: "top",
                    },
                    border: {
                      left: { style: "medium" },
                      top: { style: "thin" },
                      bottom: {
                        style:
                          optionName.length - optionNameIndex === 1
                            ? "medium"
                            : "thin",
                      },
                    },
                  },
                });
              } else {
                pushData.push({
                  value: opName2.score,
                  style: {
                    font: { sz: "11" },
                    alignment: {
                      wrapText: true,
                      horizontal: "center",
                      vertical: "top",
                    },
                    border: {
                      left: { style: "medium" },
                    },
                  },
                });
              }

              if (opName2.weight || opName2.weight === 0) {
                pushData.push({
                  value: opName2.weight,
                  style: {
                    font: { sz: "11" },
                    alignment: {
                      wrapText: true,
                      horizontal: "center",
                      vertical: "top",
                    },
                  },
                });
              } else {
                pushData.push({
                  value: "",
                  style: {
                    border: {
                      top: { style: "thin" },
                      bottom: {
                        style:
                          optionName.length - optionNameIndex === 1
                            ? "medium"
                            : "thin",
                      },
                    },
                  },
                });
              }
              if (optionName.length - optionNameIndex <= 3) {
                pushData.push({
                  value: opName2.weightedScore,
                  style: {
                    font: { sz: "11" },
                    alignment: {
                      wrapText: true,
                      horizontal: "center",
                      vertical: "top",
                    },
                    border: {
                      right: { style: "medium" },
                      top: { style: "thin" },
                      bottom: {
                        style:
                          optionName.length - optionNameIndex === 1
                            ? "medium"
                            : "thin",
                      },
                    },
                  },
                });
              } else {
                pushData.push({
                  value: opName2.weightedScore,
                  style: {
                    font: { sz: "11" },
                    alignment: {
                      wrapText: true,
                      horizontal: "center",
                      vertical: "top",
                    },
                    border: {
                      right: { style: "medium" },
                    },
                  },
                });
              }

              return index;
            });
            return pushData;
          }),
        };

        const backgroundBlueInheading = [];
        oldOptionName.map((_, index) => {
          backgroundBlueInheading.push({
            title: "",
            style: {
              fill: {
                patternType: "solid",
                fgColor: { rgb: "FF03a9f4" },
              },
            },
          });
          backgroundBlueInheading.push({
            title: "",
            style: {
              fill: {
                patternType: "solid",
                fgColor: { rgb: "FF03a9f4" },
              },
              border: {
                left: { style: "medium" },
              },
            },
          });
          backgroundBlueInheading.push({
            title: "",
            style: {
              fill: {
                patternType: "solid",
                fgColor: { rgb: "FF03a9f4" },
              },
            },
          });
          backgroundBlueInheading.push({
            title: "",
            style: {
              fill: {
                patternType: "solid",
                fgColor: { rgb: "FF03a9f4" },
              },
              border: {
                right: { style: "medium" },
              },
            },
          });
          return index;
        });
        const addingOptionNameTopRow = [];
        Array.from(Array(oldOptionName.length).keys()).forEach(
          (value, index) => {
            if (optionValue.includes(index)) {
              addingOptionNameTopRow.push({
                title: "",
              });
              addingOptionNameTopRow.push({
                title: "",
                style: {
                  border: {
                    top: { style: "medium" },
                    bottom: { style: "thin" },
                    left: { style: "medium" },
                  },
                },
              });

              addingOptionNameTopRow.push({
                title: `Option ${value + 1}`,
                style: {
                  font: { sz: "11", bold: true },
                  alignment: {
                    wrapText: true,
                    horizontal: "center",
                    vertical: "top",
                  },
                  border: {
                    top: { style: "thin" },
                    bottom: { style: "thin" },
                  },
                },
              });
              addingOptionNameTopRow.push({
                title: "",
                style: {
                  border: {
                    top: { style: "medium" },
                    bottom: { style: "thin" },
                    right: { style: "medium" },
                  },
                },
              });
            }
          }
        );
        const addingOptionNameColumn = [];
        oldOptionName.map((name, index) => {
          if (optionValue.includes(index)) {
            addingOptionNameColumn.push({
              title: "",
            });
            addingOptionNameColumn.push({
              title: "",
              style: {
                border: {
                  top: { style: "thin" },
                  bottom: { style: "thin" },
                  left: { style: "medium" },
                },
              },
            });
            addingOptionNameColumn.push({
              title: `${name.toUpperCase()}`,
              style: {
                font: { sz: "11", bold: true },
                alignment: {
                  wrapText: true,
                  horizontal: "center",
                  vertical: "top",
                },
                border: {
                  top: { style: "thin" },
                  bottom: { style: "thin" },
                },
              },
            });
            addingOptionNameColumn.push({
              title: "",
              style: {
                border: {
                  top: { style: "thin" },
                  bottom: { style: "thin" },
                  right: { style: "medium" },
                },
              },
            });
          }
          return index;
        });
        if (!updatedDetailedResultIndex) {
          return [
            {
              columns: [
                {
                  title: "",
                },
                {
                  title: "",
                  style: {
                    border: {
                      top: { style: "medium" },
                      bottom: { style: "thin" },
                      right: { style: "medium" },
                      left: { style: "medium" },
                    },
                  },
                },
                ...addingOptionNameTopRow,
              ],
              data: [],
            },
            {
              columns: [
                {
                  title: "",
                },
                {
                  title: "Option Name",
                  style: {
                    font: { sz: "11", bold: true },
                    alignment: {
                      wrapText: true,
                      horizontal: "center",
                      vertical: "top",
                    },
                    border: {
                      top: { style: "thin" },
                      bottom: { style: "thin" },
                      right: { style: "medium" },
                      left: { style: "medium" },
                    },
                  },
                },
                ...addingOptionNameColumn,
              ],
              data: [],
            },
            {
              columns: [
                {
                  title: "",
                  style: {
                    fill: {
                      patternType: "solid",
                      fgColor: { rgb: "FF03a9f4" },
                    },
                    border: {
                      top: { style: "thin" },
                      bottom: { style: "thin" },
                      right: { style: "medium" },
                      left: { style: "medium" },
                    },
                  },
                },
                {
                  title: `${name} Considerations`,
                  style: {
                    font: { sz: "16", bold: true, color: { rgb: "FFFFFFFF" } },
                    fill: {
                      patternType: "solid",
                      fgColor: { rgb: "FF03a9f4" },
                    },
                    border: {
                      top: { style: "thin" },
                      bottom: { style: "thin" },
                      right: { style: "medium" },
                      left: { style: "medium" },
                    },
                  },
                },
                ...backgroundBlueInheading,
              ],
              data: [],
            },
            dataReturn,
          ];
        } else {
          const addingOptionNameTopRow = [];
          Array.from(Array(oldOptionName.length).keys()).forEach((_, index) => {
            if (optionValue.includes(index)) {
              addingOptionNameTopRow.push({
                title: "",
              });
              addingOptionNameTopRow.push({
                title: "",
                style: {
                  border: {
                    top: { style: "medium" },
                    bottom: { style: "thin" },
                    left: { style: "medium" },
                  },
                },
              });

              addingOptionNameTopRow.push({
                title: "",
                style: {
                  border: {
                    top: { style: "thin" },
                    bottom: { style: "thin" },
                  },
                },
              });
              addingOptionNameTopRow.push({
                title: "",
                style: {
                  border: {
                    top: { style: "medium" },
                    bottom: { style: "thin" },
                    right: { style: "medium" },
                  },
                },
              });
            }
          });
          return [
            {
              columns: [
                {
                  title: "",
                },
                {
                  title: "",
                  style: {
                    border: {
                      top: { style: "medium" },
                      bottom: { style: "thin" },
                      right: { style: "medium" },
                      left: { style: "medium" },
                    },
                  },
                },
                ...addingOptionNameTopRow,
              ],
              data: [],
            },
            {
              columns: [
                {
                  title: "",
                  style: {
                    fill: {
                      patternType: "solid",
                      fgColor: { rgb: "FF03a9f4" },
                    },
                    border: {
                      top: { style: "thin" },
                      bottom: { style: "thin" },
                      right: { style: "medium" },
                      left: { style: "medium" },
                    },
                  },
                },
                {
                  title: `${name} Considerations`,
                  // style: { font: { sz: "12", bold: true } },
                  style: {
                    font: { sz: "16", bold: true, color: { rgb: "FFFFFFFF" } },
                    fill: {
                      patternType: "solid",
                      fgColor: { rgb: "FF03a9f4" },
                    },
                    border: {
                      top: { style: "thin" },
                      bottom: { style: "thin" },
                      right: { style: "medium" },
                      left: { style: "medium" },
                    },
                  },
                },
                ...backgroundBlueInheading,
              ],
              data: [],
            },
            dataReturn,
          ];
        }
      }
    );
    const updatedResult = [];
    result.map((x) => updatedResult.push(...x));

    return updatedResult;
  };
  const multiDataSetOverall = () => {
    const copyCategoryArrayElement = categoryArrayElement.slice();
    copyCategoryArrayElement.push({
      categoryName: "overall option score",
      name: "Overall Option Score",
    });

    const updatingOverviewNumerical = overviewNumerical.overallResult.map(
      (overviewNumericalResult) => {
        return {
          name: overviewNumericalResult.name ?? "",
          result: copyCategoryArrayElement.map(({ name }) => {
            const findParameter = overviewNumericalResult.result.find(
              (e) => e.type === name
            );
            if (findParameter) {
              return findParameter;
            } else {
              return {
                score: 0,
                weightedScore: 0,
                type: name,
              };
            }
          }),
        };
      }
    );

    const oldModifiedOverviewResult = updatingOverviewNumerical
      .map((overRes, index) => optionValue.includes(index) && overRes.result)
      .filter((filtering) => filtering && filtering.length);

    const updatedDetailedResult = [];
    for (let i = 0; i < oldModifiedOverviewResult[0].length; i++) {
      const nestedOption2 = [];
      for (let j = 0; j < oldModifiedOverviewResult.length; j++) {
        nestedOption2.push(oldModifiedOverviewResult[j][i]);
      }
      updatedDetailedResult.push(nestedOption2);
    }

    const pushColumn = [];
    Array.from(Array(oldOptionName.length).keys()).map(() =>
      pushColumn.push(
        {
          title: "",
        },
        {
          title: "Category Score",
          width: { wch: 13 },
          style: {
            font: { sz: "11", bold: true },
            alignment: {
              wrapText: true,
              horizontal: "center",
              vertical: "top",
            },
            border: {
              top: { style: "thin" },
              bottom: { style: "medium" },
              left: { style: "medium" },
            },
          },
        },
        {
          title: "",
          width: { wch: 13 },
          style: {
            border: {
              top: { style: "thin" },
              bottom: { style: "medium" },
            },
          },
        },
        {
          title: "Weighted Category Score",
          width: { wch: 25 },
          style: {
            font: { sz: "11", bold: true },
            alignment: {
              wrapText: true,
              horizontal: "center",
              vertical: "top",
            },
            border: {
              top: { style: "thin" },
              bottom: { style: "medium" },
              right: { style: "medium" },
            },
          },
        }
      )
    );

    const result = {
      columns: [
        {
          title: "Parameters Evaluation",
          width: { wch: 30 },
          style: {
            font: { sz: "11", bold: true },
            alignment: {
              wrapText: true,
              horizontal: "center",
              vertical: "top",
            },
            border: {
              top: { style: "thin" },
              bottom: { style: "thin" },
              right: { style: "medium" },
            },
          },
        },
        ...pushColumn,
      ],
      data: updatedDetailedResult.map((opName, updatedDetailedResultIndex) => {
        const pushData = [];

        opName.map((opName2, index) => {
          if (index === 0) {
            if (
              opName2.type &&
              !(updatedDetailedResult.length - updatedDetailedResultIndex === 1)
            ) {
              pushData.push({
                value: `${opName2.type} Comparison Score:`,
                style: {
                  alignment: {
                    wrapText: true,
                    horizontal: "right",
                    vertical: "top",
                  },
                  border: {
                    top: { style: "thin" },
                    bottom: { style: "thin" },
                    left: { style: "medium" },
                    right: { style: "medium" },
                  },
                },
              });
            } else if (
              updatedDetailedResult.length - updatedDetailedResultIndex ===
              1
            ) {
              pushData.push({
                value: `${opName2.type}:`,
                style: {
                  alignment: {
                    wrapText: true,
                    horizontal: "right",
                    vertical: "top",
                  },
                  border: {
                    top: { style: "thin" },
                    bottom: { style: "thin" },
                    left: { style: "medium" },
                    right: { style: "medium" },
                  },
                },
              });
            } else {
              pushData.push({ value: "" });
            }
          }
          pushData.push({
            value: "",
          });
          pushData.push({
            value: opName2.score,
            style: {
              font: { sz: "11" },
              alignment: {
                wrapText: true,
                horizontal: "center",
                vertical: "top",
              },
              border: {
                left: { style: "medium" },
                top: { style: "thin" },
                bottom: { style: "thin" },
              },
            },
          });
          pushData.push({
            value: "",
            style: {
              border: {
                top: { style: "thin" },
                bottom: { style: "thin" },
              },
            },
          });

          pushData.push({
            value: opName2.weightedScore,
            style: {
              font: { sz: "11" },
              alignment: {
                wrapText: true,
                horizontal: "center",
                vertical: "top",
              },
              border: {
                right: { style: "medium" },
                top: { style: "thin" },
                bottom: { style: "thin" },
              },
            },
          });
          return index;
        });
        return pushData;
      }),
    };
    const addingOptionNameTopRow = [];
    Array.from(Array(oldOptionName.length).keys()).forEach((value, index) => {
      if (optionValue.includes(index)) {
        addingOptionNameTopRow.push({
          title: "",
        });
        addingOptionNameTopRow.push({
          title: "",
          style: {
            border: {
              top: { style: "medium" },
              bottom: { style: "thin" },
              left: { style: "medium" },
            },
          },
        });

        addingOptionNameTopRow.push({
          title: `Option ${value + 1}`,
          style: {
            font: { sz: "11", bold: true },
            alignment: {
              wrapText: true,
              horizontal: "center",
              vertical: "top",
            },
            border: {
              top: { style: "thin" },
              bottom: { style: "thin" },
            },
          },
        });
        addingOptionNameTopRow.push({
          title: "",
          style: {
            border: {
              top: { style: "medium" },
              bottom: { style: "thin" },
              right: { style: "medium" },
            },
          },
        });
      }
    });
    const addingOptionNameColumn = [];
    oldOptionName.map((name, index) => {
      if (optionValue.includes(index)) {
        addingOptionNameColumn.push({
          title: "",
        });
        addingOptionNameColumn.push({
          title: "",
          style: {
            border: {
              top: { style: "thin" },
              bottom: { style: "thin" },
              left: { style: "medium" },
            },
          },
        });
        addingOptionNameColumn.push({
          title: `${name.toUpperCase()}`,
          style: {
            font: { sz: "11", bold: true },
            alignment: {
              wrapText: true,
              horizontal: "center",
              vertical: "top",
            },
            border: {
              top: { style: "thin" },
              bottom: { style: "thin" },
            },
          },
        });
        addingOptionNameColumn.push({
          title: "",
          style: {
            border: {
              top: { style: "thin" },
              bottom: { style: "thin" },
              right: { style: "medium" },
            },
          },
        });
      }
      return index;
    });
    return [
      {
        columns: [
          {
            title: "",
            style: {
              border: {
                top: { style: "medium" },
                bottom: { style: "thin" },
                right: { style: "medium" },
                left: { style: "medium" },
              },
            },
          },
          ...addingOptionNameTopRow,
        ],
        data: [],
      },
      {
        columns: [
          {
            title: "Option Name",
            style: {
              font: { sz: "11", bold: true },
              alignment: {
                wrapText: true,
                horizontal: "center",
                vertical: "top",
              },
              border: {
                top: { style: "thin" },
                bottom: { style: "thin" },
                right: { style: "medium" },
                left: { style: "medium" },
              },
            },
          },
          ...addingOptionNameColumn,
        ],
        data: [],
      },
      result,
    ];
  };

  const downLoadExcel = () => {
    if (viewValue === 3) {
      return (
        <ExcelFile
          filename={`${LoggedInUserName} Overview table result`}
          hideElement={true}
          element={element}
        >
          <ExcelSheet dataSet={multiDataSetOverall()} name="Organization" />
        </ExcelFile>
      );
    } else {
      return (
        <ExcelFile
          filename={`${LoggedInUserName} Detailed table result`}
          hideElement={true}
          element={element}
        >
          <ExcelSheet dataSet={multiDataSetDetailed()} name="Organization" />
        </ExcelFile>
      );
    }
  };

  return (
    <div>
      {downLoadExcel(viewValue)}
      {setIsEXCELDownload(false)}
    </div>
  );
};

export default DownloadExcel;
