'use client';

import {
  Box,
  Button,
  Grid,
  Paper,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import ReportProblemRoundedIcon from '@mui/icons-material/ReportProblemRounded';

export default function GeneralInfo() {
  return (
    <Stack spacing={3}>
      {/* تنبيهات انتهاء الصلاحية */}
      <Paper
  sx={{
    p: 2,
    bgcolor: '#FFAB0033',
    borderRadius: 2,
    boxShadow: 'none',
  }}
>
  <Stack
    sx={{
      flexDirection: 'row',
      alignItems: 'center',
      gap: 1,
      mb: 2,
    }}
  >
     <ReportProblemRoundedIcon
      sx={{
        color: '#7A4100',
        fontSize: 22,
      }}
    />
    <Typography
      sx={{
        fontWeight: 700,
        color: '#7A4100',
      }}
    >
      تنبيهات انتهاء الصلاحية
    </Typography>

   
  </Stack>

  <Stack spacing={1}>
    <Paper
      sx={{
        p: 1.5,
        bgcolor: '#fff',
        borderRadius: 1,
        boxShadow: 'none',
      }}
    >
      <Stack
        sx={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Typography
          sx={{
            fontWeight: 600,
          }}
        >
          السجل التجاري
        </Typography>

        <Typography
          sx={{
            color: '#DC2626',
            fontSize: 13,
            fontWeight: 500,
          }}
        >
          ينتهي خلال 30 يوماً (15 سبتمبر 2025)
        </Typography>
      </Stack>
    </Paper>

    <Paper
      sx={{
        p: 1.5,
        bgcolor: '#fff',
        borderRadius: 1,
        boxShadow: 'none',
      }}
    >
      <Stack
        sx={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Typography
          sx={{
            fontWeight: 600,
          }}
        >
          الشهادة الضريبية
        </Typography>

        <Typography
          sx={{
            color: '#059669',
            fontSize: 13,
            fontWeight: 500,
          }}
        >
          صالح حتى (20 مارس 2025)
        </Typography>
      </Stack>
    </Paper>
  </Stack>
</Paper>

   
        <Grid container spacing={2}>
          <Grid size={{ xs: 12, md: 4 }}>
            <TextField
              fullWidth
              label="اسم الشركة"
              placeholder="اسم الشركة"
              
            />
          </Grid>

          <Grid size={{ xs: 12, md: 4 }}>
            <TextField
              fullWidth
              label="البريد الإلكتروني"
              placeholder="example@gmail.com"
         
            />
          </Grid>

          <Grid size={{ xs: 12, md: 4 }}>
            <TextField
              fullWidth
              label="الموقع الإلكتروني"
              placeholder="www.example.com"
            />
          </Grid>
        </Grid>

        {/* رفع الشعار */}
        <Box
          sx={{
            mt: 3,
            border: '1px dashed #D1D5DB',
            borderRadius: 2,
            minHeight: 180,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            bgcolor: '#FAFAFA',
            textAlign: 'center',
            p: 3,
          }}
        >
          <Box
            component="img"
            src="/images/upload-logo.svg"
            alt="logo"
            sx={{
              width: 90,
              mb: 2,
            }}
          />

          <Typography sx={{ variant: 'h6', fontWeight: 700 }}>
            اختر الشعار
          </Typography>

          <Typography sx={{ variant: 'body2', color: 'text.secondary', mt: 1 }}>
        
            اسحب وأفلت الملفات هنا أو تصفح الملفات
          </Typography>
        </Box>

        {/* السجل التجاري */}
        <Typography sx={{ variant: 'h6', fontWeight: 700, mt: 5, mb: 2 }}>
          السجل التجاري
        </Typography>

        <Grid container spacing={2}>
          <Grid size={{ xs: 12, md: 6 }}>
            <TextField
              fullWidth
              label="رقم السجل التجاري"
              placeholder="123456"
            />
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <TextField
              fullWidth
              label="تاريخ انتهاء السجل التجاري"
              placeholder="10-10-2030"
            />
          </Grid>
        </Grid>

        {/* الشهادة الضريبية */}
        <Typography sx={{ variant: 'h6', fontWeight: 700, mt: 5, mb: 2 }}>
          الشهادة الضريبية (VAT)
        </Typography>

        <Grid container spacing={2}>
          <Grid size={{ xs: 12, md: 6 }}>
            <TextField
              fullWidth
              label="رقم الشهادة الضريبية (VAT)"
              placeholder="123456"
            />
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <TextField
              fullWidth
              label="تاريخ انتهاء الشهادة الضريبية"
              placeholder="10-10-2030"
            />
          </Grid>
        </Grid>

        {/* المعلومات البنكية */}
        <Typography sx={{ variant: 'h6', fontWeight: 700, mt: 5, mb: 2 }}>
          المعلومات البنكية
        </Typography>

        <Grid container spacing={2}>
          <Grid size={{ xs: 12, md: 6 }}>
            <TextField
              fullWidth
              label="رقم الآيبان البنكي"
              placeholder="123456"
            />
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <TextField
              fullWidth
              label="اسم البنك"
              placeholder="البنك الأهلي السعودي"
            />
          </Grid>
        </Grid>

        {/* معلومات الاتصال */}
        <Typography sx={{variant:"h6", fontWeight: 700, mt: 5, mb: 2}}>
          معلومات الاتصال
        </Typography>

        <Grid container spacing={2}>
          <Grid size={{ xs: 12, md: 6 }}>
            <TextField
              fullWidth
              label="الهاتف الأرضي للشركة"
              placeholder="123456"
            />
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <TextField
              fullWidth
              label="هاتف الجوال للشركة"
              placeholder="+966555477"
            />
          </Grid>
        </Grid>

        <Box
          sx={{
            mt: 4,
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
              minWidth: 140,
              height: 46,
              borderRadius: 2,
              bgcolor: '#8B6FF5',

              '&:hover': {
                bgcolor: '#7B5CF2',
              },
            }}
          >
            تعديل
          </Button>
        </Box>
      {/* </Paper> */}
    </Stack>
  );
}