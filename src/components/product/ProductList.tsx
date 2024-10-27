import { createTheme, Pagination, ThemeProvider } from '@mui/material';
import { Product } from './Product';
import ProductFilter from './ProductFilter';

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

export function ProductList() {
  const searchProduct = (categoryIds: string[]) => {
    console.log('search product');
  };

  return (
    <>
      <div className="w-full grid xl:grid-cols-12 grid-cols-10 px-4 gap-6">
        <div className="col-span-2 min-w-56 xl:block hidden">
          <ProductFilter searchProduct={searchProduct}></ProductFilter>
        </div>
        <div className="col-span-10">
          <div className=" grid  gap-3 xl:grid-cols-2  grid-cols-1">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((item, index) => {
              return (
                <div className="col-span-1 w-full" key={index}>
                  <Product key={index}></Product>
                </div>
              );
            })}
          </div>
          <div className="w-full flex justify-center my-6">
            <Pagination
              size="large"
              count={10}
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
