'use server';

import { getData, postData, deleteData, editData } from 'src/utils/crud-fetch-api';
import { Branch } from 'src/sections/BranchesView/branch-mock-data';

export async function getBranchesAction() {
  try {
    const res = await getData<any>('/v1/store/branches');
    if (res.success && res.data && Array.isArray(res.data.data)) {
      const mapped: Branch[] = res.data.data.map((store: any) => ({
        id: store.id,
        branchNumber: store.is_main_branch ? "فرع رئيسي" : `فرع فرعي`,
        name: store.name,
        address: store.address || "غير محدد",
        status: store.is_active ? "active" : "inactive",
        ...store
      }));
      return {
        success: true,
        data: mapped,
      };
    }
    return {
      success: false,
      error: 'error' in res ? res.error : 'Failed to fetch branches',
      data: [],
    };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
      data: [],
    };
  }
}

export async function createBranchAction(data: {
  name: string;
  email: string;
  address: string;
  latitude: number;
  longitude: number;
  city_id: string;
}) {
  try {
    const res = await postData<any, any>('/v1/store/branches', data);
    if (res.success) {
      return {
        success: true,
        data: res.data,
      };
    }
    return {
      success: false,
      error: 'error' in res ? res.error : 'Failed to create branch',
    };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}

export async function getCitiesAction() {
  try {
    const res = await getData<any>('/v1/auth/cities', { skipAuth: true });
    if (res.success && res.data && Array.isArray(res.data.data)) {
      return {
        success: true,
        data: res.data.data,
      };
    }
    return {
      success: false,
      error: 'error' in res ? res.error : 'Failed to fetch cities',
      data: [],
    };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
      data: [],
    };
  }
}

export async function deleteBranchAction(id: string) {
  try {
    const res = await deleteData<any>(`/v1/store/branches/${id}`);
    if (res.success) {
      return {
        success: true,
      };
    }
    return {
      success: false,
      error: 'error' in res ? res.error : 'Failed to delete branch',
    };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}

export async function getBranchAction(id: string) {
  try {
    const res = await getData<any>(`/v1/store/branches/${id}`);
    if (res.success && res.data && res.data.data) {
      const store = res.data.data;
      const mapped: Branch = {
        id: store.id,
        branchNumber: store.is_main_branch ? "فرع رئيسي" : `فرع فرعي`,
        name: store.name,
        address: store.address || "غير محدد",
        status: store.is_active ? "active" : "inactive",
        ...store
      };
      return {
        success: true,
        data: mapped,
      };
    }
    return {
      success: false,
      error: 'error' in res ? res.error : 'Failed to fetch branch details',
    };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}

export async function updateBranchAction(
  id: string,
  data: {
    branch_id: string;
    name: string;
    email: string;
    address: string;
    latitude: number;
    longitude: number;
    city_id: string;
    is_active: boolean;
  }
) {
  try {
    const res = await editData<any, any>(`/v1/store/branches/${id}`, 'PUT', data);
    if (res.success) {
      return {
        success: true,
        data: res.data,
      };
    }
    return {
      success: false,
      error: 'error' in res ? res.error : 'Failed to update branch',
    };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}

