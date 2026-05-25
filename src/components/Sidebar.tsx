"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Box,
  Divider,
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";

interface SidebarProps {
  open: boolean;
  onClose?: () => void;
}

interface SidebarIconProps {
  active?: boolean;
  src: string;
}

const items = [
  { label: "الرئيسية", icon: "/icons/main.svg", path: "/" },
  { label: "إدارة الفروع", icon: "/icons/manage-branch.svg", path: "/branches" },
  { label: "العروض", icon: "/icons/offers.svg", path: "/offers" },
  { label: "إدارة الباقات", icon: "/icons/managepackage.svg", path: "/packages" },
  { label: "العملاء", icon: "/icons/customer.svg", path: "/clients" },
  { label: "إدارة الموظفين", icon: "/icons/manageemploye.svg", path: "/employees" },
  { label: "الاعلانات", icon: "/icons/ads.svg", path: "/advertisements" },
  { label: "إدارة المتابعين", icon: "/icons/manageemploye.svg", path: "/followers" },
  { label: "التقارير", icon: "/icons/reports.svg", path: "/reports" },
  { label: "التحقق من الكود", icon: "/icons/reports.svg", path: "/code" },
  { label: "الدعم الفني", icon: "/icons/suport.svg", path: "/support" },
  { label: "المحفظة المالية", icon: "/icons/tekat.svg", path: "/financial-wallet" },
];

function SidebarIcon({ active = false, src }: SidebarIconProps) {
  return (
    <Box
      component="img"
      src={src}
      alt=""
      aria-hidden="true"
      sx={{
        display: "block",
        height: 24,
        opacity: active ? 1 : 0.72,
        width: 24,
      }}
    />
  );
}

export default function Sidebar({ open, onClose }: SidebarProps) {
  const theme = useTheme();
  const mdUp = useMediaQuery(theme.breakpoints.up("md"));
  const pathname = usePathname();

  const isActive = (path: string) =>
    path === "/" ? pathname === path : pathname.startsWith(path);

  const profileActive = isActive("/profile");

  const drawer = (
    <Box
      sx={{
        width: "100%",
        boxSizing: "border-box",
        p: 2,
        height: "100%",
        bgcolor: "#efedfa",
      }}
    >
      <List disablePadding>
        {items.map((item) => {
          const active = isActive(item.path);

          return (
            <Link
              key={item.label}
              href={item.path}
              style={{ textDecoration: "none" }}
            >
              <ListItemButton
                sx={{
                  borderRadius: 2,
                  gap: 1.5,
                  justifyContent: "flex-end",
                  mb: 1,
                }}
                selected={active}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    justifyContent: "center",
                  }}
                >
                  <SidebarIcon active={active} src={item.icon} />
                </ListItemIcon>
                <ListItemText
                  primary={
                    <Typography
                      variant="body2"
                      sx={{
                        fontWeight: active ? 700 : 500,
                        textAlign: "right",
                      }}
                    >
                      {item.label}
                    </Typography>
                  }
                />
              </ListItemButton>
            </Link>
          );
        })}
      </List>

      <Divider sx={{ my: 2 }} />

      <List disablePadding>
        <Link href="/profile" style={{ textDecoration: "none" }}>
          <ListItemButton
            sx={{
              borderRadius: 2,
              gap: 1.5,
              justifyContent: "flex-end",
              mb: 1,
            }}
            selected={profileActive}
          >
            <ListItemIcon sx={{ minWidth: 0, justifyContent: "center" }}>
              <SidebarIcon active={profileActive} src="/icons/profile.svg" />
            </ListItemIcon>
            <ListItemText
              primary={
                <Typography
                  variant="body2"
                  sx={{ fontWeight: 500, textAlign: "right" }}
                >
                  الملف الشخصي
                </Typography>
              }
            />
          </ListItemButton>
        </Link>
        <ListItemButton
          sx={{ borderRadius: 2, gap: 1.5, justifyContent: "flex-end" }}
        >
          <ListItemIcon sx={{ minWidth: 0, justifyContent: "center" }}>
            <SidebarIcon active src="/icons/logout.svg" />
          </ListItemIcon>
          <ListItemText
            primary={
              <Typography
                variant="body2"
                sx={{
                  fontWeight: 500,
                  textAlign: "right",
                  color: "error.main",
                }}
              >
                تسجيل الخروج
              </Typography>
            }
          />
        </ListItemButton>
      </List>
    </Box>
  );

  return (
    <Drawer
      anchor="right"
      open={mdUp ? true : open}
      onClose={onClose}
      variant={mdUp ? "permanent" : "temporary"}
      ModalProps={{ keepMounted: true }}
      sx={{
        flexShrink: { md: 0 },
        width: { md: 280 },
        "& .MuiDrawer-paper": {
          bgcolor: "#efedfa",
          width: 280,
          boxSizing: "border-box",
          borderLeft: "none",
          top: mdUp ? "64px" : undefined,
          height: mdUp ? "calc(100% - 64px)" : "100%",
        },
      }}
    >
      {drawer}
    </Drawer>
  );
}
