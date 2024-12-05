import axios from '../index';
import { ResponseProduct, ResponseProductDetail } from './types';

export class ProductApi {
  public static async getProduct({ id }: { id: string }): Promise<ResponseProduct> {
    return axios.get(`/product/categoryType?categorytype_id=${id}&limit=10&page=1`).then((_) => _.data);
  }

  public static async getQueryProduct({
    category_type_ids,
    keyword,
    limit,
    page,
    sortBy,
  }: {
    category_type_ids?: string[];
    keyword?: string;
    limit?: number;
    page?: number;
    sortBy?: string;
  }): Promise<ResponseProduct> {
 
    return axios
      .get(`product/query-product`, {
        params: {
          category_type_ids,
          keyword,
          limit,
          page,
          sortBy,
        },
      })
      .then((_) => _.data);
  }
  public static async getProductDetail(id: string ): Promise<ResponseProductDetail> {
    return axios
    .get(`/product/product-detail?product_id=${id}`)
    .then((_) => _.data);
  }
}
