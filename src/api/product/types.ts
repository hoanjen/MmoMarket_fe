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
      created_at: string;
      updated_at: string;
      user: {
        id: string;
        full_name: string;
      };
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
