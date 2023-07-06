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
    updateCurrentPetDetails: (state, action) => {
      state.currentPet = { ...state.currentPet, ...action.payload };
    },
    updatePetData: (state, action) => {
      const { petId, updatedDetails } = action.payload;
      state.pets = state.pets.map((pet) =>
        pet.id === petId ? { ...pet, ...updatedDetails } : pet
      );
    },
  },
});

export const {
  setPets,
  setCurrentPet,
  updateCurrentPetDetails,
  updatePetData,
} = petsSlice.actions;

export default petsSlice.reducer;
