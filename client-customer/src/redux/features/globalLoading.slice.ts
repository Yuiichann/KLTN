import { PayloadAction, createSlice } from '@reduxjs/toolkit';

const globalLoading = createSlice({
  name: 'Global-Loading',
  initialState: {
    isGlobalLoading: true,
  },
  reducers: {
    setGlobalLoading: (state, action: PayloadAction<boolean>) => {
      state.isGlobalLoading = action.payload;
      return state;
    },
  },
});

export const { setGlobalLoading } = globalLoading.actions;
export default globalLoading.reducer;
