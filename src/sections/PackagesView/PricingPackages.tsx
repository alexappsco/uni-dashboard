'use client';

import { Box, Typography, Button, Paper, Stack, Chip, CircularProgress, Snackbar, Alert } from '@mui/material';
import Grid from '@mui/material/Grid';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { getPackagesAction, subscribePackageAction, PricingPackage } from 'src/actions/packages';

export default function PricingPackages() {
  const router = useRouter();
  const [packages, setPackages] = useState<PricingPackage[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [subscribingId, setSubscribingId] = useState<string | null>(null);
  const [actionMessage, setActionMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const handleSubscribe = async (pkg: PricingPackage) => {
    try {
      setSubscribingId(pkg.id);
      setActionMessage(null);

      const result = await subscribePackageAction(pkg.id);

      if (result.success) {
        setActionMessage({
          type: 'success',
          text: `تم شراء باقة ${pkg.title} بنجاح`,
        });
        setTimeout(() => router.push('/packages'), 2500);
        return;
      }

      setActionMessage({
        type: 'error',
        text: result.error ?? 'تعذر الاشتراك في الباقة',
      });
    } catch (err) {
      setActionMessage({
        type: 'error',
        text: err instanceof Error ? err.message : 'حدث خطأ غير متوقع',
      });
    } finally {
      setSubscribingId(null);
    }
  };

  useEffect(() => {
    const fetchPackages = async () => {
      try {
        setLoading(true);
        setError(null);
        const result = await getPackagesAction();

        if (result.success) {
          setPackages(result.data);
        } else {
          setPackages([]);
          setError(result.error ?? 'تعذر تحميل الباقات');
        }
      } catch (err) {
        setPackages([]);
        setError(err instanceof Error ? err.message : 'حدث خطأ غير متوقع');
      } finally {
        setLoading(false);
      }
    };

    fetchPackages();
  }, []);

  return (
    <Box sx={{ p: { xs: 2, md: 6 }, direction: 'rtl', bgcolor: '#fff', minHeight: '100vh' }}>
      <Stack sx={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start', mb: 4, gap: 1 }}>
        <Typography sx={{ fontSize: 28, fontWeight: 700, cursor: 'pointer' }} onClick={() => router.push('/packages')}>إدارة الباقات</Typography>
        <ArrowBackIosNewIcon sx={{ fontSize: 20 }} />
        <Typography sx={{ fontSize: 28, fontWeight: 700 }}>شراء باقة جديدة</Typography>
      </Stack>
      <Typography sx={{ mb: 4, color: '#757575', fontSize: 16, fontWeight: 700 }}>شراء باقة</Typography>

      <Snackbar
        open={!!actionMessage}
        autoHideDuration={actionMessage?.type === 'success' ? 2500 : 4000}
        onClose={() => setActionMessage(null)}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert
          onClose={() => setActionMessage(null)}
          severity={actionMessage?.type ?? 'info'}
          variant="filled"
          sx={{ width: '100%', fontWeight: 600, fontSize: 16 }}
        >
          {actionMessage?.text}
        </Alert>
      </Snackbar>

      {loading && (
        <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
          <CircularProgress />
        </Box>
      )}

      {!loading && error && (
        <Typography sx={{ color: 'error.main', textAlign: 'center', py: 4 }}>{error}</Typography>
      )}

      {!loading && !error && packages.length === 0 && (
        <Typography sx={{ color: '#757575', textAlign: 'center', py: 4 }}>لا توجد باقات متاحة حالياً</Typography>
      )}

      {!loading && packages.length > 0 && (
        <Grid container spacing={3}>
          {packages.map((pkg) => (
            <Grid size={{ xs: 12, md: 4 }} key={pkg.id}>
              <Paper
                elevation={0}
                sx={{
                  p: 4,
                  borderRadius: 4,
                  bgcolor: pkg.bgColor,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  height: '100%',
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
                      fontWeight: 700,
                    }}
                  >
                    شاهد جميع الميزات
                  </Typography>
                </Box>

                <Button
                  onClick={() => handleSubscribe(pkg)}
                  disabled={subscribingId === pkg.id}
                  sx={{
                    width: '70%',
                    bgcolor: '#203450',
                    color: '#fff',
                    py: 1.5,
                    borderRadius: 4,
                    textTransform: 'none',
                    '&:hover': { bgcolor: '#0D1540' },
                    '&:disabled': { bgcolor: '#203450', opacity: 0.7, color: '#fff' },
                  }}
                >
                  {subscribingId === pkg.id ? (
                    <CircularProgress size={22} sx={{ color: '#fff' }} />
                  ) : (
                    'اختيار الباقة'
                  )}
                </Button>
                <Typography sx={{ fontSize: 12, mt: 1, color: '#757575' }}>الدفع مرة واحدة</Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
}
