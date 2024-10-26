import { Product } from './Product';
import ProductFilter from './ProductFilter';

export function ProductList() {
  const searchProduct = (categoryIds: string[]) => {
    console.log('search product');
  };

  return (
    <div className="w-full grid grid-cols-12 px-4 gap-6">
      <div className="col-span-2">
        <ProductFilter searchProduct={searchProduct}></ProductFilter>
      </div>
      <div className="col-span-10 grid grid-cols-2 gap-3">
        {[1, 2, 3, 4].map((item, index) => {
          return <div className='col-span-1 w-full'>
            <Product key={index}></Product>
          </div>;
        })}
      </div>
    </div>
  );
}
