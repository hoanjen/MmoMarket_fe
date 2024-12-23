import axios from '../index';
import { ResponseDashboardOverview } from './type';

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
}
