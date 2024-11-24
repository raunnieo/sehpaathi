import { apiManager } from '../api/apiManager';
import { ENDPOINTS } from '../api/endpoints';

const defaultConfig = {
  branches: [
    { id: "mme", name: "Macvsdfterials", code: "MME" },
    { id: "cse", name: "Computer Science Engineering", code: "CSE" },
    { id: "it", name: "Information Technology", code: "IT" },
    { id: "ece", name: "Electronics & Communication", code: "ECE" },
    { id: "ee", name: "Electrical Engineering", code: "EE" },
    { id: "me", name: "Mechanical Engineering", code: "ME" }
  ],
  subjectAreas: [
    { id: "mathematics", name: "Mathematics" },
    { id: "physics", name: "Physics & Chemistry" },
    { id: "computer_science", name: "Computer Science" },
    { id: "electronics", name: "Electronics" },
    { id: "humanities", name: "Humanities" },
    { id: "mechanical", name: "Mechanical" }
  ],
  subjects: {}
};

class AcademicService {
  static async getInitialData() {
    try {
      const response = await apiManager.getWithoutAuth(ENDPOINTS.CONFIG.ACADEMIC);
      const data = response || defaultConfig;

      return {
        success: true,
        data: {
          branches: data.branches.map(branch => ({
            id: branch.id,
            name: branch.name,
            code: branch.code
          })),
          semesters: Array.from({ length: 8 }, (_, i) => ({
            id: (i + 1).toString(),
            name: `Semester ${i + 1}`
          })),
          subjects: data.subjects,
          subjectAreas: data.subjectAreas
        }
      };
    } catch (error) {
      console.error('Failed to fetch academic data:', error);
      return {
        success: false,
        data: null,
        error: 'Failed to load academic data'
      };
    }
  }

  static filterSubjects(subjects, branchId, semester) {
    if (!subjects || !subjects[semester]) return [];

    // Group subjects by area first
    const groupedSubjects = subjects[semester]
      .filter(subject => subject.offeredTo.includes(branchId))
      .reduce((acc, subject) => {
        if (!acc[subject.area]) {
          acc[subject.area] = [];
        }
        acc[subject.area].push({
          id: subject.id,
          code: subject.code,
          name: subject.name,
          area: subject.area
        });
        return acc;
      }, {});

    return groupedSubjects;  // Return the grouped structure
  }
}

export const academicService = {
  getInitialData: AcademicService.getInitialData.bind(AcademicService),
  filterSubjects: AcademicService.filterSubjects.bind(AcademicService)
};

export default academicService;