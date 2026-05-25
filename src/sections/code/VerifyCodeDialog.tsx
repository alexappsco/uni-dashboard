'use client';

import {
  Dialog,
  DialogContent,
  DialogTitle,
  Box,
  Typography,
  Button,
  IconButton,
  Chip,
  Divider,
} from '@mui/material';

import CloseIcon from '@mui/icons-material/Close';
import { useState } from 'react';
import InvalidCodeDialog from './InvalidCodeDialog';

type VerifyCodeDialogProps = {
  open: boolean;
  onClose: () => void;
};

const RowItem = ({
  label,
  value,
}: {
  label: string;
  value: React.ReactNode;
}) => (
  <Box
    sx={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      py: 1.25,
      gap: 2,
    }}
  >
    <Typography
      sx={{
        fontSize: 14,
        color: '#6B7280',
        fontWeight: 500,
      }}
    >
      {label}
    </Typography>

    {typeof value === 'string' ? (
      <Typography
        sx={{
          fontSize: 14,
          color: '#111827',
          fontWeight: 500,
          textAlign: 'left',
        }}
      >
        {value}
      </Typography>
    ) : (
      value
    )}
  </Box>
);

export default function VerifyCodeDialog({
  open,
  onClose,
}: VerifyCodeDialogProps) {
  const [openErrorDialog, setOpenErrorDialog] = useState(false);
  return (
    <>
     <Dialog
  open={open}
  onClose={onClose}
  fullWidth
  maxWidth="md"
  slotProps={{
    paper: {
      sx: {
        borderRadius: '24px',
        width: '100%',
        maxWidth: '760px',
        overflow: 'hidden',
        mx: 2,
      },
    },
  }}
>
      {/* Header */}
      <DialogTitle
        sx={{
          px: 3,
          py: 2,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <Typography
          sx={{
            fontSize: 24,
            fontWeight: 700,
            color: '#111827',
          }}
        >
          تفاصيل الإعلان
        </Typography>

        <IconButton onClick={onClose}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent
        sx={{
          px: { xs: 2, md: 3 },
          pb: 3,
          overflow: 'hidden',
        }}
      >
        {/* Image */}
        <Box
          component="img"
          src="/images/burger.jpg"
          alt="advertisement"
          sx={{
            width: '100%',
            height: {
              xs: 180,
              sm: 250,
              md: 280,
            },
            objectFit: 'cover',
            borderRadius: '14px',
            mb: 3,
          }}
        />

        {/* Details */}
        <Box sx={{ mb: 3 }}>
          <RowItem label="الاسم" value="طعام" />

          <Divider />

          <RowItem
            label="الكود"
            value="#134-562"
          />

          <Divider />

          <RowItem
            label="تاريخ الإنشاء"
            value="10/2/2025"
          />

          <Divider />

          <RowItem
            label="الحالة"
            value={
              <Chip
                label="نشط"
                sx={{
                  bgcolor: '#DCFCE7',
                  color: '#16A34A',
                  fontWeight: 700,
                  borderRadius: '6px',
                  height: 30,
                }}
              />
            }
          />
        </Box>

        {/* Description */}
        <Box
          sx={{
            border: '1px solid #E5E7EB',
            borderRadius: '14px',
            p: 2,
            mb: 3,
          }}
        >
          <Typography
            sx={{
              fontSize: 15,
              fontWeight: 700,
              color: '#111827',
              mb: 0.5,
            }}
          >
            وصف الإعلان
          </Typography>

          <Typography
            sx={{
              fontSize: 12,
              color: '#94A3B8',
              mb: 2,
            }}
          >
            التفاصيل الخاصة بالإعلان
          </Typography>

          <Box
            sx={{
              border: '1px solid #E5E7EB',
              borderRadius: '12px',
              bgcolor: '#FAFAFA',
              minHeight: 85,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              px: 2,
            }}
          >
            <Typography
              sx={{
                textAlign: 'center',
                fontSize: 13,
                color: '#64748B',
                lineHeight: 2,
              }}
            >
              في حالة شراء العرض سوف تحصل على خصم 50٪ على جميع الحسابات
              التي سوف تحصل عليها
            </Typography>
          </Box>
        </Box>

        {/* Footer Buttons */}
        <Box
          sx={{
            display: 'flex',
            gap: 1.5,
            justifyContent: 'flex-end',
            flexWrap: 'wrap',
          }}
        >
          

          <Button
            variant="outlined"
            onClick={onClose}
            sx={{
              minWidth: 90,
              height: 42,
              borderRadius: '8px',
              borderColor: '#CBD5E1',
              color: '#111827',

              '&:hover': {
                borderColor: '#94A3B8',
              },
            }}
          >
            إلغاء
          </Button>
          <Button
  variant="contained"
  onClick={() => setOpenErrorDialog(true)}
  sx={{
    height: 48,
    minWidth: 170,
    bgcolor: '#6D4CFF',
    borderRadius: '12px',
    fontWeight: 700,
  }}
>
  تأكيد استخدام الكود
</Button>
        </Box>
      </DialogContent>
    </Dialog>
    <InvalidCodeDialog
  open={openErrorDialog}
  onClose={() => setOpenErrorDialog(false)}
/>
    
    </>
   
  );
}