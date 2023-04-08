import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  categoryIndex: 0,
  currentPage: 1,
  searchValue: "",
  activeSort: {
    name: 'популярности (ASC)',
    sort: 'rating',
  },
};

const filterSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setCategoryIndex(state, action) {
      state.categoryIndex = action.payload;
    },
    setActiveSort(state, action) {
      state.activeSort = action.payload;
    },
    setCurrentPage(state, action) {
      state.currentPage = action.payload;
    },
    setStartFilter(state, action) {
      state.categoryIndex = Number(action.payload.categoryIndex);
      state.activeSort = action.payload.activeSort;
      state.currentPage = Number(action.payload.currentPage);
    },
    setSearchValue(state, action) {
      state.searchValue = action.payload;
    }
  },
});

export const selectFilterSlice = (state) => state.filterSlice;
export const selectFilterSliceSort = (state) => state.filterSlice.activeSort;

export const { setCategoryIndex, setActiveSort, setCurrentPage, setStartFilter, setSearchValue } = filterSlice.actions;

export default filterSlice.reducer;
