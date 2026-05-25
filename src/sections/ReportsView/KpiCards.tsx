"use client";

import { Box, Typography } from "@mui/material";
import Iconify from "src/components/iconify";
import {
  getKpiCardSx,
  kpiCardHeaderSx,
  kpiIconBoxSx,
  kpiLabelSx,
  kpiSubtitleSx,
  kpiValueOfferSx,
  kpiValueSx,
} from "src/components/kpi-card-styles";
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
      {KPI_CARDS.map((card, index) => {
        const isOfferCard = "subtitle" in card;

        return (
          <DashboardCard key={card.id} sx={getKpiCardSx(`${index * 0.07}s`)}>
            <Box sx={kpiCardHeaderSx}>
              <Typography sx={kpiLabelSx}>{card.label}</Typography>
              <Box
                sx={[
                  kpiIconBoxSx,
                  {
                    bgcolor: "iconBg" in card ? card.iconBg : "#FFF1EB",
                  },
                ]}
              >
                <Iconify
                  icon={card.icon}
                  width={20}
                  sx={{ color: card.iconColor }}
                />
              </Box>
            </Box>

            <Typography sx={isOfferCard ? kpiValueOfferSx : kpiValueSx}>
              {card.value}
            </Typography>

            {isOfferCard && (
              <Typography sx={[kpiSubtitleSx, { mt: 0.5 }]}>{card.subtitle}</Typography>
            )}
          </DashboardCard>
        );
      })}
    </Box>
  );
}
