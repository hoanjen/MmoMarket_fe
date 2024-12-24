import type { CardProps } from '@mui/material/Card';
import type { ChartOptions } from '../components/chart';

import Card from '@mui/material/Card';
import Divider from '@mui/material/Divider';
import { useTheme } from '@mui/material/styles';
import CardHeader from '@mui/material/CardHeader';

import { fNumber } from '../utils/format-number';
import * as React from 'react';
import { PieChart, PieChartProps } from '@mui/x-charts/PieChart';

import { Chart, useChart, ChartLegends } from '../components/chart';
import { pieArcLabelClasses, PieValueType } from '@mui/x-charts';
import { Box, BoxProps } from '@mui/material';
import { chartClasses } from '../components/chart/classes';
import { current } from '@reduxjs/toolkit';

const normalize = (v: number, v2: number) => Number.parseFloat(((v * v2) / 100).toFixed(2));

export const valueFormatter = (item: { value: number }) => `${item.value}%`;

// ----------------------------------------------------------------------

type Props = CardProps & {
  title?: string;
  subheader?: string;
  chart: {
    colors?: string[];
    series: {
      label: string;
      value: number;
    }[];
    options?: ChartOptions;
  };
};

export function AnalyticsCurrentVisits({ title, subheader, chart, ...other }: Props) {
  const theme = useTheme();

  const chartSeries = chart.series.map((item) => item.value);

  const sumSeries = chartSeries.reduce((acc, curr) => {
    return acc + curr;
  }, 0);

  const chartColors = chart.colors ?? [
    theme.palette.primary.main,
    theme.palette.warning.main,
    theme.palette.secondary.dark,
    theme.palette.error.main,
  ];

  const chartOptions = useChart({
    chart: { sparkline: { enabled: true } },
    colors: chartColors,
    labels: chart.series.map((item) => item.label),
    stroke: { width: 0 },
    dataLabels: { enabled: true, dropShadow: { enabled: false } },
    tooltip: {
      y: {
        formatter: (value: number) => fNumber(value),
        title: { formatter: (seriesName: string) => `${seriesName}` },
      },
    },
    plotOptions: { pie: { donut: { labels: { show: false } } } },
    ...chart.options,
  });

  return (
    <Card {...other}>
      <CardHeader title={title} subheader={subheader} />
      <BasicPie
        series={[
          {
            data: chart.series.map((item, index) => {
              return {
                id: index,
                value: Number.parseFloat(((item.value / sumSeries) * 100).toFixed(2)),
              };
            }),
          },
        ]}
        chartColors={chartColors}
        width={{ xs: 240, xl: 260 }}
        height={{ xs: 240, xl: 260 }}
        sx={{ my: 6, mx: 6 }}
      ></BasicPie>

      <Divider sx={{ borderStyle: 'dashed' }} />

      <ChartLegends
        labels={chartOptions?.labels}
        colors={chartOptions?.colors}
        sx={{ p: 3, justifyContent: 'center' }}
      />
    </Card>
  );
}

export default function BasicPie({
  sx,
  series,
  height,
  className,
  width = '100%',
  chartColors,
  ...other
}: BoxProps & { series: PieChartProps['series']; chartColors: string[] }) {
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
      <PieChart
        series={[
          {
            arcLabel: (item) => `${item.value}%`,
            arcLabelRadius: '60%',
            data: series[0].data,
            valueFormatter,
          },
        ]}
        colors={chartColors}
        sx={{
          [`& .${pieArcLabelClasses.root}`]: {
            fontWeight: 'bold',
          },
        }}
        {...size}
      />
    </Box>
  );
}
const size = {
  width: 450,
  height: 300,
};
