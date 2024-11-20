import { OverviewAnalyticsView } from '@components/admin/overview/view';

// ----------------------------------------------------------------------

export default function AdminHomePage() {
  return (
    <>
      <title> {`Dashboard - MMO`}</title>
      <meta
        name="description"
        content="The starting point for your next project with Minimal UI Kit, built on the newest version of Material-UI ©, ready to be customized to your style"
      />
      <meta name="keywords" content="react,material,kit,application,dashboard,admin,template" />

      <OverviewAnalyticsView />
    </>
  );
}
