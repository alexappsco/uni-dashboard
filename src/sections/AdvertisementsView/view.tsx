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
  Tabs,
  Tab,
  IconButton,
  MenuList,
  MenuItem,
  ListItemIcon,
  Avatar,
} from "@mui/material";

import Iconify from "src/components/iconify";
import SimpleTable from "src/components/SimpleTable";
import CustomPopover, { usePopover } from "src/components/custom-popover";
import AddEditAdvertisementDialog from "./AddEditAdvertisementDialog";
import VerifyCodeDialog from "./DetailsAds";
import DetailsAds from "./DetailsAds";
import DeleteDialog from "@/components/dialog/delete";

const MOCK_ADS = [
  { id: "1", name: "طعام", code: "#134-456", date: "10/2/2026", status: "نشط", image: "/assets/burger.png" },
  { id: "2", name: "طعام", code: "#134-456", date: "10/2/2026", status: "قيد المراجعة", image: "/assets/burger.png" },
];

export default function AdvertisementsView() {
  const [currentTab, setCurrentTab] = useState("all");
  const popover = usePopover();

  const TABLE_HEAD = [
    { id: "name", label: "الاسم" },
    { id: "image", label: "الصورة" },
    { id: "code", label: "الكود" },
    { id: "date", label: "تاريخ الانشاء" },
    { id: "status", label: "الحالة" },
    { id: "actions", label: "" },
  ];

  // استخدام as any لتجاوز خطأ التايب الخاص بـ actions
  const customRender = {
    name: (row: any) => (
      <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>{row.name}</Typography>
    ),
    image: (row: any) => (
      <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
        <Avatar src={row.image} variant="rounded" sx={{ width: 48, height: 48, borderRadius: 2 }} />
      </Box>
    ),
    status: (row: any) => (
      <Box sx={{
        px: 1.5, py: 0.5, borderRadius: "8px", display: "inline-flex",
        bgcolor: row.status === "نشط" ? "#DDF7EA" : "#FFF0C2",
        color: row.status === "نشط" ? "#0A7B4F" : "#946200",
        fontSize: 12, fontWeight: 600
      }}>
        {row.status}
      </Box>
    ),
    actions: () => (
      <IconButton onClick={popover.onOpen}>
        <Iconify icon="eva:more-vertical-fill" />
      </IconButton>
    ),
  } as any;
const [openAddDialog, setOpenAddDialog] = useState(false);
const [openEditDialog, setOpenEditDialog] = useState(false);
const [openViewDialog, setOpenViewDialog] = useState(false);
const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  return (
    <>
    <Box sx={{ p: 3, textAlign: "right" }}>
      {/* Header */}
    <Stack sx={{ mb: 3,  justifyContent:"space-between",  alignItems:"center" }}
  direction="row"
 
>
  <Box>
    <Typography variant="h4" sx={{ fontWeight: 800 }}>
      الإعلانات
    </Typography>
  </Box>

  <Button
  variant="contained"
  startIcon={<Iconify icon="mingcute:add-line" />}
  onClick={() => setOpenAddDialog(true)}
  sx={{
    bgcolor: '#886ce8',
    '&:hover': {
      bgcolor: '#7658e2',
    },
    px: 3,
    py: 1.2,
    fontSize: '0.95rem',
    fontWeight: 600,
  }}
>
  إضافة اعلان
</Button>
</Stack>

    <Tabs
  value={currentTab}
  onChange={(e, val) => setCurrentTab(val)}
  sx={{
    mb: 2,

    '& .MuiTabs-flexContainer': {
      gap: 4,
    },

    '& .MuiTab-root': {
      minWidth: 'fit-content',
      padding: 0,
      textTransform: 'none',
    },

    '& .MuiTabs-indicator': {
      height: 3,
      borderRadius: 2,
      bgcolor: '#1F2937',
    },
  }}
>
  <Tab
    value="all"
    label={
      <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
        <Box
          sx={{
            px: 1.2,
            py: 0.4,
            borderRadius: 2,
            bgcolor: '#1F2937',
            color: '#fff',
            fontWeight: 700,
            fontSize: 14,
          }}
        >
          80
        </Box>
        <Typography sx={{ fontWeight: 700 }}>الكل</Typography>
      </Box>
    }
  />

  <Tab
    value="active"
    label={
      <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
        <Box
          sx={{
            px: 1.2,
            py: 0.4,
            borderRadius: 2,
            bgcolor: '#DDF4E5',
            color: '#149954',
            fontWeight: 700,
            fontSize: 14,
          }}
        >
          22
        </Box>
        <Typography sx={{ fontWeight: 700 }}>نشط</Typography>
      </Box>
    }
  />

  <Tab
    value="review"
    label={
      <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
        <Box
          sx={{
            px: 1.2,
            py: 0.4,
            borderRadius: 2,
            bgcolor: '#FDF0D5',
            color: '#C98100',
            fontWeight: 700,
            fontSize: 14,
          }}
        >
          22
        </Box>
        <Typography sx={{ fontWeight: 700 }}>قيد المراجعة</Typography>
      </Box>
    }
  />

  <Tab
    value="rejected"
    label={
      <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
        <Box
          sx={{
            px: 1.2,
            py: 0.4,
            borderRadius: 2,
            bgcolor: '#FDF0D5',
            color: '#C98100',
            fontWeight: 700,
            fontSize: 14,
          }}
        >
          22
        </Box>
        <Typography sx={{ fontWeight: 700 }}>مرفوض</Typography>
      </Box>
    }
  />
</Tabs>

      <Card sx={{ p: 2, mb: 3 }}>
        <Stack direction="row" spacing={2}>
          <TextField
  fullWidth
  placeholder="بحث..."
  slotProps={{
    input: {
      startAdornment: (
        <InputAdornment position="start">
          <Iconify icon="eva:search-fill" />
        </InputAdornment>
      ),
    },
  }}
/>
  <TextField sx={{ width: 150 }} select label="الحالة">
    <MenuItem value="all">الكل</MenuItem>
    <MenuItem value="active">نشط</MenuItem>
    <MenuItem value="review">قيد المراجعة</MenuItem>
    <MenuItem value="rejected">مرفوض</MenuItem>
</TextField>
          <TextField type="date" sx={{ width: 150 }} slotProps={{ inputLabel: { shrink: true } }} />
        </Stack>
      </Card>

      <Card sx={{ overflowX: "auto" }}>
        <SimpleTable
          data={MOCK_ADS}
          headCells={TABLE_HEAD}
          customRender={customRender}
        />
      </Card>

      <CustomPopover open={popover.open} onClose={popover.onClose} arrow="right-top">
        <MenuList>
          <MenuItem
  onClick={() => {
    popover.onClose();
    setOpenViewDialog(true);
  }}
>
  <ListItemIcon>
    <Iconify icon="solar:eye-bold" />
  </ListItemIcon>

  عرض
</MenuItem>
          <MenuItem
  onClick={() => {
    popover.onClose();
    setOpenEditDialog(true);
  }}
>
  <ListItemIcon>
    <Iconify icon="solar:pen-bold" />
  </ListItemIcon>

  تعديل
</MenuItem>
          <MenuItem
  onClick={() => {
    popover.onClose();
    setOpenDeleteDialog(true);
  }}
  sx={{ color: 'error.main' }}
>
  <ListItemIcon>
    <Iconify icon="solar:trash-bin-trash-bold" />
  </ListItemIcon>

  حذف
</MenuItem>
        </MenuList>
      </CustomPopover>
    </Box>
    <AddEditAdvertisementDialog
      open={openAddDialog}
      onClose={() => setOpenAddDialog(false)}
      mode="add"
    />
    <AddEditAdvertisementDialog
  open={openEditDialog}
  onClose={() => setOpenEditDialog(false)}
  mode="edit"
/>
    <DetailsAds
  open={openViewDialog}
  onClose={() => setOpenViewDialog(false)}
/>
<DeleteDialog
  open={openDeleteDialog}
  onClose={() => setOpenDeleteDialog(false)}
  onConfirm={() => {
    // API Delete Here

    setOpenDeleteDialog(false);
  }}
/>
    </>
    
  );
}