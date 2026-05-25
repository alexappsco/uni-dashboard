"use client";

import { Box } from "@mui/material";
import DashboardHeader from "./DashboardHeader";
import StatCards from "./StatCards";
import { AnalyticsSection } from "./charts";
import NotificationsCard from "./NotificationsCard";
import MostUsedOffersCard from "./MostUsedOffersCard";
import { BranchPerformanceChart } from "./charts";

export default function HomeView() {
  return (
    <Box
      dir="rtl"
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 3,
      }}
    >
      <DashboardHeader />
      <StatCards />
      <AnalyticsSection />

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", lg: "2fr 1fr" },
          gap: 3,
        }}
      >
        <Box sx={{ display: "flex", flexDirection: "column", gap: 3, minWidth: 0 }}>
          <MostUsedOffersCard />
          <BranchPerformanceChart />
        </Box>
        <Box sx={{ minWidth: 0 }}>
          <NotificationsCard />
        </Box>
      </Box>
    </Box>
  );
}
