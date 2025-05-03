export type ResponseCategory = {
  status: string;
  statusCode: number;
  data: {
    categoryProduct: {
      id: string;
      name: string;
      type: string;
      created_at: string;
      updated_at: string;
    }[];
    categoryService: {
      id: string;
      name: string;
      type: string;
      created_at: string;
      updated_at: string;
    }[];
  };
  message: string[];
};

export type ResponseQueryCategoryType = {
  status: string;
  statusCode: number;
  data: {
    listCategoryType: {
      id: string;
      name: string;
      category_id: string;
      created_at: string;
      updated_at: string;
    }[];
  };
  message: string[];
};

export type ResponseCategoryByAdmin = {
  status: string;
  statusCode: number;
  data: {
    id: string;
    name: string;
    type: 'PRODUCT' | 'SERVICE';
    created_at: string;
    updated_at: string;
  }[];
  message: string[];
};

export type ResponseCreateCategoryByAdmin = {
  status: string;
  statusCode: number;
  data: {
    newCategory: {
      id: string;
      name: string;
      type: 'PRODUCT' | 'SERVICE';
      created_at: string;
      updated_at: string;
    };
  };
  message: string[];
};

export type ResponseGetCategoryTypeByAdmin = {
  status: string;
  statusCode: number;
  data: {
    id: string;
    name: string;
    category_id: string;
    created_at: string;
    updated_at: string;
  }[];
  message: string[];
};
