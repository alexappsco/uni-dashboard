export const CARD_SX = {
  bgcolor: "#FFFFFF",
  border: "1px solid #E5E7EB",
  borderRadius: "16px",
  boxShadow: "none",
  p: 2.5,
} as const;

export const DATE_FILTER_OPTIONS = ["اليوم", "أسبوعي", "شهري"] as const;
export const BRANCH_FILTER_OPTIONS = [
  "جميع الفروع",
  "فرع العليا",
  "فرع التحلية",
  "فرع الملقا",
] as const;

export const KPI_CARDS = [
  {
    id: "total-usage",
    label: "الاستخدام الكلي للأكواد",
    value: "3,450",
    icon: "solar:qr-code-bold",
    iconColor: "#EA580C",
  },
  {
    id: "best-offer",
    label: "أفضل عرض أداء",
    value: "خصم %20 على القهوة",
    subtitle: "1,240 استخدام",
    icon: "solar:graph-up-bold",
    iconColor: "#027A48",
    iconBg: "#ECFDF3",
    trend: "up" as const,
  },
  {
    id: "worst-offer",
    label: "أقل عرض أداء",
    value: "حلى مجاني مع القهوة",
    subtitle: "420 استخدام",
    icon: "solar:graph-down-bold",
    iconColor: "#D92D20",
    iconBg: "#FEF3F2",
    trend: "down" as const,
  },
  {
    id: "conversion",
    label: "معدل التحويل",
    value: "68.4%",
    trendBadge: "+5.2%",
    icon: "solar:chart-2-bold",
    iconColor: "#EA580C",
  },
  {
    id: "reach",
    label: "إجمالي الوصول للعملاء",
    value: "12,500",
    icon: "solar:eye-bold",
    iconColor: "#EA580C",
  },
  {
    id: "coupons",
    label: "إجمالي الكوبونات المستخدمة",
    value: "2,890",
    icon: "solar:ticket-bold",
    iconColor: "#EA580C",
  },
] as const;

export const USAGE_DAYS = [
  "السبت",
  "الأحد",
  "الاثنين",
  "الثلاثاء",
  "الأربعاء",
  "الخميس",
  "الجمعة",
];
export const USAGE_DATA = [42, 55, 48, 72, 65, 58, 68];

export const REVENUE_DATA = [3200, 4100, 3800, 5200, 4800, 6100];

export const FINANCIAL_METRICS = [
  { label: "إجمالي الإيرادات", value: "44,100 ر.س" },
  { label: "مدفوعات الاشتراك", value: "5,000 ر.س" },
  { label: "معاملات المحفظة", value: "1,200 ر.س" },
  { label: "ملخص الاسترداد", value: "0 ر.س" },
] as const;

export const BRANCH_PERFORMANCE = [
  { name: "فرع العليا", value: 45, color: "#EA580C" },
  { name: "فرع التحلية", value: 30, color: "#EA580C" },
  { name: "فرع الملقا", value: 15, color: "#EA580C" },
  { name: "أخرى", value: 10, color: "#38BDF8" },
] as const;

export const TRANSACTIONS = [
  {
    id: "1",
    ref: "#TRX-8921",
    type: "استخدام عرض (قهوة)",
    amount: "15 ر.س",
    status: "completed" as const,
    datetime: "28 مايو 2023, 14:30",
    activity: "استرداد",
  },
  {
    id: "2",
    ref: "#TRX-8920",
    type: "اشتراك شهري",
    amount: "499 ر.س",
    status: "completed" as const,
    datetime: "28 مايو 2023, 10:00",
    activity: "تجديد اشتراك",
  },
  {
    id: "3",
    ref: "#TRX-8919",
    type: "إعلان ممول",
    amount: "150 ر.س",
    status: "processing" as const,
    datetime: "27 مايو 2023, 18:45",
    activity: "حملة ترويجية",
  },
  {
    id: "4",
    ref: "#TRX-8918",
    type: "استخدام عرض (غداء)",
    amount: "45 ر.س",
    status: "completed" as const,
    datetime: "27 مايو 2023, 13:15",
    activity: "استرداد",
  },
] as const;

export const TABLE_COLUMNS = [
  "الرقم المرجعي (ID)",
  "النوع (عرض/إعلان/اشتراك)",
  "المبلغ",
  "الحالة",
  "التاريخ/الوقت",
  "نشاط العميل",
] as const;
