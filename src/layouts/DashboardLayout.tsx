"use client";

import { useState, useEffect, startTransition } from "react";
import { Box } from "@mui/material";
import { usePathname, useRouter } from "next/navigation";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

function getCookie(name: string): string | null {
  if (typeof document === 'undefined') return null;
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop()?.split(';').shift() || null;
  return null;
}

function isTokenExpired(token: string): boolean {
  try {
    const parts = token.split('.');
    if (parts.length !== 3) return true;
    
    const base64Url = parts[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      window.atob(base64)
        .split('')
        .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    );
    
    const payload = JSON.parse(jsonPayload);
    if (!payload.exp) return false;
    
    const currentTime = Math.floor(Date.now() / 1000);
    return payload.exp < currentTime;
  } catch (error) {
    return true;
  }
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const isAuthPage = pathname?.startsWith("/auth");
  const [checkingAuth, setCheckingAuth] = useState(!isAuthPage);

  useEffect(() => {
    if (isAuthPage) {
      return;
    }

    const token = getCookie("accessToken");
    if (!token || isTokenExpired(token)) {
      document.cookie = "accessToken=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
      try {
        localStorage.removeItem("user");
      } catch (e) {}
      router.push("/auth/login");
    } else {
      startTransition(() => setCheckingAuth(false));
    }
  }, [pathname, isAuthPage, router]);

  if (checkingAuth) {
    return (
      <Box
        sx={{
          display: "flex",
          minHeight: "100vh",
          alignItems: "center",
          justifyContent: "center",
          bgcolor: "#ede9fb",
        }}
      >
        <Box
          component="img"
          src="/logoyouni.png"
          alt="Youni Logo"
          sx={{ width: 150, objectFit: "contain", animation: "pulse 1.5s infinite" }}
        />
        <style>{`
          @keyframes pulse {
            0% { opacity: 0.6; transform: scale(0.98); }
            50% { opacity: 1; transform: scale(1.02); }
            100% { opacity: 0.6; transform: scale(0.98); }
          }
        `}</style>
      </Box>
    );
  }

  if (isAuthPage) {
    return <>{children}</>;
  }

  return (
    <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <Header onMenuClick={() => setSidebarOpen(true)} />
      <Box
        sx={{
          display: "flex",
          flex: 1,
          mt: "64px",
          minHeight: "calc(100vh - 64px)",
        }}
      >
        <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
        <Box
          sx={{
            flex: 1,
            p: 4,
            bgcolor: "#f9fafb",
            color: "#171717",
            minWidth: 0,
            maxWidth: "100%",
          }}
        >
          <Box sx={{ maxWidth: "1536px", mx: "auto", width: "100%" }}>
            {children}
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
