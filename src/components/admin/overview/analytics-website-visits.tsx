import type { CardProps } from '@mui/material/Card';
import type { ChartOptions } from '../components/chart';

import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import { useTheme, alpha as hexAlpha } from '@mui/material/styles';

import { Chart, useChart } from '../components/chart';
import { BarChart } from '@mui/x-charts/BarChart';
import Box, { BoxProps } from '@mui/material/Box';
import { chartClasses } from '../components/chart/classes';

// ----------------------------------------------------------------------

type Props = CardProps & {
  title?: string;
  subheader?: string;
  chart: {
    colors?: string[];
    categories?: string[];
    series: {
      name: string;
      data: number[];
    }[];
    options?: ChartOptions;
  };
};

export const dataset = [
  {
    revenue: 21,
    month: 'Jan',
  },
  {
    revenue: 28,
    month: 'Feb',
  },
  {
    revenue: 41,
    month: 'Mar',
  },
  {
    revenue: 73,
    month: 'Apr',
  },
  {
    revenue: 99,
    month: 'May',
  },
  {
    revenue: 144,
    month: 'June',
  },
  {
    revenue: 319,
    month: 'July',
  },
  {
    revenue: 249,
    month: 'Aug',
  },
  {
    revenue: 131,
    month: 'Sept',
  },
  {
    revenue: 55,
    month: 'Oct',
  },
  {
    revenue: 48,
    month: 'Nov',
  },
  {
    revenue: 25,
    month: 'Dec',
  },
];

export function valueFormatter(value: number | null) {
  return `${value}$`;
}

export function AnalyticsWebsiteVisits({ title, subheader, chart, ...other }: Props) {
  const theme = useTheme();

  const chartColors = chart.colors ?? [theme.palette.primary.dark, hexAlpha(theme.palette.primary.light, 0.64)];

  const chartOptions = useChart({
    colors: chartColors,
    stroke: {
      width: 2,
      colors: ['transparent'],
    },
    xaxis: {
      categories: chart.categories,
    },
    legend: {
      show: true,
    },
    tooltip: {
      y: {
        formatter: (value: number) => `${value} visits`,
      },
    },
    ...chart.options,
  });

  return (
    <Card {...other}>
      <CardHeader title={title} subheader={subheader} />

      {/* <Chart
        type="bar"
        series={chart.series}
        options={chartOptions}
        height={364}
        sx={{ py: 2.5, pl: 1, pr: 2.5 }}
      /> */}
      <BasicBars chartColors={chartColors} height={400} sx={{ py: 2.5, pl: 1, pr: 2.5 }}></BasicBars>
    </Card>
  );
}

export default function BasicBars({
  sx,
  height,
  className,
  width = '100%',
  chartColors,
  ...other
}: BoxProps & { chartColors: string[] }) {
  return (
    <Box
      dir="ltr"
      className={chartClasses.root.concat(className ? ` ${className}` : '')}
      sx={{
        width,
        height,
        flexShrink: 0,
        borderRadius: 1.5,
        position: 'relative',
        ...sx,
      }}
      {...other}
    >
      <BarChart
        series={[{ dataKey: 'revenue', label: 'Revenue MMO Market', valueFormatter }]}
        yAxis={[
          {
            label: 'Revenue ($)',
          },
        ]}
        xAxis={[{ scaleType: 'band', dataKey: 'month' }]}
        dataset={dataset}
        colors={chartColors}
      />
    </Box>
  );
}
