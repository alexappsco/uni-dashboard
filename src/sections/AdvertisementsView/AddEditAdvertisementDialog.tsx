'use client';

import {
  Dialog,
  DialogContent,
  DialogTitle,
  Box,
  Typography,
  IconButton,
  Button,
  TextField,
  Stack,
} from '@mui/material';

import CloseIcon from '@mui/icons-material/Close';

type Props = {
  open: boolean;
  onClose: () => void;
  mode?: 'add' | 'edit';
};

export default function AddEditAdvertisementDialog({
  open,
  onClose,
  mode = 'add',
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
        borderRadius: 4,
        width: '100%',
        mx: 2,
        overflow: 'hidden',
      },
    },
  }}
    >
      <DialogTitle
        sx={{
          pb: 1,
          pt: 2.5,
          px: { xs: 2, sm: 3 },
          position: 'relative',
          textAlign: 'center',
          fontWeight: 700,
          color: '#111827',
        }}
      >
        {mode === 'edit' ? 'تعديل الإعلان' : 'إضافة اعلان'}

        <IconButton
          onClick={onClose}
          sx={{
            position: 'absolute',
            left: 12,
            top: 12,
            color: '#886CE8',
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent
        sx={{
          px: { xs: 2, sm: 3 },
          pb: 3,
        }}
      >
        <Typography
          sx={{
            textAlign: 'center',
            color: '#6B7280',
            fontSize: 13,
            mb: 2.5,
          }}
        >
          صور الإعلان
        </Typography>

        {/* Upload Area */}
        <Box
          sx={{
            border: '1px solid #EEF2F6',
            borderRadius: 2,
            bgcolor: '#FAFBFC',
            py: { xs: 3, sm: 4 },
            px: 2,
            textAlign: 'center',
            mb: 2.5,
          }}
        >
          <Box
            component="img"
            src="/icons/upload.svg"
            alt=""
            sx={{
              width: { xs: 90, sm: 120 },
              mb: 2,
            }}
          />

          <Typography
            sx={{
              fontWeight: 700,
              fontSize: 15,
              mb: 0.5,
            }}
          >
            تحديد الملف
          </Typography>

          <Typography
            sx={{
              fontSize: 12,
              color: '#6B7280',
            }}
          >
            يمكنك سحب الملفات وإفلاتها هنا أو النقر لاستعراضها من جهازك
          </Typography>
        </Box>

        <Stack spacing={1.5}>
          <TextField
            fullWidth
            label="الاسم"
            placeholder="الاسم"
            size="small"
            
          />

          <TextField
            fullWidth
            label="الكود"
            placeholder="الكود"
            size="small"
          />

          <TextField
            fullWidth
            multiline
            rows={3}
            label="رابط صفحة الإعلان"
            placeholder="رابط صفحة الإعلان"
          />
        </Stack>

        <Stack
          direction="row"
          spacing={1.5}
          sx={{
            mt: 3,
            justifyContent: 'flex-start',
          }}
        >
          <Button
            variant="contained"
            sx={{
              minWidth: 90,
              bgcolor: '#886CE8',
              '&:hover': {
                bgcolor: '#7658E2',
              },
            }}
          >
            {mode === 'edit' ? 'حفظ' : 'إضافة'}
          </Button>

          <Button
            variant="outlined"
            color="error"
            onClick={onClose}
            sx={{
              minWidth: 90,
            }}
          >
            إلغاء
          </Button>
        </Stack>
      </DialogContent>
    </Dialog>
  );
}