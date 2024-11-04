import axios from '../index';
import { ResponseCategoryType } from './types';
import { valiQuery } from '../../utils/validator';

export class CategoryTypeApi {
  public static async getCategoryType({ id }: { id: string }): Promise<ResponseCategoryType> {
    const Parameter = { category_id: id };
    return axios.get(`/category-type`, { params: Parameter }).then((_) => _.data);
  }
}
