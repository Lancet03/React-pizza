import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchPizzas = createAsyncThunk('pizza/fetchPizzasStatus', async (params) => {
  const { sort, search, category, currentPage } = params;
  const { data } = await axios.get(
    `http://localhost:3100/pizzas${sort}&_page=${currentPage}&_limit=8${category}${search}`,
  );
  return data;
});

const initialState = {
  items: [],
  status: "loading",
};

const pizzaSlice = createSlice({
  name: 'pizza',
  initialState,
  reducers: {
    setPizzas(state, action) {
      state.items = action.payload;
    },
  },
  extraReducers: {
    [fetchPizzas.pending]: (state, action) => {
      state.status = "loading";
      state.items = [];
    },
    [fetchPizzas.fulfilled]: (state, action) => {
        state.items = action.payload
        state.status = "success";
    },
    [fetchPizzas.rejected]: (state, action) => {
      state.status = "error";
      state.items = [];
    },
  },
});

export const { setPizzas } = pizzaSlice.actions;

export default pizzaSlice.reducer;
