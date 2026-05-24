"use client";

import { Box, Divider, Link, Typography } from "@mui/material";
import Iconify from "src/components/iconify";
import DashboardCard from "./DashboardCard";
import { NOTIFICATIONS } from "./constants";

export default function NotificationsCard() {
  return (
    <DashboardCard
      sx={{
        height: { xs: "auto", md: 560 },
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2 }}>
        <Iconify icon="solar:bell-bold" width={22} sx={{ color: "#111827" }} />
        <Typography sx={{ fontSize: 18, fontWeight: 700, color: "#111827" }}>
          أحدث الإشعارات
        </Typography>
      </Box>

      <Box sx={{ flex: 1 }}>
        {NOTIFICATIONS.map((item, index) => (
          <Box key={item.id}>
            <Box sx={{ display: "flex", gap: 1.5, py: 1.5 }}>
              <Box
                sx={{
                  width: 40,
                  height: 40,
                  borderRadius: "50%",
                  bgcolor: item.iconBg,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                }}
              >
                <Iconify
                  icon={item.icon}
                  width={20}
                  sx={{ color: item.iconColor }}
                />
              </Box>
              <Box sx={{ flex: 1, minWidth: 0 }}>
                <Typography
                  sx={{
                    fontSize: 14,
                    fontWeight: 700,
                    color: "#111827",
                    mb: 0.25,
                  }}
                >
                  {item.title}
                </Typography>
                <Typography
                  sx={{ fontSize: 13, color: "#6B7280", lineHeight: 1.5 }}
                >
                  {item.description}
                </Typography>
                <Typography
                  sx={{ fontSize: 12, color: "#9CA3AF", mt: 0.75 }}
                >
                  {item.time}
                </Typography>
              </Box>
            </Box>
            {index < NOTIFICATIONS.length - 1 && <Divider />}
          </Box>
        ))}
      </Box>

      <Box sx={{ textAlign: "center", pt: 2 }}>
        <Link
          href="#"
          underline="none"
          sx={{
            color: "#F97316",
            fontWeight: 600,
            fontSize: 14,
            "&:hover": { color: "#EA580C" },
          }}
        >
          عرض كل الإشعارات
        </Link>
      </Box>
    </DashboardCard>
  );
}
