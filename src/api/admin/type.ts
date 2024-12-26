export type ResponseDashboardOverview = {
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

export type ResponseCategoryStats = {
  label: string;
  value: number;
}[];

export type ResponseOrderRevenueByYear = {
  growthRevenue: number;
  revenue: { month: string; revenue: number }[];
};
