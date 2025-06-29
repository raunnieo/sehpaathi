import { useState } from "react";
import { 
  BookOpen, 
  Search, 
  Download,
  Eye,
  ChevronDown,
  GraduationCap,
  Calendar,
  FileText
} from "lucide-react";
import { branches, semesters, materialTypes } from "../../constants";
import { useTheme } from "../../contexts/useTheme";

const Materials = () => {
  const { isDark } = useTheme();
  const [selectedBranch, setSelectedBranch] = useState('');
  const [selectedSemester, setSelectedSemester] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  // Mock materials data - replace with actual API call
  const mockMaterials = [
    {
      id: 1,
      title: "Data Structures and Algorithms - Complete Notes",
      subject: "Computer Science",
      type: "Class Notes",
      branch: "CSE",
      semester: 3,
      fileSize: "2.4 MB",
      downloadCount: 156,
      uploadDate: "2024-01-15"
    },
    {
      id: 2,
      title: "Linear Algebra - Lecture Slides",
      subject: "Mathematics",
      type: "Lecture PPTs",
      branch: "CSE",
      semester: 2,
      fileSize: "5.2 MB",
      downloadCount: 89,
      uploadDate: "2024-01-10"
    },
    {
      id: 3,
      title: "Digital Electronics - Previous Year Questions",
      subject: "Electronics",
      type: "Previous Year Questions",
      branch: "ECE",
      semester: 4,
      fileSize: "1.8 MB",
      downloadCount: 203,
      uploadDate: "2024-01-08"
    },
    {
      id: 4,
      title: "Object Oriented Programming Lab Manual",
      subject: "Computer Science",
      type: "Practical Reports",
      branch: "CSE",
      semester: 3,
      fileSize: "3.1 MB",
      downloadCount: 124,
      uploadDate: "2024-01-05"
    },
    {
      id: 5,
      title: "Engineering Physics - Proficiency Papers",
      subject: "Physics",
      type: "Proficiency Papers",
      branch: "ME",
      semester: 1,
      fileSize: "2.8 MB",
      downloadCount: 67,
      uploadDate: "2024-01-03"
    }
  ];

  const filteredMaterials = mockMaterials.filter(material => {
    return (
      (!selectedBranch || material.branch === selectedBranch) &&
      (!selectedSemester || material.semester === parseInt(selectedSemester)) &&
      (!selectedType || material.type === selectedType) &&
      (!searchTerm || 
        material.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        material.subject.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  });
  const getTypeColor = (type) => {
    const lightColors = {
      "Class Notes": "bg-blue-100 text-blue-700",
      "Lecture PPTs": "bg-green-100 text-green-700",
      "Previous Year Questions": "bg-purple-100 text-purple-700",
      "Practical Reports": "bg-orange-100 text-orange-700",
      "Proficiency Papers": "bg-red-100 text-red-700"
    };
    const darkColors = {
      "Class Notes": "bg-blue-900/30 text-blue-400",
      "Lecture PPTs": "bg-green-900/30 text-green-400",
      "Previous Year Questions": "bg-purple-900/30 text-purple-400",
      "Practical Reports": "bg-orange-900/30 text-orange-400",
      "Proficiency Papers": "bg-red-900/30 text-red-400"
    };
    const colorMap = isDark ? darkColors : lightColors;
    return colorMap[type] || (isDark ? "bg-gray-700/30 text-gray-400" : "bg-gray-100 text-gray-700");
  };
  const getBranchColor = (branch) => {
    const lightColors = {
      "CSE": "bg-blue-50 text-blue-600 border-blue-200",
      "ECE": "bg-green-50 text-green-600 border-green-200",
      "ME": "bg-orange-50 text-orange-600 border-orange-200",
      "EE": "bg-yellow-50 text-yellow-600 border-yellow-200",
      "IT": "bg-purple-50 text-purple-600 border-purple-200"
    };
    const darkColors = {
      "CSE": "bg-blue-900/30 text-blue-400 border-blue-700/50",
      "ECE": "bg-green-900/30 text-green-400 border-green-700/50",
      "ME": "bg-orange-900/30 text-orange-400 border-orange-700/50",
      "EE": "bg-yellow-900/30 text-yellow-400 border-yellow-700/50",
      "IT": "bg-purple-900/30 text-purple-400 border-purple-700/50"
    };
    const colorMap = isDark ? darkColors : lightColors;
    return colorMap[branch] || (isDark ? "bg-gray-700/30 text-gray-400 border-gray-700/50" : "bg-gray-50 text-gray-600 border-gray-200");
  };  return (
    <div className={`flex-1 flex flex-col h-full ${isDark ? 'bg-gray-900' : 'bg-gray-50'} pb-16 lg:pb-0`}>
      {/* Header */}
      <div className={`${isDark ? 'bg-gray-800/70' : 'bg-white/70'} backdrop-blur-xl border-b ${isDark ? 'border-gray-700/50' : 'border-gray-200/50'} px-4 sm:px-6 py-4`}>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div className="mb-2 sm:mb-0">
            <h1 className={`text-xl sm:text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>Study Materials</h1>
            <p className={`text-sm sm:text-base ${isDark ? 'text-gray-300' : 'text-gray-600'} mt-1`}>Access course materials, notes, and resources</p>
          </div>
          <div className={`flex items-center space-x-2 text-xs sm:text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
            <FileText className="w-4 h-4" />
            <span>{filteredMaterials.length} materials available</span>
          </div>
        </div>
      </div>      {/* Filters */}
      <div className={`${isDark ? 'bg-gray-800/50' : 'bg-white/50'} backdrop-blur-xl border-b ${isDark ? 'border-gray-700/50' : 'border-gray-200/50'} px-4 sm:px-6 py-4`}>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 sm:gap-4">
          {/* Search */}
          <div className="sm:col-span-2 lg:col-span-2 relative">
            <Search className={`absolute left-3 top-1/2 transform -translate-y-1/2 ${isDark ? 'text-gray-400' : 'text-gray-400'} w-4 h-4 sm:w-5 sm:h-5`} />
            <input
              type="text"
              placeholder="Search materials..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={`w-full pl-9 sm:pl-10 pr-4 py-2 text-sm sm:text-base border ${isDark 
                ? 'border-gray-600/50 bg-gray-700/50 text-white placeholder-gray-400' 
                : 'border-gray-300 bg-white/70 text-gray-900 placeholder-gray-500'
              } rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent backdrop-blur-xl`}
            />
          </div>          {/* Branch Filter */}
          <div className="relative">
            <select
              value={selectedBranch}
              onChange={(e) => setSelectedBranch(e.target.value)}
              className={`w-full appearance-none border ${isDark 
                ? 'border-gray-600/50 bg-gray-700/50 text-white' 
                : 'border-gray-300 bg-white/70 text-gray-900'
              } rounded-lg px-3 py-2 pr-8 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent backdrop-blur-xl`}
            >
              <option value="">All Branches</option>
              {branches.map((branch) => (
                <option key={branch.id} value={branch.id}>
                  {branch.name}
                </option>
              ))}
            </select>
            <ChevronDown className={`absolute right-2 top-1/2 transform -translate-y-1/2 ${isDark ? 'text-gray-400' : 'text-gray-400'} w-4 h-4 pointer-events-none`} />
          </div>

          {/* Semester Filter */}
          <div className="relative">
            <select
              value={selectedSemester}
              onChange={(e) => setSelectedSemester(e.target.value)}
              className={`w-full appearance-none border ${isDark 
                ? 'border-gray-600/50 bg-gray-700/50 text-white' 
                : 'border-gray-300 bg-white/70 text-gray-900'
              } rounded-lg px-3 py-2 pr-8 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent backdrop-blur-xl`}
            >
              <option value="">All Semesters</option>
              {semesters.map((semester) => (
                <option key={semester.id} value={semester.id}>
                  {semester.name}
                </option>
              ))}
            </select>
            <ChevronDown className={`absolute right-2 top-1/2 transform -translate-y-1/2 ${isDark ? 'text-gray-400' : 'text-gray-400'} w-4 h-4 pointer-events-none`} />
          </div>

          {/* Type Filter */}
          <div className="relative">
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className={`w-full appearance-none border ${isDark 
                ? 'border-gray-600/50 bg-gray-700/50 text-white' 
                : 'border-gray-300 bg-white/70 text-gray-900'
              } rounded-lg px-3 py-2 pr-8 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent backdrop-blur-xl`}
            >
              <option value="">All Types</option>
              {materialTypes.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
            <ChevronDown className={`absolute right-2 top-1/2 transform -translate-y-1/2 ${isDark ? 'text-gray-400' : 'text-gray-400'} w-4 h-4 pointer-events-none`} />
          </div>
        </div>
      </div>      {/* Materials List */}
      <div className="flex-1 overflow-auto p-4 sm:p-6">
        {filteredMaterials.length === 0 ? (
          <div className="text-center py-8 sm:py-12">
            <BookOpen className={`w-12 h-12 sm:w-16 sm:h-16 ${isDark ? 'text-gray-600' : 'text-gray-300'} mx-auto mb-4`} />
            <h3 className={`text-base sm:text-lg font-medium ${isDark ? 'text-white' : 'text-gray-900'} mb-2`}>No materials found</h3>
            <p className={`text-sm sm:text-base ${isDark ? 'text-gray-400' : 'text-gray-500'} mb-6`}>
              Try adjusting your search criteria or filters to find materials.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6">
            {filteredMaterials.map((material) => (
              <div
                key={material.id}
                className={`${isDark 
                  ? 'bg-gray-800/40 border-gray-700/50' 
                  : 'bg-white/70 border-gray-200/50'
                } backdrop-blur-xl rounded-lg border p-4 sm:p-6 hover:shadow-lg transition-all duration-200 hover:scale-[1.02]`}
              >
                {/* Header */}
                <div className="flex items-start justify-between mb-3 sm:mb-4">
                  <div className="flex items-center space-x-2 sm:space-x-3">
                    <div className={`p-2 ${isDark ? 'bg-blue-900/40' : 'bg-blue-100'} rounded-lg`}>
                      <BookOpen className={`w-4 h-4 sm:w-5 sm:h-5 ${isDark ? 'text-blue-400' : 'text-blue-600'}`} />
                    </div>
                    <div>
                      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${getBranchColor(material.branch)}`}>
                        {material.branch}
                      </span>
                    </div>
                  </div>
                  <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getTypeColor(material.type)}`}>
                    {material.type}
                  </span>
                </div>                {/* Content */}
                <div className="mb-3 sm:mb-4">
                  <h3 className={`font-semibold ${isDark ? 'text-white' : 'text-gray-900'} mb-2 text-sm sm:text-base line-clamp-2`}>
                    {material.title}
                  </h3>
                  <div className={`flex flex-col sm:flex-row sm:items-center sm:space-x-4 space-y-1 sm:space-y-0 text-xs sm:text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                    <div className="flex items-center space-x-1">
                      <GraduationCap className="w-3 h-3 sm:w-4 sm:h-4" />
                      <span>Semester {material.semester}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Calendar className="w-3 h-3 sm:w-4 sm:h-4" />
                      <span>{new Date(material.uploadDate).toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>

                {/* Stats */}
                <div className={`flex items-center justify-between text-xs sm:text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'} mb-3 sm:mb-4`}>
                  <span>{material.fileSize}</span>
                  <span>{material.downloadCount} downloads</span>
                </div>

                {/* Actions */}
                <div className="flex space-x-2">
                  <button className="flex-1 flex items-center justify-center space-x-2 px-3 sm:px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-200 text-xs sm:text-sm shadow-lg hover:shadow-xl">
                    <Download className="w-3 h-3 sm:w-4 sm:h-4" />
                    <span>Download</span>
                  </button>
                  <button className={`flex items-center justify-center px-2 sm:px-3 py-2 border ${isDark 
                    ? 'border-gray-600/50 text-gray-400 hover:bg-gray-700/50' 
                    : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                  } rounded-lg transition-all duration-200 backdrop-blur-xl`}>
                    <Eye className="w-3 h-3 sm:w-4 sm:h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>      {/* Footer Info */}
      <div className={`${isDark ? 'bg-gray-800/50' : 'bg-white/50'} backdrop-blur-xl border-t ${isDark ? 'border-gray-700/50' : 'border-gray-200/50'} px-4 sm:px-6 py-3`}>
        <div className={`flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-1 sm:space-y-0 text-xs sm:text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
          <span>
            Showing {filteredMaterials.length} of {mockMaterials.length} materials
          </span>
          <span>
            Last updated: {new Date().toLocaleDateString()}
          </span>
        </div>
      </div>
    </div>
  );
};

export default Materials;
