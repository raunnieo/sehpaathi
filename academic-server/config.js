// Subject Areas
const subjectAreas = [
  { id: 'mathematics', name: 'Mathematics' },
  { id: 'physics', name: 'Physics & Chemistry' },
  { id: 'computer_science', name: 'Computer Science' },
  { id: 'electronics', name: 'Electronics' },
  { id: 'engineering', name: 'Engineering Sciences' },
  { id: 'humanities', name: 'Humanities and Social Sciences' },
  { id: 'mechanical', name: 'Mechanical Engineering' },
  { id: 'materials', name: 'Materials Science' }
];

// Branches
const branches = [
  { id: "cs", name: "Computer Science and Engineering", code: "CS" },
  { id: "ee", name: "Electrical Engineering", code: "EE" },
  { id: "me", name: "Mechanical Engineering", code: "ME" },
  { id: "ce", name: "Civil Engineering", code: "CE" },
  { id: "mt", name: "Materials Science and Engineering", code: "MT" },
  { id: "ae", name: "Aerospace Engineering", code: "AE" },
  { id: "ep", name: "Engineering Physics", code: "EP" }
];

// Comprehensive Course Curriculum
const subjects = {
  1: [
      {
          id: 'ma101',
          code: 'MA101',
          name: 'Calculus and Linear Algebra',
          area: 'mathematics',
          offeredTo: ['cs', 'ee', 'me', 'ce', 'mt', 'ae', 'ep']
      },
      {
          id: 'ph101',
          code: 'PH101',
          name: 'Introduction to Physics',
          area: 'physics',
          offeredTo: ['cs', 'ee', 'me', 'ce', 'mt', 'ae', 'ep']
      },
      {
          id: 'cs101',
          code: 'CS101',
          name: 'Programming and Data Structures',
          area: 'computer_science',
          offeredTo: ['cs', 'ee', 'mt', 'ae', 'ep']
      },
      {
          id: 'hss101',
          code: 'HSS101',
          name: 'Technical Communication',
          area: 'humanities',
          offeredTo: ['cs', 'ee', 'me', 'ce', 'mt', 'ae', 'ep']
      }
  ],
  2: [
      {
          id: 'ma102',
          code: 'MA102',
          name: 'Differential Equations and Numerical Methods',
          area: 'mathematics',
          offeredTo: ['cs', 'ee', 'me', 'ce', 'mt', 'ae', 'ep']
      },
      {
          id: 'ch101',
          code: 'CH101',
          name: 'Chemistry for Engineers',
          area: 'physics',
          offeredTo: ['cs', 'ee', 'me', 'ce', 'mt', 'ae', 'ep']
      },
      {
          id: 'ee101',
          code: 'EE101',
          name: 'Basic Electrical Engineering',
          area: 'electronics',
          offeredTo: ['me', 'ce', 'cs', 'mt']
      },
      {
          id: 'me101',
          code: 'ME101',
          name: 'Engineering Mechanics',
          area: 'mechanical',
          offeredTo: ['me', 'ce', 'ae']
      }
  ],
  3: [
      {
          id: 'ma201',
          code: 'MA201',
          name: 'Probability and Statistics',
          area: 'mathematics',
          offeredTo: ['cs', 'ee', 'me', 'ce', 'mt', 'ae', 'ep']
      },
      {
          id: 'cs201',
          code: 'CS201',
          name: 'Algorithms and Data Structures',
          area: 'computer_science',
          offeredTo: ['cs', 'ae', 'ep', 'mt']
      },
      {
          id: 'ee201',
          code: 'EE201',
          name: 'Electronic Circuits',
          area: 'electronics',
          offeredTo: ['ee', 'cs', 'ep']
      },
      {
          id: 'me201',
          code: 'ME201',
          name: 'Thermodynamics',
          area: 'mechanical',
          offeredTo: ['me', 'ae', 'ce']
      }
  ],
  4: [
      {
          id: 'cs202',
          code: 'CS202',
          name: 'Database Management Systems',
          area: 'computer_science',
          offeredTo: ['cs', 'mt']
      },
      {
          id: 'ee202',
          code: 'EE202',
          name: 'Signals and Systems',
          area: 'electronics',
          offeredTo: ['ee', 'cs', 'ep']
      },
      {
          id: 'me202',
          code: 'ME202',
          name: 'Machine Design',
          area: 'mechanical',
          offeredTo: ['me', 'ae']
      },
      {
          id: 'mt201',
          code: 'MT201',
          name: 'Materials Characterization',
          area: 'materials',
          offeredTo: ['mt', 'me', 'ae']
      }
  ],
  5: [
      {
          id: 'cs301',
          code: 'CS301',
          name: 'Operating Systems',
          area: 'computer_science',
          offeredTo: ['cs', 'ep']
      },
      {
          id: 'ee301',
          code: 'EE301',
          name: 'Digital Signal Processing',
          area: 'electronics',
          offeredTo: ['ee', 'cs', 'ep']
      },
      {
          id: 'me301',
          code: 'ME301',
          name: 'Fluid Mechanics',
          area: 'mechanical',
          offeredTo: ['me', 'ae', 'ce']
      },
      {
          id: 'mt301',
          code: 'MT301',
          name: 'Advanced Materials Processing',
          area: 'materials',
          offeredTo: ['mt', 'me']
      }
  ],
  6: [
      {
          id: 'cs302',
          code: 'CS302',
          name: 'Computer Networks',
          area: 'computer_science',
          offeredTo: ['cs', 'ep']
      },
      {
          id: 'ee302',
          code: 'EE302',
          name: 'Control Systems',
          area: 'electronics',
          offeredTo: ['ee', 'ae', 'me']
      },
      {
          id: 'me302',
          code: 'ME302',
          name: 'Heat Transfer',
          area: 'mechanical',
          offeredTo: ['me', 'ae']
      },
      {
          id: 'mt302',
          code: 'MT302',
          name: 'Computational Materials Science',
          area: 'materials',
          offeredTo: ['mt', 'cs']
      }
  ],
  7: [
      {
          id: 'cs401',
          code: 'CS401',
          name: 'Machine Learning',
          area: 'computer_science',
          offeredTo: ['cs', 'ep', 'mt']
      },
      {
          id: 'ee401',
          code: 'EE401',
          name: 'Communication Systems',
          area: 'electronics',
          offeredTo: ['ee', 'cs']
      },
      {
          id: 'me401',
          code: 'ME401',
          name: 'Design of Thermal Systems',
          area: 'mechanical',
          offeredTo: ['me', 'ae']
      },
      {
          id: 'hss401',
          code: 'HSS401',
          name: 'Technology and Society',
          area: 'humanities',
          offeredTo: ['cs', 'ee', 'me', 'ce', 'mt', 'ae', 'ep']
      }
  ],
  8: [
      {
          id: 'cs402',
          code: 'CS402',
          name: 'Cloud Computing and Distributed Systems',
          area: 'computer_science',
          offeredTo: ['cs', 'ep']
      },
      {
          id: 'ee402',
          code: 'EE402',
          name: 'Advanced Digital Systems Design',
          area: 'electronics',
          offeredTo: ['ee', 'cs']
      },
      {
          id: 'me402',
          code: 'ME402',
          name: 'Robotics and Automation',
          area: 'mechanical',
          offeredTo: ['me', 'ae', 'cs']
      },
      {
          id: 'mt402',
          code: 'MT402',
          name: 'Nanomaterials and Nanotechnology',
          area: 'materials',
          offeredTo: ['mt', 'ee', 'cs']
      }
  ]
};

module.exports = {
  subjectAreas,
  branches,
  subjects
};