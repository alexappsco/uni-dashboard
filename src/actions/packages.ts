'use server';

import { getData, postData } from 'src/utils/crud-fetch-api';
import { endpoints } from 'src/utils/endpoints';

export type PricingPackage = {
  id: string;
  title: string;
  price: string;
  features: string[];
  bgColor: string;
  chipColor: string;
};

export type MySubscription = {
  id: string;
  name: string;
  description: string;
  price: string;
  expireAt: string;
  isActive: boolean;
  packageId: string;
};

const CARD_BACKGROUNDS = ['#F3E5F5', '#E0F7FA', '#FDF5E6'];

function mapPackage(pkg: Record<string, unknown>, index: number): PricingPackage {
  const color = typeof pkg.color === 'string' ? pkg.color : '#E0E0E0';
  const rawPrice = pkg.price;
  const price =
    typeof rawPrice === 'number'
      ? String(rawPrice)
      : typeof rawPrice === 'string'
        ? rawPrice.split('.')[0]
        : '0';

  return {
    id: String(pkg.id ?? index),
    title: String(pkg.name ?? pkg.name_en ?? 'باقة'),
    price,
    features: Array.isArray(pkg.features) ? (pkg.features as string[]) : [],
    bgColor: CARD_BACKGROUNDS[index % CARD_BACKGROUNDS.length],
    chipColor: color,
  };
}

function extractPackages(data: unknown): Record<string, unknown>[] {
  if (Array.isArray(data)) {
    return data as Record<string, unknown>[];
  }

  if (data && typeof data === 'object' && Array.isArray((data as { data?: unknown }).data)) {
    return (data as { data: Record<string, unknown>[] }).data;
  }

  return [];
}

function extractSubscription(data: unknown): Record<string, unknown> | null {
  if (!data || typeof data !== 'object') {
    return null;
  }

  const payload = data as Record<string, unknown>;

  if (payload.data && typeof payload.data === 'object' && !Array.isArray(payload.data)) {
    return payload.data as Record<string, unknown>;
  }

  if ('id' in payload && ('name_ar' in payload || 'name_en' in payload)) {
    return payload;
  }

  return null;
}

function mapSubscription(raw: Record<string, unknown>): MySubscription {
  const rawPrice = raw.price;
  const price =
    typeof rawPrice === 'number'
      ? String(rawPrice)
      : typeof rawPrice === 'string'
        ? rawPrice.split('.')[0]
        : '0';

  return {
    id: String(raw.id ?? ''),
    name: String(raw.name_ar ?? raw.name_en ?? 'باقة'),
    description: String(raw.description_ar ?? raw.description_en ?? ''),
    price,
    expireAt: String(raw.expire_at ?? ''),
    isActive: Boolean(raw.is_active),
    packageId: String(raw.package_id ?? ''),
  };
}

export async function subscribePackageAction(packageId: string) {
  try {
    const res = await postData<any, Record<string, never>>(
      `/v1/store/subscribe/${packageId}`,
      {}
    );

    if (res.success) {
      return {
        success: true,
        data: res.data,
        message: 'تم شراء الباقة بنجاح',
      };
    }

    return {
      success: false,
      error: 'error' in res ? res.error : 'فشل الاشتراك في الباقة',
    };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}

export async function getMySubscriptionAction() {
  try {
    const res = await getData<unknown>(`/v1${endpoints.packages.myPackages}`);

    if (!res.success) {
      return {
        success: false as const,
        error: 'error' in res ? res.error : 'فشل جلب بيانات الباقة الحالية',
        data: null,
      };
    }

    const subscription = extractSubscription(res.data);

    if (!subscription) {
      return {
        success: false as const,
        error: 'لا توجد باقة نشطة حالياً',
        data: null,
      };
    }

    return {
      success: true as const,
      data: mapSubscription(subscription),
    };
  } catch (error) {
    return {
      success: false as const,
      error: error instanceof Error ? error.message : 'Unknown error',
      data: null,
    };
  }
}

export async function getPackagesAction() {
  try {
    const res = await getData<any>('/v1/store/packages');

    if (!res.success) {
      return {
        success: false,
        error: 'error' in res ? res.error : 'Failed to fetch packages',
        data: [] as PricingPackage[],
      };
    }

    const items = extractPackages(res.data);

    return {
      success: true,
      data: items.map(mapPackage),
    };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
      data: [] as PricingPackage[],
    };
  }
}
