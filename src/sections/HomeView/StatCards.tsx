"use client";

import { Box, Typography } from "@mui/material";
import Iconify from "src/components/iconify";
import DashboardCard from "./DashboardCard";
import { STATS_ROW_1, STATS_ROW_2 } from "./constants";

type StatItem = (typeof STATS_ROW_1)[number] | (typeof STATS_ROW_2)[number];

function StatCard({ stat }: { stat: StatItem }) {
  const trend = "trend" in stat ? stat.trend : undefined;
  const badge = "badge" in stat ? stat.badge : undefined;

  return (
    <DashboardCard>
      <Box
        sx={{
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "space-between",
          mb: 2,
        }}
      >
        <Box sx={{ display: "flex", gap: 1, alignItems: "center", flexWrap: "wrap" }}>
          {trend && (
            <Box
              sx={{
                bgcolor: trend.positive ? "#ECFDF3" : "#FEF3F2",
                color: trend.positive ? "#027A48" : "#D92D20",
                borderRadius: "999px",
                px: 1,
                py: 0.5,
                fontSize: 12,
                fontWeight: 600,
                display: "inline-flex",
                alignItems: "center",
                gap: 0.25,
              }}
            >
              {trend.value}
              <span>{trend.positive ? "↑" : "↓"}</span>
            </Box>
          )}
          {badge && (
            <Box
              sx={{
                bgcolor: "#FFF7ED",
                color: "#EA580C",
                borderRadius: "999px",
                px: 1,
                py: 0.5,
                fontSize: 12,
                fontWeight: 600,
              }}
            >
              {badge}
            </Box>
          )}
        </Box>

        <Box
          sx={{
            width: 36,
            height: 36,
            borderRadius: "10px",
            bgcolor: stat.iconBg,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
          }}
        >
          <Iconify icon={stat.icon} width={20} sx={{ color: stat.iconColor }} />
        </Box>
      </Box>

      <Typography
        sx={{
          fontSize: 14,
          fontWeight: 500,
          color: "#6B7280",
          mb: 1,
        }}
      >
        {stat.title}
      </Typography>

      <Typography
        sx={{
          fontSize: { xs: 32, md: 40 },
          fontWeight: 700,
          lineHeight: 1.2,
          color: "#111827",
        }}
      >
        {stat.value}
      </Typography>
    </DashboardCard>
  );
}

export default function StatCards() {
  const allStats = [...STATS_ROW_1, ...STATS_ROW_2];

  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: {
          xs: "1fr",
          sm: "repeat(2, 1fr)",
          lg: "repeat(4, 1fr)",
        },
        gap: 3,
      }}
    >
      {allStats.map((stat) => (
        <StatCard key={stat.title} stat={stat} />
      ))}
    </Box>
  );
}
