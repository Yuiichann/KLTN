import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import { INhaDat } from '../../types/nhaDat.types';

interface ICartSlice {
  carts: INhaDat[];
}

const dataLocal = localStorage.getItem('carts');

let initialState: ICartSlice = dataLocal
  ? JSON.parse(dataLocal)
  : {
      carts: [],
    };

const cartSlice = createSlice({
  name: 'Carts',
  initialState,
  reducers: {
    addCart: (state, action: PayloadAction<INhaDat>) => {
      if (state.carts.length > 20) {
        toast.error('Bạn chỉ được thêm tối đa 20 tin');
        return;
      }

      const checkValid = state.carts.find((item) => {
        const id = item.id || item._id;
        const payloadId = action.payload.id || action.payload._id;

        return id === payloadId;
      });

      if (checkValid) {
        toast.error('Đã có trong giỏ hàng', { autoClose: 1000 });
        return;
      }

      state.carts.unshift(action.payload);

      // add local
      localStorage.setItem('carts', JSON.stringify(state));

      toast.success('Đã thêm vào giỏ hàng', { autoClose: 500 });

      return state;
    },

    removeCart: (state, action: PayloadAction<string>) => {
      const checkIndex = state.carts.findIndex((item) => {
        const id = item.id || item._id;

        return id === action.payload;
      });

      if (checkIndex === -1) return;

      state.carts.splice(checkIndex, 1);

      // add local
      localStorage.setItem('carts', JSON.stringify(state));

      return state;
    },
  },
});

export const { addCart, removeCart } = cartSlice.actions;
export default cartSlice.reducer;
