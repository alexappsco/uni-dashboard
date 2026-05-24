"use client";

import { useState } from "react";
import { Box, Typography } from "@mui/material";
import { PERIOD_TABS } from "./constants";

export default function DashboardHeader() {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: { xs: "column", md: "row" },
        alignItems: { xs: "flex-start", md: "center" },
        justifyContent: "space-between",
        gap: 2,
      }}
    >
      <Box>
        <Typography
          sx={{
            fontSize: { xs: 28, md: 34 },
            fontWeight: 700,
            lineHeight: 1.3,
            color: "#111827",
          }}
        >
          مرحباً بك في لوحة التاجر
        </Typography>
        <Typography
          sx={{
            fontSize: 15,
            fontWeight: 400,
            color: "#6B7280",
            mt: 0.75,
          }}
        >
          نظرة عامة على أداء عروضك ونشاط الفروع.
        </Typography>
      </Box>

      <Box
        sx={{
          display: "flex",
          bgcolor: "#EEF2F7",
          borderRadius: "12px",
          p: 0.5,
          height: 42,
          flexShrink: 0,
        }}
      >
        {PERIOD_TABS.map((label, index) => (
          <Box
            key={label}
            component="button"
            type="button"
            onClick={() => setActiveTab(index)}
            sx={{
              border: "none",
              cursor: "pointer",
              px: 2.5,
              minWidth: 72,
              height: "100%",
              borderRadius: "10px",
              fontSize: 14,
              fontWeight: activeTab === index ? 600 : 500,
              fontFamily: "inherit",
              color: activeTab === index ? "#111827" : "#6B7280",
              bgcolor: activeTab === index ? "#FFFFFF" : "transparent",
              boxShadow:
                activeTab === index
                  ? "0 1px 2px rgba(0,0,0,0.05)"
                  : "none",
              transition: "all 0.2s ease",
            }}
          >
            {label}
          </Box>
        ))}
      </Box>
    </Box>
  );
}
