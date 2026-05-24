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
  onEdit?: (branch: Branch) => void;
  branchToEdit?: Branch | null;
}

export default function AddBranchDialog({
  open,
  onClose,
  onAdd,
  onEdit,
  branchToEdit,
}: AddBranchDialogProps) {
  const [newBranch, setNewBranch] = React.useState({
    branchNumber: "",
    name: "",
    address: "",
    status: "active" as "active" | "inactive",
  });

  React.useEffect(() => {
    if (branchToEdit) {
      setNewBranch({
        branchNumber: branchToEdit.branchNumber,
        name: branchToEdit.name,
        address: branchToEdit.address,
        status: branchToEdit.status,
      });
    } else {
      setNewBranch({
        branchNumber: "",
        name: "",
        address: "",
        status: "active",
      });
    }
  }, [branchToEdit, open]);

  const handleAdd = () => {
    if (!newBranch.name || !newBranch.address) {
      alert("يرجى ملء جميع الحقول المطلوبة");
      return;
    }

    if (branchToEdit) {
      if (onEdit) {
        onEdit({
          id: branchToEdit.id,
          branchNumber: newBranch.branchNumber || branchToEdit.branchNumber,
          name: newBranch.name,
          address: newBranch.address,
          status: newBranch.status,
        });
      }
    } else {
      onAdd({
        branchNumber: newBranch.branchNumber || `BR-${Date.now()}`,
        name: newBranch.name,
        address: newBranch.address,
        status: newBranch.status,
      });
    }
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
      maxWidth="lg"
      fullWidth
      disableScrollLock
      slotProps={{
        paper: {
          sx: {
            borderRadius: "24px",
            boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1)",
            bgcolor: "#fff",
            my: 1,
            maxHeight: "98vh",
            overflow: "hidden",
          },
        },
      }}
    >
      <DialogContent sx={{ p: 0, overflow: "hidden" }} dir="rtl">
        {/* Header */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            p: 1.75,
            px: 3,
            borderBottom: "1px solid #e5e7eb",
          }}
        >
          <Typography variant="h6" sx={{ fontWeight: 700, color: "#111827", fontSize: "1.05rem" }}>
            {branchToEdit ? "تعديل الفرع" : "إضافة فرع جديد"}
          </Typography>
          <Button
            onClick={handleClose}
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

        {/* Form Content */}
        <Box sx={{ p: 2.5, px: 3, display: "flex", flexDirection: "column", gap: 2 }}>
          
          {/* First Section: Split in two halves (Right/Left) */}
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
              gap: 3,
              alignItems: "start",
            }}
          >
            {/* Right Half: Upload Box */}
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                height: "100%",
              }}
            >
              <Typography
                variant="body2"
                sx={{ fontWeight: 600, mb: 0.75, color: "#374151", fontSize: "0.85rem" }}
              >
                الصورة للفرع
              </Typography>
              <Box
                sx={{
                  border: "2px dashed #e5e7eb",
                  borderRadius: "16px",
                  p: 2,
                  textAlign: "center",
                  cursor: "pointer",
                  backgroundColor: "#f9fafb",
                  transition: "all 0.3s",
                  "&:hover": {
                    backgroundColor: "#f3f4f6",
                    borderColor: "#d1d5db",
                  },
                  flexGrow: 1,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  minHeight: { xs: 110, md: 170 },
                  maxHeight: 180,
                }}
              >
                <Box
                  sx={{
                    width: 44,
                    height: 44,
                    borderRadius: "50%",
                    backgroundColor: "#e0e7ff",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    mb: 0.75,
                  }}
                >
                  <Iconify
                    icon="eva:file-add-fill"
                    sx={{ fontSize: 24, color: "#6366f1" }}
                  />
                </Box>
                <Typography
                  variant="body2"
                  sx={{ fontWeight: 600, color: "#111827", mb: 0.25, fontSize: "0.85rem" }}
                >
                  تحميل صورة الفرع
                </Typography>
                <Typography variant="caption" sx={{ color: "#9ca3af", fontSize: "0.7rem" }}>
                  يمكنك سحب الملفات أو النقر لاستعراضها
                </Typography>
              </Box>
            </Box>

            {/* Left Half: Form Fields */}
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" },
                gap: 1.5,
              }}
            >
              {/* Branch Name */}
              <Box sx={{ gridColumn: "span 2" }}>
                <Typography
                  variant="body2"
                  sx={{ fontWeight: 600, mb: 0.5, color: "#374151", fontSize: "0.85rem" }}
                >
                  اسم الفرع <span style={{ color: "#ef4444" }}>*</span>
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
                      height: 36,
                      fontSize: "0.875rem",
                    },
                  }}
                />
              </Box>

              {/* Branch Number */}
              <Box>
                <Typography
                  variant="body2"
                  sx={{ fontWeight: 600, mb: 0.5, color: "#374151", fontSize: "0.85rem" }}
                >
                  رقم الفرع
                </Typography>
                <TextField
                  fullWidth
                  placeholder="BR-006 (اختياري)"
                  value={newBranch.branchNumber}
                  onChange={(e) =>
                    setNewBranch({ ...newBranch, branchNumber: e.target.value })
                  }
                  size="small"
                  dir="rtl"
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      borderRadius: "12px",
                      textAlign: "right",
                      height: 36,
                      fontSize: "0.875rem",
                    },
                  }}
                />
              </Box>

              {/* Status */}
              <Box>
                <Typography
                  variant="body2"
                  sx={{ fontWeight: 600, mb: 0.5, color: "#374151", fontSize: "0.85rem" }}
                >
                  حالة الفرع <span style={{ color: "#ef4444" }}>*</span>
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
                      height: 36,
                      fontSize: "0.875rem",
                    },
                  }}
                >
                  <MenuItem value="active">نشط ومفعل</MenuItem>
                  <MenuItem value="inactive">غير نشط</MenuItem>
                </TextField>
              </Box>

              {/* Address */}
              <Box sx={{ gridColumn: "span 2" }}>
                <Typography
                  variant="body2"
                  sx={{ fontWeight: 600, mb: 0.5, color: "#374151", fontSize: "0.85rem" }}
                >
                  العنوان بالتفصيل <span style={{ color: "#ef4444" }}>*</span>
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
                      height: 36,
                      fontSize: "0.875rem",
                    },
                  }}
                />
              </Box>
            </Box>
          </Box>

          {/* Second Section: Map Selector (Sleek Horizontal Layout) */}
          <Box>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1,
                mb: 1.25,
                borderBottom: "1px solid #f3f4f6",
                pb: 0.75,
              }}
            >
              <Iconify
                icon="solar:map-bold-duotone"
                sx={{ color: "#6366f1", fontSize: 18 }}
              />
              <Typography
                variant="subtitle2"
                sx={{ fontWeight: 700, color: "#111827" }}
              >
                تحديد الموقع على الخريطة
              </Typography>
            </Box>

            <Box
              sx={{
                border: "2px dashed #e5e7eb",
                borderRadius: "16px",
                p: 1.25,
                px: 2.5,
                display: "flex",
                alignItems: "center",
                gap: 2,
                cursor: "pointer",
                backgroundColor: "#f9fafb",
                transition: "all 0.3s",
                minHeight: 180,
                justifyContent: "center",
                "&:hover": {
                  backgroundColor: "#f3f4f6",
                  borderColor: "#d1d5db",
                },
              }}
            >
              <Box
                sx={{
                  width: 40,
                  height: 40,
                  borderRadius: "50%",
                  backgroundColor: "#dbeafe",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Iconify
                  icon="eva:pin-fill"
                  sx={{ fontSize: 20, color: "#0ea5e9" }}
                />
              </Box>
              <Box sx={{ textAlign: "right", flexGrow: 1 }}>
                <Typography
                  variant="subtitle2"
                  sx={{ fontWeight: 700, color: "#111827", fontSize: "0.85rem", mb: 0.25 }}
                >
                  تحديد الموقع على الخريطة
                </Typography>
                <Typography variant="caption" sx={{ color: "#9ca3af", fontSize: "0.725rem" }}>
                  {branchToEdit ? `تحديث الموقع الجغرافي للفرع ${newBranch.name}` : "اضغط لتحديد الموقع الجغرافي الدقيق للفرع على خريطة جوجل"}
                </Typography>
              </Box>
            </Box>
          </Box>

          {/* Footer Action Buttons */}
          <Box
            sx={{
              display: "flex",
              gap: 1.5,
              mt: 0.5,
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
                fontSize: "0.875rem",
                height: 38,
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
                fontSize: "0.875rem",
                backgroundColor: "#886ce8",
                height: 38,
                "&:hover": {
                  backgroundColor: "#7c5ce5",
                },
              }}
            >
              {branchToEdit ? "حفظ التعديلات" : "إضافة الفرع"}
            </Button>
          </Box>

        </Box>
      </DialogContent>
    </Dialog>
  );
}
