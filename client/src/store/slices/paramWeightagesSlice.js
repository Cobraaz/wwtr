import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  // getData,
  // patchData,
  postData,
  // deleteData
} from "utils/fetchData";
import { removeLoader, setLoader } from "./loaderSlice";
import { setNotify } from "./notifySlice";
import { v4 as uuidv4 } from "uuid";

// export const getParameters = createAsyncThunk(
//   "paramWeightages/getParameters",
//   async (_, { dispatch, getState, rejectWithValue, fulfillWithValue }) => {
//     try {
//       const token = getState().auth.token;
//       const res = await getData("parameters", token);
//       if (res.err) {
//         dispatch(setNotify({ error: res.err }));
//         return rejectWithValue();
//       }
//       if (res.noParams) {
//         return rejectWithValue({
//           noParams: res.noParams,
//         });
//       }

//       return {
//         parameters: res.parameters,
//         optionName: res.optionName,
//       };
//     } catch (err) {
//       console.error(err);
//     }
//   }
// );

// export const addParameters = createAsyncThunk(
//   "paramWeightages/addParameters",
//   async (
//     { parameters, history },
//     { dispatch, getState, rejectWithValue, fulfillWithValue }
//   ) => {
//     try {
//       const token = getState().auth.token;
//       dispatch(setLoader());
//       const res = await postData(
//         "parameters/add_parameters",
//         { parameters },
//         token
//       );
//       dispatch(removeLoader());

//       if (res.err) {
//         dispatch(setNotify({ error: res.err }));
//         return rejectWithValue();
//       }

//       setTimeout(() => {
//         history.push("/weightages");
//       }, 0);

//       return fulfillWithValue({
//         parameters: res.parameters,
//         optionName: res.optionName,
//       });
//     } catch (err) {
//       console.error(err);
//     }
//   }
// );
// export const addWeightages = createAsyncThunk(
//   "paramWeightages/addWeightages",
//   async (
//     { weightages, setShowSelectOptionModal },
//     { dispatch, getState, rejectWithValue, fulfillWithValue }
//   ) => {
//     try {
//       const token = getState().auth.token;
//       dispatch(setLoader());
//       const res = await patchData(
//         "parameters/add_weightages",
//         { weightages },
//         token
//       );
//       dispatch(removeLoader());

//       if (res.err) {
//         dispatch(setNotify({ error: res.err }));
//         return rejectWithValue();
//       }
//       setShowSelectOptionModal(true);

//       return fulfillWithValue({
//         parameters: res.parameters,
//         optionName: res.optionName,
//       });
//     } catch (err) {
//       console.error(err);
//     }
//   }
// );

// export const addOptionName = createAsyncThunk(
//   "paramWeightages/addOptionName",
//   async (
//     { name, history },
//     { dispatch, getState, rejectWithValue, fulfillWithValue }
//   ) => {
//     try {
//       const token = getState().auth.token;
//       dispatch(setLoader());
//       const res = await patchData("parameters/add_optionname", { name }, token);
//       dispatch(removeLoader());

//       if (res.err) {
//         dispatch(setNotify({ error: res.err }));
//         return rejectWithValue();
//       }

//       setTimeout(() => {
//         history.push("/scores");
//       }, 0);

//       return fulfillWithValue({
//         parameters: res.parameters,
//         optionName: res.optionName,
//       });
//     } catch (err) {
//       console.error(err);
//     }
//   }
// );
// export const resetParameters = createAsyncThunk(
//   "paramWeightages/resetParameters",
//   async (_, { dispatch, getState, rejectWithValue, fulfillWithValue }) => {
//     try {
//       const token = getState().auth.token;
//       dispatch(setLoader());
//       const res = await deleteData("parameters/reset_parameters", token);
//       dispatch(removeLoader());

//       if (res.err) {
//         dispatch(setNotify({ error: res.err }));
//         return rejectWithValue();
//       }

//       return fulfillWithValue();
//     } catch (err) {
//       console.error(err);
//     }
//   }
// );

export const addResult = createAsyncThunk(
  "paramWeightages/add_result",
  async (
    { parameters, optionName, history },
    { dispatch, getState, rejectWithValue, fulfillWithValue }
  ) => {
    try {
      const parameterName = getState().paramsWeightages.name;
      const token = getState().auth.token;
      dispatch(setLoader());

      const res = await postData(
        "parameters/add_parameters",
        { parameters, optionName, parameterName },
        token
      );
      dispatch(removeLoader());

      if (res.err) {
        dispatch(setNotify({ error: res.err }));
        return rejectWithValue();
      }

      setTimeout(() => {
        history.push("/results");
      }, 0);

      return fulfillWithValue({
        parameters: res.parameters,
        optionName: res.optionName,
        name: res.name,
      });
    } catch (err) {
      console.error(err);
    }
  }
);

const initialState = {
  parameters: [],
  optionName: [],
  name: "",
};

const paramWeightagesSlice = createSlice({
  name: "paramWeightages",
  initialState,
  reducers: {
    addUpdateParameters: (state, { payload }) => {
      state.parameters = payload.parameters;
    },
    addUpdateOptionName: (state, { payload }) => {
      state.optionName = payload.optionName;
    },
    reset: (state) => {
      state.parameters = [];
      state.optionName = [];
      state.name = "";
    },
  },
  extraReducers: {
    // [addParameters.fulfilled]: (state, { payload }) => {
    //   state.parameters = payload.parameters;
    //   state.optionName = payload.optionName;
    // },
    // [getParameters.fulfilled]: (state, { payload }) => {
    //   state.parameters = payload.parameters;
    //   state.optionName = payload.optionName;
    // },
    // [getParameters.rejected]: (state, { payload }) => {
    //   state.noParams = payload.noParams;
    // },
    // [addWeightages.fulfilled]: (state, { payload }) => {
    //   state.parameters = payload.parameters;
    //   state.optionName = payload.optionName;
    // },
    // [addOptionName.fulfilled]: (state, { payload }) => {
    //   state.parameters = payload.parameters;
    //   state.optionName = payload.optionName;
    // },
    // [resetParameters.fulfilled]: (state) => {
    //   state.parameters = [];
    //   state.noParams = "";
    //   state.optionName = [];
    // },
    [addResult.fulfilled]: (state, { payload }) => {
      state.parameters = payload.parameters;
      state.optionName = payload.optionName;
      state.name = payload.name;
    },
  },
});

const { addUpdateParameters, addUpdateOptionName, reset } =
  paramWeightagesSlice.actions;

export const addParameters = ({ parameters, history }) => {
  return async (dispatch) => {
    try {
      const newParameters = parameters.map((parameter) => ({
        ...parameter,
        weightage: parameter.weightage || 0,
        comment: parameter.comment || "",
        optionName: parameter.optionName || [],
      }));
      const payload = {
        parameters: newParameters,
      };
      dispatch(addUpdateParameters(payload));
      history.push("/weightages");
    } catch (error) {
      console.error(error);
    }
  };
};
export const addWeightages = ({ parameters, setShowSelectOptionModal }) => {
  return async (dispatch) => {
    try {
      parameters = parameters.map((para) => {
        delete para.error;
        return para;
      });

      const payload = {
        parameters,
      };

      dispatch(addUpdateParameters(payload));
      setShowSelectOptionModal(true);
    } catch (error) {
      console.error(error);
    }
  };
};
export const addOptionName = ({ name, parameters, history }) => {
  return async (dispatch) => {
    try {
      const paraOptionName = name.map((name) => ({
        name,
        score: 0,
        _id: uuidv4(),
      }));
      const cloneParameters = JSON.parse(
        JSON.stringify(parameters.map((para) => para))
      );
      const updatingParameters = cloneParameters
        .map((para) => {
          let temp = [];
          if (
            para.optionName.length &&
            para.optionName.length === paraOptionName.length
          ) {
            temp = para.optionName;
          } else {
            para.optionName.push(
              ...paraOptionName.slice(para.optionName.length)
            );
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

      let payload = {};
      payload = {
        parameters: updatingParameters,
      };

      dispatch(addUpdateParameters(payload));
      payload = {
        optionName: name,
      };
      dispatch(addUpdateOptionName(payload));
      history.push("/scores");
    } catch (error) {
      console.error(error);
    }
  };
};

export const resetParameters = () => {
  return async (dispatch) => {
    try {
      dispatch(reset());
    } catch (error) {
      console.error(error);
    }
  };
};

export default paramWeightagesSlice.reducer;
