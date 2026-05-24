"use client";

import Link from "next/link";
import {
  Box,
  Button,
  Card,
  Chip,
  MenuItem,
  Switch,
  TextField,
  Typography,
} from "@mui/material";
import Iconify from "src/components/iconify";

const fieldSx = {
  "& .MuiOutlinedInput-root": {
    borderRadius: "12px",
    bgcolor: "#fff",
    minHeight: 52,
  },
};

interface AddOfferViewProps {
  mode?: "create" | "edit";
}

export default function AddOfferView({ mode = "create" }: AddOfferViewProps) {
  const isEdit = mode === "edit";

  return (
    <Box
      sx={{
        bgcolor: "#F4F6F8",
        minHeight: "100%",
        textAlign: "right",
        pb: 4,
        p: { xs: 2, md: 4 },
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", sm: "row" },
          justifyContent: "space-between",
          alignItems: { xs: "stretch", sm: "center" },
          gap: 2,
          mb: 4,
        }}
      >
        <Typography
          variant="h3"
          sx={{ color: "#1F2937", fontWeight: 800, fontSize: 32 }}
        >
          {isEdit ? "تعديل عرض" : "اضافة عرض"}
        </Typography>

        <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
          <Button
            component={Link}
            href="/offers"
            variant="outlined"
            sx={{
              width: 100,
              height: 48,
              borderRadius: "12px",
              borderColor: "#FF5630",
              color: "#FF5630",
              fontWeight: 700,
              "&:hover": {
                borderColor: "#FF5630",
                bgcolor: "rgba(255, 86, 48, 0.08)",
              },
            }}
          >
            الغاء
          </Button>

          <Button
            variant="contained"
            sx={{
              width: 110,
              height: 48,
              borderRadius: "12px",
              bgcolor: "#886CE8",
              color: "#fff",
              fontWeight: 700,
              boxShadow: "none",
              "&:hover": { bgcolor: "#7758E6", boxShadow: "none" },
            }}
          >
            {isEdit ? "تعديل" : "+ إضافة"}
          </Button>
        </Box>
      </Box>

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
          gap: 3,
          alignItems: "start",
        }}
      >
        <Card
          sx={{
            borderRadius: "24px",
            p: 3,
            boxShadow: "0 1px 2px rgba(16, 24, 40, 0.04)",
          }}
        >
          <Typography
            variant="h5"
            sx={{ color: "#1F2937", fontWeight: 800, fontSize: 24, mb: 3 }}
          >
            البيانات الأساسية
          </Typography>

          <Box sx={{ display: "flex", flexDirection: "column", gap: 2.5 }}>
            <Box>
              <Typography sx={{ color: "#1F2937", fontWeight: 600, mb: 1 }}>
                الاسم باللغة العربية
              </Typography>
              <TextField
                fullWidth
                placeholder="اكتب الاسم باللغة العربية"
                sx={fieldSx}
              />
            </Box>

            <Box>
              <Typography sx={{ color: "#1F2937", fontWeight: 600, mb: 1 }}>
                الاسم باللغة الانجليزية
              </Typography>
              <TextField
                fullWidth
                placeholder="اكتب الاسم باللغة الانجليزية"
                sx={fieldSx}
              />
            </Box>

            <Box>
              <Typography sx={{ color: "#1F2937", fontWeight: 600, mb: 1 }}>
                وصف العرض
              </Typography>
              <TextField
                fullWidth
                multiline
                minRows={4}
                placeholder="وصف العرض"
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "12px",
                    bgcolor: "#fff",
                  },
                }}
              />
            </Box>

            <Box>
              <Typography sx={{ color: "#1F2937", fontWeight: 600, mb: 1 }}>
                وصف العرض بالانجليزية
              </Typography>
              <TextField
                fullWidth
                multiline
                minRows={4}
                placeholder="وصف العرض بالانجليزية"
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "12px",
                    bgcolor: "#fff",
                  },
                }}
              />
            </Box>

            <Box>
              <Typography sx={{ color: "#1F2937", fontWeight: 600, mb: 1 }}>
                نوع الكود
              </Typography>
              <TextField select fullWidth defaultValue="auto" sx={fieldSx}>
                <MenuItem value="auto">توليد تلقائي</MenuItem>
                <MenuItem value="manual">يدوي</MenuItem>
              </TextField>
            </Box>

            <Box sx={{ display: "flex", alignItems: "center", gap: 2, pt: 1 }}>
              <Typography sx={{ color: "#1F2937", fontWeight: 600 }}>
                الحالة
              </Typography>
              <Switch defaultChecked color="success" />
              <Typography sx={{ color: "#1F2937", fontWeight: 600 }}>
                مفعل
              </Typography>
            </Box>
          </Box>
        </Card>

        <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
          <Card
            sx={{
              borderRadius: "24px",
              p: 3,
              boxShadow: "0 1px 2px rgba(16, 24, 40, 0.04)",
            }}
          >
            <Typography
              variant="h5"
              sx={{ color: "#1F2937", fontWeight: 800, fontSize: 24, mb: 3 }}
            >
              صور المنتج
            </Typography>

            <Box
              component="label"
              sx={{
                height: 260,
                borderRadius: "24px",
                border: "2px dashed #E5E7EB",
                bgcolor: "#FAFBFC",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                transition: "border-color 0.2s ease",
                "&:hover": { borderColor: "#886CE8" },
              }}
            >
              <Iconify
                icon="solar:file-bold-duotone"
                width={112}
                sx={{ color: "#9CA3AF", mb: 2.5 }}
              />
              <Typography sx={{ color: "#1F2937", fontSize: 16 }}>
                اختيار صورة او ملف
              </Typography>
              <Box component="input" type="file" sx={{ display: "none" }} />
            </Box>

            <Box sx={{ display: "flex", gap: 2, mt: 2.5, flexWrap: "wrap" }}>
              {[1, 2, 3].map((item) => (
                <Box
                  key={item}
                  sx={{
                    position: "relative",
                    width: 90,
                    height: 90,
                    borderRadius: "16px",
                    border: "1px solid #E5E7EB",
                    bgcolor: "#F8F8F8",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    boxShadow: "0 1px 2px rgba(16, 24, 40, 0.04)",
                  }}
                >
                  <Button
                    sx={{
                      position: "absolute",
                      top: 6,
                      left: 6,
                      minWidth: 0,
                      width: 28,
                      height: 28,
                      p: 0,
                      color: "#FF5630",
                    }}
                  >
                    <Iconify icon="solar:trash-bin-trash-bold" width={18} />
                  </Button>
                  <Iconify
                    icon="solar:gallery-bold"
                    width={32}
                    sx={{ color: "#D1D5DB" }}
                  />
                </Box>
              ))}
            </Box>
          </Card>

          <Card
            sx={{
              borderRadius: "24px",
              p: 3,
              boxShadow: "0 1px 2px rgba(16, 24, 40, 0.04)",
            }}
          >
            <Typography sx={{ color: "#1F2937", fontSize: 16, mb: 3 }}>
              الفرع
            </Typography>

            <TextField select fullWidth defaultValue="branch" sx={fieldSx}>
              <MenuItem value="branch">الفرع</MenuItem>
              <MenuItem value="branch-1">الفرع 1</MenuItem>
              <MenuItem value="branch-2">الفرع 2</MenuItem>
              <MenuItem value="branch-3">الفرع 3</MenuItem>
            </TextField>

            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, mt: 2.5 }}>
              {["الفرع 1", "الفرع 2", "الفرع 3", "الفرع 4"].map((branch) => (
                <Chip
                  key={branch}
                  label={branch}
                  sx={{
                    borderRadius: "8px",
                    bgcolor: "#DFF3FA",
                    color: "#0C4A6E",
                    fontWeight: 600,
                  }}
                />
              ))}
            </Box>
          </Card>
        </Box>
      </Box>
    </Box>
  );
}
