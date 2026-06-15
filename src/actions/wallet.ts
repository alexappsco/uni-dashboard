'use server';

import { getData, postData } from 'src/utils/crud-fetch-api';

// ─── Types ────────────────────────────────────────────────────────────────────

export interface WalletInfo {
  id: string;
  balance: string;
  updated_at: string;
  user_id: string;
}

export interface Transaction {
  id: string;
  number: string;
  amount: string;
  type: string;
  created_at: string;
  meta_data: string | null;
}

export interface TransactionMeta {
  page: number | null;
  limit: number | null;
  total: number;
}

// ─── Actions ──────────────────────────────────────────────────────────────────

export async function getWalletAction() {
  try {
    const res = await getData<any>('/v1/transaction/wallet');
    if (res.success && res.data && res.data.data) {
      return {
        success: true,
        data: res.data.data as WalletInfo,
      };
    }
    return {
      success: false,
      error: 'error' in res ? res.error : 'Failed to fetch wallet',
      data: null,
    };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
      data: null,
    };
  }
}

export async function getTransactionsAction() {
  try {
    const res = await getData<any>('/v1/transaction');
    if (res.success && res.data && Array.isArray(res.data.data)) {
      return {
        success: true,
        data: res.data.data as Transaction[],
        meta: res.data.meta as TransactionMeta,
      };
    }
    return {
      success: false,
      error: 'error' in res ? res.error : 'Failed to fetch transactions',
      data: [],
      meta: null,
    };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
      data: [],
      meta: null,
    };
  }
}

export async function refundWalletAction(data: { amount: number; reason: string }) {
  try {
    const res = await postData<any, any>('/v1/transaction/refund', data);
    if (res.success) {
      return { success: true, data: res.data };
    }
    return {
      success: false,
      error: 'error' in res ? res.error : 'Failed to submit refund',
    };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}

export async function chargeWalletAction(data: { amount: number }) {
  try {
    const res = await postData<any, any>('/v1/transaction/charge', data);
    if (res.success) {
      return { success: true, data: res.data };
    }
    return {
      success: false,
      error: 'error' in res ? res.error : 'Failed to submit charge',
    };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}
