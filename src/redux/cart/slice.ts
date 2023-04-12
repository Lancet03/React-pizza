import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { getCartFromLocalStorage } from '../../utils/getCartFromLocalStorage';
import { ICartSliceState, TCartItem } from './types';
import { calcTotalPrice } from '../../utils/calcTotalPrice';




const {items, totalPrice} = getCartFromLocalStorage();

const initialState: ICartSliceState = {
  totalPrice,
  items,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    // addItem (state, action){

    //     state.items.push(action.payload);
    //     state.totalPrice = state.items.reduce((sum, obj) => {
    //         return sum + obj.price
    //     }, 0)
    // },
    addItem(state, action: PayloadAction<TCartItem>) {
      const findItem = state.items.find((obj) => obj.id === action.payload.id);

      if (findItem) {
        findItem.count++;
      } else {
        state.items.push({
          ...action.payload,
          count: 1,
        });
      }

      state.totalPrice = calcTotalPrice(state.items);
    },
    reduceItem(state, action: PayloadAction<number>) {
      const findItem = state.items.find((obj) => obj.id === action.payload);
      if (findItem) {
        findItem.count--;
      };

      state.totalPrice = calcTotalPrice(state.items);
    },
    removeItem(state, action: PayloadAction<number>) {
      state.items = state.items.filter((obj) => obj.id !== action.payload);

      state.totalPrice = calcTotalPrice(state.items);

    },
    clearCart(state) {
      state.items = [];
      state.totalPrice = 0;
    },
  },
});



export const { addItem, removeItem, reduceItem, clearCart } = cartSlice.actions;

export default cartSlice.reducer;
