import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getData, patchData, postData } from "utils/fetchData";
import { removeLoader, setLoader } from "./loaderSlice";
import { setNotify } from "./notifySlice";

export const getParameters = createAsyncThunk(
  "paramWeightages/getParameters",
  async (_, { dispatch, getState, rejectWithValue, fulfillWithValue }) => {
    try {
      const token = getState().auth.token;
      const res = await getData("parameters", token);
      if (res.err) {
        dispatch(setNotify({ error: res.err }));
        return rejectWithValue();
      }
      if (res.noParams) {
        return rejectWithValue({
          noParams: res.noParams,
        });
      }

      return {
        parameters: res.parameters,
        optionName: res.optionName,
      };
    } catch (err) {
      console.error(err);
    }
  }
);

export const addParameters = createAsyncThunk(
  "paramWeightages/addParameters",
  async (
    { parameters, history },
    { dispatch, getState, rejectWithValue, fulfillWithValue }
  ) => {
    try {
      const token = getState().auth.token;
      dispatch(setLoader());
      const res = await postData(
        "parameters/add_parameters",
        { parameters },
        token
      );
      dispatch(removeLoader());

      if (res.err) {
        dispatch(setNotify({ error: res.err }));
        return rejectWithValue();
      }

      setTimeout(() => {
        history.push("/weightages");
      }, 0);

      return fulfillWithValue({
        parameters: res.parameters,
        optionName: res.optionName,
      });
    } catch (err) {
      console.error(err);
    }
  }
);
export const addWeightages = createAsyncThunk(
  "paramWeightages/addWeightages",
  async (
    { weightages, setShowSelectOptionModal },
    { dispatch, getState, rejectWithValue, fulfillWithValue }
  ) => {
    try {
      const token = getState().auth.token;
      dispatch(setLoader());
      const res = await patchData(
        "parameters/add_weightages",
        { weightages },
        token
      );
      dispatch(removeLoader());

      if (res.err) {
        dispatch(setNotify({ error: res.err }));
        return rejectWithValue();
      }
      setShowSelectOptionModal(true);

      return fulfillWithValue({
        parameters: res.parameters,
        optionName: res.optionName,
      });
    } catch (err) {
      console.error(err);
    }
  }
);

export const addOptionName = createAsyncThunk(
  "paramWeightages/addOptionName",
  async (
    { name, history },
    { dispatch, getState, rejectWithValue, fulfillWithValue }
  ) => {
    try {
      const token = getState().auth.token;
      dispatch(setLoader());
      const res = await patchData("parameters/add_optionname", { name }, token);
      dispatch(removeLoader());

      if (res.err) {
        dispatch(setNotify({ error: res.err }));
        return rejectWithValue();
      }

      setTimeout(() => {
        history.push("/scores");
      }, 0);

      return fulfillWithValue({
        parameters: res.parameters,
        optionName: res.optionName,
      });
    } catch (err) {
      console.error(err);
    }
  }
);

export const addScores = createAsyncThunk(
  "paramWeightages/addScores",
  async (
    { scores, history },
    { dispatch, getState, rejectWithValue, fulfillWithValue }
  ) => {
    try {
      const token = getState().auth.token;
      dispatch(setLoader());
      const res = await patchData("parameters/add_scores", { scores }, token);
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
      });
    } catch (err) {
      console.error(err);
    }
  }
);

const paramWeightagesSlice = createSlice({
  name: "paramWeightages",
  initialState: {
    parameters: [],
    noParams: "",
    optionName: [],
  },
  reducers: {},
  extraReducers: {
    [addParameters.fulfilled]: (state, { payload }) => {
      state.parameters = payload.parameters;
      state.optionName = payload.optionName;
    },
    [getParameters.fulfilled]: (state, { payload }) => {
      state.parameters = payload.parameters;
      state.optionName = payload.optionName;
    },
    [getParameters.rejected]: (state, { payload }) => {
      state.noParams = payload.noParams;
    },
    [addWeightages.fulfilled]: (state, { payload }) => {
      state.parameters = payload.parameters;
      state.optionName = payload.optionName;
    },
    [addOptionName.fulfilled]: (state, { payload }) => {
      state.parameters = payload.parameters;
      state.optionName = payload.optionName;
    },
    [addScores.fulfilled]: (state, { payload }) => {
      state.parameters = payload.parameters;
      state.optionName = payload.optionName;
    },
  },
});

export default paramWeightagesSlice.reducer;
