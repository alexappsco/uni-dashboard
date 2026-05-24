'use client';

import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';
import CloudUploadOutlinedIcon from '@mui/icons-material/CloudUploadOutlined';

import {
  Alert,
  Box,
  Button,
  Paper,
  Stack,
  Typography,
} from '@mui/material';

const documents = [
  {
    id: 1,
    title: 'شهادة ضريبة القيمة المضافة (VAT Certificate)',
    reference: 'DOC-VAT-001',
    files: '122 files',
    status: 'تم التحقق',
    statusColor: '#DCFCE7',
    statusTextColor: '#16A34A',
  },
  {
    id: 2,
    title: 'شهادة العنوان الوطني',
    reference: 'DOC-VAT-001',
    files: '122 files',
    status: 'في انتظار المراجعة',
    statusColor: '#FEF3C7',
    statusTextColor: '#D97706',
  },
  {
    id: 3,
    title: 'تعريف حساب بنكي مختوم',
    reference: 'DOC-VAT-001',
    files: '122 files',
    status: 'مرفوض',
    statusColor: '#FEE2E2',
    statusTextColor: '#DC2626',
    rejectReason:
      'سبب الرفض: الختم غير واضح، يرجى رفع نسخة أوضح من التعريف البنكي',
  },
];

export default function LegalDocuments() {
  return (
    <Stack spacing={3}>
      {/* التعليمات */}
      <Alert
        severity="warning"
        sx={{
          alignItems: 'flex-start',
          bgcolor: '#F8E8C5',
          color: '#8A5A00',
          borderRadius: 2,
          '& .MuiAlert-icon': {
            mt: '4px',
          },
        }}
      >
        <Typography sx={{ fontWeight: 700, mb: 1 }}>
          تعليمات رفع الوثائق:
        </Typography>

        <Stack spacing={0.5}>
          <Typography variant="body2">
            • تأكد من وضوح جميع البيانات في الوثيقة
          </Typography>

          <Typography variant="body2">
            • يجب أن تكون الوثيقة سارية المفعول
          </Typography>

          <Typography variant="body2">
            • الحد الأقصى لحجم الملف 10 ميجابايت
          </Typography>

          <Typography variant="body2">
            • الصيغ المدعومة: PDF, JPG, PNG
          </Typography>

          <Typography variant="body2">
            • يفضل رفع نسخة ملونة من الوثائق
          </Typography>

          <Typography variant="body2">
            • سيتم إشعارك بنتيجة المراجعة
          </Typography>
        </Stack>
      </Alert>

      {/* قائمة الوثائق */}
      <Paper
        sx={{
          p: { xs: 2, md: 3 },
          borderRadius: 3,
        }}
      >
        <Stack spacing={4}>
          {documents.map((doc) => (
            <Box key={doc.id}>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: {
                    xs: 'column',
                    md: 'row',
                  },
                  justifyContent: 'space-between',
                  gap: 2,
                }}
              >
                {/* بيانات الملف */}
                <Box
                  sx={{
                    display: 'flex',
                    gap: 2,
                    alignItems: 'center',
                  }}
                >
                  <Box
                    sx={{
                      width: 44,
                      height: 44,
                      borderRadius: 1.5,
                      bgcolor: '#F59E0B',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                    }}
                  >
                    <DescriptionOutlinedIcon
                      sx={{
                        color: '#fff',
                        fontSize: 24,
                      }}
                    />
                  </Box>

                  <Box>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                    >
                      الرقم المرجعي: {doc.reference}
                    </Typography>

                    <Typography sx={{ fontWeight: 700, mt: 0.5  }}>
                      {doc.title}
                    </Typography>

                    <Typography
                      variant="caption"
                      color="text.secondary"
                    >
                      {doc.files}
                    </Typography>
                  </Box>
                </Box>

                {/* الحالة + زر الرفع */}
              <Stack
  sx={{
    flexDirection: {
      xs: 'column',
      sm: 'row',
    },
    gap: 1.5,
    alignItems: {
      xs: 'stretch',
      sm: 'center',
    },
  }}
>
                  <Box
                    sx={{
                      px: 1.5,
                      py: 0.5,
                      borderRadius: 1,
                      bgcolor: doc.statusColor,
                      color: doc.statusTextColor,
                      fontSize: 12,
                      fontWeight: 700,
                      textAlign: 'center',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {doc.status}
                  </Box>

                  <Button
                    variant="contained"
                    startIcon={<CloudUploadOutlinedIcon />}
                    sx={{
                      bgcolor: '#1F2937',
                      minWidth: 130,
                      borderRadius: 2,

                      '&:hover': {
                        bgcolor: '#111827',
                      },
                    }}
                  >
                    رفع الملفات
                  </Button>
                </Stack>
              </Box>

              {/* سبب الرفض */}
              {doc.rejectReason && (
                <Box
                  sx={{
                    mt: 2,
                    bgcolor: '#FDECEC',
                    color: '#B91C1C',
                    borderRadius: 2,
                    px: 2,
                    py: 1.5,
                    fontSize: 14,
                  }}
                >
                  {doc.rejectReason}
                </Box>
              )}
            </Box>
          ))}
        </Stack>
      </Paper>

      {/* زر التعديل */}
      <Box>
        <Button
          variant="contained"
          sx={{
            minWidth: 120,
            height: 46,
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
    </Stack>
  );
}