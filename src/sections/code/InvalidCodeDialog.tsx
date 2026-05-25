'use client';

import {
  Dialog,
  DialogContent,
  IconButton,
  Typography,
  Box,
  Button,
} from '@mui/material';

import CloseIcon from '@mui/icons-material/Close';
import ErrorRoundedIcon from '@mui/icons-material/ErrorRounded';

type Props = {
  open: boolean;
  onClose: () => void;
};

export default function InvalidCodeDialog({
  open,
  onClose,
}: Props) {
  return (
   <Dialog
  open={open}
  onClose={onClose}
  fullWidth
  maxWidth="sm"
  slotProps={{
    paper: {
      sx: {
        borderRadius: '28px',
        overflow: 'hidden',
        width: '100%',
        maxWidth: {
          xs: '95%',
          sm: 520,
        },
      },
    },
  }}
>
      <DialogContent
        sx={{
          p: {
            xs: 3,
            sm: 4,
          },
          position: 'relative',
          textAlign: 'center',
        }}
      >
        {/* Close */}
        <IconButton
          onClick={onClose}
          sx={{
            position: 'absolute',
            top: 16,
            left: 16,
          }}
        >
          <CloseIcon />
        </IconButton>

        {/* Title */}
        <Typography
          sx={{
            position: 'absolute',
            top: 22,
            right: 28,
            fontWeight: 700,
            fontSize: 24,
            color: '#111827',
          }}
        >
          تفاصيل الإعلان
        </Typography>

        {/* Icon */}
        <Box
          sx={{
            width: {
              xs: 110,
              sm: 140,
            },
            height: {
              xs: 110,
              sm: 140,
            },
            borderRadius: '50%',
            bgcolor: '#FCE8E6',
            mx: 'auto',
            mt: 8,
            mb: 4,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <ErrorRoundedIcon
            sx={{
              fontSize: 42,
              color: '#C5221F',
            }}
          />
        </Box>

        {/* Heading */}
        <Typography
          sx={{
            fontWeight: 700,
            color: '#111827',
            fontSize: {
              xs: 24,
              sm: 30,
            },
            mb: 1.5,
          }}
        >
          الكود غير صحيح
        </Typography>

        {/* Description */}
        <Typography
          sx={{
            color: '#6B7280',
            fontSize: {
              xs: 14,
              sm: 15,
            },
            lineHeight: 2,
            maxWidth: 420,
            mx: 'auto',
            mb: 5,
          }}
        >
          عذراً، الكود الذي أدخلته غير موجود أو تم استخدامه من قبل.
          <br />
          يرجى التأكد من الكود والمحاولة مرة أخرى.
        </Typography>

        {/* Actions */}
        <Box
          sx={{
            display: 'flex',
            gap: 2,
            justifyContent: 'center',
            flexDirection: {
              xs: 'column',
              sm: 'row',
            },
          }}
        >
          <Button
            variant="contained"
            onClick={onClose}
            sx={{
              minWidth: 170,
              height: 48,
              bgcolor: '#6D4CFF',
              borderRadius: '10px',
              fontWeight: 700,

              '&:hover': {
                bgcolor: '#5B3EF2',
              },
            }}
          >
            إعادة المحاولة
          </Button>

          <Button
            variant="outlined"
            onClick={onClose}
            sx={{
              minWidth: 170,
              height: 48,
              borderRadius: '10px',
              borderColor: '#D1D5DB',
              color: '#111827',
              fontWeight: 600,
            }}
          >
            إغلاق
          </Button>
        </Box>
      </DialogContent>
    </Dialog>
  );
}