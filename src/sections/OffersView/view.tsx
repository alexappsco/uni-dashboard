"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Box,
  Button,
  Card,
  InputAdornment,
  MenuItem,
  Switch,
  TextField,
  Typography,
} from "@mui/material";
import Iconify from "src/components/iconify";
import SimpleTable from "src/components/SimpleTable";
import DeleteDialog from "src/components/dialog/delete";

interface Offer {
  id: string;
  name: string;
  image: string;
  discountPercentage: string;
  code: string;
  createdAt: string;
  status: "active" | "inactive";
}

const DUMMY_OFFERS: Offer[] = [
  {
    id: "1",
    name: "عرض العودة للدراسة",
    image: "/avatar.jpg",
    discountPercentage: "25%",
    code: "BACK25",
    createdAt: "2026-05-20",
    status: "active",
  },
  {
    id: "2",
    name: "خصم نهاية الأسبوع",
    image: "/avatar.jpg",
    discountPercentage: "15%",
    code: "WEEK15",
    createdAt: "2026-05-18",
    status: "inactive",
  },
  {
    id: "3",
    name: "عرض العملاء الجدد",
    image: "/avatar.jpg",
    discountPercentage: "30%",
    code: "NEW30",
    createdAt: "2026-05-16",
    status: "active",
  },
  {
    id: "4",
    name: "خصم الاشتراك السنوي",
    image: "/avatar.jpg",
    discountPercentage: "40%",
    code: "YEAR40",
    createdAt: "2026-05-12",
    status: "active",
  },
  {
    id: "5",
    name: "عرض محدود",
    image: "/avatar.jpg",
    discountPercentage: "10%",
    code: "LIMIT10",
    createdAt: "2026-05-08",
    status: "inactive",
  },
];

const TABLE_HEAD = [
  { id: "name", label: "الاسم", align: "right", width: "22%" },
  { id: "image", label: "الصورة", align: "center", width: "12%" },
  {
    id: "discountPercentage",
    label: "نسبة الخصم",
    align: "center",
    width: "14%",
  },
  { id: "code", label: "الكود", align: "center", width: "14%" },
  { id: "createdAt", label: "تاريخ الإنشاء", align: "center", width: "16%" },
  { id: "status", label: "الحالة", align: "center", width: "12%" },
];

export default function OffersView() {
  const router = useRouter();
  const [offers, setOffers] = useState(DUMMY_OFFERS);
  const [statusFilter, setStatusFilter] = useState<
    "all" | "active" | "inactive"
  >("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStatus, setSelectedStatus] = useState<
    "all" | "active" | "inactive"
  >("all");
  const [selectedDate, setSelectedDate] = useState("");
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [offerToDelete, setOfferToDelete] = useState<Offer | null>(null);

  const activeCount = offers.filter(
    (offer) => offer.status === "active"
  ).length;
  const inactiveCount = offers.filter(
    (offer) => offer.status === "inactive"
  ).length;

  const filteredData = offers.filter((offer) => {
    const statusLabel = offer.status === "active" ? "مفعل" : "معطل";
    const normalizedSearch = searchQuery.trim().toLowerCase();
    const matchesTab =
      statusFilter === "all" || offer.status === statusFilter;
    const matchesStatus =
      selectedStatus === "all" || offer.status === selectedStatus;
    const matchesDate = !selectedDate || offer.createdAt === selectedDate;
    const matchesSearch =
      !normalizedSearch ||
      offer.name.toLowerCase().includes(normalizedSearch) ||
      offer.code.toLowerCase().includes(normalizedSearch) ||
      offer.discountPercentage.toLowerCase().includes(normalizedSearch) ||
      statusLabel.includes(normalizedSearch);

    return matchesTab && matchesStatus && matchesDate && matchesSearch;
  });

  const tabs = [
    {
      label: "الكل",
      value: "all",
      count: offers.length,
      bgColor: "#1f2937",
      textColor: "#fff",
    },
    {
      label: "مفعل",
      value: "active",
      count: activeCount,
      bgColor: "#d1fae5",
      textColor: "#059669",
    },
    {
      label: "معطل",
      value: "inactive",
      count: inactiveCount,
      bgColor: "#f3f4f6",
      textColor: "#6b7280",
    },
  ];

  const handleDeleteConfirm = () => {
    if (offerToDelete) {
      setOffers((current) =>
        current.filter((offer) => offer.id !== offerToDelete.id)
      );
    }
    setOpenDeleteDialog(false);
    setOfferToDelete(null);
  };

  const handleStatusToggle = (id: string) => {
    setOffers((current) =>
      current.map((offer) =>
        offer.id === id
          ? {
              ...offer,
              status: offer.status === "active" ? "inactive" : "active",
            }
          : offer
      )
    );
  };

  const actions = [
    {
      label: "تعديل",
      icon: <Iconify icon="solar:pen-bold" />,
      onClick: (row: Offer) => {
        router.push(`/offers/add?mode=edit&id=${row.id}`);
      },
    },
    {
      label: "حذف",
      icon: <Iconify icon="solar:trash-bin-trash-bold" />,
      sx: { color: "error.main" },
      onClick: (row: Offer) => {
        setOfferToDelete(row);
        setOpenDeleteDialog(true);
      },
    },
  ];

  const customRender = {
    image: (row: Offer) => (
      <Box
        component="img"
        src={"/pizza.png"}
        alt={row.name}
        sx={{
          width: 88,
          height: 88,
          objectFit: "cover",
          borderRadius: "8px",
          border: "1px solid #eef2f7",
        }}
      />
    ),
    status: (row: Offer) => {
      const active = row.status === "active";

      return (
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 1,
          }}
        >
          <Typography
            variant="caption"
            sx={{ color: "#4b5563", fontWeight: 600, whiteSpace: "nowrap" }}
          >
            {active ? "مفعل" : "معطل"}
          </Typography>
          <Switch
            checked={active}
            onChange={() => handleStatusToggle(row.id)}
            sx={{
              "& .MuiSwitch-track": {
                backgroundColor: active ? "#00A76F" : "#e5e7eb",
                opacity: 1,
              },
              "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
                backgroundColor: "#00A76F",
                opacity: 1,
              },
            }}
          />
        </Box>
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
            العروض
          </Typography>
        </Box>

        <Button
          component={Link}
          href="/offers/add"
          variant="contained"
          startIcon={<Iconify icon="flowbite:plus-outline" />}
          sx={{
            bgcolor: "#886ce8",
            color: "#fff",
            borderRadius: "12px",
            fontWeight: 700,
            px: 2,
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
          إضافة عرض
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
                  setStatusFilter(tab.value as "all" | "active" | "inactive")
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
              gap: 2,
              flexDirection: { xs: "column", md: "row" },
              pt: 3,
            }}
          >
            <TextField
              value={searchQuery}
              onChange={(event) => setSearchQuery(event.target.value)}
              placeholder="بحث عن إعلان ..."
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

            <TextField
              select
              value={selectedStatus}
              onChange={(event) =>
                setSelectedStatus(
                  event.target.value as "all" | "active" | "inactive"
                )
              }
              size="small"
              sx={{
                width: { xs: "100%", md: 180 },
                "& .MuiOutlinedInput-root": {
                  borderRadius: "12px",
                  backgroundColor: "#fff",
                },
              }}
            >
              <MenuItem value="all">الحالة</MenuItem>
              <MenuItem value="active">مفعل</MenuItem>
              <MenuItem value="inactive">معطل</MenuItem>
            </TextField>

            <TextField
              type="date"
              value={selectedDate}
              onChange={(event) => setSelectedDate(event.target.value)}
              size="small"
              sx={{
                width: { xs: "100%", md: 180 },
                "& .MuiOutlinedInput-root": {
                  borderRadius: "12px",
                  backgroundColor: "#fff",
                },
              }}
            />
          </Box>
        </Box>

        <SimpleTable<Offer>
          data={filteredData}
          headCells={TABLE_HEAD}
          actions={actions}
          customRender={customRender}
        />
      </Card>

      <DeleteDialog
        open={openDeleteDialog}
        onClose={() => {
          setOpenDeleteDialog(false);
          setOfferToDelete(null);
        }}
        onConfirm={handleDeleteConfirm}
      />
    </Box>
  );
}
