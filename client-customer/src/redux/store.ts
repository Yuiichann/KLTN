import { configureStore } from '@reduxjs/toolkit';
import cartSlice from './features/cart.slice';
import globalLoadingSlice from './features/globalLoading.slice';
import modalStatusSlice from './features/modalStatus.slice';
import userSlice from './features/user.slice';

const store = configureStore({
  reducer: {
    globalLoading: globalLoadingSlice,
    user: userSlice,
    carts: cartSlice,
    modalStatus: modalStatusSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispath = typeof store.dispatch;

export default store;
