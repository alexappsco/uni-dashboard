"use client";

import { useState } from "react";
import { Box, LinearProgress, Tab, Tabs, Typography } from "@mui/material";
import DashboardCard from "./DashboardCard";
import { BRANCH_PERFORMANCE, FINANCIAL_METRICS } from "./constants";

function BranchComparisonCard() {
  return (
    <DashboardCard sx={{ height: "100%" }}>
      <Typography
        sx={{ fontSize: 18, fontWeight: 700, color: "#111827", mb: 2.5 }}
      >
        مقارنة أداء الفروع
      </Typography>

      <Box sx={{ display: "flex", flexDirection: "column", gap: 2.5 }}>
        {BRANCH_PERFORMANCE.map((branch) => (
          <Box key={branch.name}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                mb: 1,
              }}
            >
              <Typography sx={{ fontSize: 14, fontWeight: 600, color: "#374151" }}>
                {branch.name}
              </Typography>
              <Typography sx={{ fontSize: 14, fontWeight: 700, color: "#111827" }}>
                {branch.value}%
              </Typography>
            </Box>
            <LinearProgress
              variant="determinate"
              value={branch.value}
              sx={{
                height: 10,
                borderRadius: "999px",
                bgcolor: "#E5E7EB",
                "& .MuiLinearProgress-bar": {
                  borderRadius: "999px",
                  background:
                    branch.color === "#38BDF8"
                      ? "linear-gradient(90deg, #7DD3FC, #38BDF8)"
                      : "linear-gradient(90deg, #EA580C, #C2410C)",
                },
              }}
            />
          </Box>
        ))}
      </Box>
    </DashboardCard>
  );
}

function FinancialReportsCard() {
  const [tab, setTab] = useState(0);

  return (
    <DashboardCard>
      <Tabs
        value={tab}
        onChange={(_, v) => setTab(v)}
        sx={{
          minHeight: 40,
          mb: 2.5,
          "& .MuiTabs-indicator": {
            height: 3,
            bgcolor: "#C2410C",
            borderRadius: "3px 3px 0 0",
          },
        }}
      >
        <Tab
          label="التقارير المالية"
          sx={{
            fontSize: 15,
            fontWeight: tab === 0 ? 700 : 500,
            color: tab === 0 ? "#C2410C" : "#6B7280",
            minHeight: 40,
            px: 0,
            mr: 3,
          }}
        />
        <Tab
          label="تقارير الإعلانات"
          sx={{
            fontSize: 15,
            fontWeight: tab === 1 ? 700 : 500,
            color: tab === 1 ? "#C2410C" : "#6B7280",
            minHeight: 40,
            px: 0,
          }}
        />
      </Tabs>

      {tab === 0 ? (
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" },
            gap: 2,
          }}
        >
          {FINANCIAL_METRICS.map((metric) => (
            <Box
              key={metric.label}
              sx={{
                bgcolor: "#EEF2FF",
                borderRadius: "12px",
                p: 2.5,
              }}
            >
              <Typography
                sx={{ fontSize: 14, fontWeight: 500, color: "#6B7280", mb: 1 }}
              >
                {metric.label}
              </Typography>
              <Typography
                sx={{ fontSize: 28, fontWeight: 700, color: "#111827" }}
              >
                {metric.value}
              </Typography>
            </Box>
          ))}
        </Box>
      ) : (
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" },
            gap: 2,
          }}
        >
          {[
            { label: "إجمالي إنفاق الإعلانات", value: "8,500 ر.س" },
            { label: "الحملات النشطة", value: "12" },
            { label: "معدل النقر", value: "4.2%" },
            { label: "الوصول الإعلاني", value: "45,000" },
          ].map((metric) => (
            <Box
              key={metric.label}
              sx={{
                bgcolor: "#EEF2FF",
                borderRadius: "12px",
                p: 2.5,
              }}
            >
              <Typography
                sx={{ fontSize: 14, fontWeight: 500, color: "#6B7280", mb: 1 }}
              >
                {metric.label}
              </Typography>
              <Typography
                sx={{ fontSize: 28, fontWeight: 700, color: "#111827" }}
              >
                {metric.value}
              </Typography>
            </Box>
          ))}
        </Box>
      )}
    </DashboardCard>
  );
}

export default function FinancialSection() {
  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: { xs: "1fr", lg: "30% 70%" },
        gap: 3,
      }}
    >
      <BranchComparisonCard />
      <FinancialReportsCard />
    </Box>
  );
}
