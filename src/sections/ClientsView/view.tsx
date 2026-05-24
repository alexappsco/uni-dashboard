"use client";

import { Box, Typography, Card, Button, Chip } from "@mui/material";
import Iconify from "src/components/iconify";
import SimpleTable from "src/components/SimpleTable";

interface Client {
  id: string;
  clientCode: string;
  name: string;
  email: string;
  phone: string;
  status: "active" | "inactive";
}

const DUMMY_CLIENTS: Client[] = [
  {
    id: "1",
    clientCode: "CL-001",
    name: "أحمد محمد علي",
    email: "ahmed@example.com",
    phone: "+966501234567",
    status: "active",
  },
  {
    id: "2",
    clientCode: "CL-002",
    name: "فاطمة عبدالله السعيد",
    email: "fatima@example.com",
    phone: "+966502345678",
    status: "active",
  },
  {
    id: "3",
    clientCode: "CL-003",
    name: "محمد خالد الدعيع",
    email: "mohammad@example.com",
    phone: "+966503456789",
    status: "inactive",
  },
  {
    id: "4",
    clientCode: "CL-004",
    name: "نورا سلطان العنزي",
    email: "nora@example.com",
    phone: "+966504567890",
    status: "active",
  },
  {
    id: "5",
    clientCode: "CL-005",
    name: "علي حسن الشمري",
    email: "ali@example.com",
    phone: "+966505678901",
    status: "active",
  },
  {
    id: "6",
    clientCode: "CL-006",
    name: "هند محمود الغامدي",
    email: "hind@example.com",
    phone: "+966506789012",
    status: "inactive",
  },
  {
    id: "7",
    clientCode: "CL-007",
    name: "صالح إبراهيم العمري",
    email: "saleh@example.com",
    phone: "+966507890123",
    status: "active",
  },
  {
    id: "8",
    clientCode: "CL-008",
    name: "ليلى عمر الحربي",
    email: "layla@example.com",
    phone: "+966508901234",
    status: "active",
  },
  {
    id: "9",
    clientCode: "CL-009",
    name: "عبدالرحمن فهد الدوسري",
    email: "abdulrahman@example.com",
    phone: "+966509012345",
    status: "inactive",
  },
  {
    id: "10",
    clientCode: "CL-010",
    name: "سارة يوسف الزهراني",
    email: "sarah@example.com",
    phone: "+966510123456",
    status: "active",
  },
  {
    id: "11",
    clientCode: "CL-011",
    name: "خالد ناصر القحطاني",
    email: "khalid@example.com",
    phone: "+966511234567",
    status: "active",
  },
  {
    id: "12",
    clientCode: "CL-012",
    name: "مريم صالح الحسن",
    email: "mariam@example.com",
    phone: "+966512345678",
    status: "active",
  },
  {
    id: "13",
    clientCode: "CL-013",
    name: "عماد علي المطيري",
    email: "emad@example.com",
    phone: "+966513456789",
    status: "inactive",
  },
  {
    id: "14",
    clientCode: "CL-014",
    name: "ندى حامد العتيبي",
    email: "nada@example.com",
    phone: "+966514567890",
    status: "active",
  },
  {
    id: "15",
    clientCode: "CL-015",
    name: "ياسر محمد الشهري",
    email: "yasser@example.com",
    phone: "+966515678901",
    status: "active",
  },
  {
    id: "16",
    clientCode: "CL-016",
    name: "جنى إبراهيم الأسمري",
    email: "janna@example.com",
    phone: "+966516789012",
    status: "inactive",
  },
  {
    id: "17",
    clientCode: "CL-017",
    name: "أمين فهد الجهني",
    email: "amin@example.com",
    phone: "+966517890123",
    status: "active",
  },
  {
    id: "18",
    clientCode: "CL-018",
    name: "هالة عثمان المالكي",
    email: "hala@example.com",
    phone: "+966518901234",
    status: "active",
  },
  {
    id: "19",
    clientCode: "CL-019",
    name: "محمود أحمد العريني",
    email: "mahmoud@example.com",
    phone: "+966519012345",
    status: "inactive",
  },
  {
    id: "20",
    clientCode: "CL-020",
    name: "إيمان حسن الدخيل",
    email: "iman@example.com",
    phone: "+966520123456",
    status: "active",
  },
];

const TABLE_HEAD = [
  {
    id: "clientCode",
    label: "كود العميل",
    align: "left",
    renderHeader: () => (
      <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>
        كود العميل
      </Typography>
    ),
  },
  { id: "name", label: "الاسم", align: "left" },
  { id: "email", label: "البريد الإلكتروني", align: "left" },
  { id: "phone", label: "الهاتف", align: "left" },
  {
    id: "status",
    label: "الحالة",
    align: "center",
    renderHeader: () => (
      <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>
        الحالة
      </Typography>
    ),
    renderCell: (row: Client) => {
      const active = row.status === "active";
      return (
        <Chip
          label={active ? "نشط" : "غير نشط"}
          sx={{
            fontWeight: 600,
            borderRadius: "8px",
            bgcolor: active
              ? "rgba(76, 175, 80, 0.12)"
              : "rgba(145, 158, 171, 0.12)",
            color: active ? "rgb(56, 142, 60)" : "rgb(99, 115, 129)",
            border: "none",
            minWidth: 80,
          }}
        />
      );
    },
  },
];

export default function ClientsView() {
  const actions = [
    {
      label: "تعديل",
      icon: <Iconify icon="solar:pen-bold" />,
      onClick: (row: Client) => {
        console.log("Edit client:", row);
      },
    },
    {
      label: "حذف",
      icon: <Iconify icon="solar:trash-bin-trash-bold" />,
      onClick: (row: Client) => {
        console.log("Delete client:", row);
      },
      sx: { color: "error.main" },
    },
  ];

  return (
    <Box sx={{ textAlign: "right" }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 4,
          flexDirection: { xs: "column", sm: "row-reverse" },
          gap: 2,
        }}
      >
        <Box sx={{ textAlign: { xs: "center", sm: "right" } }}>
          <Typography variant="h4" sx={{ fontWeight: 800 }}>
            العملاء
          </Typography>
          <Typography variant="body2" sx={{ color: "text.secondary", mt: 0.5 }}>
            عرض قائمة العملاء الوهمية لاختبار المكون الجديد
          </Typography>
        </Box>

        <Button
          variant="contained"
          startIcon={<Iconify icon="solar:plus-circle-bold" />}
          sx={{
            bgcolor: "primary.main",
            borderRadius: "10px",
            fontWeight: 600,
            boxShadow: "0 8px 16px 0 rgba(0, 125, 252, 0.24)",
            "&:hover": { bgcolor: "primary.dark" },
          }}
        >
          إضافة عميل جديد
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
        <SimpleTable<Client>
          data={DUMMY_CLIENTS}
          headCells={TABLE_HEAD}
          actions={actions}
        />
      </Card>
    </Box>
  );
}
