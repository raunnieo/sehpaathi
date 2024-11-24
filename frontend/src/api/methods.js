import { apiManager } from './apiManager';
import { ENDPOINTS } from './endpoints';

export const materialMethods = {
  uploadFiles: (formData) => 
    apiManager.post(ENDPOINTS.MATERIALS.UPLOAD, formData, true),

  listFiles: (params) => 
    apiManager.get(ENDPOINTS.MATERIALS.LIST, params),

  getFileTree: () => 
    apiManager.get(ENDPOINTS.MATERIALS.TREE),

  getSubjects: (branch, semester) => 
    apiManager.get(ENDPOINTS.MATERIALS.SUBJECTS, { branch, semester }),

  deleteFile: (fileId) => 
    apiManager.post(ENDPOINTS.MATERIALS.DELETE, { fileId })
};

export const chatMethods = {
  sendMessage: (message) => 
    apiManager.post(ENDPOINTS.CHAT.SEND, { message }),

  getChatHistory: () => 
    apiManager.get(ENDPOINTS.CHAT.HISTORY)
};

export const authMethods = {
  verifyToken: (token) => 
    apiManager.post(ENDPOINTS.AUTH.VERIFY, { token }),

  getProfile: () => 
    apiManager.get(ENDPOINTS.AUTH.PROFILE)
};

export const configMethods = {
  getAcademicConfig: () => 
    apiManager.get(ENDPOINTS.CONFIG.ACADEMIC),
};