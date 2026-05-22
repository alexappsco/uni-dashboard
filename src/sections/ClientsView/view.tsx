"use client";

import { Box, Typography } from "@mui/material";

export default function ClientsView() {
  return (
    <Box sx={{ textAlign: "right" }}>
      <Typography variant="h4" sx={{ fontWeight: 800 }}>
        العملاء
      </Typography>
      <Typography variant="body2" sx={{ color: "text.secondary", mt: 0.5 }}>
        إدارة واستعراض قائمة العملاء المشتركين
      </Typography>
    </Box>
  );
}
