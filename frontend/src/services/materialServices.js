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

      // Enhanced form validation
      const requiredFields = ["branch", "semester", "subject", "category"];
      const missingFields = requiredFields.filter(field => {
        const value = formData.get(field);
        return !value || value.trim() === '';
      });

      if (missingFields.length > 0) {
        throw new Error(`Please fill in all required fields: ${missingFields.join(', ')}`);
      }

      if (!formData.getAll("file").length) {
        throw new Error("No files provided for upload");
      }

      return await materialMethods.uploadFiles(formData);
    } catch (error) {
      console.error("Upload error:", error);
      alert(error.message); // Add alert here
      throw error;
    }
  },

  async listFiles(branch, semester, subject, category) {
    try {
      if (!branch || !semester || !subject || !category) {
        throw new Error('Branch, semester, subject, and category are all required');
      }
      
      const params = { branch, semester, subject, category }; // Always include category
      const response = await materialMethods.listFiles(params);
      
      // Handle both success and error cases from the backend
      if (!response?.success) {
        throw new Error(response?.error || response?.message || 'Failed to list files');
      }
      
      return {
        success: true,
        files: response.files || []
      };
    } catch (error) {
      console.error("List error:", error);
      alert(error.message); // Add alert here
      throw error;
    }
  },

  async getFileTree() {
    try {
      return await materialMethods.getFileTree();
    } catch (error) {
      console.error('Error fetching file tree:', error);
      alert(error.message); // Add alert here
      throw error;
    }
  }
};
