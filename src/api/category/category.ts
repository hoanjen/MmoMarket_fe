import axios from '../index';
import {
  ResponseCategory,
  ResponseCategoryByAdmin,
  ResponseCreateCategoryByAdmin,
  ResponseGetCategoryTypeByAdmin,
  ResponseQueryCategoryType,
} from './types';

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
      .get('/category-type/query-category-type', {
        params: {
          category_id,
          category_type_ids,
        },
      })
      .then((_) => _.data);
  }

  public static async GetAllCategory(): Promise<ResponseCategoryByAdmin> {
    return axios.get('/category/all').then((_) => _.data);
  }

  public static async updateCategory({ id, name, type }: { id: string; name: string; type: 'PRODUCT' | 'SERVICE' }) {
    return axios.put(`/category/${id}`, { name, type });
  }

  public static async createCategory({
    name,
    type,
  }: {
    name: string;
    type: 'PRODUCT' | 'SERVICE';
  }): Promise<ResponseCreateCategoryByAdmin> {
    return axios.post(`/category`, { name, type }).then((_) => _.data);
  }

  public static async getCategoryTypeByCategory({ id }: { id: string }): Promise<ResponseGetCategoryTypeByAdmin> {
    return axios.get(`/category/${id}/category-type`).then((_) => _.data);
  }
}
