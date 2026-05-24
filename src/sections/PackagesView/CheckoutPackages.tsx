
'use client';

import {
  Box,
  Typography,
  Button,
  Paper,
  Divider,
  Radio,
} from '@mui/material';
import Checkbox from '@mui/material/Checkbox';
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import LocalOfferOutlinedIcon from '@mui/icons-material/LocalOfferOutlined';
import ReplayOutlinedIcon from '@mui/icons-material/ReplayOutlined';
import SupportAgentOutlinedIcon from '@mui/icons-material/SupportAgentOutlined';
import InsightsOutlinedIcon from '@mui/icons-material/InsightsOutlined';
import StorefrontOutlinedIcon from '@mui/icons-material/StorefrontOutlined';

const features = [
  {
    title: 'عروض لا محدودة',
    icon: <LocalOfferOutlinedIcon />,
  },
  {
    title: 'أكواد استرداد لا محدودة',
    icon: <ReplayOutlinedIcon />,
  },
  {
    title: 'أولوية في الدعم الفني',
    icon: <SupportAgentOutlinedIcon />,
  },
  {
    title: 'تحليلات متقدمة',
    icon: <InsightsOutlinedIcon />,
  },
];

export default function CheckoutPackages() {
  return (
    <Box
      sx={{
        p: { xs: 2, md: 4 },
        bgcolor: '#F4F5F7',
        minHeight: '100vh',
        direction: 'rtl',
      }}
    >
      <Typography
        sx={{
          fontSize: { xs: 28, md: 38 },
          fontWeight: 800,
          mb: 4,
        }}
      >
        إدارة الباقات
      </Typography>

      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: {
            xs: '1fr',
            lg: '1.4fr .8fr',
          },
          gap: 3,
        }}
      >
        {/* RIGHT */}

        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: 3,
          }}
        >
          {/* PACKAGE */}

          <Paper
            elevation={0}
            sx={{
              p: 4,
              borderRadius: '18px',
              border: '1px solid #E7E8EE',
            }}
          >
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'flex-start',
                mb: 3,
              }}
            >
              {/* text */}

              <Box>
                <Typography
                  sx={{
                    fontWeight: 800,
                    fontSize: {
                      xs: 30,
                      md: 40,
                    },
                  }}
                >
                  باقة الأعمال
                </Typography>

                <Typography
                  sx={{
                    color: '#777',
                    mt: .5,
                  }}
                >
                  الحل الأمثل للمطاعم والمقاهي
                  المتوسطة والكبيرة.
                </Typography>
              </Box>

              {/* icon */}

              <Box
                sx={{
                  width: 52,
                  height: 52,
                  borderRadius: 3,
                  bgcolor: '#886CE8',
                  color: '#fff',

                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <BusinessCenterIcon />
              </Box>
            </Box>

            <Divider sx={{ mb: 3 }} />

            <Typography
              sx={{
                fontWeight: 700,
                fontSize: 22,
                mb: 3,
              }}
            >
              مميزات الباقة
            </Typography>

            <Box
              sx={{
                display: 'grid',
                gridTemplateColumns: {
                  xs: '1fr',
                  sm: '1fr 1fr',
                },
                gap: 2,
              }}
            >
              {features.map((item) => (
                <FeatureCard
                  key={item.title}
                  title={item.title}
                  icon={item.icon}
                />
              ))}

              <FeatureCard
                fullWidth
                title="إدارة فروع متعددة (حتى 5 فروع)"
                icon={<StorefrontOutlinedIcon />}
              />
            </Box>
          </Paper>

          {/* PAYMENT */}

          <Paper
            elevation={0}
            sx={{
              p: 4,
              borderRadius: '18px',
              border: '1px solid #E7E8EE',
            }}
          >
            <Typography
              sx={{
                fontWeight: 800,
                fontSize: 28,
                mb: 3,
              }}
            >
              طريقة الدفع
            </Typography>

            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: 2,
              }}
            >
              <PaymentItem
                title="البطاقة الائتمانية / مدى"
                icon={<CreditCardIcon />}
              />

              <PaymentItem
                title="رصيد المحفظة"
                subtitle="الرصيد المتاح 0.00 ر.س"
                icon={<AccountBalanceWalletIcon />}
              />
            </Box>
          </Paper>
        </Box>

        {/* SUMMARY */}

        <Paper
          elevation={0}
          sx={{
            p: 4,
            borderRadius: '18px',
            border: '1px solid #E7E8EE',
            height: 'fit-content',
            boxShadow:
              '0px 10px 25px rgba(0,0,0,.06)',
          }}
        >
          <Typography
            sx={{
              fontSize: 32,
              fontWeight: 800,
              mb: 4,
            }}
          >
            ملخص الطلب
          </Typography>

          <Row
            label="باقة الأعمال (سنوي)"
            value="1,200 ر.س"
          />

          <Row
            label="ضريبة القيمة المضافة (15%)"
            value="180 ر.س"
          />

          <Divider sx={{ my: 3 }} />

        <Row
  big
  label="الإجمالي"
  value="1,380 ر.س"
/>

<Box
  sx={{
    display: 'flex',
    alignItems: 'flex-start',
    gap: 1,
    mt: 3,
    mb: 3,
  }}
>
  <Checkbox
    size="small"
    sx={{
      p: 0,
      mt: '2px',
    }}
  />

  <Typography
    sx={{
      fontSize: 13,
      color: '#666',
      lineHeight: 1.8,
    }}
  >
    أوافق على{' '}
    <Box
      component="span"
      sx={{
        color: '#D84315',
        textDecoration: 'underline',
      }}
    >
      سياسة الشروط والأحكام
    </Box>{' '}
    الخاصة بمنصة عروض الطلاب.
  </Typography>
</Box>

          <Button
            fullWidth
            sx={{
              mt: 4,
              bgcolor: '#886CE8',
              color: '#fff',
              height: 52,
              borderRadius: 2,
              fontWeight: 700,

              '&:hover': {
                bgcolor: '#7758E6',
              },
            }}
          >
            تأكيد واشتراك
          </Button>
        </Paper>
      </Box>
    </Box>
  );
}

function Row({
  label,
  value,
  big = false,
}: any) {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        py: 1,
      }}
    >
      <Typography
        sx={{
          fontSize: big ? 28 : 16,
          fontWeight: big ? 800 : 400,
        }}
      >
        {label}
      </Typography>

      <Typography
        sx={{
          fontSize: big ? 30 : 16,
          fontWeight: big ? 800 : 400,
          color: big ? '#D84315' : '#222',
        }}
      >
        {value}
      </Typography>
    </Box>
  );
}

function FeatureCard({
  title,
  icon,
  fullWidth = false,
}: any) {
  return (
    <Box
      sx={{
        gridColumn: fullWidth ? '1/-1' : 'auto',
        p: 2,
        borderRadius: 2,
        bgcolor: '#F5F6FC',

        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-start', // 👈 مهم
        gap: 1, // 👈 المسافة اللي بدك إياها (gap 2 كمان تمام)
      }}
    >
      <Box sx={{ color: '#D84315', display: 'flex', alignItems: 'center' }}>
        {icon}
      </Box>

      <Typography sx={{ fontWeight: 500 }}>
        {title}
      </Typography>
    </Box>
  );
}

function PaymentItem({
  title,
  subtitle,
  icon,
}: any) {
  return (
    <Box
      sx={{
        height: 72,
        border: '1px solid #E7E8EE',
        borderRadius: 2,
        px: 2,

        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}
    >
      {/* input + text */}

      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 1,
        }}
      >
        <Radio size="small"/>

        <Box>
          <Typography
            sx={{
              fontWeight: 600,
            }}
          >
            {title}
          </Typography>

          {subtitle && (
            <Typography
              sx={{
                fontSize: 12,
                color: '#777',
              }}
            >
              {subtitle}
            </Typography>
          )}
        </Box>
      </Box>

      {/* icon */}

      <Box
        sx={{
          color: '#6D4C41',
        }}
      >
        {icon}
      </Box>
    </Box>
  );
}