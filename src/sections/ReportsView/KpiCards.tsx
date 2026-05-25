"use client";

import { Box, Typography } from "@mui/material";
import Iconify from "src/components/iconify";
import DashboardCard from "./DashboardCard";
import { KPI_CARDS } from "./constants";

export default function KpiCards() {
  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: {
          xs: "1fr",
          sm: "repeat(2, 1fr)",
          lg: "repeat(3, 1fr)",
        },
        gap: 2.5,
      }}
    >
      {KPI_CARDS.map((card) => {
        const isOfferCard = "subtitle" in card;
        const hasTrendBadge = "trendBadge" in card;

        return (
          <DashboardCard key={card.id}>
            <Box
              sx={{
                display: "flex",
                alignItems: "flex-start",
                justifyContent: "space-between",
                mb: 2,
              }}
            >
              <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
                {hasTrendBadge && (
                  <Box
                    sx={{
                      bgcolor: "#ECFDF3",
                      color: "#027A48",
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
                    {card.trendBadge} ↑
                  </Box>
                )}
              </Box>

              <Box
                sx={{
                  width: 36,
                  height: 36,
                  borderRadius: "10px",
                  bgcolor:
                    "iconBg" in card ? card.iconBg : "#FFF1EB",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                }}
              >
                <Iconify
                  icon={card.icon}
                  width={20}
                  sx={{ color: card.iconColor }}
                />
              </Box>
            </Box>

            <Typography
              sx={{ fontSize: 14, fontWeight: 500, color: "#6B7280", mb: 1 }}
            >
              {card.label}
            </Typography>

            <Typography
              sx={{
                fontSize: isOfferCard ? 22 : { xs: 40, md: 54 },
                fontWeight: 700,
                lineHeight: 1.1,
                color: "#111827",
              }}
            >
              {card.value}
            </Typography>

            {isOfferCard && (
              <Typography
                sx={{ fontSize: 14, color: "#6B7280", mt: 0.75 }}
              >
                {card.subtitle}
              </Typography>
            )}
          </DashboardCard>
        );
      })}
    </Box>
  );
}
