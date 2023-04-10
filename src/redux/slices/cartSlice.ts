import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store';

export type TCartItem = {
  id: number;
  count: number;
  type: string;
  size: number;
  title: string;
  price: number;
  imageUrl: string;
};

interface ICartSliceState {
  totalPrice: number;
  items: TCartItem[];
}

const initialState: ICartSliceState = {
  totalPrice: 0,
  items: [],
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

      state.totalPrice = state.items.reduce((sum, obj) => {
        return sum + obj.price * obj.count;
      }, 0);
    },
    reduceItem(state, action: PayloadAction<number>) {
      const findItem = state.items.find((obj) => obj.id === action.payload);
      if (findItem) {
        findItem.count--;
      }
    },
    removeItem(state, action: PayloadAction<number>) {
      state.items = state.items.filter((obj) => obj.id !== action.payload);
    },
    clearCart(state) {
      state.items = [];
      state.totalPrice = 0;
    },
  },
});

export const selectCartSlice = (state: RootState) => state.cartSlice;
export const selectCartSliceById = (id: number) => (state: RootState) => state.cartSlice.items.find(obj => obj.id === id);

export const { addItem, removeItem, reduceItem, clearCart } = cartSlice.actions;

export default cartSlice.reducer;
