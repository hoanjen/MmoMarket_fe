export type ResponseBuyVansProduct = {
  status: string;
  statusCode: number;
  data: {
    title: string,
    sub_title: string,
    description: string,
    image: string,
    quantity_sold: number,
    minPrice: number,
    maxPrice: number,
    id: string,
    category_type_id: string,
    user_id: string,
    created_at: string,
    updated_at: string,
    vans_products: {
      id: string,
      title: string,
      description: string,
      price: number,
      quantity: number,
      product_id: string,
      created_at: string,
      updated_at: string
    }[]
  };

  message: [];
};