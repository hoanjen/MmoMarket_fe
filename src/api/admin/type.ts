export type ResponseDashboardOverview = {
  revenue: {
    growth: number;
    total: number;
  };
  userStats: {
    growth: number;
    total: number;
  };
  orderStats: {
    growth: number;
    total: number;
  };
  productStats: {
    growth: number;
    total: number;
  };
};

export type ResponseCategoryStats = {
  label: string;
  value: number;
}[];

export type ResponseOrderRevenueByYear = {
  growthRevenue: number;
  revenue: { month: string; revenue: number }[];
};

export type ResponseListUser = {
  pageDetail: {
    previousPage: number;
    totalPages: number;
    nextPage: number;
    currentPage: number;
    totalDocs: number;
  };
  user: {
    id: string;
    email: string;
    full_name: string;
    last_name: string;
    phone_number: string;
    avatar: string;
    username: string;
    first_name: string;
    roles: {
      id: string;
      name: string;
    }[];
  }[];
};

export type ResponseListProduct = {
  product: {
    id: string;
    title: string;
    sub_title: string;
    description: string;
    quantity_sold: number;
    image: string;
    minPrice: string;
    maxPrice: string;
    deleted: boolean;
    user: {
      id: string;
      email: string;
      username: string;
    };
  }[];
};

export type ResponseListPayment = {
  data: {
    transactions: {
      id: string;
      action: string;
      paypal_id: string;
      amount: number;
      status: string;
      user_id: string;
      created_at: string;
    }[];
    previousPage: number,
    totalPages: number,
    nextPage: number,
    currentPage: number,
    totalDocs: number
  }
}

export type ResponseListReport = {
  data: {
    id: string;
    order_id: string;
    merchant_id: string;
    reason: string;
    user_id: string;
    created_at: string;
    user:{
      username: string
    },
    order:{
      quantity: number,
      price: number,
      status: string,
      unlock_time: string,    
      vans_product:{
        product:{
          user_id: string
        }
      }
    }
  }[]
}

export type ResponseApproveRefund = {
  status: string,
  statusCode: 200,
}
