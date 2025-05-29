import axios from '../index';
import { ResponseCreateOrder, ResponseCaptureOrder } from './type';

export class paymentApi {
  public static async createOrder(data: { amount: number; intent: string }): Promise<ResponseCreateOrder> {
    return axios.post(`/payment/create-order`, data).then((_) => _.data);
  }

  public static async captureOrder(data: { order_id: string }): Promise<ResponseCaptureOrder> {
    console.log(data);
    return axios.post(`/payment/capture-order`, data).then((_) => _.data);
  }

  public static async getHistoryPayment(data: { limit: number; page: number }) {
    return axios.get(`/payment/history`).then((_) => _.data);
  }

  public static async withdraw(data: { amount: number; paypal_email: string }) {
    return axios.post(`/payment/withdraw`, data).then((_) => _.data);
  }
}
