import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';

import { _tasks, _posts, _timeline } from '../../_mock';
import { DashboardContent } from '../../layouts/dashboard';

import { AnalyticsNews } from '../analytics-news';
import { AnalyticsTasks } from '../analytics-tasks';
import { AnalyticsCurrentVisits } from '../analytics-current-visits';
import { AnalyticsOrderTimeline } from '../analytics-order-timeline';
import { AnalyticsWebsiteVisits } from '../analytics-website-visits';
import { AnalyticsWidgetSummary } from '../analytics-widget-summary';
import { AnalyticsTrafficBySite } from '../analytics-traffic-by-site';
import { AnalyticsCurrentSubject } from '../analytics-current-subject';
import { AnalyticsConversionRates } from '../analytics-conversion-rates';
import { useEffect, useState } from 'react';
import { AdminApi } from '@api/admin/admin';
import CustomDatePicker from './datePicker';
import dayjs from 'dayjs';
// import DateRangePicker from './datePicker';

// ----------------------------------------------------------------------
export type DashboardOverview = {
  revenue: {
    growth: number;
    total: number;
  };
  userStats: {
    growth: number;
    total: number;
  };
  orderStats: {
    growth: number;
    total: number;
  };
  productStats: {
    growth: number;
    total: number;
  };
};

export type CategoryStats = {
  label: string;
  value: number;
};

export type ResponseOrderRevenue = {
  growthRevenue: number;
  revenue: { month: string; revenue: string | number }[];
};
export function OverviewAnalyticsView() {
  const endDate = new Date().toISOString();
  const startDate = new Date(new Date().getTime() - 1 * 24 * 3600 * 1000).toISOString();
  const [overView, setOverView] = useState<DashboardOverview>({
    revenue: {
      growth: 0,
      total: 0,
    },
    userStats: {
      growth: 0,
      total: 0,
    },
    orderStats: {
      growth: 0,
      total: 0,
    },
    productStats: {
      growth: 0,
      total: 0,
    },
  });
  const [categoryStats, setCategoryStats] = useState<CategoryStats[]>([]);
  const [dateRange, setDateRange] = useState<{ endDate: string; startDate: string }>({
    endDate,
    startDate,
  });
  const [orderRevenue, setOrderRevenue] = useState<ResponseOrderRevenue>({
    growthRevenue: 0,
    revenue: [{ month: 'Jan', revenue: 0 }],
  });
  const fetchApi = async (start: string, end: string) => {
    try {
      const res = await AdminApi.dashboardOverview(start, end);
      const dataCategory = await AdminApi.categoryStats();
      const dataOrderRevenue = await AdminApi.getOrderRevenueByYear();
      if (res) {
        setOverView(res);
      }
      if (dataCategory) {
        setCategoryStats(dataCategory);
      }
      if (orderRevenue) {
        setOrderRevenue(dataOrderRevenue);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchApi(startDate, endDate);
  }, []);

  const handleDateApply = async (range: [dayjs.Dayjs, dayjs.Dayjs]) => {
    console.log('Ngày bắt đầu:', range[0].toDate().toISOString());
    console.log('Ngày kết thúc:', range[1].toDate().toISOString());

    setDateRange({
      startDate: range[0].toDate().toISOString(),
      endDate: range[1].toDate().toISOString(),
    });
    await fetchApi(range[0].toDate().toISOString(), range[1].toDate().toISOString());
  };

  return (
    // <div></div>
    <DashboardContent maxWidth="xl">
      <Typography variant="h4" sx={{ mb: { xs: 3, md: 5 } }}>
        Xin chào, Chào mừng trở lại 👋
      </Typography>
      <div className="w-48 -mt-8 mb-4">
        <CustomDatePicker onApply={handleDateApply}></CustomDatePicker>
      </div>

      <Grid container spacing={3}>
        <Grid xs={12} sm={6} md={3}>
          <AnalyticsWidgetSummary
            title="Doanh thu"
            percent={overView.revenue.growth}
            total={overView.revenue.total}
            icon={<img alt="icon" src={`/assets/icons/glass/ic-glass-bag.svg`} />}
          />
        </Grid>

        <Grid xs={12} sm={6} md={3}>
          <AnalyticsWidgetSummary
            title="Người dùng mới"
            percent={overView.userStats.growth}
            total={overView.userStats.total}
            color="secondary"
            icon={<img alt="icon" src={`/assets/icons/glass/ic-glass-users.svg`} />}
          />
        </Grid>

        <Grid xs={12} sm={6} md={3}>
          <AnalyticsWidgetSummary
            title="Mua hàng"
            percent={overView.orderStats.growth}
            total={overView.orderStats.total}
            color="warning"
            icon={<img alt="icon" src={`/assets/icons/glass/ic-glass-buy.svg`} />}
          />
        </Grid>

        <Grid xs={12} sm={6} md={3}>
          <AnalyticsWidgetSummary
            title="Sản phẩm"
            percent={overView.productStats.growth}
            total={overView.productStats.total}
            color="error"
            icon={<img alt="icon" src={`/assets/icons/glass/ic-glass-message.svg`} />}
          />
        </Grid>

        <Grid xs={12} md={6} lg={4}>
          <AnalyticsCurrentVisits
            title="Danh mục hiện tại "
            chart={{
              series: categoryStats.map((el) => {
                return {
                  label: el.label,
                  value: el.value,
                };
              }),
            }}
          />
        </Grid>

        <Grid xs={12} md={6} lg={8}>
          <AnalyticsWebsiteVisits
            title="Doanh thu của năm"
            subheader={`(+${orderRevenue.growthRevenue}%) so với năm ngoái`}
            chart={{
              series: orderRevenue.revenue.map((item) => {
                return {
                  month: item.month,
                  revenue: Number(item.revenue),
                };
              }),
            }}
          />
        </Grid>
      </Grid>
    </DashboardContent>
  );
}
