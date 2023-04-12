import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { ActiveSort, FilterSliceState } from './types';

const initialState: FilterSliceState = {
  categoryIndex: 0,
  currentPage: 1,
  searchValue: '',
  activeSort: {
    name: 'популярности (ASC)',
    sort: 'rating',
  },
};

const filterSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setCategoryIndex(state, action: PayloadAction<number>) {
      state.categoryIndex = action.payload;
    },
    setActiveSort(state, action: PayloadAction<ActiveSort>) {
      state.activeSort = action.payload;
    },
    setCurrentPage(state, action: PayloadAction<number>) {
      state.currentPage = action.payload;
    },
    setStartFilter(state, action: PayloadAction<FilterSliceState>) {
      state.categoryIndex = Number(action.payload.categoryIndex);
      state.activeSort = action.payload.activeSort;
      state.currentPage = Number(action.payload.currentPage);
    },
    setSearchValue(state, action: PayloadAction<string>) {
      state.searchValue = action.payload;
    },
  },
});

export const { setCategoryIndex, setActiveSort, setCurrentPage, setStartFilter, setSearchValue } =
  filterSlice.actions;

export default filterSlice.reducer;
