const { createSlice } = require("@reduxjs/toolkit");

const modalSlice = createSlice({
  name: "modal",
  initialState: {
    modal: [],
  },
  reducers: {
    addModal: (state, { payload }) => {
      state.modal = payload;
    },
    removeModal: (state) => {
      state.modal = [];
    },
  },
});

export const { addModal, removeModal } = modalSlice.actions;

export default modalSlice.reducer;
