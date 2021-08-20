import { createSlice } from '@reduxjs/toolkit';
import { branches, clients } from './master'

export const masterSlice = createSlice({
  name: 'master',
  initialState: {
    branches,
    clients,
    isFetching: false,
    isSuccess: false,
    isError: false,
    errorMessage: '',
  },
  reducers: {
    clearState: (state) => {
      state.isError = false;
      state.isSuccess = false;
      state.isFetching = false;
      return state;
    },
  },
});

export const { clearState } = masterSlice.actions;

export default masterSlice.reducer;
