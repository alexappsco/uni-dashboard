"use client";

import dynamic from "next/dynamic";
import { Box, Typography } from "@mui/material";
import type { ApexOptions } from "apexcharts";
import DashboardCard from "./DashboardCard";
import { REVENUE_DATA, USAGE_DATA, USAGE_DAYS } from "./constants";

const ReactApexChart = dynamic(() => import("react-apexcharts"), { ssr: false });

const baseOptions: ApexOptions = {
  chart: {
    fontFamily: "inherit",
    toolbar: { show: false },
    zoom: { enabled: false },
  },
  grid: {
    borderColor: "#F3F4F6",
    strokeDashArray: 4,
  },
  legend: { show: false },
  tooltip: { theme: "light" },
};

export function UsageTrendsChart() {
  const options: ApexOptions = {
    ...baseOptions,
    chart: { ...baseOptions.chart, type: "area", height: 300 },
    stroke: { width: 3, curve: "smooth", colors: ["#C2410C"] },
    colors: ["#C2410C"],
    fill: {
      type: "gradient",
      gradient: {
        shadeIntensity: 1,
        opacityFrom: 0.45,
        opacityTo: 0.05,
        stops: [0, 90, 100],
      },
    },
    markers: {
      size: 5,
      colors: ["#FFFFFF"],
      strokeColors: "#C2410C",
      strokeWidth: 2,
      hover: { size: 7 },
    },
    xaxis: {
      categories: USAGE_DAYS,
      labels: { style: { colors: "#9CA3AF", fontSize: "12px" } },
      axisBorder: { show: false },
      axisTicks: { show: false },
    },
    yaxis: {
      labels: { style: { colors: "#9CA3AF", fontSize: "12px" } },
    },
    dataLabels: { enabled: false },
  };

  return (
    <DashboardCard>
      <Typography
        sx={{ fontSize: 18, fontWeight: 700, color: "#111827", mb: 0.5 }}
      >
        اتجاهات الاستخدام اليومي وساعات الذروة
      </Typography>
      <Typography sx={{ fontSize: 13, color: "#6B7280", mb: 2 }}>
        أوقات ذروة الاستخدام: 1PM - 3PM
      </Typography>
      <ReactApexChart
        options={options}
        series={[{ name: "الاستخدام", data: USAGE_DATA }]}
        type="area"
        height={300}
      />
    </DashboardCard>
  );
}

export function RevenueTrendChart() {
  const options: ApexOptions = {
    ...baseOptions,
    chart: { ...baseOptions.chart, type: "bar", height: 300 },
    plotOptions: {
      bar: {
        borderRadius: 6,
        columnWidth: "45%",
      },
    },
    colors: ["#EA580C"],
    xaxis: {
      categories: ["1", "2", "3", "4", "5", "6"],
      labels: { style: { colors: "#9CA3AF", fontSize: "12px" } },
      axisBorder: { show: false },
      axisTicks: { show: false },
    },
    yaxis: {
      labels: {
        style: { colors: "#9CA3AF", fontSize: "12px" },
        formatter: (val) => `${Math.round(val)}`,
      },
    },
    dataLabels: { enabled: false },
  };

  return (
    <DashboardCard>
      <Typography
        sx={{ fontSize: 18, fontWeight: 700, color: "#111827", mb: 2 }}
      >
        اتجاه الإيرادات المالية
      </Typography>
      <ReactApexChart
        options={options}
        series={[{ name: "الإيرادات", data: REVENUE_DATA }]}
        type="bar"
        height={300}
      />
    </DashboardCard>
  );
}

export function AnalyticsCharts() {
  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
        gap: 3,
      }}
    >
      <UsageTrendsChart />
      <RevenueTrendChart />
    </Box>
  );
}
