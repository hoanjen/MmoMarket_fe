// import { UserView } from '@components/admin/user/view/user-view';
import UserView from '@components/admin/user/view/user-view';
import { ToastContainer } from 'react-toastify';

// ----------------------------------------------------------------------

export default function UserPage() {
  return (
    <>
      <title> {`Users - MMO`}</title>
      <ToastContainer></ToastContainer>
      <UserView />
    </>
  );
}
