'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import { Box, Card, Chip } from '@mui/material';
import Iconify from 'src/components/iconify';
import SimpleTable from 'src/components/SimpleTable';
import {
  createSupportTicketAction,
  getSupportTicketsAction,
} from 'src/actions/support';
import CreateTicketDialog from './components/CreateTicketDialog';
import SupportHeader from './components/SupportHeader';
import SupportSearchBar from './components/SupportSearchBar';
import SupportStatusTabs from './components/SupportStatusTabs';
import TicketDetailsDialog from './components/TicketDetailsDialog';
import {
  DEFAULT_PAGE_SIZE,
  STATUS_STYLES,
  TABLE_HEAD,
  filterTicketsBySearch,
  getStatusTabs,
} from './constants';
import type { StatusFilter, SupportTicket, SupportTicketCounts } from './types';

export default function SupportView() {
  const [tickets, setTickets] = useState<SupportTicket[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [counts, setCounts] = useState<SupportTicketCounts>({
    all: 0,
    pending: 0,
    replied: 0,
  });
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(DEFAULT_PAGE_SIZE);
  const [openTicketDialog, setOpenTicketDialog] = useState(false);
  const [openViewDialog, setOpenViewDialog] = useState(false);
  const [selectedTicketId, setSelectedTicketId] = useState<string | null>(null);
  const [complaintTitle, setComplaintTitle] = useState('');
  const [complaintDescription, setComplaintDescription] = useState('');

  const loadCounts = useCallback(async () => {
    const [allResult, pendingResult, repliedResult] = await Promise.all([
      getSupportTicketsAction({ page: 1, limit: 1 }),
      getSupportTicketsAction({ status: 'pending', page: 1, limit: 1 }),
      getSupportTicketsAction({ status: 'replied', page: 1, limit: 1 }),
    ]);

    setCounts({
      all: allResult.success ? allResult.total : 0,
      pending: pendingResult.success ? pendingResult.total : 0,
      replied: repliedResult.success ? repliedResult.total : 0,
    });
  }, []);

  const loadTickets = useCallback(
    async (overrides?: { page?: number; limit?: number; status?: StatusFilter }) => {
      setLoading(true);

      const nextPage = overrides?.page ?? page;
      const nextLimit = overrides?.limit ?? rowsPerPage;
      const nextStatus = overrides?.status ?? statusFilter;

      try {
        const result = await getSupportTicketsAction({
          ...(nextStatus !== 'all' ? { status: nextStatus } : {}),
          page: nextPage + 1,
          limit: nextLimit,
        });

        if (result.success) {
          setTickets(result.data as SupportTicket[]);
          setTotalCount(result.total);
        } else {  
          setTickets([]);
          setTotalCount(0);
          console.error(result.error);
        }
      } catch (error) {
        console.error('Error loading support tickets:', error);
        setTickets([]);
        setTotalCount(0);
      } finally {
        setLoading(false);
      }
    },
    [page, rowsPerPage, statusFilter]
  );

  useEffect(() => {
    loadTickets();
  }, [loadTickets]);

  useEffect(() => {
    loadCounts();
  }, [loadCounts]);

  const tabs = useMemo(() => getStatusTabs(counts), [counts]);

  const filteredData = useMemo(
    () => filterTicketsBySearch(tickets, searchQuery),
    [tickets, searchQuery]
  );

  const handleStatusFilterChange = (filter: StatusFilter) => {
    setStatusFilter(filter);
    setPage(0);
  };

  const handlePageChange = (
    _event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setPage(newPage);
  };

  const handleRowsPerPageChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleCloseTicketDialog = () => {
    setOpenTicketDialog(false);
    setComplaintTitle('');
    setComplaintDescription('');
  };

  const handleSubmitTicket = async () => {
    if (!complaintTitle.trim() || !complaintDescription.trim()) {
      return;
    }

    setSubmitting(true);

    try {
      const result = await createSupportTicketAction({
        title: complaintTitle.trim(),
        description: complaintDescription.trim(),
      });

      if (result.success) {
        handleCloseTicketDialog();
        setPage(0);
        await Promise.all([loadTickets({ page: 0 }), loadCounts()]);
      } else {
        alert(result.error || 'حدث خطأ أثناء إرسال التذكرة');
      }
    } catch (error) {
      console.error(error);
      alert('حدث خطأ غير متوقع');
    } finally {
      setSubmitting(false);
    }
  };

  const handleOpenViewDialog = (ticket: SupportTicket) => {
    setSelectedTicketId(ticket.id);
    setOpenViewDialog(true);
  };

  const handleCloseViewDialog = () => {
    setOpenViewDialog(false);
    setSelectedTicketId(null);
  };

  const actions = [
    {
      label: 'عرض',
      icon: <Iconify icon="solar:eye-bold" />,
      onClick: (row: SupportTicket) => handleOpenViewDialog(row),
    },
  ];

  const customRender = {
    status: (row: SupportTicket) => {
      const status = STATUS_STYLES[row.status];

      return (
        <Chip
          label={status.label}
          sx={{
            fontWeight: 600,
            borderRadius: '8px',
            bgcolor: status.bgcolor,
            color: status.color,
            border: 'none',
            minWidth: 96,
          }}
        />
      );
    },
  };

  return (
    <Box sx={{ textAlign: 'right' }}>
      <SupportHeader onCreateClick={() => setOpenTicketDialog(true)} />

      <Card
        sx={{
          borderRadius: '20px',
          boxShadow: '0 4px 20px 0 rgba(0,0,0,0.05)',
          border: '1px solid rgba(0,0,0,0.04)',
          overflow: 'hidden',
        }}
      >
        <Box sx={{ p: 3, bgcolor: '#fff' }}>
          <SupportStatusTabs
            tabs={tabs}
            activeFilter={statusFilter}
            onFilterChange={handleStatusFilterChange}
          />
          <SupportSearchBar value={searchQuery} onChange={setSearchQuery} />
        </Box>

        <SimpleTable<SupportTicket>
          data={filteredData}
          headCells={TABLE_HEAD}
          actions={actions}
          actionsHeaderLabel=""
          customRender={customRender}
          loading={loading}
          serverPagination={{
            count: searchQuery.trim() ? filteredData.length : totalCount,
            page,
            rowsPerPage,
            onPageChange: handlePageChange,
            onRowsPerPageChange: handleRowsPerPageChange,
          }}
        />
      </Card>

      <TicketDetailsDialog
        open={openViewDialog}
        ticketId={selectedTicketId}
        onClose={handleCloseViewDialog}
      />

      <CreateTicketDialog
        open={openTicketDialog}
        title={complaintTitle}
        description={complaintDescription}
        submitting={submitting}
        onTitleChange={setComplaintTitle}
        onDescriptionChange={setComplaintDescription}
        onClose={handleCloseTicketDialog}
        onSubmit={handleSubmitTicket}
      />
    </Box>
  );
}
