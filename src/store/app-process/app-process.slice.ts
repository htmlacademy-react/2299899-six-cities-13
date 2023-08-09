import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { CITIES, NameSpace, SORT_OPTIONS } from '../../const';
import { AppProcess } from '../../types/state';

const initialState: AppProcess = {
  currentSort: SORT_OPTIONS[0],
  city: CITIES[0],
};

export const appProcess = createSlice({
  name: NameSpace.App,
  initialState,
  reducers: {
    setCurrentSort: (state, action: PayloadAction<string>) => {
      state.city = action.payload;
    },
    setCity: (state, action: PayloadAction<string>) => {
      state.city = action.payload;
    },
  },
});

export const { setCurrentSort, setCity } = appProcess.actions;
