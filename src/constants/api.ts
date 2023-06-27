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
    `${BASE}/stores/${storeId}/menu?genre=${genreId}`,
  order: (storeId: ID) => `${BASE}/stores/${storeId}`,
  getGenreList: (storeId: ID) => `${BASE}/stores/${storeId}/genre`,
};
