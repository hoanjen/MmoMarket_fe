import ProductsView from '@components/admin/product/view/products-view';
import { ToastContainer } from 'react-toastify';

// ----------------------------------------------------------------------

export default function ProductPage() {
  return (
    <>
      <title> {`Products -MMO`}</title>
      <ToastContainer></ToastContainer>

      <ProductsView />
    </>
  );
}
