"use client";

import { useState } from "react";
import {
  Box,
  Typography,
  Card,
  TextField,
  InputAdornment,
  Button,
  MenuItem,
  Switch,
} from "@mui/material";
import SelectField from "src/components/SelectField/SelectField";
import SimpleTable from "src/components/SimpleTable";
import Iconify from "src/components/iconify";
import AddBranchDialog from "./AddBranchDialog";
import BranchDetailsDialog from "./BranchDetailsDialog";
import { DUMMY_BRANCHES, TABLE_HEAD, Branch } from "./branch-mock-data";
import DeleteDialog from "src/components/dialog/delete";

export default function BranchesView() {
  const [searchQuery, setSearchQuery] = useState("");
  const [branches, setBranches] = useState(DUMMY_BRANCHES);
  const [statusFilter, setStatusFilter] = useState<
    "all" | "active" | "inactive"
  >("all");
  const [openAddDialog, setOpenAddDialog] = useState(false);
  const [openDetailsDialog, setOpenDetailsDialog] = useState(false);
  const [selectedBranch, setSelectedBranch] = useState<Branch | null>(null);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [branchToDelete, setBranchToDelete] = useState<Branch | null>(null);

  const handleStatusToggle = (id: string) => {
    setBranches((current) =>
      current.map((branch) =>
        branch.id === id
          ? {
              ...branch,
              status: branch.status === "active" ? "inactive" : "active",
            }
          : branch,
      ),
    );
  };

  const filteredData = branches.filter((branch) => {
    const matchesSearch =
      branch.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      branch.branchNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      branch.address.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus =
      statusFilter === "all" || branch.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const allCount = branches.length;
  const activeCount = branches.filter((b) => b.status === "active").length;
  const inactiveCount = branches.filter((b) => b.status === "inactive").length;

  const handleAddBranch = (newBranchData: Omit<Branch, "id">) => {
    const branchToAdd: Branch = {
      id: (branches.length + 1).toString(),
      ...newBranchData,
    };
    setBranches([...branches, branchToAdd]);
    setOpenAddDialog(false);
  };

  const handleEditBranch = (updatedBranch: Branch) => {
    setBranches((current) =>
      current.map((b) => (b.id === updatedBranch.id ? updatedBranch : b))
    );
    setOpenAddDialog(false);
    setSelectedBranch(null);
  };

  const handleDeleteConfirm = () => {
    if (branchToDelete) {
      setBranches((current) => current.filter((b) => b.id !== branchToDelete.id));
    }
    setOpenDeleteDialog(false);
    setBranchToDelete(null);
  };

  const actions = [
    {
      label: "عرض",
      icon: <Iconify icon="solar:eye-bold" />,
      onClick: (row: Branch) => {
        setSelectedBranch(row);
        setOpenDetailsDialog(true);
      },
    },
    {
      label: "تعديل",
      icon: <Iconify icon="solar:pen-bold" />,
      onClick: (row: Branch) => {
        setSelectedBranch(row);
        setOpenAddDialog(true);
      },
    },
    {
      label: "حذف",
      icon: <Iconify icon="solar:trash-bin-trash-bold" />,
      sx: { color: "error.main" },
      onClick: (row: Branch) => {
        setBranchToDelete(row);
        setOpenDeleteDialog(true);
      },
    },
  ];

  const customRender = {
    status: (row: Branch) => {
      const active = row.status === "active";
      return (
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1,
            justifyContent: "center",
          }}
        >
          <Typography
            variant="caption"
            sx={{
              color: "#4b5563",
              fontWeight: 500,
              whiteSpace: "nowrap",
            }}
          >
            {active ? "مفعل" : "غير مفعل"}
          </Typography>
          <Switch
            checked={active}
            onChange={() => handleStatusToggle(row.id)}
            sx={{
              '& .MuiSwitch-track': {
                backgroundColor: active ? '#00A76F' : '#e5e7eb',
                opacity: 1,
              },
            }}
          />
        </Box>
      );
    },
  };

  return (
    <Box>
      {/* Header section with title and quick actions */}
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
          <Typography
            variant="h3"
            sx={{ fontWeight: 700, color: "#111827", mb: 0.5 }}
          >
            إدارة الفروع
          </Typography>
        </Box>

        <Button
          variant="contained"
          startIcon={<Iconify icon="solar:plus-circle-bold" />}
          onClick={() => setOpenAddDialog(true)}
          sx={{
            bgcolor: "#886ce8",
            color: "#fff",
            borderRadius: "10px",
            fontWeight: 600,
            px: 3,
            py: 1.2,
            boxShadow: "0 8px 16px 0 rgba(136, 108, 232, 0.24)",
            "&:hover": {
              bgcolor: "#7c5ce5",
            },
            textTransform: "none",
            fontSize: "0.95rem",
          }}
        >
          إضافة فرع جديد
        </Button>
      </Box>

      {/* Main Card with Toolbar and Table */}
      <Card
        sx={{
          borderRadius: "20px",
          boxShadow: "0 4px 20px 0 rgba(0,0,0,0.05)",
          border: "1px solid rgba(0,0,0,0.04)",
          overflow: "hidden",
        }}
      >
        {/* Table Toolbar */}
        <Box
          sx={{
            p: 3,
            bgcolor: "#fff",
          }}
        >
          {/* Tabs/Status Filter */}
          <Box
            sx={{
              display: "flex",
              gap: 3,
              mb: 3,
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
            {[
              {
                label: "الكل",
                value: "all",
                count: allCount,
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
            ].map((tab) => (
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

          {/* Search and Filter */}
          <Box
            sx={{
              display: "flex",
              gap: 2,
              flexDirection: { xs: "column", sm: "row" },
            }}
          >
            {/* Search Box */}
            <TextField
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="ابحث في الفروع..."
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

            {/* Location Filter */}
            <SelectField
              defaultValue="all"
              size="small"
              sx={{
                width: { xs: "100%", sm: 180 },
                "& .MuiOutlinedInput-root": {
                  borderRadius: "12px",
                  backgroundColor: "#fff",
                },
              }}
            >
              <MenuItem value="all">الموقع</MenuItem>
              <MenuItem value="riyadh">الرياض</MenuItem>
              <MenuItem value="jeddah">جدة</MenuItem>
              <MenuItem value="dammam">الدمام</MenuItem>
            </SelectField>
          </Box>
        </Box>

        {/* Simple Table Component */}
        <SimpleTable<Branch>
          data={filteredData}
          headCells={TABLE_HEAD}
          actions={actions}
          customRender={customRender}
        />
      </Card>

      {/* Add / Edit Branch Dialog */}
      <AddBranchDialog
        key={openAddDialog ? (selectedBranch ? `edit-${selectedBranch.id}` : "add") : "closed"}
        open={openAddDialog}
        onClose={() => {
          setOpenAddDialog(false);
          setSelectedBranch(null);
        }}
        onAdd={handleAddBranch}
        onEdit={handleEditBranch}
        branchToEdit={selectedBranch}
      />

      {/* Branch Details Dialog */}
      <BranchDetailsDialog
        open={openDetailsDialog}
        onClose={() => {
          setOpenDetailsDialog(false);
          setSelectedBranch(null);
        }}
        branch={selectedBranch}
      />

      {/* Delete Confirmation Dialog */}
      <DeleteDialog
        open={openDeleteDialog}
        onClose={() => {
          setOpenDeleteDialog(false);
          setBranchToDelete(null);
        }}
        onConfirm={handleDeleteConfirm}
      />
    </Box>
  );
}
