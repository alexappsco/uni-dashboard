'use client';

import { useEffect, useState } from 'react';
import {
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogContent,
  Typography,
} from '@mui/material';
import Iconify from 'src/components/iconify';
import { getSupportTicketAction } from 'src/actions/support';
import type { SupportTicket } from '../types';
import { STATUS_LABELS } from '../constants';

type TicketDetailsDialogProps = {
  open: boolean;
  ticketId: string | null;
  onClose: () => void;
};

export default function TicketDetailsDialog({
  open,
  ticketId,
  onClose,
}: TicketDetailsDialogProps) {
  const [ticket, setTicket] = useState<SupportTicket | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!open || !ticketId) {
      return;
    }

    const currentTicketId = ticketId;
    let cancelled = false;

    async function loadTicketDetails() {
      setLoading(true);
      setError(null);
      setTicket(null);

      try {
        const result = await getSupportTicketAction(currentTicketId);

        if (cancelled) {
          return;
        }

        if (result.success) {
          setTicket(result.data);
        } else {
          setError(result.error || 'فشل جلب تفاصيل التذكرة');
        }
      } catch {
        if (!cancelled) {
          setError('حدث خطأ غير متوقع');
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    loadTicketDetails();

    return () => {
      cancelled = true;
    };
  }, [open, ticketId]);

  const handleClose = () => {
    setTicket(null);
    setError(null);
    onClose();
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth="sm"
      fullWidth
      disableScrollLock
      slotProps={{
        paper: {
          sx: {
            borderRadius: '20px',
            boxShadow: '0 16px 40px rgba(15, 23, 42, 0.12)',
            bgcolor: '#fff',
          },
        },
      }}
    >
      <DialogContent sx={{ p: { xs: 3, sm: 4 } }} dir="rtl">
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            mb: 3,
          }}
        >
          <Typography
            variant="h6"
            sx={{ fontWeight: 800, color: '#101828', fontSize: 20 }}
          >
            تفاصيل الشكوى
          </Typography>
          <Button
            onClick={handleClose}
            sx={{
              minWidth: 40,
              width: 40,
              height: 40,
              borderRadius: '10px',
              color: '#667085',
              p: 0,
              '&:hover': { bgcolor: '#f3f4f6' },
            }}
          >
            <Iconify icon="mingcute:close-line" width={20} />
          </Button>
        </Box>

        {loading && (
          <Box sx={{ display: 'flex', justifyContent: 'center', py: 6 }}>
            <CircularProgress size={32} sx={{ color: '#886ce8' }} />
          </Box>
        )}

        {!loading && error && (
          <Typography sx={{ color: '#d32f2f', textAlign: 'center', py: 4 }}>
            {error}
          </Typography>
        )}

        {!loading && !error && ticket && (
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
            <Box>
              <Typography
                sx={{ color: '#667085', fontSize: 14, fontWeight: 500, mb: 0.75 }}
              >
                رقم التذكرة
              </Typography>
              <Typography
                sx={{ color: '#101828', fontSize: 16, fontWeight: 700, lineHeight: 1.6 }}
              >
                {ticket.ticketNumber}
              </Typography>
            </Box>

            <Box>
              <Typography
                sx={{ color: '#667085', fontSize: 14, fontWeight: 500, mb: 0.75 }}
              >
                عنوان الشكوى
              </Typography>
              <Typography
                sx={{ color: '#101828', fontSize: 16, fontWeight: 700, lineHeight: 1.6 }}
              >
                {ticket.title}
              </Typography>
            </Box>

            <Box>
              <Typography
                sx={{ color: '#667085', fontSize: 14, fontWeight: 500, mb: 0.75 }}
              >
                وصف الشكوى
              </Typography>
              <Typography
                sx={{
                  color: '#344054',
                  fontSize: 15,
                  lineHeight: 1.8,
                  whiteSpace: 'pre-wrap',
                }}
              >
                {ticket.description}
              </Typography>
            </Box>

            <Box>
              <Typography
                sx={{ color: '#667085', fontSize: 14, fontWeight: 500, mb: 0.75 }}
              >
                الحالة
              </Typography>
              <Typography sx={{ color: '#344054', fontSize: 15, fontWeight: 600 }}>
                {STATUS_LABELS[ticket.status]}
              </Typography>
            </Box>

            {ticket.reply && (
              <Box>
                <Typography
                  sx={{ color: '#667085', fontSize: 14, fontWeight: 500, mb: 0.75 }}
                >
                  رد الدعم الفني
                </Typography>
                <Typography
                  sx={{
                    color: '#344054',
                    fontSize: 15,
                    lineHeight: 1.8,
                    whiteSpace: 'pre-wrap',
                  }}
                >
                  {ticket.reply}
                </Typography>
              </Box>
            )}

            <Box sx={{ display: 'flex', justifyContent: 'flex-end', pt: 1 }}>
              <Button
                variant="outlined"
                onClick={handleClose}
                sx={{
                  borderRadius: '12px',
                  fontWeight: 700,
                  height: 44,
                  px: 4,
                  borderColor: '#E5E7EB',
                  color: '#344054',
                  textTransform: 'none',
                  '&:hover': {
                    borderColor: '#D1D5DB',
                    bgcolor: '#F9FAFB',
                  },
                }}
              >
                إغلاق
              </Button>
            </Box>
          </Box>
        )}
      </DialogContent>
    </Dialog>
  );
}
