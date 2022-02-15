import Cookies from "js-cookie";
import jwt_decode from "jwt-decode";
import { deleteData, getData, patchData, postData } from "utils/fetchData";
import { setAlert } from "./alertSlice";
import { removeLoader, setLoader } from "./loaderSlice";
import { setNotify } from "./notifySlice";

const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");

export const registerUser = createAsyncThunk(
  "user/registerUser",
  async ({ userData, clearInput }, { dispatch, rejectWithValue }) => {
    try {
      dispatch(setLoader());
      const res = await postData("users/signup", userData);
      dispatch(removeLoader());
      if (res.err) {
        res.err.forEach((error) => dispatch(setAlert(error.msg, "danger")));
        return rejectWithValue();
      }
      dispatch(setAlert(res.msg, "success"));
      clearInput();
    } catch (err) {
      console.error(err);
      dispatch(setNotify({ error: err.message }));
    }
  }
);
export const loginUser = createAsyncThunk(
  "user/loginUser",
  async (userData, { dispatch, rejectWithValue }) => {
    try {
      dispatch(setLoader());
      const res = await postData("users/signin", userData);
      dispatch(removeLoader());
      if (res.err) {
        res.err.forEach((error) => dispatch(setAlert(error.msg, "danger")));
        return rejectWithValue();
      }

      dispatch(setNotify({ success: res.msg }));

      Cookies.set("refreshtoken", res.refresh_token, {
        expires: 7,
      });

      localStorage.setItem("firstLogin", true);
      return {
        token: res.access_token,
        user: res.user,
      };
    } catch (err) {
      console.error(err);
    }
  }
);
export const loadUser = createAsyncThunk(
  "user/loadUser",
  async (_, { rejectWithValue }) => {
    const refreshToken = Cookies.get("refreshtoken") || "";

    if (refreshToken) {
      const decodedToken = jwt_decode(refreshToken);
      if (decodedToken.exp * 1000 < Date.now()) {
        Cookies.remove("refreshtoken");
        localStorage.removeItem("firstLogin");
        return rejectWithValue();
      }
      const res = await getData("users/access_token", refreshToken);
      if (res.err) {
        Cookies.remove("refreshtoken");
        localStorage.removeItem("firstLogin");
        return rejectWithValue();
      }
      return {
        token: res.access_token,
        user: res.user,
      };
    } else {
      Cookies.remove("refreshtoken");
      localStorage.removeItem("firstLogin");
      return rejectWithValue();
    }
  }
);

export const activateUserEmail = createAsyncThunk(
  "user/activateUserEmail",
  async ({ activate_token }, { dispatch, rejectWithValue }) => {
    try {
      dispatch(setLoader());
      const res = await postData("users/activation_email", { activate_token });
      dispatch(removeLoader());
      if (res.err) {
        return rejectWithValue(res.err[0].msg);
      }

      dispatch(setNotify({ success: res.msg }));

      Cookies.set("refreshtoken", res.refresh_token, {
        expires: 7,
      });

      localStorage.setItem("firstLogin", true);
      return {
        token: res.access_token,
        user: res.user,
      };
    } catch (err) {
      console.error(err);
    }
  }
);
export const forgetUserPassword = createAsyncThunk(
  "user/forgetUserPassword",
  async (email, { dispatch, rejectWithValue }) => {
    try {
      dispatch(setLoader());
      const res = await postData("users/forget_password", { email });
      dispatch(removeLoader());
      if (res.err) {
        res.err.forEach((error) =>
          dispatch(setAlert(error.msg, error.alertType || "danger"))
        );
        return rejectWithValue();
      }

      dispatch(setAlert(res.msg, "success"));
    } catch (err) {
      console.error(err);
    }
  }
);
export const resetUserPassword = createAsyncThunk(
  "user/resetUserPassword",
  async ({ password, token }, { dispatch, rejectWithValue }) => {
    try {
      dispatch(setLoader());
      const res = await patchData("users/reset_password", password, token);
      dispatch(removeLoader());
      if (res.err) {
        res.err.forEach((error) => dispatch(setAlert(error.msg, "danger")));
        return rejectWithValue();
      }

      dispatch(setAlert(res.msg, "success"));
      Cookies.set("refreshtoken", res.refresh_token, {
        expires: 7,
      });

      localStorage.setItem("firstLogin", true);
      return {
        token: res.access_token,
        user: res.user,
      };
    } catch (err) {
      console.error(err);
    }
  }
);

export const getAllUsers = createAsyncThunk(
  "user/getAllUsers",
  async (_, { dispatch, getState, rejectWithValue }) => {
    try {
      const token = getState().auth.token;
      dispatch(setLoader());
      const res = await getData("users/all_infor", token);
      dispatch(removeLoader());

      if (res.err) {
        dispatch(setNotify({ error: res.err }));
        return rejectWithValue();
      }

      return {
        users: res.users,
      };
    } catch (err) {
      console.error(err);
    }
  }
);
export const deleteUser = createAsyncThunk(
  "user/deleteUser",
  async ({ id, data }, { dispatch, getState, rejectWithValue }) => {
    try {
      const token = getState().auth.token;
      dispatch(setLoader());
      const res = await deleteData(`users/delete_user/${id}`, token);
      dispatch(removeLoader());

      if (res.err) {
        dispatch(setNotify({ error: res.err }));
        return rejectWithValue();
      }

      dispatch(setNotify({ success: res.msg }));

      const newData = data.filter((item) => item._id !== id);

      return {
        users: newData,
      };
    } catch (err) {
      console.error(err);
    }
  }
);
export const updateUserRole = createAsyncThunk(
  "user/updateUserRole",
  async (
    { narrowResult, initialUser },
    { dispatch, getState, rejectWithValue }
  ) => {
    try {
      const token = getState().auth.token;
      const loggedInUserId = getState().auth.user.id;
      dispatch(setLoader());
      const res = await patchData("users/update_role", narrowResult, token);
      dispatch(removeLoader());

      if (res.err) {
        dispatch(setNotify({ error: res.err }));
        return rejectWithValue();
      }

      dispatch(setNotify({ success: res.msg }));

      const updatingLoggedInUser = initialUser.filter(
        ({ _id: usersId }) => usersId === loggedInUserId
      )[0];

      const updatedLoggedInUser = {
        id: updatingLoggedInUser._id,
        name: updatingLoggedInUser.fullname,
        email: updatingLoggedInUser.email,
        company_name: updatingLoggedInUser.company_name,
        job_profile: updatingLoggedInUser.job_profile,
        role: updatingLoggedInUser.role,
      };

      return {
        users: initialUser,
        user: updatedLoggedInUser,
      };
    } catch (err) {
      console.error(err);
    }
  }
);

const authSlice = createSlice({
  name: "user",
  initialState: {
    token: "",
    user: {},
  },
  reducers: {
    logout: (state) => {
      state.token = "";
      state.user = {};
    },
    deletingLoggedInUser: (state) => {
      state.token = "";
      state.user = {};
    },
    removeAllUsers: (state) => {
      state.users = [];
      delete state.users;
    },
  },
  extraReducers: {
    [loadUser.fulfilled]: (state, { payload }) => {
      state.token = payload.token;
      state.user = payload.user;
    },
    [loginUser.fulfilled]: (state, { payload }) => {
      state.token = payload.token;
      state.user = payload.user;
    },
    [activateUserEmail.fulfilled]: (state, { payload }) => {
      state.token = payload.token;
      state.user = payload.user;
    },
    [activateUserEmail.rejected]: (state, { payload }) => {
      state.err = payload;
    },
    [resetUserPassword.fulfilled]: (state, { payload }) => {
      state.token = payload.token;
      state.user = payload.user;
    },
    [getAllUsers.fulfilled]: (state, { payload }) => {
      state.users = payload.users;
    },
    [deleteUser.fulfilled]: (state, { payload }) => {
      state.users = payload.users;
    },
    [updateUserRole.fulfilled]: (state, { payload }) => {
      state.users = payload.users;
      state.user = payload.user;
    },
  },
});

export const { logout, removeAllUsers, deletingLoggedInUser } =
  authSlice.actions;

export default authSlice.reducer;
