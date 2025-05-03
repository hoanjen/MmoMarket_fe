import CatalogView from '@components/admin/catalog/view/catalog-view';
import { ToastContainer } from 'react-toastify';

// ----------------------------------------------------------------------

export default function CataLogPage() {
  return (
    <>
      <title> {`Products -MMO`}</title>
      <ToastContainer></ToastContainer>

      <CatalogView />
    </>
  );
}
