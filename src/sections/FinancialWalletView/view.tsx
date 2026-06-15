"use client";

import { useState, useEffect, useTransition } from "react";
import {
  Box,
  Button,
  Card,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  InputAdornment,
  MenuItem,
  Skeleton,
  TextField,
  Typography,
} from "@mui/material";
import Iconify from "src/components/iconify";
import SimpleTable from "src/components/SimpleTable";
import { fDate } from "src/utils/format-time";
import {
  getWalletAction,
  getTransactionsAction,
  refundWalletAction,
  chargeWalletAction,
  WalletInfo,
  Transaction,
} from "src/actions/wallet";

// ─── Types ────────────────────────────────────────────────────────────────────

interface TableTransaction {
  id: string;
  number: string;
  date: string;
  type: string;
  amount: string;
  rawAmount: number;
}

// ─── Constants ────────────────────────────────────────────────────────────────

const TYPE_LABELS: Record<string, string> = {
  WALLET_REFUND: "استرداد",
  WALLET_CHARGE: "شحن",
  STORE_PAYMENT: "دفع",
};

const TYPE_COLORS: Record<string, string> = {
  WALLET_REFUND: "#D92D20",
  WALLET_CHARGE: "#039855",
  STORE_PAYMENT: "#D92D20",
};

const TABLE_HEAD = [
  { id: "number", label: "رقم العملية", align: "right", width: "22%" },
  { id: "date", label: "التاريخ", align: "center", width: "22%" },
  { id: "type", label: "نوع العملية", align: "center", width: "22%" },
  { id: "amount", label: "المبلغ", align: "center", width: "22%" },
];

// ─── Component ────────────────────────────────────────────────────────────────

export default function FinancialWalletView() {
  // ── Wallet data state ──
  const [wallet, setWallet] = useState<WalletInfo | null>(null);
  const [walletLoading, setWalletLoading] = useState(true);

  // ── Transactions state ──
  const [transactions, setTransactions] = useState<TableTransaction[]>([]);
  const [txLoading, setTxLoading] = useState(true);

  // ── Filter state ──
  const [searchQuery, setSearchQuery] = useState("");
  const [dateFrom, setDateFrom] = useState("");
  const [operationType, setOperationType] = useState("all");

  // ── Refund dialog state ──
  const [refundModalOpen, setRefundModalOpen] = useState(false);
  const [refundAmount, setRefundAmount] = useState("");
  const [refundReason, setRefundReason] = useState("");
  const [refundPending, startRefundTransition] = useTransition();
  const [refundError, setRefundError] = useState("");
  const [refundSuccess, setRefundSuccess] = useState(false);

  // ── Charge dialog state ──
  const [walletModalOpen, setWalletModalOpen] = useState(false);
  const [walletStep, setWalletStep] = useState(1);
  const [customAmount, setCustomAmount] = useState("");
  const [selectedAmount, setSelectedAmount] = useState("500");
  const [paymentMethod, setPaymentMethod] = useState("visa");
  const [chargePending, startChargeTransition] = useTransition();
  const [chargeError, setChargeError] = useState("");

  // ─── Fetch wallet ─────────────────────────────────────────────────────────

  const fetchWallet = async () => {
    setWalletLoading(true);
    const res = await getWalletAction();
    if (res.success && res.data) setWallet(res.data);
    setWalletLoading(false);
  };

  // ─── Fetch transactions ───────────────────────────────────────────────────

  const fetchTransactions = async () => {
    setTxLoading(true);
    const res = await getTransactionsAction();
    if (res.success && res.data.length > 0) {
      const mapped: TableTransaction[] = res.data.map((tx: Transaction) => ({
        id: tx.id,
        number: tx.number,
        date: fDate(tx.created_at, "dd/MM/yyyy"),
        type: tx.type,
        amount: tx.amount,
        rawAmount: parseFloat(tx.amount),
      }));
      setTransactions(mapped);
    }
    setTxLoading(false);
  };

  useEffect(() => {
    const loadInitialData = async () => {
      setWalletLoading(true);
      const walletRes = await getWalletAction();
      if (walletRes.success && walletRes.data) setWallet(walletRes.data);
      setWalletLoading(false);

      setTxLoading(true);
      const txRes = await getTransactionsAction();
      if (txRes.success && txRes.data.length > 0) {
        const mapped: TableTransaction[] = txRes.data.map(
          (tx: Transaction) => ({
            id: tx.id,
            number: tx.number,
            date: fDate(tx.created_at, "dd/MM/yyyy"),
            type: tx.type,
            amount: tx.amount,
            rawAmount: parseFloat(tx.amount),
          }),
        );
        setTransactions(mapped);
      }
      setTxLoading(false);
    };

    void loadInitialData();
  }, []);

  // ─── Filtering ────────────────────────────────────────────────────────────

  const filteredData = transactions.filter((tx) => {
    const matchesSearch =
      !searchQuery.trim() ||
      tx.number.toLowerCase().includes(searchQuery.trim().toLowerCase());
    const matchesType = operationType === "all" || tx.type === operationType;
    return matchesSearch && matchesType;
  });

  // ─── Custom renders ───────────────────────────────────────────────────────

  const customRender = {
    type: (row: TableTransaction) => (
      <Typography
        sx={{
          display: "inline-flex",
          alignItems: "center",
          gap: 0.5,
          fontWeight: 600,
          fontSize: 13,
          color: "#374151",
        }}
      >
        {TYPE_LABELS[row.type] ?? row.type}
      </Typography>
    ),
    amount: (row: TableTransaction) => {
      const isNegative = row.rawAmount < 0;
      return (
        <Typography
          sx={{
            color: isNegative
              ? (TYPE_COLORS[row.type] ?? "#D92D20")
              : "#039855",
            fontWeight: 700,
            whiteSpace: "nowrap",
          }}
        >
          {isNegative ? "" : "+"}
          {row.rawAmount.toFixed(2)} ر.س
        </Typography>
      );
    },
  };

  // ─── Refund submit ────────────────────────────────────────────────────────

  const handleRefundSubmit = () => {
    setRefundError("");
    const amount = parseFloat(refundAmount);
    if (!refundAmount || isNaN(amount) || amount <= 0) {
      setRefundError("يرجى إدخال مبلغ صحيح");
      return;
    }
    if (!refundReason.trim()) {
      setRefundError("يرجى إدخال سبب الاسترداد");
      return;
    }
    startRefundTransition(async () => {
      const res = await refundWalletAction({ amount, reason: refundReason });
      if (res.success) {
        setRefundSuccess(true);
        fetchWallet();
        fetchTransactions();
      } else {
        setRefundError(res.error ?? "حدث خطأ، حاول مجدداً");
      }
    });
  };

  const handleCloseRefund = () => {
    setRefundModalOpen(false);
    setRefundAmount("");
    setRefundReason("");
    setRefundError("");
    setRefundSuccess(false);
  };

  // ─── Charge submit ─────────────────────────────────────────────────────────

  const handleChargeNext = () => {
    if (walletStep === 2) {
      // Step 2 → 3: send the actual API request
      const amount = parseFloat(customAmount.replace(/,/g, ""));
      if (!customAmount || isNaN(amount) || amount <= 0) {
        setChargeError("يرجى إدخال مبلغ صحيح");
        return;
      }
      setChargeError("");
      startChargeTransition(async () => {
        const res = await chargeWalletAction({ amount });
        if (res.success) {
          setWalletStep(3);
          fetchWallet();
          fetchTransactions();
        } else {
          setChargeError(res.error ?? "حدث خطأ، حاول مجدداً");
        }
      });
    } else if (walletStep < 3) {
      setChargeError("");
      setWalletStep((s) => s + 1);
    } else {
      setWalletModalOpen(false);
    }
  };

  const handleCloseCharge = () => {
    setWalletModalOpen(false);
    setWalletStep(1);
    setCustomAmount("");
    setSelectedAmount("500");
    setPaymentMethod("visa");
    setChargeError("");
  };

  // ─── Render ───────────────────────────────────────────────────────────────

  return (
    <Box sx={{ textAlign: "right" }}>
      {/* ── Header ── */}
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
            عمل طلب استرداد
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

      {/* ── Wallet Info Card ── */}
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

              {walletLoading ? (
                <Skeleton variant="text" width={120} height={32} />
              ) : (
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <Typography
                    sx={{ color: "#111827", fontSize: 18, fontWeight: 700 }}
                  >
                    {wallet ? parseFloat(wallet.balance).toFixed(2) : "—"}
                  </Typography>
                  <Typography
                    sx={{ color: "#111827", fontSize: 20, fontWeight: 500 }}
                  >
                    ر.س
                  </Typography>
                </Box>
              )}
            </Box>
          </Box>

          <Box sx={{ textAlign: { xs: "right", md: "left" } }}>
            <Typography
              sx={{ color: "#6B7280", fontSize: 14, fontWeight: 600, mb: 1 }}
            >
              آخر تحديث
            </Typography>
            {walletLoading ? (
              <Skeleton variant="text" width={100} height={28} />
            ) : (
              <Typography
                sx={{ color: "#64748B", fontSize: 18, fontWeight: 600 }}
              >
                {wallet ? fDate(wallet.updated_at, "dd/MM/yyyy") : "—"}
              </Typography>
            )}
          </Box>
        </Box>
      </Card>

      {/* ── Transactions Card ── */}
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
                md: "minmax(180px, 0.8fr) 180px 200px",
              },
              gap: 2,
              alignItems: "center",
            }}
          >
            <TextField
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
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
              onChange={(e) => setDateFrom(e.target.value)}
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
              onChange={(e) => setOperationType(e.target.value)}
              size="small"
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: "12px",
                  backgroundColor: "#fff",
                },
              }}
            >
              <MenuItem value="all">الكل</MenuItem>
              <MenuItem value="WALLET_CHARGE">شحن</MenuItem>
              <MenuItem value="WALLET_REFUND">استرداد</MenuItem>
              <MenuItem value="STORE_PAYMENT">دفع</MenuItem>
            </TextField>
          </Box>

          <Typography
            variant="h6"
            sx={{ color: "#111827", fontWeight: 800, fontSize: 22, mt: 4 }}
          >
            المعاملات المالية
          </Typography>
        </Box>

        {txLoading ? (
          <Box sx={{ p: 4, display: "flex", justifyContent: "center" }}>
            <CircularProgress size={32} sx={{ color: "#886CE8" }} />
          </Box>
        ) : (
          <SimpleTable<TableTransaction>
            data={filteredData}
            headCells={TABLE_HEAD}
            customRender={customRender}
          />
        )}
      </Card>

      {/* ════════════════════════════════════════════
          Refund Dialog
      ════════════════════════════════════════════ */}
      <Dialog
        open={refundModalOpen}
        onClose={handleCloseRefund}
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
            onClick={handleCloseRefund}
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
          {refundSuccess ? (
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                py: 6,
                gap: 2,
                textAlign: "center",
              }}
            >
              <Iconify
                icon="solar:check-circle-bold"
                width={72}
                sx={{ color: "#00A76F" }}
              />
              <Typography
                sx={{ fontSize: 22, fontWeight: 800, color: "#111827" }}
              >
                تم إرسال الطلب بنجاح!
              </Typography>
              <Typography sx={{ color: "#6B7280", fontSize: 15 }}>
                سيتم مراجعة طلب الاسترداد خلال 3-5 أيام عمل.
              </Typography>
              <Button
                variant="contained"
                onClick={handleCloseRefund}
                sx={{
                  mt: 2,
                  height: 48,
                  px: 5,
                  borderRadius: "16px",
                  bgcolor: "#886CE8",
                  color: "#fff",
                  fontWeight: 700,
                  "&:hover": { bgcolor: "#7758E6" },
                }}
              >
                إغلاق
              </Button>
            </Box>
          ) : (
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
                  type="number"
                  value={refundAmount}
                  onChange={(e) => setRefundAmount(e.target.value)}
                  slotProps={{ input: { inputProps: { min: 0 } } }}
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

              {refundError && (
                <Typography
                  sx={{
                    color: "#D92D20",
                    fontSize: 14,
                    fontWeight: 600,
                    textAlign: "right",
                  }}
                >
                  {refundError}
                </Typography>
              )}

              <Box
                sx={{
                  display: "flex",
                  flexDirection: { xs: "column-reverse", sm: "row" },
                  alignItems: { xs: "stretch", sm: "center" },
                  justifyContent: "flex-end",
                  gap: 2,
                }}
              >
                <Button
                  onClick={handleCloseRefund}
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
                  onClick={handleRefundSubmit}
                  disabled={refundPending}
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
                  {refundPending ? (
                    <CircularProgress size={22} sx={{ color: "#fff" }} />
                  ) : (
                    "إرسال الطلب"
                  )}
                </Button>
              </Box>
            </Box>
          )}
        </DialogContent>
      </Dialog>

      {/* ════════════════════════════════════════════
          Charge Dialog
      ════════════════════════════════════════════ */}
      <Dialog
        open={walletModalOpen}
        onClose={handleCloseCharge}
        maxWidth="lg"
        fullWidth
        scroll="paper"
        sx={{
          "& .MuiDialog-paper": {
            borderRadius: "10px",
            maxWidth: "920px",
            maxHeight: "calc(100vh - 60px)",
            minHeight: "calc(80vh)",
          },
          "& .MuiDialogContent-root": {
            p: { xs: "24px", sm: "25px" },
            pt: 0,
            overflowY: "auto",
            maxHeight: "calc(100vh - 220px)",
            scrollbarWidth: "thin",
            scrollbarColor: "#CBD5E1 transparent",
            "&::-webkit-scrollbar": {
              width: 10,
            },
            "&::-webkit-scrollbar-track": {
              background: "#F8FAFC",
            },
            "&::-webkit-scrollbar-thumb": {
              backgroundColor: "#CBD5E1",
              borderRadius: 999,
            },
            "&::-webkit-scrollbar-thumb:hover": {
              backgroundColor: "#94A3B8",
            },
          },
        }}
      >
        <DialogContent>
          <Box sx={{ position: "relative" }}>
            {/* Close button */}
            {/* <Box
              onClick={handleCloseCharge}
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
            </Box> */}

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

            {/* ── Stepper ── */}
            <Box sx={{ position: "relative", mb: 7 }}>
              {/* Progress line */}
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
                    width:
                      walletStep === 1
                        ? "0%"
                        : walletStep === 2
                          ? "50%"
                          : "100%",
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
                {[
                  { label: "حدد المبلغ", step: 1 },
                  { label: "طريقة الدفع", step: 2 },
                  { label: "تم شحن الحساب", step: 3 },
                ].map(({ label, step }) => (
                  <Box
                    key={step}
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      gap: 2,
                    }}
                  >
                    <Box
                      sx={{
                        width: 42,
                        height: 42,
                        borderRadius: "999px",
                        bgcolor: walletStep >= step ? "#00A76F" : "#DDE3EA",
                        transition: "0.3s",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      {walletStep > step && (
                        <Iconify
                          icon="solar:check-bold"
                          width={20}
                          sx={{ color: "#fff" }}
                        />
                      )}
                    </Box>
                    <Typography
                      sx={{
                        fontSize: { xs: "12px", sm: "14px" },
                        fontWeight: 700,
                        color: walletStep >= step ? "#111827" : "#94A3B8",
                        transition: "0.3s",
                      }}
                    >
                      {label}
                    </Typography>
                  </Box>
                ))}
              </Box>
            </Box>

            {/* ── Step 1: Choose amount ── */}
            {walletStep === 1 && (
              <Box
                sx={{
                  display: "grid",
                  gridTemplateColumns: { lg: "1fr 1fr" },
                  gap: 5,
                }}
              >
                <Box>
                  <Box
                    sx={{
                      mb: 6,
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                    }}
                  >
                    <TextField
                      placeholder="ر.س 0.00"
                      value={customAmount}
                      onChange={(e) => {
                        setCustomAmount(e.target.value);
                        setSelectedAmount("");
                      }}
                      type="number"
                      slotProps={{ input: { inputProps: { min: 0 } } }}
                      sx={{
                        width: "100%",
                        maxWidth: "320px",
                        "& .MuiOutlinedInput-root": {
                          borderRadius: 0,
                          borderBottom: "2px solid #CBD5E1",
                          borderTop: "none",
                          borderLeft: "none",
                          borderRight: "none",
                          textAlign: "center",
                          fontSize: "22px",
                          fontWeight: 700,
                          bgcolor: "transparent",
                          "& fieldset": { border: "none" },
                        },
                        "& input": { textAlign: "center" },
                      }}
                    />
                    <Typography
                      sx={{ mt: 2, fontSize: "15px", color: "#9CA3AF" }}
                    >
                      الرصيد الحالي{" "}
                      <Box
                        component="span"
                        sx={{ color: "#111827", fontWeight: 700 }}
                      >
                        {wallet
                          ? `${parseFloat(wallet.balance).toFixed(2)} ر.س`
                          : "—"}
                      </Box>
                    </Typography>
                  </Box>

                  {/* <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 3,
                      mb: 2,
                    }}
                  >
                    <Box sx={{ flex: 1, height: "1px", bgcolor: "#CBD5E1" }} />
                    <Typography sx={{ color: "#9CA3AF", fontSize: "18px" }}>
                      أو
                    </Typography>
                    <Box sx={{ flex: 1, height: "1px", bgcolor: "#CBD5E1" }} />
                  </Box> */}

                  <Box
                    sx={{
                      display: "grid",
                      gridTemplateColumns: { xs: "1fr 1fr", sm: "1fr 1fr 1fr" },
                      gap: 2,
                    }}
                  >
                    {["100", "500", "1000", "2000", "4000"].map((amount) => (
                      <Button
                        key={amount}
                        onClick={() => {
                          setSelectedAmount(amount);
                          setCustomAmount(amount);
                        }}
                        variant={
                          selectedAmount === amount ? "contained" : "outlined"
                        }
                        sx={{
                          height: 58,
                          borderRadius: "18px",
                          border: "1px solid #D1D5DB",
                          bgcolor:
                            selectedAmount === amount ? "#F0FDF4" : "#F8FAFC",
                          color:
                            selectedAmount === amount ? "#111827" : "#64748B",
                          borderColor:
                            selectedAmount === amount ? "#22C55E" : "#D1D5DB",
                          fontSize: "14px",
                          fontWeight: 600,
                          "&:hover": {
                            borderColor: "#22C55E",
                            bgcolor: "#F0FDF4",
                          },
                        }}
                      >
                        {amount} ر.س
                      </Button>
                    ))}
                  </Box>
                </Box>

                {/* Summary box step 1 */}
                <Box sx={{ bgcolor: "#F8FAFC", borderRadius: "28px", p: 4 }}>
                  <Box
                    sx={{ display: "flex", flexDirection: "column", gap: 4 }}
                  >
                    <Box
                      sx={{ display: "flex", justifyContent: "space-between" }}
                    >
                      <Typography sx={{ color: "#111827" }}>
                        المبلغ المدخل
                      </Typography>
                      <Typography sx={{ fontWeight: 700, color: "#111827" }}>
                        {customAmount
                          ? `${parseFloat(customAmount || "0").toFixed(2)} ر.س`
                          : "—"}
                      </Typography>
                    </Box>
                    <Box
                      sx={{ display: "flex", justifyContent: "space-between" }}
                    >
                      <Typography sx={{ color: "#64748B" }}>
                        ضريبة القيمة المضافة (%15)
                      </Typography>
                      <Typography sx={{ fontWeight: 700, color: "#111827" }}>
                        {customAmount
                          ? `${(parseFloat(customAmount || "0") * 0.15).toFixed(2)} ر.س`
                          : "—"}
                      </Typography>
                    </Box>
                    <Box sx={{ height: "1px", bgcolor: "#CBD5E1" }} />
                    <Box
                      sx={{ display: "flex", justifyContent: "space-between" }}
                    >
                      <Typography
                        sx={{
                          fontWeight: 800,
                          fontSize: "20px",
                          color: "#111827",
                        }}
                      >
                        الإجمالي
                      </Typography>
                      <Typography
                        sx={{
                          fontWeight: 800,
                          fontSize: "16px",
                          color: "#111827",
                        }}
                      >
                        {customAmount
                          ? `${(parseFloat(customAmount || "0") * 1.15).toFixed(2)} ر.س`
                          : "—"}
                      </Typography>
                    </Box>
                  </Box>

                  <Box sx={{ mt: 6 }}>
                    <Typography
                      sx={{
                        fontSize: "14px",
                        color: "#111827",
                        mb: 2,
                        display: "block",
                      }}
                    >
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

            {/* ── Step 2: Payment method ── */}
            {walletStep === 2 && (
              <Box
                sx={{
                  display: "grid",
                  gridTemplateColumns: { lg: "1fr 1fr" },
                  gap: 5,
                  alignItems: "start",
                }}
              >
                <Box>
                  <Typography
                    sx={{
                      fontSize: "20px",
                      fontWeight: 800,
                      color: "#111827",
                      mb: 2,
                    }}
                  >
                    طريقة الدفع
                  </Typography>
                  <Typography
                    sx={{ fontSize: "16px", color: "#64748B", mb: 8 }}
                  >
                    اختر طريقة الدفع الانسب لك
                  </Typography>

                  <Box
                    sx={{ display: "flex", flexDirection: "column", gap: 4 }}
                  >
                    {[
                      {
                        key: "visa",
                        label: "بطاقة ائتمان",
                        badge: (
                          <Typography
                            sx={{
                              color: "#172B85",
                              fontSize: "14px",
                              fontWeight: 900,
                            }}
                          >
                            VISA
                          </Typography>
                        ),
                      },
                      {
                        key: "apple",
                        label: "Apple Pay",
                        badge: (
                          <Box
                            sx={{
                              px: 1,
                              py: 0.5,
                              border: "1px solid #111827",
                              borderRadius: "4px",
                              color: "#111827",
                              fontSize: "12px",
                              fontWeight: 800,
                            }}
                          >
                            Pay
                          </Box>
                        ),
                      },
                      {
                        key: "mada",
                        label: "مدى",
                        badge: (
                          <Typography
                            sx={{
                              color: "#006c52",
                              fontSize: "14px",
                              fontWeight: 900,
                            }}
                          >
                            mada
                          </Typography>
                        ),
                      },
                    ].map(({ key, label, badge }) => (
                      <Box
                        key={key}
                        onClick={() => setPaymentMethod(key)}
                        sx={{
                          width: "100%",
                          minHeight: 82,
                          borderRadius: "24px",
                          border:
                            paymentMethod === key
                              ? "1px solid #22C55E"
                              : "1px solid #E2E8F0",
                          p: "0 24px",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                          cursor: "pointer",
                          transition: "0.2s",
                          bgcolor: paymentMethod === key ? "#F0FDF4" : "#fff",
                          "&:hover": {
                            borderColor: "#22C55E",
                            bgcolor: "#F0FDF4",
                          },
                        }}
                      >
                        <Box
                          sx={{ display: "flex", alignItems: "center", gap: 4 }}
                        >
                          <Box
                            sx={{
                              width: 22,
                              height: 22,
                              borderRadius: "7px",
                              border:
                                paymentMethod === key
                                  ? "2px solid #22C55E"
                                  : "2px solid #94A3B8",
                              bgcolor:
                                paymentMethod === key
                                  ? "#22C55E"
                                  : "transparent",
                              transition: "0.2s",
                            }}
                          />
                          <Box
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              gap: 2,
                            }}
                          >
                            {badge}
                            <Typography
                              sx={{
                                fontSize: "14px",
                                fontWeight: 700,
                                color: "#111827",
                              }}
                            >
                              {label}
                            </Typography>
                          </Box>
                        </Box>
                      </Box>
                    ))}
                  </Box>
                </Box>

                {/* Summary box step 2 */}
                <Box sx={{ bgcolor: "#F8FAFC", borderRadius: "28px", p: 4 }}>
                  <Box
                    sx={{ display: "flex", flexDirection: "column", gap: 4 }}
                  >
                    <Box
                      sx={{ display: "flex", justifyContent: "space-between" }}
                    >
                      <Typography sx={{ color: "#111827" }}>المبلغ</Typography>
                      <Typography sx={{ fontWeight: 700, color: "#111827" }}>
                        {customAmount
                          ? `${parseFloat(customAmount).toFixed(2)} ر.س`
                          : "—"}
                      </Typography>
                    </Box>
                    <Box
                      sx={{ display: "flex", justifyContent: "space-between" }}
                    >
                      <Typography sx={{ color: "#64748B" }}>
                        ضريبة القيمة المضافة (%15)
                      </Typography>
                      <Typography sx={{ fontWeight: 700, color: "#111827" }}>
                        {customAmount
                          ? `${(parseFloat(customAmount) * 0.15).toFixed(2)} ر.س`
                          : "—"}
                      </Typography>
                    </Box>
                    <Box sx={{ height: "1px", bgcolor: "#CBD5E1" }} />
                    <Box
                      sx={{ display: "flex", justifyContent: "space-between" }}
                    >
                      <Typography
                        sx={{
                          fontWeight: 800,
                          fontSize: "20px",
                          color: "#111827",
                        }}
                      >
                        الإجمالي
                      </Typography>
                      <Typography
                        sx={{
                          fontWeight: 800,
                          fontSize: "16px",
                          color: "#111827",
                        }}
                      >
                        {customAmount
                          ? `${(parseFloat(customAmount) * 1.15).toFixed(2)} ر.س`
                          : "—"}
                      </Typography>
                    </Box>
                  </Box>
                </Box>
              </Box>
            )}

            {/* ── Step 3: Success ── */}
            {walletStep === 3 && (
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  textAlign: "center",
                  py: 10,
                  gap: 2,
                }}
              >
                <Iconify
                  icon="solar:check-circle-bold"
                  width={80}
                  sx={{ color: "#00A76F", mb: 2 }}
                />
                <Typography
                  sx={{ fontSize: 26, fontWeight: 800, color: "#111827" }}
                >
                  تم شحن المحفظة بنجاح!
                </Typography>
                <Typography sx={{ color: "#64748B", fontSize: "18px" }}>
                  تم إضافة{" "}
                  <Box
                    component="span"
                    sx={{ fontWeight: 700, color: "#111827" }}
                  >
                    {customAmount} ر.س
                  </Box>{" "}
                  إلى محفظتك.
                </Typography>
              </Box>
            )}

            {/* Error message */}
            {chargeError && (
              <Typography
                sx={{
                  color: "#D92D20",
                  fontSize: 14,
                  fontWeight: 600,
                  mt: 2,
                  textAlign: "right",
                }}
              >
                {chargeError}
              </Typography>
            )}
          </Box>
        </DialogContent>

        <DialogActions
          sx={{
            px: { xs: "24px", sm: "40px" },
            pb: { xs: "24px", sm: "15px" },
            // pt: 0,
            position: "sticky",
            bottom: 0,
            bgcolor: "#fff",
            zIndex: 10,
            // borderTop: "1px solid #E2E8F0",
            display: "flex",
            flexDirection: { xs: "column-reverse", sm: "row" },
            alignItems: { xs: "stretch", sm: "center" },
            justifyContent: "space-between",
            gap: 2,
          }}
        >
          <Button
            onClick={handleCloseCharge}
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
                onClick={() => setWalletStep((s) => s - 1)}
                variant="outlined"
                disabled={chargePending}
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
              onClick={handleChargeNext}
              variant="contained"
              disabled={chargePending}
              sx={{
                height: 54,
                px: 4,
                borderRadius: "16px",
                bgcolor: "#886CE8",
                color: "#fff",
                fontWeight: 700,
                minWidth: 140,
                "&:hover": { bgcolor: "#7758E6" },
              }}
            >
              {chargePending ? (
                <CircularProgress size={22} sx={{ color: "#fff" }} />
              ) : walletStep === 3 ? (
                "إنهاء"
              ) : (
                "الخطوة التالية"
              )}
            </Button>
          </Box>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
