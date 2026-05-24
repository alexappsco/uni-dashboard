"use client";

import React from "react";
import {
  Box,
  Button,
  Dialog,
  DialogContent,
  Typography,
  Chip,
} from "@mui/material";
import Iconify from "src/components/iconify";
import { Branch } from "./branch-mock-data";

interface BranchDetailsDialogProps {
  open: boolean;
  onClose: () => void;
  branch: Branch | null;
}

export default function BranchDetailsDialog({
  open,
  onClose,
  branch,
}: BranchDetailsDialogProps) {
  if (!branch) return null;

  const isActive = branch.status === "active";

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="lg"
      fullWidth
      disableScrollLock
      slotProps={{
        paper: {
          sx: {
            borderRadius: "24px",
            boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1)",
            bgcolor: "#fff",
            my: 1.5,
          },
        },
      }}
    >
      <DialogContent sx={{ p: 0 }} dir="rtl">
        {/* Header */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            p: 2,
            px: 3,
            borderBottom: "1px solid #e5e7eb",
          }}
        >
          <Typography variant="h6" sx={{ fontWeight: 700, color: "#111827" }}>
            تفاصيل الفرع
          </Typography>
          <Button
            onClick={onClose}
            sx={{
              minWidth: "auto",
              p: 0.5,
              borderRadius: "50%",
              color: "#9ca3af",
              "&:hover": { color: "#6b7280", bgcolor: "#f3f4f6" },
            }}
          >
            ✕
          </Button>
        </Box>

        {/* Dialog Body */}
        <Box sx={{ p: 3, display: "flex", flexDirection: "column", gap: 2.5 }}>
          {/* First Section: Split in two halves (Right/Left) */}
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: { xs: "1fr", md: "1.2fr 1fr" },
              gap: 3,
              alignItems: "start",
            }}
          >
            {/* Right Half: Large Image */}
            <Box
              sx={{
                width: "100%",
                borderRadius: "20px",
                overflow: "hidden",
                boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.05), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
                border: "1px solid #f3f4f6",
                display: "flex",
              }}
            >
              <Box
                component="img"
                src="/assets/images/warehouses/branch_default.png"
                alt={branch.name}
                sx={{
                  width: "100%",
                  height: { xs: 150, md: 230 },
                  objectFit: "cover",
                  transition: "transform 0.5s ease",
                  "&:hover": {
                    transform: "scale(1.05)",
                  },
                }}
              />
            </Box>

            {/* Left Half: Text Details */}
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: 1.5,
                justifyContent: "center",
                height: "100%",
              }}
            >
              {/* Branch Number */}
              <Box>
                <Typography
                  variant="caption"
                  sx={{
                    color: "#9ca3af",
                    fontWeight: 600,
                    textTransform: "uppercase",
                    letterSpacing: 0.5,
                    display: "block",
                    mb: 0.25,
                    fontSize: "0.75rem",
                  }}
                >
                  رقم الفرع
                </Typography>
                <Typography
                  variant="subtitle1"
                  sx={{
                    fontWeight: 700,
                    color: "#4f46e5",
                    bgcolor: "#e0e7ff",
                    px: 1.25,
                    py: 0.25,
                    borderRadius: "8px",
                    display: "inline-block",
                    fontSize: "0.9rem",
                  }}
                >
                  {branch.branchNumber}
                </Typography>
              </Box>

              {/* Branch Name */}
              <Box>
                <Typography
                  variant="caption"
                  sx={{
                    color: "#9ca3af",
                    fontWeight: 600,
                    display: "block",
                    mb: 0.25,
                    fontSize: "0.75rem",
                  }}
                >
                  اسم الفرع
                </Typography>
                <Typography
                  variant="h6"
                  sx={{ fontWeight: 800, color: "#111827", fontSize: "1.15rem" }}
                >
                  {branch.name}
                </Typography>
              </Box>

              {/* Address */}
              <Box>
                <Typography
                  variant="caption"
                  sx={{
                    color: "#9ca3af",
                    fontWeight: 600,
                    display: "block",
                    mb: 0.25,
                    fontSize: "0.75rem",
                  }}
                >
                  العنوان بالتفصيل
                </Typography>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 0.75,
                    color: "#374151",
                  }}
                >
                  <Iconify
                    icon="solar:map-point-bold-duotone"
                    sx={{ color: "#ef4444", fontSize: 18 }}
                  />
                  <Typography variant="body2" sx={{ fontWeight: 600 }}>
                    {branch.address}
                  </Typography>
                </Box>
              </Box>

              {/* Status */}
              <Box>
                <Typography
                  variant="caption"
                  sx={{
                    color: "#9ca3af",
                    fontWeight: 600,
                    display: "block",
                    mb: 0.25,
                    fontSize: "0.75rem",
                  }}
                >
                  حالة الفرع
                </Typography>
                <Chip
                  label={isActive ? "نشط ومفعل" : "معطل وغير نشط"}
                  color={isActive ? "success" : "default"}
                  size="small"
                  icon={
                    <Iconify
                      icon={
                        isActive
                          ? "solar:check-circle-bold"
                          : "solar:close-circle-bold"
                      }
                    />
                  }
                  sx={{
                    fontWeight: 700,
                    px: 0.75,
                    borderRadius: "8px",
                    fontSize: "0.75rem",
                    height: 24,
                    bgcolor: isActive ? "#d1fae5" : "#f3f4f6",
                    color: isActive ? "#065f46" : "#4b5563",
                    "& .MuiChip-icon": {
                      color: isActive ? "#059669 !important" : "#6b7280 !important",
                    },
                  }}
                />
              </Box>
            </Box>
          </Box>

          {/* Second Section: Map Viewer */}
          <Box>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1,
                mb: 1.5,
                borderBottom: "1px solid #f3f4f6",
                pb: 1,
              }}
            >
              <Iconify
                icon="solar:map-bold-duotone"
                sx={{ color: "#6366f1", fontSize: 20 }}
              />
              <Typography
                variant="subtitle1"
                sx={{ fontWeight: 700, color: "#111827" }}
              >
                رؤية الموقع على الخريطة
              </Typography>
            </Box>

            {/* Reusing exact styling from AddBranchDialog map component */}
            <Box
              sx={{
                border: "2px dashed #e5e7eb",
                borderRadius: "20px",
                p: 2,
                textAlign: "center",
                backgroundColor: "#f9fafb",
                transition: "all 0.3s",
                "&:hover": {
                  backgroundColor: "#f3f4f6",
                  borderColor: "#d1d5db",
                },
              }}
            >
              <Box
                sx={{
                  width: 50,
                  height: 50,
                  borderRadius: "50%",
                  backgroundColor: "#dbeafe",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  margin: "0 auto 0.5rem",
                }}
              >
                <Iconify
                  icon="eva:pin-fill"
                  sx={{ fontSize: 26, color: "#0ea5e9" }}
                />
              </Box>
              <Typography
                variant="subtitle2"
                sx={{ fontWeight: 700, color: "#111827", mb: 0.25, fontSize: "0.875rem" }}
              >
                تحديد الموقع على الخريطة
              </Typography>
              <Typography variant="caption" sx={{ color: "#9ca3af", fontSize: "0.75rem" }}>
                إحداثيات الموقع دقيقة على خريطة جوجل للفرع {branch.name}
              </Typography>
            </Box>
          </Box>
        </Box>
      </DialogContent>
    </Dialog>
  );
}
