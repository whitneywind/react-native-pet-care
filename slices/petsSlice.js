import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  pets: null,
  currentPet: null,
};

export const petsSlice = createSlice({
  name: "pets",
  initialState,
  reducers: {
    setPets: (state, action) => {
      state.pets = action.payload;
    },
    setCurrentPet: (state, action) => {
      state.currentPet = action.payload;
    },
  },
});

export const { setPets, setCurrentPet } = petsSlice.actions;

export default petsSlice.reducer;
