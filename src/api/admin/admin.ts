import axios from '../index';
import {
  ResponseCategoryStats,
  ResponseDashboardOverview,
  ResponseListProduct,
  ResponseListUser,
  ResponseOrderRevenueByYear,
} from './type';

export class AdminApi {
  public static async dashboardOverview(startDate: string, endDate: string): Promise<ResponseDashboardOverview> {
    return axios
      .get('/admin/dashboard/overview', {
        params: {
          startDate,
          endDate,
        },
      })
      .then((_) => _.data);
  }

  public static async categoryStats(): Promise<ResponseCategoryStats> {
    return axios.get('/admin/dashboard/category-stats').then((_) => _.data);
  }

  public static async getOrderRevenueByYear(): Promise<ResponseOrderRevenueByYear> {
    return axios.get('/admin/order/revenue').then((_) => _.data);
  }
  public static async getListUser({ search }: { search?: string }): Promise<ResponseListUser> {
    return axios
      .get('/admin/users', {
        params: { search },
      })
      .then((_) => _.data);
  }

  public static async kickUser({ id }: { id: string }): Promise<string> {
    return axios.patch(`/admin/users/${id}`).then((_) => _.data);
  }

  public static async getListProduct({ search }: { search?: string }): Promise<ResponseListProduct> {
    return axios
      .get('/admin/products', {
        params: { search },
      })
      .then((_) => _.data);
  }

  public static async deleteProduct({ id }: { id: string }): Promise<string> {
    return axios.delete(`/admin/products/${id}`).then((_) => _.data);
  }
}
