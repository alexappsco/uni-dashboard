'use server';

import { getData, postData } from 'src/utils/crud-fetch-api';

export type PricingPackage = {
  id: string;
  title: string;
  price: string;
  features: string[];
  bgColor: string;
  chipColor: string;
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
