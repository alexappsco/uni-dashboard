"use client";

import { Box, Typography } from "@mui/material";
import Iconify from "src/components/iconify";
import {
  getKpiCardSx,
  kpiCardHeaderSx,
  kpiIconBoxSx,
  kpiLabelSx,
  kpiValueSx,
} from "src/components/kpi-card-styles";
import DashboardCard from "./DashboardCard";
import { STATS_ROW_1, STATS_ROW_2 } from "./constants";

type StatItem = (typeof STATS_ROW_1)[number] | (typeof STATS_ROW_2)[number];

function StatCard({ stat, index }: { stat: StatItem; index: number }) {
  const badge = "badge" in stat ? stat.badge : undefined;

  return (
    <DashboardCard sx={getKpiCardSx(`${index * 0.07}s`)}>
      <Box sx={kpiCardHeaderSx}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1, flex: 1, minWidth: 0 }}>
          <Typography sx={kpiLabelSx}>{stat.title}</Typography>
          {badge && (
            <Box
              sx={{
                bgcolor: "#FFF7ED",
                color: "#C2410C",
                border: "1px solid rgba(234, 88, 12, 0.15)",
                borderRadius: "999px",
                px: 0.75,
                py: 0.25,
                fontSize: 10,
                fontWeight: 700,
                flexShrink: 0,
              }}
            >
              {badge}
            </Box>
          )}
        </Box>
        <Box sx={{ ...kpiIconBoxSx, bgcolor: stat.iconBg }}>
          <Iconify icon={stat.icon} width={20} sx={{ color: stat.iconColor }} />
        </Box>
      </Box>

      <Typography sx={{ ...kpiValueSx, mb: 0 }}>{stat.value}</Typography>
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
        gap: 2.5,
      }}
    >
      {allStats.map((stat, index) => (
        <StatCard key={stat.title} stat={stat} index={index} />
      ))}
    </Box>
  );
}
