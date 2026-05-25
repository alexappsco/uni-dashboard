export interface Employee {
  id: string;
  name: string;
  nameEn: string;
  email: string;
  role: string;
  joinDate: string;
  phone: string;
  status: 'active' | 'inactive';
  avatarUrl?: string;
}