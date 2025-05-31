import axios from '../index';
import {
  ResponseBuyVansProduct,
  ResponseOrderHistory,
  ResponseOrderDetail,
  ResponseOrderReport,
  ResponseCancelOrderReport,
  ResponseOrderOfClient
} from './types';

export class OrderApi {
  public static async buyVansProduct({
    vans_product_id,
    quantity,
  }: {
    vans_product_id: string;
    quantity: number;
  }): Promise<ResponseBuyVansProduct> {
    return axios
      .post(`/order`, {
        vans_product_id,
        quantity,
      })
      .then((_) => _.data);
  }

  public static async getOrderHistory({ page }: { page: number }): Promise<ResponseOrderHistory> {
    return axios.get(`/order?limit=10&page=${page}`).then((_) => _.data);
  }

  public static async reportOrder({
    order_id,
    merchant_id,
    reason,
  }: {
    order_id: string;
    merchant_id: string;
    reason: string;
  }): Promise<ResponseOrderReport> {
    return axios
      .post(`/order/report`, {
        order_id,
        merchant_id,
        reason,
      })
      .then((_) => _.data);
  }

  public static async cancelReportOrder({ order_id }: { order_id: string }): Promise<ResponseCancelOrderReport> {
    return axios
      .post(`/order/cancel-report`, {
        order_id,
      })
      .then((_) => _.data);
  }
  public static async getOrderDetail({ id }: { id: string }): Promise<ResponseOrderDetail> {
    return axios.get(`/order/${id}`).then((_) => _.data);
  }

  public static async report({ id }: { id: string }): Promise<ResponseOrderDetail> {
    return axios.get(`/order/${id}`).then((_) => _.data);
  }

  public static async getOrderOfClient({ page }: { page: number }): Promise<ResponseOrderOfClient> {
    return axios.get(`/order/orders-merchant?limit=10&page=${page}`).then((_) => _.data);
  }
}
