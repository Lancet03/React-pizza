import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { RootState } from '../store';




type PizzaItem = {
  id: number;
  title: string;
  price: number;
  imageUrl: string;
  sizes: number[];
  types: number[];
};

 export enum Status {
  LOADING = 'loading',
  SUCCESS = 'success',
  ERROR = 'error'
}

interface PizzaSliceState {
  items: PizzaItem[];
  status: Status;
}

type FetchPizzasArgs = {
  sort: string;
  search: string;
  category: string;
  currentPage: number;
};


export const fetchPizzas = createAsyncThunk<PizzaItem[], FetchPizzasArgs>(
  'pizza/fetchPizzasStatus',
  async (params) => {
    const { sort, search, category, currentPage } = params;
    const { data } = await axios.get<PizzaItem[]>(
      `http://localhost:3100/pizzas${sort}&_page=${currentPage}&_limit=8${category}${search}`,
    );
    return data;
  },
);

const initialState: PizzaSliceState = {
  items: [],
  status: Status.LOADING,
};

const pizzaSlice = createSlice({
  name: 'pizza',
  initialState,
  reducers: {
    setPizzas(state, action) {
      state.items = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchPizzas.pending, (state, action) => {
      state.status = Status.LOADING;
      state.items = [];
    });

    builder.addCase(fetchPizzas.fulfilled, (state, action) => {
      state.items = action.payload;
      state.status = Status.SUCCESS;
    });

    builder.addCase(fetchPizzas.rejected, (state, action) => {
      state.status = Status.ERROR;
      state.items = [];
    });
  },
  // {
  //   [fetchPizzas.pending]: (state, action) => {
  //     state.status = 'loading';
  //     state.items = [];
  //   },
  //   [fetchPizzas.fulfilled]: (state, action) => {
  //     state.items = action.payload;
  //     state.status = 'success';
  //   },
  //   [fetchPizzas.rejected]: (state, action) => {
  //     state.status = 'error';
  //     state.items = [];
  //   },
  // },
});

export const selectPizzaSlice = (state: RootState) => state.pizzaSlice;

export const { setPizzas } = pizzaSlice.actions;

export default pizzaSlice.reducer;
