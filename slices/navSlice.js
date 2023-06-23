import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  location: null,
};

export const navSlice = createSlice({
  name: "nav",
  initialState,
  reducer: {
    setLocation: (state, action) => {
      state.location = action.payload;
    },
  },
});

export const { setLocation } = navSlice.actions;

export const selectLocation = (state) => state.nav.location;

export default navSlice.reducer;
