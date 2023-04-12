export type TCartItem = {
  id: number;
  count: number;
  type: string;
  size: number;
  title: string;
  price: number;
  imageUrl: string;
};

export interface ICartSliceState {
  totalPrice: number;
  items: TCartItem[];
}
