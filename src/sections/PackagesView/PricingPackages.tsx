'use client';
import { Box, Typography, Button, Paper, Stack, Chip } from '@mui/material';
import Grid from '@mui/material/Grid';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import { useRouter } from 'next/navigation';

const packages = [
     {
    title: 'الباقة الشاملة',
    price: '99',
    features: ['20 عرض شهريا', '200 كود استخدام', 'فرع واحد', 'فرع واحد'],
    bgColor: '#F3E5F5',
    chipColor: '#E1BEE7',
  },
  {
    title: 'الباقة المثالية',
    price: '299',
    features: ['200 عرض شهريا', '1000 كود استخدام', 'حتي 5 فروع', 'تحليلات متقدمة'],
    bgColor: '#E0F7FA',
    chipColor: '#B2EBF2',
  },
  {
    title: 'الباقة القياسية',
    price: '599',
    features: ['عروض غير محدودة', 'اكواد غير محدودة', 'فروع غير محدودة', 'دعم أولوية'],
    bgColor: '#FDF5E6',
    chipColor: '#F5DEB3',
  },
];

export default function PricingPackages() {
  const router = useRouter();
  return (
    <Box sx={{ p: { xs: 2, md: 6 }, direction: 'rtl', bgcolor: '#fff', minHeight: '100vh' }}>
      {/* HEADER */}
      <Stack sx={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start', mb: 4, gap: 1 }}>
        <ArrowBackIosNewIcon sx={{ fontSize: 20 }} />
        <Typography sx={{ fontSize: 28, fontWeight: 700}}>شراء باقة جديدة</Typography>
      </Stack>
      <Typography sx={{ mb: 4, color: '#757575', fontSize: 16, fontWeight: 700 }}>شراء باقة</Typography>

      {/* PACKAGES GRID */}
      <Grid container spacing={3}>
        {packages.map((pkg, index) => (
          <Grid size={{ xs: 12, md: 4 }} key={index}>
            <Paper 
              elevation={0} 
              sx={{ 
                p: 4, 
                borderRadius: 4, 
                bgcolor: pkg.bgColor, 
                display: 'flex', 
                flexDirection: 'column', 
                alignItems: 'center',
                height: '100%'
              }}
            >
              <Chip label={pkg.title} sx={{ bgcolor: pkg.chipColor, fontWeight: 700, mb: 2, color: '#333' }} />
              
              <Stack sx={{ flexDirection: 'row', alignItems: 'baseline', mb: 3 }}>
                <Typography sx={{ fontSize: 48, fontWeight: 800 }}>{pkg.price}</Typography>
                <Typography sx={{ mr: 1, fontWeight: 600 }}>ر.س</Typography>
                <Typography sx={{ mr: 1, color: '#7B3FE4' }}>شهريا</Typography>
              </Stack>

              <Stack sx={{ width: '100%', mb: 4, gap: 2 }}>
                {pkg.features.map((feature, i) => (
                  <Stack key={i} sx={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start', gap: 1 }}>
                    <CheckCircleIcon sx={{ fontSize: 20, color: '#000' }} />
                    <Typography sx={{ fontSize: 16 }}>{feature}</Typography>

                  </Stack>
                ))}
              </Stack>

            <Box sx={{ alignSelf: 'flex-start', mb: 3 }}>
            <Typography 
                sx={{ 
                color: '#32ADE6', 
                textDecoration: 'underline', 
                cursor: 'pointer', 
                fontSize: 16,
                fontWeight: 700
                }}
            >
                شاهد جميع الميزات
            </Typography>
</Box>

              <Button 
               onClick={() => router.push('/packages/checkout')}
                sx={{ 
                    width: '70%',
                  bgcolor: '#203450', 
                  color: '#fff', 
                  py: 1.5, 
                  borderRadius: 4, 
                  textTransform: 'none',
                  '&:hover': { bgcolor: '#0D1540' } 
                }}
              >
                اختيار الباقة
              </Button>
              <Typography sx={{ fontSize: 12, mt: 1, color: '#757575' }}>الدفع مرة واحدة</Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}