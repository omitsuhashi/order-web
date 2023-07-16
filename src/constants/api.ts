import { ID } from '@/types';

const BASE = '/api';

export const TASK_API = {
  getById: (taskId: ID) => `${BASE}/tasks/${taskId}`,
  getAll: `${BASE}/tasks`,
};

export const PROJECT_API = {
  getAll: `${BASE}/projects`,
  getById: (projectId: ID) => `${BASE}/projects/${projectId}`,
};

export const STORE_API = {
  getMenu: (storeId: ID, genreId?: ID) =>
    `/stores/${storeId}/menu?genre=${genreId}`,
  order: (storeId: ID) => `/stores/${storeId}`,
  storeInfo: (storeId: ID) => `/stores/${storeId}`,
};
