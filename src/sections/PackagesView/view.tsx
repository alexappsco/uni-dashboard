
'use client';
import { Box, Typography, Button, Paper, Stack, Chip } from '@mui/material';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import CheckIcon from '@mui/icons-material/Check';
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined';
import { useRouter } from 'next/navigation';
import type { MySubscription } from 'src/actions/packages';

interface PackagesViewProps {
  subscription: MySubscription | null;
}

function formatRenewalDate(dateStr: string): string {
  if (!dateStr) {
    return '-';
  }

  const date = new Date(dateStr);

  if (Number.isNaN(date.getTime())) {
    return '-';
  }

  return date.toLocaleDateString('ar-EG', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });
}

function parseFeatures(description: string): string[] {
  if (!description.trim()) {
    return [];
  }

  return description
    .split(/\n|,|،/)
    .map((item) => item.trim())
    .filter(Boolean);
}

export default function PackagesManagement({ subscription }: PackagesViewProps) {
  const router = useRouter();
  const features = subscription ? parseFeatures(subscription.description) : [];
  const midpoint = Math.ceil(features.length / 2);
  const featuresRight = features.slice(0, midpoint);
  const featuresLeft = features.slice(midpoint);

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

        {!subscription ? (
          <Paper
            elevation={0}
            sx={{
              bgcolor: '#fff',
              borderRadius: 4,
              p: { xs: 3, sm: 4 },
              textAlign: 'center',
            }}
          >
            <Typography sx={{ fontSize: 16, fontWeight: 600, color: '#667085', mb: 2 }}>
              لا توجد باقة نشطة حالياً
            </Typography>
            <Button
              variant="contained"
              onClick={() => router.push('/packages/pricingPackages')}
              sx={{
                bgcolor: '#886CE8',
                fontWeight: 700,
                borderRadius: 3,
                textTransform: 'none',
                '&:hover': { bgcolor: '#7758E6' },
              }}
            >
              اشترك في باقة الآن
            </Button>
          </Paper>
        ) : (
          <Paper elevation={0} sx={{ bgcolor: '#EAE3F2', borderRadius: 5, p: { xs: 3, sm: 4, lg: 6 } }}>
            <Stack sx={{ alignItems: 'flex-start', mb: 3 }}>
              <Chip
                label={subscription.name}
                sx={{ bgcolor: '#D9C1F3', color: '#6F35D3', fontWeight: 800, px: 2 }}
              />
              <Box sx={{ display: 'flex', alignItems: 'flex-end', gap: 1, mt: 1 }}>
                <Typography sx={{ fontSize: { xs: 24, lg: 40 }, fontWeight: 900, color: '#334E75' }}>
                  {subscription.price} ر.س
                </Typography>
                <Typography sx={{ fontSize: { xs: 12, sm: 14 }, fontWeight: 700, color: '#6F35D3', mb: 0.5 }}>
                  سنوياً
                </Typography>
              </Box>
            </Stack>

            {features.length > 0 && (
              <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 3 }}>
                <Stack sx={{ gap: 2 }}>
                  {featuresRight.map((text, i) => (
                    <FeatureItem key={`right-${i}`} text={text} />
                  ))}
                </Stack>
                <Stack sx={{ gap: 2 }}>
                  {featuresLeft.map((text, i) => (
                    <FeatureItem key={`left-${i}`} text={text} />
                  ))}
                </Stack>
              </Box>
            )}

            <Stack sx={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start', gap: 1.5, mt: 4 }}>
              <CalendarMonthOutlinedIcon sx={{ color: '#8B3DFF' }} />
              <Typography sx={{ fontSize: 16, fontWeight: 500, color: '#334E75' }}>
                ميعاد التجديد: {formatRenewalDate(subscription.expireAt)}
              </Typography>
            </Stack>
          </Paper>
        )}
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
