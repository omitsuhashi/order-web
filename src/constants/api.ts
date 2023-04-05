export const TASK_API = {
  getById: (taskId: string) => `/tasks/${taskId}`,
  getAll: '/tasks',
};

export const PROJECT_API = {
  getAll: '/projects',
  getById: (projectId: string) => `/projects/${projectId}`,
};

export const STORE_API = {
  getAll: (storeId: string) => `/stores/${storeId}`,
};
