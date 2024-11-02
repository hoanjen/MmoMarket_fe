import axios from '../index';
import { ResponseCategory, ResponseQueryCategoryType } from './types';

export class CategoryApi {
  public static async getCategory(): Promise<ResponseCategory> {
    return axios.get('/category').then((_) => _.data);
  }

  public static async queryCategoryType({
    category_id,
    category_type_ids,
  }: {
    category_id?: string;
    category_type_ids?: string[];
  }): Promise<ResponseQueryCategoryType> {
    return axios
      .get('product/query-category-type', {
        params: {
          category_id,
          category_type_ids,
        },
      })
      .then((_) => _.data);
  }
}
