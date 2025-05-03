import TransactionViews from '@components/admin/transaction/view/transaction-view';
import { ToastContainer } from 'react-toastify';

// ----------------------------------------------------------------------

export default function TransactionPage() {
  return (
    <>
      <title> {`Products -MMO`}</title>
      <ToastContainer></ToastContainer>

      <TransactionViews />
    </>
  );
}
