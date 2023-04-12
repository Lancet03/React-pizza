import { TCartItem } from "../redux/cart/types";

export const calcTotalPrice = (items: TCartItem[]) => {
    return items.reduce((sum, obj) => {
        return sum + obj.price * obj.count;
      }, 0);
}