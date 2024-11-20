import { materialMethods } from '../api';
import { auth } from "../auth/firebase";

export const materialService = {
  async uploadFiles(formData) {
    try {
      const user = auth.currentUser;
      if (!user) throw new Error("No user is currently signed in");

      const googleProvider = user.providerData.find(
        (provider) => provider.providerId === "google.com"
      );
      if (!googleProvider) {
        throw new Error("Please sign in with Google to upload files");
      }

      // Validate formData
      const requiredFields = ["branch", "semester", "subject", "category"];
      for (const field of requiredFields) {
        if (!formData.get(field)) {
          throw new Error(`Missing required field: ${field}`);
        }
      }
      if (!formData.getAll("file").length) {
        throw new Error("No files provided for upload");
      }

      return await materialMethods.uploadFiles(formData);
    } catch (error) {
      console.error("Upload error:", error);
      throw error;
    }
  },

  async listFiles(branch, semester, subject, category) {
    try {
      const params = { branch, semester, subject, category };
      return await materialMethods.listFiles(params);
    } catch (error) {
      console.error("List error:", error);
      throw error;
    }
  },

  async getFileTree() {
    try {
      return await materialMethods.getFileTree();
    } catch (error) {
      console.error('Error fetching file tree:', error);
      throw error;
    }
  }
};
