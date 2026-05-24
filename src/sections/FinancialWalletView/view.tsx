"use client";

import { useState } from "react";
import {
  Box,
  Button,
  Card,
  Dialog,
  DialogContent,
  DialogTitle,
  InputAdornment,
  MenuItem,
  TextField,
  Typography,
} from "@mui/material";
import Iconify from "src/components/iconify";
import SimpleTable from "src/components/SimpleTable";

interface WalletTransaction {
  id: string;
  operationNumber: string;
  orderNumber: string;
  date: string;
  operationType: "deposit" | "refund" | "withdrawal";
  refundReason: string;
  amount: number;
  balance: number;
}

const DUMMY_TRANSACTIONS: WalletTransaction[] = [
  {
    id: "1",
    operationNumber: "OP-1001",
    orderNumber: "ORD-501",
    date: "2026-05-20",
    operationType: "deposit",
    refundReason: "-",
    amount: 250,
    balance: 1250,
  },
  {
    id: "2",
    operationNumber: "OP-1002",
    orderNumber: "ORD-502",
    date: "2026-05-19",
    operationType: "refund",
    refundReason: "إلغاء الطلب",
    amount: 75,
    balance: 1175,
  },
  {
    id: "3",
    operationNumber: "OP-1003",
    orderNumber: "ORD-503",
    date: "2026-05-18",
    operationType: "withdrawal",
    refundReason: "-",
    amount: 120,
    balance: 1055,
  },
  {
    id: "4",
    operationNumber: "OP-1004",
    orderNumber: "ORD-504",
    date: "2026-05-16",
    operationType: "deposit",
    refundReason: "-",
    amount: 500,
    balance: 1555,
  },
  {
    id: "5",
    operationNumber: "OP-1005",
    orderNumber: "ORD-505",
    date: "2026-05-14",
    operationType: "refund",
    refundReason: "مشكلة في الخدمة",
    amount: 45,
    balance: 1510,
  },
];

const OPERATION_LABELS = {
  deposit: "إيداع",
  refund: "استرداد",
  withdrawal: "سحب",
};

const TABLE_HEAD = [
  { id: "operationNumber", label: "رقم العملية", align: "right", width: "14%" },
  { id: "orderNumber", label: "رقم الطلب", align: "center", width: "12%" },
  { id: "date", label: "التاريخ", align: "center", width: "12%" },
  { id: "operationType", label: "نوع العملية", align: "center", width: "13%" },
  { id: "refundReason", label: "سبب الاسترداد", align: "right", width: "18%" },
  { id: "amount", label: "المبلغ", align: "center", width: "12%" },
  { id: "balance", label: "الرصيد", align: "center", width: "12%" },
];

export default function FinancialWalletView() {
  const [searchQuery, setSearchQuery] = useState("");
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");
  const [operationType, setOperationType] = useState<
    "all" | WalletTransaction["operationType"]
  >("all");
  const [refundModalOpen, setRefundModalOpen] = useState(false);
  const [refundAmount, setRefundAmount] = useState("");
  const [refundReason, setRefundReason] = useState("");
  const [walletModalOpen, setWalletModalOpen] = useState(false);
  const [walletStep, setWalletStep] = useState(1);
  const [selectedAmount, setSelectedAmount] = useState("500");
  const [customAmount, setCustomAmount] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("visa");

  const filteredData = DUMMY_TRANSACTIONS.filter((transaction) => {
    const matchesSearch =
      !searchQuery.trim() ||
      transaction.operationNumber
        .toLowerCase()
        .includes(searchQuery.trim().toLowerCase());
    const matchesDateFrom = !dateFrom || transaction.date >= dateFrom;
    const matchesDateTo = !dateTo || transaction.date <= dateTo;
    const matchesOperation =
      operationType === "all" || transaction.operationType === operationType;

    return matchesSearch && matchesDateFrom && matchesDateTo && matchesOperation;
  });

  const actions = [
    {
      label: "عرض",
      icon: <Iconify icon="solar:eye-bold" />,
      onClick: (row: WalletTransaction) => {
        console.log("View wallet transaction:", row);
      },
    },
  ];

  const customRender = {
    operationType: (row: WalletTransaction) => OPERATION_LABELS[row.operationType],
    amount: (row: WalletTransaction) => {
      const isLowAmount = row.amount < 100;

      return (
        <Typography
          sx={{
            color: isLowAmount ? "#D92D20" : "#039855",
            fontWeight: 700,
            whiteSpace: "nowrap",
          }}
        >
          {row.amount} ريال
        </Typography>
      );
    },
    balance: (row: WalletTransaction) => (
      <Typography sx={{ color: "#344054", fontWeight: 600, whiteSpace: "nowrap" }}>
        {row.balance} ريال
      </Typography>
    ),
  };

  return (
    <Box sx={{ textAlign: "right" }}>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 2,
          mb: 4,
          flexDirection: { xs: "column", sm: "row" },
        }}
      >
        <Typography variant="h4" sx={{ fontWeight: 800 }}>
          المحفظة المالية
        </Typography>

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1.5,
            width: { xs: "100%", sm: "auto" },
            flexDirection: { xs: "column", sm: "row" },
          }}
        >
          <Button
            variant="contained"
            onClick={() => setRefundModalOpen(true)}
            sx={{
              bgcolor: "#886CE8",
              color: "#fff",
              borderRadius: "12px",
              fontWeight: 700,
              height: 48,
              px: 3,
              width: { xs: "100%", sm: "auto" },
              boxShadow: "0 8px 16px rgba(136, 108, 232, 0.22)",
              "&:hover": { bgcolor: "#7758E6" },
            }}
          >
            عمل طلب استيراد
          </Button>

          <Button
            variant="contained"
            onClick={() => {
              setWalletModalOpen(true);
              setWalletStep(1);
            }}
            sx={{
              bgcolor: "#886CE8",
              color: "#fff",
              borderRadius: "12px",
              fontWeight: 700,
              height: 48,
              px: 3,
              width: { xs: "100%", sm: "auto" },
              boxShadow: "0 8px 16px rgba(136, 108, 232, 0.22)",
              "&:hover": { bgcolor: "#7758E6" },
            }}
          >
            شحن المحفظة
          </Button>
        </Box>
      </Box>

      <Card
        sx={{
          bgcolor: "#F8F8F8",
          border: "1px solid #D9D9D9",
          borderRadius: "24px",
          boxShadow: "none",
          p: 3,
          mb: 2.5,
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: { xs: "flex-start", md: "center" },
            justifyContent: "space-between",
            gap: 3,
            flexDirection: { xs: "column", md: "row" },
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <Box
              sx={{
                width: 56,
                height: 56,
                borderRadius: "16px",
                bgcolor: "#000",
                color: "#fff",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
              }}
            >
              <Iconify icon="solar:wallet-money-bold" width={30} />
            </Box>

            <Box>
              <Typography
                sx={{ color: "#111827", fontSize: 20, fontWeight: 800, mb: 1 }}
              >
                معلومات المحفظة
              </Typography>

              <Typography sx={{ color: "#6B7280", fontSize: 14, mb: 0.5 }}>
                الرصيد الحالي
              </Typography>

              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <Typography sx={{ color: "#111827", fontSize: 18, fontWeight: 700 }}>
                  1000.00
                </Typography>
                <Typography sx={{ color: "#111827", fontSize: 20, fontWeight: 500 }}>
                  ريال
                </Typography>
              </Box>
            </Box>
          </Box>

          <Box sx={{ textAlign: { xs: "right", md: "left" } }}>
            <Typography sx={{ color: "#6B7280", fontSize: 14, fontWeight: 600, mb: 1 }}>
              آخر تحديث
            </Typography>
            <Typography sx={{ color: "#64748B", fontSize: 18, fontWeight: 600 }}>
              16/04/2026
            </Typography>
          </Box>
        </Box>
      </Card>

      <Card
        sx={{
          borderRadius: "20px",
          boxShadow: "0 4px 20px 0 rgba(0,0,0,0.05)",
          border: "1px solid rgba(0,0,0,0.04)",
          overflow: "hidden",
        }}
      >
        <Box sx={{ p: 3, bgcolor: "#fff" }}>
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: {
                xs: "1fr",
                md: "minmax(180px, 0.8fr) 220px 220px 180px",
              },
              gap: 2,
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <TextField
              value={searchQuery}
              onChange={(event) => setSearchQuery(event.target.value)}
              placeholder="ابحث برقم العملية ..."
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
                "& .MuiOutlinedInput-root": {
                  borderRadius: "12px",
                  backgroundColor: "#fff",
                },
              }}
            />

            <TextField
              label="التاريخ من"
              type="date"
              value={dateFrom}
              onChange={(event) => setDateFrom(event.target.value)}
              size="small"
              slotProps={{ inputLabel: { shrink: true } }}
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: "12px",
                  backgroundColor: "#fff",
                },
              }}
            />

            <TextField
              label="التاريخ الى"
              type="date"
              value={dateTo}
              onChange={(event) => setDateTo(event.target.value)}
              size="small"
              slotProps={{ inputLabel: { shrink: true } }}
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: "12px",
                  backgroundColor: "#fff",
                },
              }}
            />

            <TextField
              select
              label="نوع العملية"
              value={operationType}
              onChange={(event) =>
                setOperationType(
                  event.target.value as "all" | WalletTransaction["operationType"]
                )
              }
              size="small"
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: "12px",
                  backgroundColor: "#fff",
                },
              }}
            >
              <MenuItem value="all">الكل</MenuItem>
              <MenuItem value="deposit">إيداع</MenuItem>
              <MenuItem value="refund">استرداد</MenuItem>
              <MenuItem value="withdrawal">سحب</MenuItem>
            </TextField>
          </Box>

          <Typography
            variant="h6"
            sx={{ color: "#111827", fontWeight: 800, fontSize: 22, mt: 4 }}
          >
            المعاملات المالية
          </Typography>
        </Box>

        <SimpleTable<WalletTransaction>
          data={filteredData}
          headCells={TABLE_HEAD}
          actions={actions}
          customRender={customRender}
        />
      </Card>

      <Dialog
        open={refundModalOpen}
        onClose={() => setRefundModalOpen(false)}
        maxWidth="sm"
        fullWidth
        sx={{
          "& .MuiDialog-paper": {
            borderRadius: "32px",
            maxWidth: "760px",
          },
        }}
      >
        <DialogTitle
          sx={{
            p: { xs: "24px", sm: "32px" },
            pb: 2,
            fontSize: { xs: "26px", sm: "32px" },
            fontWeight: 800,
            color: "#111827",
            textAlign: "right",
            position: "relative",
          }}
        >
          طلب استرداد المبلغ
          <Box
            onClick={() => setRefundModalOpen(false)}
            sx={{
              position: "absolute",
              left: { xs: "24px", sm: "24px" },
              top: { xs: "24px", sm: "24px" },
              cursor: "pointer",
              color: "#0F172A",
            }}
          >
            <Iconify icon="solar:close-circle-bold" width={24} />
          </Box>
        </DialogTitle>

        <DialogContent sx={{ p: { xs: "20px", sm: "40px" }, pt: 0 }}>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 4 }}>
            <Box>
              <Typography
                sx={{
                  fontSize: { xs: "16px", sm: "18px" },
                  fontWeight: 600,
                  color: "#111827",
                  mb: 2,
                }}
              >
                المبلغ المطلوب استرداده
              </Typography>
              <TextField
                fullWidth
                placeholder="ادخل المبلغ"
                value={refundAmount}
                onChange={(e) => setRefundAmount(e.target.value)}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "16px",
                    height: { xs: "58px", sm: "64px" },
                    backgroundColor: "#fff",
                  },
                }}
              />
            </Box>

            <Box>
              <Typography
                sx={{
                  fontSize: { xs: "16px", sm: "18px" },
                  fontWeight: 600,
                  color: "#111827",
                  mb: 2,
                }}
              >
                سبب الاسترداد
              </Typography>
              <TextField
                fullWidth
                multiline
                rows={4}
                placeholder="اشرح سبب الاسترداد"
                value={refundReason}
                onChange={(e) => setRefundReason(e.target.value)}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "16px",
                    backgroundColor: "#fff",
                  },
                }}
              />
            </Box>

            <Box
              sx={{
                bgcolor: "#FFF4DB",
                borderRadius: "16px",
                p: 3,
                display: "flex",
                alignItems: "flex-start",
                gap: 2,
              }}
            >
              <Box sx={{ color: "#F59E0B", mt: 0.5 }}>
                <Iconify icon="solar:danger-triangle-bold" width={24} />
              </Box>
              <Typography
                sx={{
                  fontSize: { xs: "14px", sm: "15px" },
                  color: "#92400E",
                  lineHeight: 1.6,
                }}
              >
                سيتم مراجعة طلب الاسترداد خلال{" "}
                <Box component="span" sx={{ fontWeight: 700 }}>
                  3-5 أيام عمل
                </Box>
                ، سيتم إضافة المبلغ إلى محفظتك فور الموافقة.
              </Typography>
            </Box>
          </Box>

          <Box
            sx={{
              mt: 5,
              display: "flex",
              flexDirection: { xs: "column-reverse", sm: "row" },
              alignItems: { xs: "stretch", sm: "center" },
              justifyContent: "flex-end",
              gap: 2,
            }}
          >
            <Button
              onClick={() => setRefundModalOpen(false)}
              variant="outlined"
              sx={{
                height: 52,
                px: 4,
                borderRadius: "16px",
                border: "1px solid #CBD5E1",
                color: "#111827",
                fontWeight: 700,
                "&:hover": {
                  bgcolor: "#F8FAFC",
                  border: "1px solid #CBD5E1",
                },
              }}
            >
              إلغاء
            </Button>
            <Button
              variant="contained"
              sx={{
                height: 52,
                px: 4,
                borderRadius: "16px",
                bgcolor: "#886CE8",
                color: "#fff",
                fontWeight: 700,
                "&:hover": { bgcolor: "#7758E6" },
              }}
            >
              إرسال الطلب
            </Button>
          </Box>
        </DialogContent>
      </Dialog>

      <Dialog
        open={walletModalOpen}
        onClose={() => setWalletModalOpen(false)}
        maxWidth="lg"
        fullWidth
        sx={{
          "& .MuiDialog-paper": {
            borderRadius: "34px",
            maxWidth: "920px",
          },
        }}
      >
        <Box sx={{ position: "relative", p: { xs: "24px", sm: "40px" } }}>
          <Box
            onClick={() => setWalletModalOpen(false)}
            sx={{
              position: "absolute",
              left: { xs: "24px", sm: "32px" },
              top: { xs: "24px", sm: "32px" },
              cursor: "pointer",
              color: "#0F172A",
              zIndex: 50,
            }}
          >
            <Iconify icon="solar:close-circle-bold" width={24} />
          </Box>

          <Typography
            sx={{
              fontSize: "20px",
              fontWeight: 800,
              color: "#111827",
              mb: 4,
            }}
          >
            شحن المحفظة
          </Typography>

          <Box sx={{ position: "relative", mb: 7 }}>
            <Box
              sx={{
                position: "absolute",
                top: 20,
                right: { xs: "32px", sm: "56px" },
                left: { xs: "32px", sm: "56px" },
                height: "4px",
                bgcolor: "#E2E8F0",
                borderRadius: "999px",
                overflow: "hidden",
              }}
            >
              <Box
                sx={{
                  height: "100%",
                  bgcolor: "#00A76F",
                  width: walletStep === 1 ? "0%" : walletStep === 2 ? "50%" : "100%",
                  transition: "all 0.5s",
                }}
              />
            </Box>

            <Box
              sx={{
                display: "flex",
                alignItems: "flex-start",
                justifyContent: "space-between",
                position: "relative",
                zIndex: 10,
              }}
            >
              <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 2 }}>
                <Box
                  sx={{
                    width: 42,
                    height: 42,
                    borderRadius: "999px",
                    bgcolor: walletStep >= 1 ? "#00A76F" : "#DDE3EA",
                    transition: "0.3s",
                  }}
                />
                <Typography
                  sx={{
                    fontSize: { xs: "12px", sm: "14px" },
                    fontWeight: 700,
                    color: walletStep >= 1 ? "#111827" : "#94A3B8",
                    transition: "0.3s",
                  }}
                >
                  حدد المبلغ
                </Typography>
              </Box>

              <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 2 }}>
                <Box
                  sx={{
                    width: 42,
                    height: 42,
                    borderRadius: "999px",
                    bgcolor: walletStep >= 2 ? "#00A76F" : "#DDE3EA",
                    transition: "0.3s",
                  }}
                />
                <Typography
                  sx={{
                    fontSize: { xs: "12px", sm: "14px" },
                    fontWeight: 700,
                    color: walletStep >= 2 ? "#111827" : "#94A3B8",
                    transition: "0.3s",
                  }}
                >
                  طريقة الدفع
                </Typography>
              </Box>

              <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 2 }}>
                <Box
                  sx={{
                    width: 42,
                    height: 42,
                    borderRadius: "999px",
                    bgcolor: walletStep >= 3 ? "#00A76F" : "#DDE3EA",
                    transition: "0.3s",
                  }}
                />
                <Typography
                  sx={{
                    fontSize: { xs: "12px", sm: "14px" },
                    fontWeight: 700,
                    color: walletStep >= 3 ? "#111827" : "#94A3B8",
                    transition: "0.3s",
                  }}
                >
                  تم شحن الحساب
                </Typography>
              </Box>
            </Box>
          </Box>

          {walletStep === 1 && (
            <Box sx={{ display: "grid", gridTemplateColumns: { lg: "1fr 1fr" }, gap: 5 }}>
              <Box>
                <Box sx={{ mb: 6, display: "flex", flexDirection: "column", alignItems: "center" }}>
                  <TextField
                    placeholder="ر.س.0.00"
                    value={customAmount}
                    onChange={(e) => setCustomAmount(e.target.value)}
                    sx={{
                      width: "100%",
                      maxWidth: "320px",
                      "& .MuiOutlinedInput-root": {
                        borderRadius: 0,
                        borderBottom: "1px solid #CBD5E1",
                        borderTop: "none",
                        borderLeft: "none",
                        borderRight: "none",
                        textAlign: "center",
                        fontSize: "20px",
                        bgcolor: "transparent",
                      },
                    }}
                  />
                  <Typography sx={{ mt: 2, fontSize: "18px", color: "#9CA3AF" }}>
                    الرصيد الحالي <Box component="span" sx={{ color: "#111827", fontWeight: 700 }}>114.5 ر.س</Box>
                  </Typography>
                </Box>

                <Box sx={{ display: "flex", alignItems: "center", gap: 3, mb: 6 }}>
                  <Box sx={{ flex: 1, height: "1px", bgcolor: "#CBD5E1" }} />
                  <Typography sx={{ color: "#9CA3AF", fontSize: "18px" }}>أو</Typography>
                  <Box sx={{ flex: 1, height: "1px", bgcolor: "#CBD5E1" }} />
                </Box>

                <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr 1fr", sm: "1fr 1fr 1fr" }, gap: 2 }}>
                  {["100", "500", "1,000", "2,000", "4,000", "مبلغ مخصص"].map((amount) => (
                    <Button
                      key={amount}
                      onClick={() => {
                        if (amount === "مبلغ مخصص") {
                          setCustomAmount("");
                        } else {
                          setSelectedAmount(amount);
                          setCustomAmount(amount);
                        }
                      }}
                      variant={selectedAmount === amount && amount !== "مبلغ مخصص" ? "contained" : "outlined"}
                      sx={{
                        height: 58,
                        borderRadius: "18px",
                        border: "1px solid #D1D5DB",
                        bgcolor: selectedAmount === amount && amount !== "مبلغ مخصص" ? "#F0FDF4" : "#F8FAFC",
                        color: selectedAmount === amount && amount !== "مبلغ مخصص" ? "#111827" : "#64748B",
                        borderColor: selectedAmount === amount && amount !== "مبلغ مخصص" ? "#22C55E" : "#D1D5DB",
                        fontSize: "14px",
                        fontWeight: 600,
                        "&:hover": {
                          borderColor: "#22C55E",
                          bgcolor: "#F0FDF4",
                        },
                      }}
                    >
                      {amount}
                    </Button>
                  ))}
                </Box>
              </Box>

              <Box sx={{ bgcolor: "#F8FAFC", borderRadius: "28px", p: 4 }}>
                <Box sx={{ display: "flex", flexDirection: "column", gap: 4 }}>
                  <Box sx={{ display: "flex", justifyContent: "space-between", fontSize: "14px" }}>
                    <Typography sx={{ color: "#111827" }}>المجموع الفرعي</Typography>
                    <Typography sx={{ fontWeight: 700, color: "#111827" }}>130 ر.س</Typography>
                  </Box>
                  <Box sx={{ display: "flex", justifyContent: "space-between", fontSize: "14px" }}>
                    <Typography sx={{ color: "#64748B" }}>ضريبة القيمة المضافة (%15)</Typography>
                    <Typography sx={{ fontWeight: 700, color: "#111827" }}>ر.س 35,44</Typography>
                  </Box>
                  <Box sx={{ height: "1px", bgcolor: "#CBD5E1" }} />
                  <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                    <Typography sx={{ fontWeight: 800, fontSize: "20px", color: "#111827" }}>الإجمالي</Typography>
                    <Typography sx={{ fontWeight: 800, fontSize: "14px", color: "#111827" }}>ر.س 271,69</Typography>
                  </Box>
                </Box>

                <Box sx={{ mt: 6 }}>
                  <Typography sx={{ fontSize: "14px", color: "#111827", mb: 2, display: "block" }}>
                    الرمز الترويجي (اختياري):
                  </Typography>
                  <Box sx={{ display: "flex", gap: 2 }}>
                    <TextField
                      placeholder="الرمز الترويجي"
                      sx={{
                        flex: 1,
                        "& .MuiOutlinedInput-root": {
                          borderRadius: "16px",
                          height: 52,
                        },
                      }}
                    />
                    <Button
                      variant="outlined"
                      sx={{
                        height: 52,
                        px: 4,
                        borderRadius: "16px",
                        border: "1px solid #CBD5E1",
                        color: "#64748B",
                        "&:hover": { bgcolor: "#EEF2F7" },
                      }}
                    >
                      تطبيق
                    </Button>
                  </Box>
                </Box>
              </Box>
            </Box>
          )}

          {walletStep === 2 && (
            <Box sx={{ display: "grid", gridTemplateColumns: { lg: "1fr 1fr" }, gap: 5, alignItems: "start" }}>
              <Box>
                <Typography sx={{ fontSize: "20px", fontWeight: 800, color: "#111827", mb: 2 }}>
                  طريقة الدفع
                </Typography>
                <Typography sx={{ fontSize: "20px", color: "#64748B", mb: 8 }}>
                  اختر طريقة الدفع الانسب لك
                </Typography>

                <Box sx={{ display: "flex", flexDirection: "column", gap: 4 }}>
                  <Box
                    onClick={() => setPaymentMethod("visa")}
                    sx={{
                      width: "100%",
                      minHeight: 82,
                      borderRadius: "24px",
                      border: paymentMethod === "visa" ? "1px solid #22C55E" : "1px solid #E2E8F0",
                      p: "0 24px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      cursor: "pointer",
                      transition: "0.2s",
                      bgcolor: paymentMethod === "visa" ? "#F0FDF4" : "#fff",
                      "&:hover": { borderColor: "#22C55E", bgcolor: "#F0FDF4" },
                    }}
                  >
                    <Box sx={{ display: "flex", alignItems: "center", gap: 4 }}>
                      <Box
                        sx={{
                          width: 22,
                          height: 22,
                          borderRadius: "7px",
                          border: paymentMethod === "visa" ? "2px solid #22C55E" : "2px solid #94A3B8",
                          bgcolor: paymentMethod === "visa" ? "#22C55E" : "transparent",
                          transition: "0.2s",
                        }}
                      />
                      <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                        <Typography sx={{ color: "#172B85", fontSize: "14px", fontWeight: 900 }}>VISA</Typography>
                        <Typography sx={{ fontSize: "14px", fontWeight: 700, color: "#111827" }}>بطاقة ائتمان</Typography>
                      </Box>
                    </Box>
                  </Box>

                  <Box
                    onClick={() => setPaymentMethod("apple")}
                    sx={{
                      width: "100%",
                      minHeight: 82,
                      borderRadius: "24px",
                      border: paymentMethod === "apple" ? "1px solid #22C55E" : "1px solid #E2E8F0",
                      p: "0 24px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      cursor: "pointer",
                      transition: "0.2s",
                      bgcolor: paymentMethod === "apple" ? "#F0FDF4" : "#fff",
                      "&:hover": { borderColor: "#22C55E", bgcolor: "#F0FDF4" },
                    }}
                  >
                    <Box sx={{ display: "flex", alignItems: "center", gap: 4 }}>
                      <Box
                        sx={{
                          width: 22,
                          height: 22,
                          borderRadius: "7px",
                          border: paymentMethod === "apple" ? "2px solid #22C55E" : "2px solid #94A3B8",
                          bgcolor: paymentMethod === "apple" ? "#22C55E" : "transparent",
                          transition: "0.2s",
                        }}
                      />
                      <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                        <Box sx={{ px: 1, py: 0.5, border: "1px solid #111827", borderRadius: "4px", color: "#111827", fontSize: "12px", fontWeight: 800 }}>Pay</Box>
                        <Typography sx={{ fontSize: "14px", fontWeight: 700, color: "#111827" }}>Apple pay</Typography>
                      </Box>
                    </Box>
                  </Box>
                </Box>
              </Box>

              <Box sx={{ bgcolor: "#F8FAFC", borderRadius: "28px", p: 4 }}>
                <Box sx={{ display: "flex", flexDirection: "column", gap: 4 }}>
                  <Box sx={{ display: "flex", justifyContent: "space-between", fontSize: "14px" }}>
                    <Typography sx={{ color: "#111827" }}>المجموع الفرعي</Typography>
                    <Typography sx={{ fontWeight: 700, color: "#111827" }}>130 ر.س</Typography>
                  </Box>
                  <Box sx={{ display: "flex", justifyContent: "space-between", fontSize: "14px" }}>
                    <Typography sx={{ color: "#64748B" }}>ضريبة القيمة المضافة (%15)</Typography>
                    <Typography sx={{ fontWeight: 700, color: "#111827" }}>ر.س 35,44</Typography>
                  </Box>
                  <Box sx={{ height: "1px", bgcolor: "#CBD5E1" }} />
                  <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                    <Typography sx={{ fontWeight: 800, fontSize: "20px", color: "#111827" }}>الإجمالي</Typography>
                    <Typography sx={{ fontWeight: 800, fontSize: "14px", color: "#111827" }}>ر.س 271,69</Typography>
                  </Box>
                </Box>
              </Box>
            </Box>
          )}

          {walletStep === 3 && (
            <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center", py: 10 }}>
              <Iconify icon="solar:check-circle-bold" width={80} sx={{ color: "#00A76F", mb: 4 }} />
              <Typography sx={{ color: "#64748B", fontSize: "20px" }}>تم شحن المحفظة بنجاح!</Typography>
            </Box>
          )}

          <Box
            sx={{
              mt: 6,
              pt: 4,
              borderTop: "1px solid #E2E8F0",
              display: "flex",
              flexDirection: { xs: "column-reverse", sm: "row" },
              alignItems: { xs: "stretch", sm: "center" },
              justifyContent: "space-between",
              gap: 2,
            }}
          >
            <Button
              onClick={() => setWalletModalOpen(false)}
              variant="outlined"
              sx={{
                height: 54,
                px: 4,
                borderRadius: "16px",
                border: "1px solid #CBD5E1",
                color: "#111827",
                fontWeight: 700,
                "&:hover": { bgcolor: "#F8FAFC" },
              }}
            >
              إلغاء
            </Button>
            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
              {walletStep > 1 && walletStep < 3 && (
                <Button
                  onClick={() => setWalletStep(walletStep - 1)}
                  variant="outlined"
                  sx={{
                    height: 54,
                    px: 4,
                    borderRadius: "16px",
                    border: "1px solid #CBD5E1",
                    color: "#111827",
                    fontWeight: 700,
                    "&:hover": { bgcolor: "#F8FAFC" },
                  }}
                >
                  السابق
                </Button>
              )}
              <Button
                onClick={() => {
                  if (walletStep < 3) {
                    setWalletStep(walletStep + 1);
                  } else {
                    setWalletModalOpen(false);
                  }
                }}
                variant="contained"
                sx={{
                  height: 54,
                  px: 4,
                  borderRadius: "16px",
                  bgcolor: "#886CE8",
                  color: "#fff",
                  fontWeight: 700,
                  "&:hover": { bgcolor: "#7758E6" },
                }}
              >
                {walletStep === 3 ? "إنهاء" : "الخطوة التالية"}
              </Button>
            </Box>
          </Box>
        </Box>
      </Dialog>
    </Box>
  );
}
