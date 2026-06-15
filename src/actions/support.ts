'use server';

import { getData, postData } from 'src/utils/crud-fetch-api';
import { endpoints } from 'src/utils/endpoints';
import type {
  ApiSupportTicket,
  SupportTicket,
  SupportTicketFilters,
} from 'src/sections/SupportView/types';
import { mapSupportTicket } from 'src/sections/SupportView/types';

function extractTickets(data: unknown): ApiSupportTicket[] {
  if (Array.isArray(data)) {
    return data as ApiSupportTicket[];
  }

  if (data && typeof data === 'object' && Array.isArray((data as { data?: unknown }).data)) {
    return (data as { data: ApiSupportTicket[] }).data;
  }

  return [];
}

function extractSingleTicket(data: unknown): ApiSupportTicket | null {
  if (!data || typeof data !== 'object') {
    return null;
  }

  const payload = data as Record<string, unknown>;

  if (payload.data && typeof payload.data === 'object' && !Array.isArray(payload.data)) {
    return payload.data as ApiSupportTicket;
  }

  if ('id' in payload && 'number' in payload) {
    return payload as unknown as ApiSupportTicket;
  }

  return null;
}

function extractTotal(data: unknown, fallback: number): number {
  if (!data || typeof data !== 'object') {
    return fallback;
  }

  const payload = data as Record<string, unknown>;

  if (typeof payload.total === 'number') {
    return payload.total;
  }

  if (payload.meta && typeof payload.meta === 'object') {
    const meta = payload.meta as Record<string, unknown>;
    if (typeof meta.total === 'number') {
      return meta.total;
    }
    if (typeof meta.totalCount === 'number') {
      return meta.totalCount;
    }
  }

  return fallback;
}

function buildQuery(filters: SupportTicketFilters): string {
  const params = new URLSearchParams();

  if (filters.status) {
    params.set('status', filters.status);
  }
  if (filters.page) {
    params.set('page', String(filters.page));
  }
  if (filters.limit) {
    params.set('limit', String(filters.limit));
  }

  const query = params.toString();
  return query ? `?${query}` : '';
}

export async function getSupportTicketsAction(filters: SupportTicketFilters = {}) {
  try {
    const res = await getData<unknown>(`/v1${endpoints.support.list}${buildQuery(filters)}`);

    if (!res.success) {
      return {
        success: false as const,
        error: 'error' in res ? res.error : 'فشل جلب تذاكر الدعم',
        data: [] as SupportTicket[],
        total: 0,
      };
    }

    const items = extractTickets(res.data);
    const total = extractTotal(res.data, items.length);

    return {
      success: true as const,
      data: items.map(mapSupportTicket),
      total,
    };
  } catch (error) {
    return {
      success: false as const,
      error: error instanceof Error ? error.message : 'Unknown error',
      data: [] as SupportTicket[],
      total: 0,
    };
  }
}

export async function getSupportTicketAction(id: string) {
  try {
    const res = await getData<unknown>(`/v1${endpoints.support.single(id)}`);

    if (!res.success) {
      return {
        success: false as const,
        error: 'error' in res ? res.error : 'فشل جلب تفاصيل التذكرة',
      };
    }

    const ticket = extractSingleTicket(res.data);

    if (!ticket) {
      return {
        success: false as const,
        error: 'تعذر قراءة بيانات التذكرة',
      };
    }

    return {
      success: true as const,
      data: mapSupportTicket(ticket),
    };
  } catch (error) {
    return {
      success: false as const,
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}

export async function createSupportTicketAction(data: {
  title: string;
  description: string;
}) {
  try {
    const res = await postData<unknown, typeof data>(
      `/v1${endpoints.support.create}`,
      data
    );

    if (!res.success) {
      return {
        success: false as const,
        error: 'error' in res ? res.error : 'فشل إرسال التذكرة',
      };
    }

    return {
      success: true as const,
      data: res.data,
      message: 'تم إرسال التذكرة بنجاح',
    };
  } catch (error) {
    return {
      success: false as const,
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}
