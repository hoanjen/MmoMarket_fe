export type ResponseBuyVansProduct = {
  status: string;
  statusCode: number;
  data: {
    title: string;
    sub_title: string;
    description: string;
    image: string;
    quantity_sold: number;
    minPrice: number;
    maxPrice: number;
    id: string;
    category_type_id: string;
    user_id: string;
    created_at: string;
    updated_at: string;
    vans_products: {
      id: string;
      title: string;
      description: string;
      price: number;
      quantity: number;
      product_id: string;
      created_at: string;
      updated_at: string;
    }[];
  };

  message: [];
};

export type ResponseOrderHistory = {
  statusCode: number;
  data: {
    orders: {
      id: string;
      user_id: string;
      discount_id: string;
      vans_product_id: string;
      quantity: number;
      price: number;
      status: string;
      created_at: string;
      vans_product: {
        title: string;
        price: number;
        quantity: 2;
        product_id: string;
        product: {
          user_id: string;
          title: string;
          user: {
            id: string;
            username: string;
          }
        };
      };
      comments: [],
      freeze:{
        return: number
      }
    }[];
    previousPage: number;
    totalPages: number;
    nextPage: number;
    currentPage: number;
    totalDocs: number;
  };
};

export type ResponseOrderDetail = {
  statusCode: number;
  data: {
    data_product_orders: {
      data_product: {
        id: string;
        account: string;
        password: string;
      };
    }[];
  };
};

export type ResponseOrderReport = {
  status: string
  statusCode: number;
  data: {}
}

export type ResponseCancelOrderReport = {
  status: string
  statusCode: number;
  data: {}
}

export type ResponseOrderOfClient = {
  statusCode: number;
  data: {
    orders: {
      title: string;
      id: string;

      vans_products: {
        title: string;
        return_percent: number;
        orders: {
          id: string;
          user_id: string;
          quantity: number;
          price: number;
          status: string;
          unlock_time: string;
          created_at: string;
          reports: {
            reason: string
          }[]
        }[]
      }[];
    }[];
    previousPage: number;
    totalPages: number;
    nextPage: number;
    currentPage: number;
    totalDocs: number;
  };
};
