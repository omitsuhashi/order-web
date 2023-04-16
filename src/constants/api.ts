const BASE = '/api';

export const TASK_API = {
  getById: (taskId: string) => `${BASE}/tasks/${taskId}`,
  getAll: `${BASE}/tasks`,
};

export const PROJECT_API = {
  getAll: `${BASE}/projects`,
  getById: (projectId: string) => `${BASE}/projects/${projectId}`,
};

export const STORE_API = {
  getAll: (storeId: string) => `${BASE}/stores/${storeId}`,
  order: (storeId: string) => `${BASE}/stores/${storeId}`,
};
