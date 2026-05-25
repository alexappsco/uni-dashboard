
'use client';
import { Box, Typography, Button, Paper, Stack, Chip } from '@mui/material';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import CheckIcon from '@mui/icons-material/Check';
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined';
import { useRouter } from 'next/navigation';

const featuresRight = ['المستخدم الرئيسي + 3 مستخدمين إضافيين', 'ذاكرة تخزين بسعة 10 GB'];
const featuresLeft = ['إضافة 10 عملاء جدد', 'عدد غير محدود من الموردين'];

export default function PackagesManagement() {
  const router = useRouter();
  return (
    <Box sx={{ flex: 1, minHeight: '100vh', width: '100%', bgcolor: '#F3F3F3', p: { xs: 2, md: 4 }, direction: 'rtl' }}>
      
      {/* HEADER */}
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 4, gap: 2 }}>
        <Typography sx={{ fontSize: { xs: 22, sm: 34, lg: 40 }, fontWeight: 800, color: '#222831' }}>
          إدارة الباقات
        </Typography>
        <Button
          startIcon={<ShoppingCartOutlinedIcon />}
          sx={{ bgcolor: '#886CE8', color: '#fff', fontWeight: 800, px: { xs: 2, sm: 3 }, height: { xs: 48, sm: 52 }, borderRadius: 3, textTransform: 'none', '&:hover': { bgcolor: '#7758E6' } }}
          onClick={() => router.push('/packages/pricingPackages')}
        >
          شراء باقة جديدة
        </Button>
      </Box>

      {/* WRAPPER */}
      <Paper elevation={0} sx={{ bgcolor: '#F8F8F8', borderRadius: 4, p: { xs: 2, sm: 4 } }}>
        <Typography sx={{ fontSize: 18, fontWeight: 600, mb: 2 }}>باقتك الحالية :</Typography>

        {/* PLAN CARD */}
        <Paper elevation={0} sx={{ bgcolor: '#EAE3F2', borderRadius: 5, p: { xs: 3, sm: 4, lg: 6 } }}>
          <Stack sx={{ alignItems: 'flex-start', mb: 3 }}>
            <Chip label="الباقة القياسية" sx={{ bgcolor: '#D9C1F3', color: '#6F35D3', fontWeight: 800, px: 2 }} />
            <Box sx={{ display: 'flex', alignItems: 'flex-end', gap: 1, mt: 1 }}>
              <Typography sx={{ fontSize: { xs: 24, lg: 40 }, fontWeight: 900, color: '#334E75' }}>30 ¥</Typography>
              <Typography sx={{ fontSize: { xs: 12, sm: 14 }, fontWeight: 700, color: '#6F35D3', mb: 0.5 }}>سنوياً</Typography>
            </Box>
          </Stack>

          {/* FEATURES */}
          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 3 }}>
            <Stack sx={{ gap: 2 }}>
              {featuresRight.map((text, i) => <FeatureItem key={i} text={text} />)}
            </Stack>
            <Stack sx={{ gap: 2 }}>
              {featuresLeft.map((text, i) => <FeatureItem key={i} text={text} />)}
            </Stack>
          </Box>

          <Stack sx={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start', gap: 1.5, mt: 4 }}>
            <CalendarMonthOutlinedIcon sx={{ color: '#8B3DFF' }} />
            <Typography sx={{ fontSize: 16, fontWeight: 500, color: '#334E75' }}>ميعاد التجديد: 02/01/2026</Typography>
          </Stack>
        </Paper>
      </Paper>
    </Box>
  );
}

function FeatureItem({ text }: { text: string }) {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
      <Box sx={{ width: 26, height: 26, borderRadius: '50%', bgcolor: '#000', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
        <CheckIcon sx={{ fontSize: 16, color: '#fff' }} />
      </Box>
      <Typography sx={{ fontSize: { xs: 15, md: 17 }, fontWeight: 700, color: '#334E75' }}>{text}</Typography>
    </Box>
  );
}