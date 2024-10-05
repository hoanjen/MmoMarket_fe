import axios from '../index';
import { ResponseProfile, RequestProfile } from './types';

export class ProfileApi {
  public static async getProfileById(id: string): Promise<ResponseProfile> {
    return axios.get(`/user/${id}`).then((_) => _.data);
  }

  public static async getProfileByToken(): Promise<ResponseProfile> {
    return axios.get(`/user`).then((_) => _.data);
  }

  public static async updateProfileByToken(data: RequestProfile): Promise<ResponseProfile> {
    return axios.post(`/user/update-profile`, data).then((_) => _.data);
  }
}
