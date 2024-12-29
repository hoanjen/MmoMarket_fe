import axios from '../index';
import { ResponseCreateOrder, ResponseCaptureOrder } from './type';

export class paymentApi {
  public static async createOrder(data: { amount: number; intent: string }): Promise<ResponseCreateOrder> {
    return axios.post(`/payment/create-order`, data).then((_) => _.data);
  }

  public static async captureOrder(data: { order_id: string }): Promise<ResponseCaptureOrder> {
    return axios.post(`/payment/create-order`, data).then((_) => _.data);
  }
}
