import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const modalStatusSlice = createSlice({
  name: 'Modal-Status',
  initialState: {
    isModalSignInOpen: false,
    isModalSignUpOpen: false,
    isModalForgetPassowordOpen: false,
  },
  reducers: {
    toggleModalSignIn: (state, action: PayloadAction<boolean>) => {
      return {
        ...state,
        isModalSignInOpen: action.payload,
      };
    },
    toggleModalSignUp: (state, action: PayloadAction<boolean>) => {
      return {
        ...state,
        isModalSignUpOpen: action.payload,
      };
    },
    toggleModalForgetPassword: (state, action: PayloadAction<boolean>) => {
      return {
        ...state,
        isModalForgetPassowordOpen: action.payload,
      };
    },
  },
});

export const { toggleModalForgetPassword, toggleModalSignIn, toggleModalSignUp } = modalStatusSlice.actions;
export default modalStatusSlice.reducer;
