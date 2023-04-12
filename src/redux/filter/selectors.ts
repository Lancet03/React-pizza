import { RootState } from "../store";

export const selectFilterSlice = (state: RootState) => state.filterSlice;
export const selectFilterSliceSort = (state: RootState) => state.filterSlice.activeSort;