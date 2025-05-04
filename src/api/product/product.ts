import axios from '../index';
import {
  ResponseProduct,
  ResponseProductDetail,
  ResponseCreateProduct,
  ResponseImportVansProduct,
  ResponseCreateVansProduct,
  ProductOwners,
  VanProductDataResponse,
  DataProductResponse,
  ResponseCreateDataProduct,
  ResponseCreateCommentProduct,
  ResponseGetCommentProduct
} from './types';

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
  public static async getProductDetail(id: string): Promise<ResponseProductDetail> {
    return axios.get(`/product/${id}`).then((_) => _.data);
  }

  public static async getProductOwner(): Promise<{ data: ProductOwners }> {
    return axios.get(`/product/owner`).then((_) => _.data);
  }

  public static async createProduct({
    title,
    sub_title,
    description,
    category_type_id,
    image,
  }: {
    title: string;
    sub_title: string;
    description: string;
    category_type_id: string;
    image: string;
  }): Promise<ResponseCreateProduct> {
    return axios
      .post(`/product`, {
        title,
        sub_title,
        description,
        category_type_id,
        image,
      })
      .then((_) => _.data);
  }
  public static async importVansProduct({
    dataProducts,
    vans_product_id,
  }: {
    dataProducts: { account: string; password: string }[];
    vans_product_id: string;
  }): Promise<ResponseImportVansProduct> {
    return axios
      .post(`/vans-product/data-product`, {
        dataProducts,
        vans_product_id,
      })
      .then((_) => _.data);
  }

  public static async createVansProduct({
    title,
    description,
    price,
    product_id,
    quantity,
  }: {
    title: string;
    description: string;
    price: number;
    product_id: string;
    quantity?: number;
  }): Promise<ResponseCreateVansProduct> {
    return axios
      .post(`/vans-product`, {
        title,
        description,
        price,
        product_id,
        quantity,
      })
      .then((_) => _.data);
  }

  public static async updateProduct({
    title,
    minPrice,
    maxPrice,
    sub_title,
    description,
    image,
    id,
  }: {
    title: string;
    minPrice: number;
    maxPrice: number;
    sub_title: string;
    description?: string;
    image?: string;
    id: string;
  }) {
    return axios.put(`/product/${id}`, {
      title,
      minPrice,
      maxPrice,
      sub_title,
      description,
      image,
    });
  }

  public static async toggleActiveProduct({ id }: { id: string }) {
    return axios.patch(`/product/${id}`);
  }
  // --------------------------------------------------------------------------------Van Product ------------------------------------------------------------------

  public static async getVanProductByProductId({ id }: { id: string }): Promise<VanProductDataResponse> {
    return axios.get(`/product/${id}/van-product`).then((_) => _.data);
  }

  public static async toggleActiveVansProduct({ id }: { id: string }) {
    return axios.post(`/vans-product/${id}`);
  }

  public static async updateVansProduct({
    id,
    title,
    description,
    price,
    quantity,
  }: {
    quantity: number;
    title: string;
    description: string;
    price: number;
    id: string;
  }) {
    return axios.patch(`/vans-product/${id}`, {
      title,
      description,
      price,
      quantity,
    });
  }

  public static async getProductDataByVansProduct({
    vanProductId,
  }: {
    vanProductId: string;
  }): Promise<DataProductResponse> {
    return axios.get(`/vans-product/${vanProductId}/data-product`).then((_) => _.data);
  }

  public static async createDataProduct({
    dataProducts,
    vans_product_id,
  }: {
    dataProducts: { account: string; password: string }[];
    vans_product_id: string;
  }): Promise<ResponseCreateDataProduct> {
    return axios
      .post(`/vans-product/data-product`, {
        dataProducts,
        vans_product_id,
      })
      .then((_) => _.data);
  }

  public static async deleteDataProduct({ id }: { id: string }) {
    return axios.delete(`/data-product/${id}`);
  }

  public static async updateDataProduct({ id, account, password }: { id: string; account: string; password: string }) {
    return axios.patch(`/data-product/${id}`, {
      account,
      password,
    });
  }

    // --------------------------------------------------------------------------------Comment Product ------------------------------------------------------------------


  public static async createCommentProduct({
    product_id,
    order_id,
    star,
    content,
  }: {
    product_id: string;
    order_id: string;
    star: number;
    content: string;
  }): Promise<ResponseCreateCommentProduct> {
    return axios
      .post(`/comment`, {
        product_id,
        order_id,
        star,
        content,
      })
      .then((_) => _.data);
  }

  public static async importExcelData({ vans_product_id, file }: { vans_product_id: string; file: File | string }) {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('vans_product_id', vans_product_id);
    return axios
      .post(`/vans-product/import-excel`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then((_) => _.data);
  }

  public static async getCommentByProductId({
    product_id,
  }: {
    product_id: string;
  }): Promise<ResponseGetCommentProduct> {
    return axios
      .get(`/comment`, 
        {
          params: {
            product_id,
          }
        }
      )
      .then((_) => _.data);
  }
}
