import { Menu, X, BookOpen, Bot, Download, ChevronDown, BookMarked, Search, LogOut, Gauge, Plus, Edit2, Trash2, Link, File, Youtube, Code, Layout, Image, User, Settings, HelpCircle, Bell } from "lucide-react";

// Resource types configuration
const resourceTypes = [
  { id: "bookmark", label: "Bookmark", icon: Link },
  { id: "note", label: "Note", icon: File },
  { id: "video", label: "YouTube Video", icon: Youtube },
  { id: "code", label: "Code Block", icon: Code },
  { id: "project", label: "Project", icon: Layout },
  { id: "media", label: "Media", icon: Image },
  { id: "file", label: "File", icon: File },
];

// Study material configuration
const MATERIAL_TYPES = [
  "Class Notes",
  "Lecture PPTs",
  "Previous Year Questions",
  "Practical Reports",
  "Reference Books",
  "Assignment Solutions",
  "Study Guides",
  "Video Lectures"
];


// Helper functions for frontend
const getSubjectsForSemester = async (semester) => {
  const response = await AcademicService.getSubjectsForSemester(semester);
  return response.data;
};

const getSubjectsForBranch = async (branch, semester) => {
  const response = await AcademicService.getSubjectsForBranch(branch, semester);
  return response.data;
};

// File upload configuration
const fileConfig = {
  maxFileSize: 50 * 1024 * 1024, // 50MB
  allowedFileTypes: [
    { type: 'application/pdf', extension: '.pdf' },
    { type: 'application/msword', extension: '.doc' },
    { type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', extension: '.docx' },
    { type: 'application/vnd.ms-powerpoint', extension: '.ppt' },
    { type: 'application/vnd.openxmlformats-officedocument.presentationml.presentation', extension: '.pptx' }
  ],
  uploadPath: '/materials'
};

// Validation rules
const validationRules = {
  requiredFields: ['branch', 'semester', 'subject', 'category'],
  fileNameMaxLength: 100,
  maxFilesPerUpload: 10
};

// Material display configuration
const displayConfig = {
  itemsPerPage: 10,
  sortOptions: [
    { id: 'date', label: 'Upload Date' },
    { id: 'name', label: 'File Name' },
    { id: 'size', label: 'File Size' }
  ],
  defaultSort: 'date'
};

export {
  resourceTypes,
  MATERIAL_TYPES,
  fileConfig,
  validationRules,
  displayConfig,
  getSubjectsForSemester,
  getSubjectsForBranch
};