// Define TypeScript interface for the Branch data
export interface Branch {
  id: string;
  branchNumber: string;
  name: string;
  address: string;
  status: "active" | "inactive";
}

// Dummy data for branches
export const DUMMY_BRANCHES: Branch[] = [
  {
    id: "1",
    branchNumber: "BR-001",
    name: "فرع الرياض الرئيسي",
    address: "الرياض",
    status: "active",
  },
  {
    id: "2",
    branchNumber: "BR-002",
    name: "فرع جدة - شارع التحلية",
    address: "الرياض",
    status: "active",
  },
  {
    id: "3",
    branchNumber: "BR-003",
    name: "فرع الدمام - الكورنيش",
    address: "الرياض",
    status: "inactive",
  },
  {
    id: "4",
    branchNumber: "BR-004",
    name: "فرع مكة المكرمة",
    address: "الرياض",
    status: "active",
  },
  {
    id: "5",
    branchNumber: "BR-005",
    name: "فرع المدينة المنورة",
    address: "الرياض",
    status: "inactive",
  },
];

// Define table headers with Arabic labels
export const TABLE_HEAD = [
  { id: "branchNumber", label: "رقم الفرع", align: "left" },
  { id: "name", label: "اسم الفرع", align: "left" },
  { id: "address", label: "العنوان", align: "left" },
  { id: "status", label: "الحالة", align: "center", width: 160 },
];
