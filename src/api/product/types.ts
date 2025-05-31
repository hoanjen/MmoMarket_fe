export type ResponseProduct = {
  status: string;
  statusCode: number;
  data: {
    products: {
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
      user: {
        id: string;
        full_name: string;
      };
      created_at: string;
      updated_at: string;
      vans_products: {
        id: string;
        title: string;
        description: string;
        price: 100000;
        quantity: 10;
      }[];
    }[];
    previousPage: number | null;
    nextPage: number | null;
    totalPages: number;
    currentPage: number;
    totalDocs: number;
  };

  message: [];
};

export type ProductOwners = {
  title: string;
  sub_title: string;
  description: string;
  image: string;
  quantity_sold: number;
  minPrice: number;
  maxPrice: number;
  id: string;
  deleted: false;
  is_active: boolean;
  created_at: string;
  updated_at: Date;
}[];

export type ResponseProductDetail = {
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
    user: {
      id: string;
      first_name: string;
      last_name: string;
      username: string
    }
  };

  message: [];
};

export type ResponseCreateProduct = {
  statusCode: number;
};

export type ResponseImportVansProduct = {
  statusCode: number;
};

export type ResponseCreateVansProduct = {
  statusCode: number;
  data: {
    newVansProduct: {
      title: string;
      description: string;
      price: number;
      quantity: number;
      product_id: string;
      id: string;
      is_active: boolean;
      created_at: string;
      updated_at: string;
    };
  };
};

export type VanProductData = {
  id: string;
  title: string;
  description?: string;
  price: number;
  quantity: number;
  product_id: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
};

export type VanProductDataResponse = {
  status: string;
  statusCode: number;
  data: VanProductData[];
  message: string[];
};

export type DataProductResponse = {
  status: string;
  statusCode: number;
  data: {
    id: string;
    account: string;
    password: string;
    // status: 'NOTSOLD';
    vans_product_id: string;
    created_at: string;
  }[];
  message: string[];
};

export type ResponseCreateDataProduct = {
  statusCode: number;
  data: {
    results: { id: string }[];
  };
};

export type ResponseCreateCommentProduct = {
  statusCode: number;
};

export type ResponseGetCommentProduct = {
  statusCode: number;
  data: {
    id: string,
    star: number,
    content: string,
    user:{
        id: string,
        first_name: string,
        last_name: string,
        avatar: string
    }
  }[]
};

export type ResponseAllProduct = {
  id: string,
  title: string,
  image: string,
  sub_title: string,
  quantity_sold: number,
  minPrice: number,
  maxPrice: number
}[];