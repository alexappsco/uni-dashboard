'use client';

import React, { useState } from 'react';

import {
  Box,
  Paper,
  Button,
  Typography,
  TextField,
  InputAdornment,
} from '@mui/material';

import QrCode2RoundedIcon from '@mui/icons-material/QrCode2Rounded';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import VerifyCodeDialog from './VerifyCodeDialog';

function CodeView() {
  const [code, setCode] = useState('STD-98765-XYZ');
const [openDialog, setOpenDialog] = useState(false);
  return (
    <>
    <Box
      sx={{
        p: {
          xs: 2,
          md: 3,
        },
      }}
    >
      {/* Page Title */}
      <Typography
        sx={{
          fontSize: {
            xs: 24,
            md: 34,
          },
          fontWeight: 700,
          color: '#111827',
          textAlign: 'right',
          mb: 3,
        }}
      >
        التحقق من كود الطالب
      </Typography>

      {/* Card */}
      <Paper
        elevation={0}
        sx={{
          border: '1px solid #D9DDE8',
          borderRadius: '16px',
          bgcolor: '#FFFFFF',
          py: {
            xs: 4,
            md: 6,
          },
          px: {
            xs: 2,
            sm: 4,
            md: 6,
          },
        }}
      >
        {/* Icon */}
        <Box
          sx={{
            width: 72,
            height: 72,
            mx: 'auto',
            mb: 3,
            borderRadius: '50%',
            bgcolor: '#F1ECFF',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <QrCode2RoundedIcon
            sx={{
              fontSize: 34,
              color: '#7B61FF',
            }}
          />
        </Box>

        {/* Title */}
        <Typography
          sx={{
            textAlign: 'center',
            fontWeight: 700,
            color: '#111827',
            fontSize: {
              xs: 18,
              md: 28,
            },
            mb: 1,
          }}
        >
          أدخل الكود المقدم من الطالب للتحقق من بيانات الطلب والعرض.
        </Typography>

        {/* Subtitle */}
        <Typography
          sx={{
            textAlign: 'center',
            color: '#6B7280',
            fontSize: {
              xs: 13,
              md: 15,
            },
            mb: 4,
          }}
        >
          يرجى كتابة الكود أو مسحه ضوئياً لإظهار تفاصيل الطلب.
        </Typography>

        {/* Form */}
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            gap: 2,
            flexDirection: {
              xs: 'column',
              sm: 'row',
            },
            maxWidth: 700,
            mx: 'auto',
          }}
        >
        

          <TextField
  fullWidth
  value={code}
  onChange={(e) => setCode(e.target.value)}
  placeholder="أدخل الكود"
  slotProps={{
    input: {
      endAdornment: (
        <InputAdornment position="end">
          <SearchRoundedIcon
            sx={{
              color: '#6B7280',
            }}
          />
        </InputAdornment>
      ),
    },
  }}
  sx={{
    maxWidth: {
      xs: '100%',
      sm: 340,
    },

    '& .MuiOutlinedInput-root': {
      height: 48,
      borderRadius: '10px',
      bgcolor: '#fff',

      '& fieldset': {
        borderColor: '#D9DDE8',
      },

      '&:hover fieldset': {
        borderColor: '#C8CFDA',
      },

      '&.Mui-focused fieldset': {
        borderColor: '#7B61FF',
      },
    },

    '& input': {
      textAlign: 'right',
      fontSize: '15px',
      fontWeight: 500,
    },
  }}
/>
            <Button
  variant="contained"
  onClick={() => setOpenDialog(true)}
  sx={{
    height: 48,
    px: 4,
    borderRadius: '12px',
    bgcolor: '#6D4CFF',
  }}
>
  تحقق من الكود
</Button>
        </Box>
      </Paper>
    </Box>
     <VerifyCodeDialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
      />
    </>
    
    
  );
}

export default CodeView;