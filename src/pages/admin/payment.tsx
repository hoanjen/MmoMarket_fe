import PaymentViews from '@components/admin/payment/view/payment-view';
import { ToastContainer } from 'react-toastify';

// ----------------------------------------------------------------------

export default function PaymentPage() {
  return (
    <>
      <title> {`Products -MMO`}</title>
      <ToastContainer></ToastContainer>

      <PaymentViews />
    </>
  );
}
