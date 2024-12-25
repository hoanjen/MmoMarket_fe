import axios from '../index';
import { ResponseCategoryStats, ResponseDashboardOverview } from './type';

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
}
