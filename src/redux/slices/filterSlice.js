import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  categoryIndex: 0,
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
      console.log(action);
      state.categoryIndex = action.payload;
    },
    setActiveSort(state, action) {
      state.activeSort = action.payload;
    },
  },
});

export const { setCategoryIndex, setActiveSort } = filterSlice.actions;

export default filterSlice.reducer;
