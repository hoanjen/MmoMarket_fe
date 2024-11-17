import { OverviewAnalyticsView } from '@components/admin/overview/view';
import { ThemeProvider } from '@components/admin/theme/theme-provider';
import { Helmet } from 'react-helmet-async';

// ----------------------------------------------------------------------

export default function AdminHomePage() {
  return (
    <>
      <title> {`Dashboard - abc`}</title>
      <meta
        name="description"
        content="The starting point for your next project with Minimal UI Kit, built on the newest version of Material-UI ©, ready to be customized to your style"
      />
      <meta name="keywords" content="react,material,kit,application,dashboard,admin,template" />

      <OverviewAnalyticsView />
    </>
  );
}
