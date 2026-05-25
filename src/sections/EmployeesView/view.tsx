
"use client";

import { useState } from "react";
import {
  Box,
  Typography,
  Card,
  TextField,
  InputAdornment,
  Button,
  Stack,
  Avatar,
  Switch,
  Tabs,
  Tab,
} from "@mui/material";
import { MenuItem } from "@mui/material";
import Iconify from "src/components/iconify";
import SimpleTable from "src/components/SimpleTable";
import { useRouter } from 'next/navigation';
import DeleteDialog from 'src/components/dialog/delete';
const MOCK_DATA = [
  {
    id: "1",
    name: "أحمد محمد",
    nameEn: "Ahmed Mohamed",
    role: "موظف",
    joinDate: "05-08-2025",
    email: "ahmed@gmail.com",
    phone: "+9661234567",
    status: "active",
    avatarUrl: "",
  },
  {
    id: "2",
    name: "محمد علي",
    nameEn: "Mohamed Ali",
    role: "مدير",
    joinDate: "01-09-2025",
    email: "mohamed@gmail.com",
    phone: "+9661234568",
    status: "active",
    avatarUrl: "",
  },
  {
    id: "3",
    name: "خالد أحمد",
    nameEn: "Khaled Ahmed",
    role: "محاسب",
    joinDate: "12-07-2025",
    email: "khaled@gmail.com",
    phone: "+9661234569",
    status: "inactive",
    avatarUrl: "",
  },
];

export default function EmployeesView() {
  const [currentTab, setCurrentTab] = useState("all");
const router = useRouter();
const [deleteRow, setDeleteRow] = useState<any>(null);
const [openDelete, setOpenDelete] = useState(false);
<DeleteDialog
  open={openDelete}
  onClose={() => setOpenDelete(false)}
  onConfirm={() => {
    console.log("delete confirm", deleteRow);
    setOpenDelete(false);
  }}
/>
  const TABLE_HEAD = [
    {
      id: "name",
      label: "الموظف",
      align: "center",
      width: 280,
    },
    {
      id: "joinDate",
      label: "تاريخ الانضمام",
      align: "center",
      width: 170,
    },
    {
      id: "role",
      label: "الدور",
      align: "center",
      width: 140,
    },
    {
      id: "email",
      label: "البريد الإلكتروني",
      align: "center",
      width: 260,
    },
    {
      id: "phone",
      label: "رقم الهاتف",
      align: "center",
      width: 180,
    },
    {
      id: "status",
      label: "الحالة",
      align: "center",
      width: 160,
    },
  ];

 const actions = [
  {
    icon: <Iconify icon="solar:eye-bold" />,
    label: "عرض",
    onClick: (row: any) => {
      router.push(`/employees/edit`);
    },
  },
  {
    icon: <Iconify icon="solar:pen-bold" />,
    label: "تعديل",
    onClick: (row: any) => {
      router.push(`/employees/edit`);
    },
  },
  {
    icon: <Iconify icon="solar:trash-bin-trash-bold" />,
    label: "حذف",
    sx: { color: "error.main" },
    onClick: (row: any) => {
      setDeleteRow(row);
      setOpenDelete(true);
    },
  },
];

  return (
    <Box sx={{ p: 3 }}>
      {/* Header */}
      <Stack
  sx={{
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    mb: 3,
  }}
>
  <Typography
    sx={{
      fontSize: 32,
      fontWeight: 700,
      color: "#111827",
    }}
  >
    إدارة الموظفين
  </Typography>

  <Button
  onClick={() => router.push('/employees/add')}
    variant="contained"
    startIcon={<Iconify icon="mingcute:add-line" />}
    sx={{
      bgcolor: "#886CE8",
      borderRadius: "12px",
      px: 3,
      height: 46,
      "&:hover": {
        bgcolor: "#7B5DE7",
      },
    }}
  >
    إضافة موظف جديد
  </Button>
</Stack>

      {/* Tabs */}
    <Tabs
  value={currentTab}
  onChange={(_, value) => setCurrentTab(value)}
  sx={{
    mb: 3,
    minHeight: 40,
    '& .MuiTabs-flexContainer': {
      gap: 2,
    },
    '& .MuiTab-root': {
      minWidth: 'auto',
      padding: '6px 12px',
    },
  }}
>
  <Tab value="all" label="الكل (3)" sx={{ mx: 0.5 }} />
  <Tab value="active" label="مفعل (2)" sx={{ mx: 0.5 }} />
  <Tab value="inactive" label="معطل (1)" sx={{ mx: 0.5 }} />
</Tabs>
    <Card
  sx={{
    p: 2.5,
    mb: 3,
    borderRadius: 3,
    boxShadow: "none",
    border: "1px solid #E5E7EB",
  }}
>
  <Box
    sx={{
      display: "grid",
      gap: 2,
      gridTemplateColumns: {
        xs: "1fr",
        sm: "1fr 1fr",
        lg: "2fr 1fr 1fr 1fr",
      },
    }}
  >
    {/* Search */}
    <TextField
  fullWidth
  placeholder="البحث في الموظفين..."
  slotProps={{
    input: {
      startAdornment: (
        <InputAdornment position="start">
          <Iconify icon="solar:magnifer-linear" width={20} />
        </InputAdornment>
      ),
    },
  }}
  sx={{
    "& .MuiOutlinedInput-root": {
      height: 48,
      borderRadius: "10px",
      bgcolor: "#fff",
    },
  }}
/>

    {/* Role */}
    <TextField
      select
      fullWidth
      defaultValue=""
      sx={{
        "& .MuiOutlinedInput-root": {
          height: 48,
          borderRadius: "10px",
        },
      }}
    >
      <MenuItem value="">
        الدور
      </MenuItem>

      <MenuItem value="employee">
        موظف
      </MenuItem>

      <MenuItem value="manager">
        مدير
      </MenuItem>

      <MenuItem value="accountant">
        محاسب
      </MenuItem>
    </TextField>

    {/* Join Date */}
    <TextField
      select
      fullWidth
      defaultValue=""
      sx={{
        "& .MuiOutlinedInput-root": {
          height: 48,
          borderRadius: "10px",
        },
      }}
    >
      <MenuItem value="">
        تاريخ الانضمام
      </MenuItem>

      <MenuItem value="today">
        اليوم
      </MenuItem>

      <MenuItem value="week">
        هذا الأسبوع
      </MenuItem>

      <MenuItem value="month">
        هذا الشهر
      </MenuItem>
    </TextField>

    {/* Status */}
    <TextField
      select
      fullWidth
      defaultValue=""
      sx={{
        "& .MuiOutlinedInput-root": {
          height: 48,
          borderRadius: "10px",
        },
      }}
    >
      <MenuItem value="">
        الحالة
      </MenuItem>

      <MenuItem value="active">
        مفعل
      </MenuItem>

      <MenuItem value="inactive">
        معطل
      </MenuItem>
    </TextField>
  </Box>
</Card>

      {/* Table */}
      <Card
        sx={{
          borderRadius: 4,
          overflow: "hidden",
          border: "1px solid #E5E7EB",
          boxShadow: "none",
        }}
      >
        <SimpleTable
          data={MOCK_DATA}
          headCells={TABLE_HEAD}
          actions={actions}
          customRender={{
            name: (row: any) => (
              <Box
                sx={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Stack sx={{ direction: "row", spacing: 1.5, alignItems: "center" }}> 
                  <Avatar
                    src={row.avatarUrl}
                    sx={{
                      width: 40,
                      height: 40,
                    }}
                  />

                  <Box>
                    <Typography
                      sx={{
                        fontSize: 14,
                        fontWeight: 600,
                        color: "#111827",
                        lineHeight: 1.3,
                      }}
                    >
                      {row.name}
                    </Typography>

                    <Typography
                      sx={{
                        fontSize: 12,
                        color: "#6B7280",
                        lineHeight: 1.3,
                      }}
                    >
                      {row.nameEn}
                    </Typography>
                  </Box>
                </Stack>
              </Box>
            ),

            status: (row: any) => (
              <Box
                sx={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Stack  sx={{ direction: "row", spacing: 1, alignItems: "center" }}>
                  <Typography
                    sx={{
                      fontSize: 13,
                      fontWeight: 500,
                      color:
                        row.status === "active"
                          ? "#00A76F"
                          : "#637381",
                    }}
                  >
                    {row.status === "active"
                      ? "مفعل"
                      : "معطل"}
                  </Typography>

                  <Switch
                    size="small"
                    checked={row.status === "active"}
                    sx={{
                      "& .MuiSwitch-track": {
                        opacity: 1,
                      },
                    }}
                  />
                </Stack>
              </Box>
            ),
          }}
        />
      </Card>
    </Box>
  );
}