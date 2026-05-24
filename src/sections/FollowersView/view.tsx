"use client";

import { Box, Typography, Card, Button } from "@mui/material";
import Iconify from "src/components/iconify";
import SimpleTable from "src/components/SimpleTable";
import React from "react";

interface Follower {
  id: string;
  name: string;
  email: string;
  avatarUrl?: string;
  type: string;
  codeCount: number;
  status: "active" | "inactive";
}

const DUMMY_FOLLOWERS: Follower[] = [
  {
    id: "1",
    name: "أحمد علي",
    email: "ahmed@example.com",
    avatarUrl: "/avatar.jpg",
    type: "مدير مبيعات",
    codeCount: 12,
    status: "active",
  },
  {
    id: "2",
    name: "سارة خالد",
    email: "sarah@example.com",
    avatarUrl: "/avatars/avatar2.png",
    type: "محاسب",
    codeCount: 8,
    status: "inactive",
  },
  {
    id: "3",
    name: "محمد حسين",
    email: "mohammad@example.com",
    avatarUrl: "/avatars/avatar3.png",
    type: "دعم فني",
    codeCount: 5,
    status: "active",
  },
  {
    id: "4",
    name: "نورا سامي",
    email: "noura@example.com",
    avatarUrl: "/avatars/avatar4.png",
    type: "مدير مبيعات",
    codeCount: 15,
    status: "active",
  },
  {
    id: "5",
    name: "خالد منصور",
    email: "khaled@example.com",
    avatarUrl: "/avatars/avatar5.png",
    type: "محاسب",
    codeCount: 3,
    status: "inactive",
  },
  {
    id: "6",
    name: "منى عادل",
    email: "mona@example.com",
    avatarUrl: "/avatars/avatar6.png",
    type: "دعم فني",
    codeCount: 9,
    status: "active",
  },
  {
    id: "7",
    name: "عمر فؤاد",
    email: "omar@example.com",
    avatarUrl: "/avatars/avatar7.png",
    type: "مشرف",
    codeCount: 6,
    status: "inactive",
  },
  {
    id: "8",
    name: "هبة جمال",
    email: "heba@example.com",
    avatarUrl: "/avatars/avatar8.png",
    type: "مدير مبيعات",
    codeCount: 11,
    status: "active",
  },
  {
    id: "9",
    name: "يوسف إبراهيم",
    email: "youssef@example.com",
    avatarUrl: "/avatars/avatar9.png",
    type: "محاسب",
    codeCount: 4,
    status: "inactive",
  },
  {
    id: "10",
    name: "ريم حسن",
    email: "reem@example.com",
    avatarUrl: "/avatars/avatar10.png",
    type: "مشرف",
    codeCount: 7,
    status: "active",
  },
];

const TABLE_HEAD = [
  {
    id: "name",
    label: "الاسم",
    align: "right",
    width: "40%",
    renderHeader: () => (
      <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>
        الاسم
      </Typography>
    ),
    renderCell: (row: Follower) => (
      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
        <Box
          component="img"
          src={"/avatar.jpg"}
          alt={row.name}
          sx={{ width: 32, height: 32, borderRadius: "50%" }}
        />
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <Typography sx={{ fontWeight: 600 }}>{row.name}</Typography>
          <Typography variant="caption" sx={{ color: "#6b7280" }}>
            {row.email}
          </Typography>
        </Box>
      </Box>
    ),
  },
  { id: "type", label: "النوع", align: "right", width: "30%" },
  { id: "codeCount", label: "عدد الاكواد", align: "center", width: "20%" },
];

export default function FollowersView() {
  const [statusFilter, setStatusFilter] = React.useState<
    "all" | "active" | "inactive"
  >("all");

  const activeCount = DUMMY_FOLLOWERS.filter(
    (follower) => follower.status === "active"
  ).length;
  const inactiveCount = DUMMY_FOLLOWERS.filter(
    (follower) => follower.status === "inactive"
  ).length;

  const filteredData = DUMMY_FOLLOWERS.filter(
    (follower) => statusFilter === "all" || follower.status === statusFilter
  );

  const tabs = [
    {
      label: "الكل",
      value: "all",
      count: DUMMY_FOLLOWERS.length,
      bgColor: "#1f2937",
      textColor: "#fff",
    },
    {
      label: "نشط",
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

  const actions = [
    {
      label: "تعديل",
      icon: <Iconify icon="solar:pen-bold" />,
      onClick: (row: Follower) => {
        console.log("Edit follower:", row);
      },
    },
    {
      label: "حذف",
      icon: <Iconify icon="solar:trash-bin-trash-bold" />,
      onClick: (row: Follower) => {
        console.log("Delete follower:", row);
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
          gap: 2,
        }}
      >
        <Box sx={{ textAlign: { xs: "center", sm: "right" } }}>
          <Typography variant="h4" sx={{ fontWeight: 800 }}>
            إدارة المتابعين
          </Typography>
        </Box>
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
        </Box>

        <SimpleTable<Follower>
          data={filteredData}
          headCells={TABLE_HEAD}
          actions={actions}
        />
      </Card>
    </Box>
  );
}
