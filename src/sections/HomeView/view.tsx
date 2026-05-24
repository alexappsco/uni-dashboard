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
          gridTemplateColumns: { xs: "1fr", lg: "65% 35%" },
          gap: 3,
        }}
      >
        <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
          <MostUsedOffersCard />
          <BranchPerformanceChart />
        </Box>
        <NotificationsCard />
      </Box>
    </Box>
  );
}
