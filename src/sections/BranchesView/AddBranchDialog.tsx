"use client";

import React from "react";
import {
  Box,
  Button,
  Dialog,
  DialogContent,
  MenuItem,
  TextField,
  Typography,
} from "@mui/material";
import Iconify from "src/components/iconify";
import { Branch } from "./branch-mock-data";

interface AddBranchDialogProps {
  open: boolean;
  onClose: () => void;
  onAdd: (branch: Omit<Branch, "id">) => void;
}

export default function AddBranchDialog({
  open,
  onClose,
  onAdd,
}: AddBranchDialogProps) {
  const [newBranch, setNewBranch] = React.useState({
    branchNumber: "",
    name: "",
    address: "",
    status: "active" as "active" | "inactive",
  });

  const handleAdd = () => {
    if (!newBranch.name || !newBranch.address) {
      alert("يرجى ملء جميع الحقول المطلوبة");
      return;
    }

    onAdd({
      branchNumber: newBranch.branchNumber || `BR-${Date.now()}`,
      name: newBranch.name,
      address: newBranch.address,
      status: newBranch.status,
    });

    setNewBranch({
      branchNumber: "",
      name: "",
      address: "",
      status: "active",
    });
  };

  const handleClose = () => {
    setNewBranch({
      branchNumber: "",
      name: "",
      address: "",
      status: "active",
    });
    onClose();
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth="sm"
      fullWidth
      disableScrollLock
      PaperProps={{
        sx: {
          borderRadius: "24px",
          boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1)",
        },
      }}
    >
      <DialogContent sx={{ p: 0 }}>
        {/* Close Button */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            p: 3,
            borderBottom: "1px solid #e5e7eb",
          }}
        >
          <Typography variant="h6" sx={{ fontWeight: 700, color: "#111827" }}>
            إضافة فرع جديد
          </Typography>
          <Button
            onClick={handleClose}
            sx={{
              minWidth: "auto",
              p: 0,
              color: "#9ca3af",
              "&:hover": { color: "#6b7280" },
            }}
          >
            ✕
          </Button>
        </Box>

        {/* Form Content */}
        <Box sx={{ p: 3, space: 3 }}>
          {/* Upload Box */}
          <Box sx={{ mb: 3 }}>
            <Typography
              variant="body2"
              sx={{ fontWeight: 600, mb: 1.5, color: "#374151" }}
            >
              الصورة
            </Typography>
            <Box
              sx={{
                border: "2px dashed #e5e7eb",
                borderRadius: "22px",
                p: 6,
                textAlign: "center",
                cursor: "pointer",
                backgroundColor: "#f9fafb",
                transition: "all 0.3s",
                "&:hover": {
                  backgroundColor: "#f3f4f6",
                  borderColor: "#d1d5db",
                },
                minHeight: 200,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Box
                sx={{
                  width: 60,
                  height: 60,
                  borderRadius: "50%",
                  backgroundColor: "#e0e7ff",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  mb: 2,
                }}
              >
                <Iconify
                  icon="eva:file-add-fill"
                  sx={{ fontSize: 32, color: "#6366f1" }}
                />
              </Box>
              <Typography
                variant="body2"
                sx={{ fontWeight: 600, color: "#111827", mb: 0.5 }}
              >
                الصورة
              </Typography>
              <Typography variant="caption" sx={{ color: "#9ca3af" }}>
                يمكنك سحب الملفات أو النقر لاستعراضها
              </Typography>
            </Box>
          </Box>

          {/* Form Fields */}
          <Box sx={{ space: 2.5 }}>
            {/* Branch Name */}
            <Box sx={{ mb: 2 }}>
              <Typography
                variant="body2"
                sx={{ fontWeight: 600, mb: 1, color: "#374151" }}
              >
                اسم الفرع
              </Typography>
              <TextField
                fullWidth
                placeholder="ادخل اسم الفرع"
                value={newBranch.name}
                onChange={(e) =>
                  setNewBranch({ ...newBranch, name: e.target.value })
                }
                size="small"
                dir="rtl"
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "12px",
                    textAlign: "right",
                  },
                }}
              />
            </Box>

            {/* Status */}
            <Box sx={{ mb: 2 }}>
              <Typography
                variant="body2"
                sx={{ fontWeight: 600, mb: 1, color: "#374151" }}
              >
                حالة الفرع
              </Typography>
              <TextField
                select
                fullWidth
                value={newBranch.status}
                onChange={(e) =>
                  setNewBranch({
                    ...newBranch,
                    status: e.target.value as "active" | "inactive",
                  })
                }
                size="small"
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "12px",
                  },
                }}
              >
                <MenuItem value="active">نشط</MenuItem>
                <MenuItem value="inactive">غير نشط</MenuItem>
              </TextField>
            </Box>

            {/* Address */}
            <Box sx={{ mb: 3 }}>
              <Typography
                variant="body2"
                sx={{ fontWeight: 600, mb: 1, color: "#374151" }}
              >
                العنوان
              </Typography>
              <TextField
                fullWidth
                placeholder="ادخل العنوان بالتفصيل"
                value={newBranch.address}
                onChange={(e) =>
                  setNewBranch({ ...newBranch, address: e.target.value })
                }
                size="small"
                dir="rtl"
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "12px",
                    textAlign: "right",
                  },
                }}
              />
            </Box>
          </Box>

          {/* Map Box */}
          <Box
            sx={{
              border: "2px dashed #e5e7eb",
              borderRadius: "24px",
              p: 4,
              textAlign: "center",
              cursor: "pointer",
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
                width: 80,
                height: 80,
                borderRadius: "50%",
                backgroundColor: "#dbeafe",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: "0 auto 1.5rem",
              }}
            >
              <Iconify
                icon="eva:pin-fill"
                sx={{ fontSize: 40, color: "#0ea5e9" }}
              />
            </Box>
            <Typography
              variant="h6"
              sx={{ fontWeight: 700, color: "#111827", mb: 0.5 }}
            >
              تحديد الموقع على الخريطة
            </Typography>
            <Typography variant="caption" sx={{ color: "#9ca3af" }}>
              اضغط لتحديد الموقع الجغرافي الدقيق
            </Typography>
          </Box>

          {/* Buttons */}
          <Box
            sx={{
              display: "flex",
              gap: 2,
              mt: 3,
              flexDirection: { xs: "column-reverse", sm: "row" },
            }}
          >
            <Button
              onClick={handleClose}
              variant="outlined"
              fullWidth
              sx={{
                borderRadius: "12px",
                fontWeight: 600,
                color: "#4b5563",
                borderColor: "#e5e7eb",
                textTransform: "none",
                fontSize: "0.95rem",
                "&:hover": {
                  backgroundColor: "#f9fafb",
                  borderColor: "#d1d5db",
                },
              }}
            >
              إلغاء
            </Button>
            <Button
              onClick={handleAdd}
              variant="contained"
              fullWidth
              sx={{
                borderRadius: "12px",
                fontWeight: 600,
                textTransform: "none",
                fontSize: "0.95rem",
                backgroundColor: "#886ce8",
                "&:hover": {
                  backgroundColor: "#7c5ce5",
                },
              }}
            >
              إضافة
            </Button>
          </Box>
        </Box>
      </DialogContent>
    </Dialog>
  );
}
