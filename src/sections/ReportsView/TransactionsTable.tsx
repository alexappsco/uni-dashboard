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
import { TABLE_COLUMNS, TRANSACTIONS } from "./constants";

const STATUS_CONFIG = {
  completed: { label: "مكتمل", bg: "#ECFDF3", color: "#027A48" },
  processing: { label: "قيد المعالجة", bg: "#EEF2FF", color: "#4338CA" },
} as const;

export default function TransactionsTable() {
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
          سجل المعاملات وعمليات الاسترداد
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
        <Table>
          <TableHead>
            <TableRow>
              {TABLE_COLUMNS.map((col) => (
                <TableCell
                  key={col}
                  align="right"
                  sx={{
                    fontWeight: 600,
                    color: "#6B7280",
                    fontSize: 13,
                    borderBottom: "1px solid #E5E7EB",
                    py: 1.5,
                    whiteSpace: "nowrap",
                  }}
                >
                  {col}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {TRANSACTIONS.map((row, index) => {
              const status = STATUS_CONFIG[row.status];
              return (
                <TableRow
                  key={row.id}
                  sx={{
                    bgcolor: index % 2 === 1 ? "#F8FAFC" : "transparent",
                  }}
                >
                  <TableCell
                    align="right"
                    sx={{
                      fontWeight: 600,
                      color: "#111827",
                      fontSize: 14,
                      borderBottom: "1px solid #F3F4F6",
                    }}
                  >
                    {row.ref}
                  </TableCell>
                  <TableCell
                    align="right"
                    sx={{
                      color: "#374151",
                      fontSize: 14,
                      borderBottom: "1px solid #F3F4F6",
                    }}
                  >
                    {row.type}
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
                    {row.amount}
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
                  <TableCell
                    align="right"
                    sx={{
                      color: "#6B7280",
                      fontSize: 13,
                      borderBottom: "1px solid #F3F4F6",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {row.datetime}
                  </TableCell>
                  <TableCell
                    align="right"
                    sx={{
                      color: "#374151",
                      fontSize: 14,
                      borderBottom: "1px solid #F3F4F6",
                    }}
                  >
                    {row.activity}
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
