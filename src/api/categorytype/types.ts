export type ResponseCategoryType = {
  status: string;
  statusCode: number;
  data: {
    categoryType: {
      id: string;
      name: string;
      category_id: string;
      created_at: string;
      updated_at: string;
    }[];
  };
  message: string[];
};

export type ResponseCreateCategoryTypeByAdmin = {
  status: string;
  statusCode: number;
  data: {
    newCategoryType: {
      id: string;
      name: string;
      category_id: string;
      created_at: string;
      updated_at: string;
    };
  };
  message: string[];
};
