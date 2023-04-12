export type PizzaItem = {
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
  ERROR = 'error',
}

export type FetchPizzasArgs = {
  sort: string;
  search: string;
  category: string;
  currentPage: number;
};

export interface PizzaSliceState {
  items: PizzaItem[];
  status: Status;
}
