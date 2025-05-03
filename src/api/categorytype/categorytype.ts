import axios from '../index';
import { ResponseCategoryType, ResponseCreateCategoryTypeByAdmin } from './types';
import { valiQuery } from '../../utils/validator';

export class CategoryTypeApi {
  public static async getCategoryType({ id }: { id: string }): Promise<ResponseCategoryType> {
    const Parameter = { category_id: id };
    return axios.get(`/category-type`, { params: Parameter }).then((_) => _.data);
  }

  public static async createCategoryType({
    category_id,
    name,
  }: {
    category_id: string;
    name: string;
  }): Promise<ResponseCreateCategoryTypeByAdmin> {
    return axios.post(`/category-type`, { category_id, name }).then((_) => _.data);
  }

  public static async updateCategoryType({ id, name }: { id: string; name: string }) {
    return axios.patch(`/category-type/${id}`, { name });
  }
}
