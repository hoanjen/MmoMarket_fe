import ReportViews from '@components/admin/report/view/report-view';
import { ToastContainer } from 'react-toastify';

// ----------------------------------------------------------------------

export default function ReportPage() {
  return (
    <>
      <title> {`Products -MMO`}</title>
      <ToastContainer></ToastContainer>

      <ReportViews />
    </>
  );
}
