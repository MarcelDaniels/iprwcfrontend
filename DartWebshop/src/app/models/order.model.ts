import {OrderItem} from "./order-item.model";

export interface Order {
  id?: number;
  orderDate: Date;
  user_id?: number;
  product_name : String
  quantity: number;
  total_price : number
}
