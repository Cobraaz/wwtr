const { createSlice } = require("@reduxjs/toolkit");

const loaderSlice = createSlice({
  name: "loader",
  initialState: {},
  reducers: {
    setLoader: (state) => {
      state.loading = true;
    },
    removeLoader: (state) => {
      state.loading = false;
    },
  },
});

export const { setLoader, removeLoader } = loaderSlice.actions;

export default loaderSlice.reducer;
