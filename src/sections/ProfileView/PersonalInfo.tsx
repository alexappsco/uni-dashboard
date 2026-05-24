'use client';

import {
  Alert,
  Box,
  Button,
  FormControl,
  Grid,
  MenuItem,
  Paper,
  Select,
  Stack,
  TextField,
  Typography,
  InputLabel,
} from '@mui/material';

export default function PersonalInfo() {
  return (
    <    >
      {/* البيانات الشخصية */}
   <Grid container spacing={3}>
  <Grid size={{ xs: 12, md: 6 }}>
    <TextField
      fullWidth
      label="الموقع الإلكتروني"
      placeholder="www.example.com"
    />
  </Grid>

  <Grid size={{ xs: 12, md: 6 }}>
    <FormControl fullWidth>
  <InputLabel id="job-title-label">
    الصفة الوظيفية
  </InputLabel>

  <Select
    labelId="job-title-label"
    defaultValue="owner"
    label="الصفة الوظيفية"
  >
    <MenuItem value="owner">مالك</MenuItem>
    <MenuItem value="manager">مدير</MenuItem>
    <MenuItem value="employee">موظف</MenuItem>
  </Select>
</FormControl>
  </Grid>
</Grid>

      {/* رفع صورة الهوية */}
      <Box
        sx={{
          mt: 3,
          border: '1px dashed #E5E7EB',
          borderRadius: 2,
          minHeight: 230,
          bgcolor: '#FAFAFA',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'column',
          textAlign: 'center',
          px: 2,
        }}
      >
        <Box
          component="img"
          src="/images/upload-id.svg"
          alt="upload"
          sx={{
            width: 90,
            mb: 2,
          }}
        />

        <Typography
          sx={{
            fontWeight: 700,
            color: '#111827',
            mb: 1,
          }}
        >
          رفع صورة الهوية
        </Typography>

        <Typography
          variant="body2"
          sx={{
            color: '#60A5FA',
          }}
        >
          اسحب وأفلت الملفات هنا أو تصفح الملفات
        </Typography>
      </Box>

      {/* التعليمات */}
      <Alert
        severity="warning"
        sx={{
          mt: 3,
          alignItems: 'flex-start',
          bgcolor: '#FFAB0033',
          color: '#7A4100',
          borderRadius: 2,

          '& .MuiAlert-icon': {
            mt: '2px',
          },
        }}
      >
        <Typography sx={{ fontWeight: 700, mb: 1 }}>
          تعليمات مهمة:
        </Typography>

        <Stack spacing={0.5} >
          <Typography variant="body2" sx={{ fontWeight: 600 }}>
            • تأكد من وضوح جميع البيانات في الصورة
          </Typography>

          <Typography variant="body2" sx={{ fontWeight: 600 }}>
            • يجب أن تكون الصورة واضحة وغير مشوشة
          </Typography>

          <Typography variant="body2" sx={{ fontWeight: 600 }}>
            • تجنب الانعكاسات والظلال على الهوية
          </Typography>

          <Typography variant="body2" sx={{ fontWeight: 600 }}>
            • تأكد من تصوير الهوية كاملة
          </Typography>

          <Typography variant="body2" sx={{ fontWeight: 600 }}>
            • سيتم مراجعة البيانات المرفوعة خلال 24-48 ساعة
          </Typography>
        </Stack>
      </Alert>

      {/* زر التعديل */}
      <Box
        sx={{
          mt: 3,
          display: 'flex',
          justifyContent: {
            xs: 'center',
            md: 'flex-end',
          },
        }}
      >
        <Button
          variant="contained"
          sx={{
            minWidth: 120,
            height: 44,
            borderRadius: 2,
            bgcolor: '#8B6FF5',

            '&:hover': {
              bgcolor: '#7C5CF0',
            },
          }}
        >
          تعديل
        </Button>
      </Box>
    </>
  );
}