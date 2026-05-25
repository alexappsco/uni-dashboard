"use client";

import { Box } from "@mui/material";
import ReportsHeader from "./ReportsHeader";
import KpiCards from "./KpiCards";
import { AnalyticsCharts } from "./charts";
import FinancialSection from "./FinancialSection";
import TransactionsTable from "./TransactionsTable";

export default function ReportsView() {
  return (
    <Box
      dir="rtl"
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 3,
      }}
    >
      <ReportsHeader />
      <KpiCards />
      <AnalyticsCharts />
      <FinancialSection />
      <TransactionsTable />
    </Box>
  );
}
