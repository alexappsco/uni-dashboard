"use client";

import { Box, Typography } from "@mui/material";

export default function EmployeesView() {
  return (
    <Box sx={{ textAlign: "right" }}>
      <Typography variant="h4" sx={{ fontWeight: 800 }}>
        إدارة الموظفين
      </Typography>
      <Typography variant="body2" sx={{ color: "text.secondary", mt: 0.5 }}>
        إدارة ملفات الموظفين وصلاحيات الوصول
      </Typography>
    </Box>
  );
}