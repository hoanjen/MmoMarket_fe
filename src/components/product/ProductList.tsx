import { Box, createTheme, Pagination, Tab, Tabs, ThemeProvider } from '@mui/material';
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
  user: {
    id: string;
    full_name: string;
  };
  created_at: string;
  updated_at: string;
};

enum SortType {
  TRENDING = 'TRENDING',
  DESC = 'DESC',
  ASC = 'ASC',
}

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
    currentPage: number;
    previousPage: number | null;
    totalDocs: number;
  }>({ totalPages: 0, nextPage: null, previousPage: null, currentPage: 0, totalDocs: 0 });

  const [tab, setTab] = useState<SortType>(SortType.TRENDING);

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
    getProduct(SortType.TRENDING);
  }, [querySearch]);

  const getProduct = async (sort: SortType, page?: number) => {
    const response = await ProductApi.getQueryProduct({
      limit: 10,
      page: page ?? 1,
      category_type_ids: querySearch.categoryTypeIds,
      keyword: querySearch.keyword && querySearch.keyword.length ? querySearch.keyword : undefined,
      sortBy: sort,
    });
    setProducts(response.data.products);
    setPagination({
      nextPage: response.data.nextPage,
      previousPage: response.data.previousPage,
      totalPages: response.data.totalPages,
      currentPage: response.data.currentPage,
      totalDocs: response.data.totalDocs,
    });
  };

  const handlePageChange = (event: React.ChangeEvent<unknown>, page: number) => {
    if (page <= pagination.totalPages) {
      setPagination((prev) => ({
        ...prev,
        currentPage: page,
      }));
      getProduct(SortType.TRENDING, page);
    }
  };

  const handleTabChange = (event: React.SyntheticEvent, newValue: SortType) => {
    setTab(newValue);
    getProduct(newValue);
  };

  return (
    <>
      <div className="w-full grid xl:grid-cols-12 grid-cols-10 px-4 gap-6">
        <div className="col-span-2 min-w-56 xl:block hidden">
          <ProductFilter searchProduct={searchProduct}></ProductFilter>
        </div>
        <div className="col-span-10">
          <div className="">
            <div
              className="pb-1 pl-4 text-[#3d464d]"
              style={{
                fontFamily: 'sans-serif',
              }}
            >
              Tổng {pagination.totalDocs} gian hàng
            </div>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }} className="pb-4 ml-4">
              <Tabs value={tab} onChange={handleTabChange}>
                <Tab
                  label="Phổ biến"
                  sx={{ fontWeight: 600, textTransform: 'none', fontSize: '16px' }}
                  value={SortType.TRENDING}
                />
                <Tab
                  label="Giá tăng dần"
                  sx={{ fontWeight: 600, textTransform: 'none', fontSize: '16px' }}
                  value={SortType.ASC}
                />
                <Tab
                  label="Giá giảm dần"
                  sx={{ fontWeight: 600, textTransform: 'none', fontSize: '16px' }}
                  value={SortType.DESC}
                />
              </Tabs>
            </Box>
            <div className="h-8 border mb-4"></div>
          </div>

          {products.length ? (
            <div className=" grid  gap-3 xl:grid-cols-2  grid-cols-1">
              {products.map((item, index) => {
                return (
                  <div className="col-span-1 w-full" key={index}>
                    <Product key={index} product={item}></Product>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="flex">
              <p className="text-[20px] font-semibold  items-center text-gray-400">
                Không có sản phẩm nào phù hợp với tìm kiếm
              </p>
            </div>
          )}

          <div className="w-full flex justify-center my-6">
            {pagination.totalPages ? (
              <Pagination
                size="large"
                count={pagination.totalPages ?? 1}
                page={pagination.currentPage ?? 1}
                onChange={handlePageChange}
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
            ) : (
              <></>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
