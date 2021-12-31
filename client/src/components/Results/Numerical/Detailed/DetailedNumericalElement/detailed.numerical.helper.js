export function sortNumber(
  updatedParameters,
  setUpdatedParameters,
  isascending,
  setParametersName,
  key
) {
  let result;
  if (!isascending) {
    result = updatedParameters.sort((a, b) => {
      let fa = a[key],
        fb = b[key];

      if (fa < fb) {
        return -1;
      }
      if (fa > fb) {
        return 1;
      }
      return 0;
    });
  } else {
    result = updatedParameters.sort((a, b) => {
      let fa = a[key],
        fb = b[key];

      if (fb < fa) {
        return -1;
      }
      if (fb > fa) {
        return 1;
      }
      return 0;
    });
  }

  const xyz = result.map((x) => x.type);
  setParametersName(xyz);

  setUpdatedParameters(result);
}
