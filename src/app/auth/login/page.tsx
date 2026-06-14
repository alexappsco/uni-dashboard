"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Box,
  Typography,
  TextField,
  Button,
  IconButton,
  InputAdornment,
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

export default function LoginPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("store@user.com");
  const [password, setPassword] = useState("Admin@123456");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: { xs: "column", md: "row" },
        minHeight: "100vh",
        alignItems: "center",
        bgcolor: "#ede9fb",
      }}
    >
      <Box
        sx={{
          width: { xs: "100%", md: "50%" },
          minHeight: { md: "100vh" },
          bgcolor: "#886ce8",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          order: { xs: 2, md: 1 },
          borderRadius: {
            xs: "0 0 50px 50px",
            md: "45% 0 0 45%",
          },
          py: { xs: 8, md: 0 },
        }}
      >
        <Box sx={{ width: "100%", maxWidth: 400, px: 4, color: "#fff" }}>
          <Typography
            variant="h3"
            sx={{ fontWeight: 700, textAlign: "center", mb: 6 }}
          >
            تسجيل الدخول
          </Typography>

          <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
            <TextField
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              placeholder="example@gmail.com"
              dir="ltr"
              slotProps={{
                input: {
                  sx: {
                    bgcolor: "#fff",
                    borderRadius: "12px",
                    "& fieldset": { border: "none" },
                  },
                },
              }}
              sx={{
                "& .MuiInputBase-input": {
                  py: 2,
                  px: 2,
                },
              }}
            />

            <Box>
              <TextField
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type={showPassword ? "text" : "password"}
                placeholder="كلمة المرور"
                dir="rtl"
                slotProps={{
                  input: {
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={() => setShowPassword((prev) => !prev)}
                          edge="end"
                          sx={{ color: "text.secondary" }}
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                    sx: {
                      bgcolor: "#fff",
                      borderRadius: "12px",
                      "& fieldset": { border: "none" },
                    },
                  },
                }}
                sx={{
                  width: "100%",
                  "& .MuiInputBase-input": {
                    py: 2,
                    px: 2,
                  },
                }}
              />

              <Typography
                onClick={() => router.push("/auth/forgot-password")}
                sx={{
                  color: "#fff",
                  fontSize: "0.75rem",
                  textDecoration: "underline",
                  cursor: "pointer",
                  mt: 1,
                  textAlign: "right",
                }}
              >
                نسيت كلمة المرور؟
              </Typography>
            </Box>

            {error && (
              <Typography sx={{ color: "#ffdddd", fontSize: "0.9rem", textAlign: "right" }}>
                ⚠️ {error}
              </Typography>
            )}

            {success && (
              <Typography sx={{ color: "#d4edda", fontSize: "0.9rem", textAlign: "right" }}>
                ✅ {success}
              </Typography>
            )}

            <Button
              onClick={async () => {
                setError(null);
                setSuccess(null);
                setLoading(true);
                try {
                  const res = await fetch(
                    "http://5.189.130.109:3000/v1/auth/signin",
                    {
                      method: "POST",
                      headers: { "Content-Type": "application/json" },
                      body: JSON.stringify({ username: email, password }),
                    },
                  );

                  const json = await res.json().catch(() => null);
                  if (!res.ok) {
                    setError((json && json.message) || "اسم المستخدم أو كلمة المرور غير صحيحة");
                    setLoading(false);
                    return;
                  }

                  const accessToken =
                    json?.data?.access_token ||
                    json?.data?.accessToken;
                  if (!accessToken) {
                    setError("توكن غير موجود في الاستجابة");
                    setLoading(false);
                    return;
                  }

                  // store cookie, 7 days
                  document.cookie = `accessToken=${accessToken}; path=/; max-age=${7 * 24 * 60 * 60}`;

                  // store user object
                  try {
                    localStorage.setItem("user", JSON.stringify(json.data));
                  } catch (e) {}

                  setSuccess("تم تسجيل الدخول بنجاح! جاري تحويلك...");
                  
                  // redirect after success with a small delay
                  setTimeout(() => {
                    router.push("/");
                  }, 1500);
                } catch (e) {
                  setError(e instanceof Error ? e.message : "حدث خطأ");
                  setLoading(false);
                }
              }}
              disabled={loading}
              sx={{
                bgcolor: "#ebedef",
                color: "#374151",
                fontWeight: 500,
                py: 2,
                borderRadius: "12px",
                fontSize: "1rem",
                textTransform: "none",
                boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
                "&:hover": { bgcolor: "#d1d5db" },
                mt: 4,
              }}
            >
              {loading ? "جاري المعالجة..." : "تسجيل الدخول"}
            </Button>
          </Box>
        </Box>
      </Box>

      <Box
        sx={{
          width: { xs: "100%", md: "50%" },
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          p: 6,
          order: { xs: 1, md: 2 },
        }}
      >
        <Box
          component="img"
          src="/logoyouni.png"
          alt="Youni Logo"
          sx={{ width: { xs: 200, md: 350 }, objectFit: "contain" }}
        />
      </Box>
    </Box>
  );
}
