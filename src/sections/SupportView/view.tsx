"use client";

import { useState } from "react";
import {
  Box,
  Button,
  Card,
  Chip,
  Dialog,
  DialogContent,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import Iconify from "src/components/iconify";
import SimpleTable from "src/components/SimpleTable";

interface SupportTicket {
  id: string;
  ticketNumber: string;
  requestDate: string;
  title: string;
  status: "answered" | "underReview";
}

const DUMMY_SUPPORT_TICKETS: SupportTicket[] = [
  {
    id: "1",
    ticketNumber: "TCK-1001",
    requestDate: "2026-05-20",
    title: "مشكلة في تسجيل الدخول",
    status: "underReview",
  },
  {
    id: "2",
    ticketNumber: "TCK-1002",
    requestDate: "2026-05-19",
    title: "طلب تحديث بيانات الحساب",
    status: "answered",
  },
  {
    id: "3",
    ticketNumber: "TCK-1003",
    requestDate: "2026-05-18",
    title: "استفسار عن الفاتورة",
    status: "answered",
  },
  {
    id: "4",
    ticketNumber: "TCK-1004",
    requestDate: "2026-05-17",
    title: "تعذر الوصول إلى لوحة التحكم",
    status: "underReview",
  },
  {
    id: "5",
    ticketNumber: "TCK-1005",
    requestDate: "2026-05-16",
    title: "طلب إلغاء خدمة إضافية",
    status: "answered",
  },
];

const TABLE_HEAD = [
  { id: "ticketNumber", label: "رقم التذكرة", align: "right", width: "20%" },
  { id: "requestDate", label: "تاريخ الطلب", align: "right", width: "20%" },
  { id: "title", label: "العنوان", align: "right", width: "40%" },
  { id: "status", label: "حالة الطلب", align: "center", width: "20%" },
];

export default function SupportView() {
  const [tickets, setTickets] = useState(DUMMY_SUPPORT_TICKETS);
  const [statusFilter, setStatusFilter] = useState<
    "all" | "answered" | "underReview"
  >("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [openTicketDialog, setOpenTicketDialog] = useState(false);
  const [complaintTitle, setComplaintTitle] = useState("");
  const [complaintDescription, setComplaintDescription] = useState("");

  const answeredCount = tickets.filter(
    (ticket) => ticket.status === "answered"
  ).length;
  const underReviewCount = tickets.filter(
    (ticket) => ticket.status === "underReview"
  ).length;

  const filteredData = tickets.filter((ticket) => {
    const statusLabel =
      ticket.status === "answered" ? "تم الرد" : "قيد المراجعة";
    const normalizedSearch = searchQuery.trim().toLowerCase();
    const matchesStatus =
      statusFilter === "all" || ticket.status === statusFilter;
    const matchesSearch =
      !normalizedSearch ||
      ticket.ticketNumber.toLowerCase().includes(normalizedSearch) ||
      ticket.requestDate.toLowerCase().includes(normalizedSearch) ||
      ticket.title.toLowerCase().includes(normalizedSearch) ||
      statusLabel.includes(normalizedSearch);

    return matchesStatus && matchesSearch;
  });

  const tabs = [
    {
      label: "الكل",
      value: "all",
      count: tickets.length,
      bgColor: "#1f2937",
      textColor: "#fff",
    },
    {
      label: "تم الرد",
      value: "answered",
      count: answeredCount,
      bgColor: "#d1fae5",
      textColor: "#059669",
    },
    {
      label: "قيد المراجعة",
      value: "underReview",
      count: underReviewCount,
      bgColor: "rgba(255, 193, 7, 0.16)",
      textColor: "rgb(183, 129, 3)",
    },
  ];

  const handleCloseTicketDialog = () => {
    setOpenTicketDialog(false);
    setComplaintTitle("");
    setComplaintDescription("");
  };

  const handleSubmitTicket = () => {
    if (!complaintTitle.trim() || !complaintDescription.trim()) {
      return;
    }

    const nextTicketNumber = `TCK-${1000 + tickets.length + 1}`;
    const today = new Date().toISOString().slice(0, 10);

    setTickets((current) => [
      {
        id: Date.now().toString(),
        ticketNumber: nextTicketNumber,
        requestDate: today,
        title: complaintTitle.trim(),
        status: "underReview",
      },
      ...current,
    ]);
    handleCloseTicketDialog();
  };

  const actions = [
    {
      label: "عرض",
      icon: <Iconify icon="solar:eye-bold" />,
      onClick: (row: SupportTicket) => {
        console.log("View support ticket:", row);
      },
    },
  ];

  const customRender = {
    status: (row: SupportTicket) => {
      const statusMap = {
        answered: {
          label: "تم الرد",
          bgcolor: "rgba(76, 175, 80, 0.12)",
          color: "rgb(56, 142, 60)",
        },
        underReview: {
          label: "قيد المراجعة",
          bgcolor: "rgba(255, 193, 7, 0.16)",
          color: "rgb(183, 129, 3)",
        },
      };

      const status = statusMap[row.status];

      return (
        <Chip
          label={status.label}
          sx={{
            fontWeight: 600,
            borderRadius: "8px",
            bgcolor: status.bgcolor,
            color: status.color,
            border: "none",
            minWidth: 96,
          }}
        />
      );
    },
  };

  return (
    <Box sx={{ textAlign: "right" }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 4,
          gap: 2,
        }}
      >
        <Box sx={{ textAlign: { xs: "center", sm: "right" } }}>
          <Typography variant="h4" sx={{ fontWeight: 800 }}>
            تذاكر الدعم السابقة
          </Typography>
        </Box>

        <Button
          variant="contained"
          startIcon={<Iconify icon="solar:plain-bold" />}
          onClick={() => setOpenTicketDialog(true)}
          sx={{
            bgcolor: "#886ce8",
            color: "#fff",
            borderRadius: "12px",
            fontWeight: 700,
            px: 3,
            height: 48,
            gap: 1.5,
            boxShadow: "0 8px 16px 0 rgba(136, 108, 232, 0.24)",
            "&:hover": {
              bgcolor: "#7758e6",
            },
            textTransform: "none",
            whiteSpace: "nowrap",
          }}
        >
          إرسال تذكرة جديدة
        </Button>
      </Box>

      <Card
        sx={{
          borderRadius: "20px",
          boxShadow: "0 4px 20px 0 rgba(0,0,0,0.05)",
          border: "1px solid rgba(0,0,0,0.04)",
          overflow: "hidden",
        }}
      >
        <Box
          sx={{
            p: 3,
            bgcolor: "#fff",
          }}
        >
          <Box
            sx={{
              display: "flex",
              gap: 3,
              borderBottom: "1px solid #f3f4f6",
              pb: 2,
              overflowX: "auto",
              "&::-webkit-scrollbar": {
                height: 4,
              },
              "&::-webkit-scrollbar-track": {
                background: "transparent",
              },
              "&::-webkit-scrollbar-thumb": {
                background: "#d1d5db",
                borderRadius: 2,
              },
            }}
          >
            {tabs.map((tab) => (
              <Button
                key={tab.value}
                onClick={() =>
                  setStatusFilter(
                    tab.value as "all" | "answered" | "underReview"
                  )
                }
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 1,
                  pb: 1,
                  px: 0,
                  color: statusFilter === tab.value ? "#111827" : "#6b7280",
                  fontWeight: 600,
                  textTransform: "none",
                  fontSize: "0.95rem",
                  borderBottom:
                    statusFilter === tab.value ? "2px solid #111827" : "none",
                  borderRadius: 0,
                  mb: "-1px",
                  whiteSpace: "nowrap",
                  "&:hover": {
                    backgroundColor: "transparent",
                    color: "#886ce8",
                  },
                }}
              >
                <Box
                  sx={{
                    backgroundColor: tab.bgColor,
                    color: tab.textColor,
                    fontSize: "0.75rem",
                    fontWeight: 600,
                    px: 1.5,
                    py: 0.5,
                    borderRadius: "6px",
                  }}
                >
                  {tab.count}
                </Box>
                {tab.label}
              </Button>
            ))}
          </Box>

          <Box
            sx={{
              display: "flex",
              pt: 3,
            }}
          >
            <TextField
              value={searchQuery}
              onChange={(event) => setSearchQuery(event.target.value)}
              placeholder="بحث في التذاكر ..."
              dir="rtl"
              size="small"
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start">
                      <Iconify
                        icon="solar:magnifer-linear"
                        sx={{ color: "text.disabled" }}
                      />
                    </InputAdornment>
                  ),
                },
              }}
              sx={{
                flex: 1,
                "& .MuiOutlinedInput-root": {
                  borderRadius: "12px",
                  textAlign: "right",
                  fontFamily: "inherit",
                  backgroundColor: "#fff",
                },
              }}
            />
          </Box>
        </Box>

        <SimpleTable<SupportTicket>
          data={filteredData}
          headCells={TABLE_HEAD}
          actions={actions}
          actionsHeaderLabel=""
          customRender={customRender}
        />
      </Card>

      <Dialog
        open={openTicketDialog}
        onClose={handleCloseTicketDialog}
        maxWidth="sm"
        fullWidth
        disableScrollLock
        slotProps={{
          paper: {
            sx: {
              borderRadius: "28px",
              boxShadow: "0 24px 48px rgba(15, 23, 42, 0.18)",
              bgcolor: "#fff",
            },
          },
        }}
      >
        <DialogContent sx={{ p: 0 }} dir="rtl">
          <Box sx={{ p: { xs: 3, sm: 4 } }}>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: 2,
                mb: 4,
              }}
            >
              <Typography
                variant="h5"
                sx={{ fontWeight: 800, color: "#101828", fontSize: 22 }}
              >
                إرسال شكوى للدعم الفني
              </Typography>

              <Button
                onClick={handleCloseTicketDialog}
                sx={{
                  minWidth: 40,
                  width: 40,
                  height: 40,
                  borderRadius: "12px",
                  color: "#667085",
                  p: 0,
                  "&:hover": { bgcolor: "#f3f4f6" },
                }}
              >
                <Iconify icon="mingcute:close-line" width={20} />
              </Button>
            </Box>

            <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
              <Box>
                <Typography
                  sx={{
                    color: "#344054",
                    fontSize: 16,
                    fontWeight: 400,
                    mb: 1,
                  }}
                >
                  عنوان الشكوى
                </Typography>
                <TextField
                  fullWidth
                  value={complaintTitle}
                  onChange={(event) => setComplaintTitle(event.target.value)}
                  placeholder="اكتب عنوان واضح للمشكلة"
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      borderRadius: "16px",
                      minHeight: 56,
                      bgcolor: "#fff",
                    },
                  }}
                />
              </Box>

              <Box>
                <Typography
                  sx={{
                    color: "#344054",
                    fontSize: 16,
                    fontWeight: 400,
                    mb: 1,
                  }}
                >
                  وصف الشكوى
                </Typography>
                <TextField
                  fullWidth
                  multiline
                  minRows={5}
                  value={complaintDescription}
                  onChange={(event) =>
                    setComplaintDescription(event.target.value)
                  }
                  placeholder="يرجى كتابة تفاصيل شكواك بوضوح"
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      borderRadius: "16px",
                      bgcolor: "#fff",
                    },
                  }}
                />
              </Box>

              <Box sx={{ display: "flex", justifyContent: "flex-end", pt: 1 }}>
                <Button
                  variant="contained"
                  onClick={handleSubmitTicket}
                  disabled={
                    !complaintTitle.trim() || !complaintDescription.trim()
                  }
                  sx={{
                    bgcolor: "#886ce8",
                    color: "#fff",
                    borderRadius: "12px",
                    fontWeight: 700,
                    height: 48,
                    px: 5,
                    boxShadow: "none",
                    "&:hover": {
                      bgcolor: "#7758e6",
                      boxShadow: "none",
                    },
                  }}
                >
                  إرسال
                </Button>
              </Box>
            </Box>
          </Box>
        </DialogContent>
      </Dialog>
    </Box>
  );
}
