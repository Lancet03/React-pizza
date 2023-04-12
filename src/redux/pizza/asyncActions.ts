import { createAsyncThunk } from "@reduxjs/toolkit";
import { FetchPizzasArgs, PizzaItem } from "./types";
import axios from "axios";

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