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

export type ResponseOrderHistory = {
  statusCode: number;
  data: {
  orders: 
    {
      id: string,
      user_id: string,
      discount_id: string,
      vans_product_id: string,
      quantity: number,
      price: number,
      created_at: string,
      vans_product: {
        price: number,
        quantity: 2,
        product_id: string,
        product: {
          user_id: string,
        }
      }
    }[],
    previousPage: number,
    totalPages: number,
    nextPage: number,
    currentPage: number,
    totalDocs: number,
  };
};

export type ResponseOrderDetail = {
  statusCode: number;
  data: {
    data_product_orders: 
    {
      data_product: {
        id: string,
        account: string,
        password: string,
      }
    }[]
  };
};