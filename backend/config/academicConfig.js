const axios = require('axios');

const ACADEMIC_API_URL = process.env.ACADEMIC_API_URL || 'http://localhost:5001/api';

class AcademicConfig {
  static config = null;
  static initialized = false;

  static async init() {
    if (this.initialized) return;
    try {
      this.config = await this.getConfig();
      this.initialized = true;
      console.log('AcademicConfig initialized with:', {
        subjects: Object.keys(this.config.subjects || {}).length,
        branches: (this.config.branches || []).length
      });
    } catch (error) {
      console.error('Failed to initialize AcademicConfig:', error);
      throw error;
    }
  }

  static async getConfig() {
    try {
      if (this.config) return this.config;
      
      const response = await axios.get(`${ACADEMIC_API_URL}/academic-config`);
      this.config = response.data.data;
      return this.config;
    } catch (error) {
      console.error('Failed to fetch academic config:', error);
      throw new Error('Failed to fetch academic configuration');
    }
  }

  static async validateBranch(branchId) {
    const config = await this.getConfig();
    return config.branches.find(b => b.id.toLowerCase() === branchId.toLowerCase());
  }

  static async getSubjectById(subjectId, semester) {
    try {
      const config = await this.getConfig();
      if (!config.subjects || Object.keys(config.subjects).length === 0) {
        throw new Error('No subjects available in configuration');
      }

      const semesterSubjects = config.subjects[semester];
      if (!semesterSubjects) {
        throw new Error(`No subjects found for semester ${semester}`);
      }

      const subject = semesterSubjects.find(s => 
        s.id.toLowerCase() === subjectId.toLowerCase() || 
        s.code.toLowerCase() === subjectId.toLowerCase()
      );

      if (!subject) {
        throw new Error(`Subject not found: ${subjectId}`);
      }

      return subject;
    } catch (error) {
      console.error('Error in getSubjectById:', error);
      throw error;
    }
  }
}

// Initialize on module load
AcademicConfig.init().catch(console.error);

module.exports = AcademicConfig;