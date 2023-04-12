import { RootState } from "../store";

export const selectCartSlice = (state: RootState) => state.cartSlice;
export const selectCartSliceById = (id: number) => (state: RootState) => state.cartSlice.items.find(obj => obj.id === id);