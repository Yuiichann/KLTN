import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IUserSlice } from '../../types/user.types';

const initialState: IUserSlice = {
  user: null,
};

const userSlice = createSlice({
  name: 'User',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<IUserSlice['user']>) => {
      state.user = action.payload;
    },

    setIsBroker: (state, action: PayloadAction<boolean>) => {
      if (state.user) {
        state.user.isBroker = action.payload;
        return state;
      }
    },

    setAvatar: (state, action: PayloadAction<string>) => {
      if (state.user) {
        state.user.avatar = action.payload;
        return state;
      }
    },
  },
});

export const { setUser, setIsBroker, setAvatar } = userSlice.actions;
export default userSlice.reducer;
