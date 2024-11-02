import { createTheme, Pagination, ThemeProvider } from '@mui/material';
import { Product } from './Product';
import ProductFilter from './ProductFilter';
import { useLocation } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import { ProductApi } from '@api/product/product';

const theme = createTheme({
  components: {
    MuiPagination: {
      styleOverrides: {
        root: {
          '& .MuiPaginationItem-root': {
            backgroundColor: '#22c55e', // Change the background color
            color: 'white', // Change the text color if needed
            '&:hover': {
              backgroundColor: '#22c55e', // Change hover color
            },
          },
        },
      },
    },
  },
});

export type productSchema = {
  title: string;
  sub_title: string;
  description: string;
  image: string;
  quantity_sold: number;
  id: string;
  category_type_id: string;
  minPrice: number;
  maxPrice: number;
  user_id: string;
  vans_products: {
    id: string;
    title: string;
    description: string;
    price: 100000;
    quantity: 10;
  }[];
  created_at: string;
  updated_at: string;
};

export function ProductList() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  const [querySearch, setQuerySearch] = useState<{
    categoryId: string | null;
    categoryTypeIds: string[];
    keyword: string | null;
  }>({
    categoryId: '',
    categoryTypeIds: [],
    keyword: '',
  });

  const [products, setProducts] = useState<productSchema[]>([]);
  const [pagination, setPagination] = useState<{
    totalPages: number;
    nextPage: number | null;
    previousPage: number | null;
  }>({ totalPages: 0, nextPage: null, previousPage: null });

  const searchProduct = async (categoryTypeIds: string[]) => {
    setQuerySearch((prev) => ({ ...prev, categoryTypeIds: categoryTypeIds }));
  };

  useEffect(() => {
    setQuerySearch({
      categoryId: queryParams.get('categoryId'),
      categoryTypeIds: queryParams.get('categoryTypeId') ? [queryParams.get('categoryTypeId') ?? ''] : [],
      keyword: queryParams.get('keyword'),
    });
  }, [location.search]);

  useEffect(() => {
    getProduct();
  }, [querySearch]);

  const getProduct = async () => {
    const response = await ProductApi.getQueryProduct({
      limit: 10,
      page: 1,
      category_type_ids: querySearch.categoryTypeIds,
      keyword: querySearch.keyword && querySearch.keyword.length ? querySearch.keyword : undefined,
    });
    setProducts(response.data.products);
    setPagination({
      nextPage: response.data.nextPage,
      previousPage: response.data.previousPage,
      totalPages: response.data.totalPages,
    });
  };

  return (
    <>
      <div className="w-full grid xl:grid-cols-12 grid-cols-10 px-4 gap-6">
        <div className="col-span-2 min-w-56 xl:block hidden">
          <ProductFilter searchProduct={searchProduct}></ProductFilter>
        </div>
        <div className="col-span-10">
          <div className=" grid  gap-3 xl:grid-cols-2  grid-cols-1">
            {products.map((item, index) => {
              return (
                <div className="col-span-1 w-full" key={index}>
                  <Product key={index} product={item}></Product>
                </div>
              );
            })}
          </div>
          <div className="w-full flex justify-center my-6">
            <Pagination
              size="large"
              count={pagination.totalPages}
              sx={{
                '& .MuiPaginationItem-root': {
                  backgroundColor: 'transparent',
                  color: 'black',
                },
                '& .MuiPaginationItem-root.Mui-selected': {
                  backgroundColor: '#22c55e',
                  color: 'white',
                  '&:hover': {
                    backgroundColor: '#22c55e',
                  },
                },
              }}
            />
          </div>
        </div>
      </div>
    </>
  );
}
