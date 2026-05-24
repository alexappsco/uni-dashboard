"use client";

import {
  Box,
  Chip,
  Link,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import DashboardCard from "./DashboardCard";
import { TOP_OFFERS } from "./constants";

const STATUS_CONFIG = {
  active: { label: "نشط", bg: "#ECFDF3", color: "#027A48" },
  expired: { label: "منتهي", bg: "#FEF3F2", color: "#D92D20" },
} as const;

export default function MostUsedOffersCard() {
  return (
    <DashboardCard>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          mb: 2,
        }}
      >
        <Typography sx={{ fontSize: 18, fontWeight: 700, color: "#111827" }}>
          أكثر العروض استخداماً
        </Typography>
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
          عرض الكل
        </Link>
      </Box>

      <TableContainer sx={{ overflowX: "auto" }}>
        <Table size="small">
          <TableHead>
            <TableRow>
              {["اسم العرض", "الفرع", "مرات الاستخدام", "الحالة"].map(
                (col) => (
                  <TableCell
                    key={col}
                    align="right"
                    sx={{
                      fontWeight: 600,
                      color: "#6B7280",
                      fontSize: 13,
                      borderBottom: "1px solid #E5E7EB",
                      py: 1.25,
                      whiteSpace: "nowrap",
                    }}
                  >
                    {col}
                  </TableCell>
                )
              )}
            </TableRow>
          </TableHead>
          <TableBody>
            {TOP_OFFERS.map((offer) => {
              const status = STATUS_CONFIG[offer.status];
              return (
                <TableRow key={offer.id}>
                  <TableCell
                    align="right"
                    sx={{
                      fontWeight: 600,
                      color: "#111827",
                      fontSize: 14,
                      borderBottom: "1px solid #F3F4F6",
                    }}
                  >
                    {offer.name}
                  </TableCell>
                  <TableCell
                    align="right"
                    sx={{
                      color: "#6B7280",
                      fontSize: 14,
                      borderBottom: "1px solid #F3F4F6",
                    }}
                  >
                    {offer.branch}
                  </TableCell>
                  <TableCell
                    align="center"
                    sx={{
                      fontWeight: 600,
                      color: "#111827",
                      fontSize: 14,
                      borderBottom: "1px solid #F3F4F6",
                    }}
                  >
                    {offer.usage}
                  </TableCell>
                  <TableCell
                    align="center"
                    sx={{ borderBottom: "1px solid #F3F4F6" }}
                  >
                    <Chip
                      label={status.label}
                      size="small"
                      sx={{
                        bgcolor: status.bg,
                        color: status.color,
                        fontWeight: 600,
                        fontSize: 12,
                        height: 26,
                        borderRadius: "999px",
                        "& .MuiChip-label": { px: 1.25 },
                      }}
                    />
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </DashboardCard>
  );
}
