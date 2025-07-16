import { useState, useEffect } from "react";
import { 
  BookOpen,
  Search, 
  Download,
  Eye,
  ChevronDown,
  GraduationCap,
  Calendar,
  FileText,
  Loader
} from "lucide-react";
import { branches, semesters, materialTypes } from "../../constants";
import { useTheme } from "../../contexts/useTheme";
import DashboardHeader from "../../components/DashboardHeader/DashboardHeader";
import DateHeader from "../../components/DateHeader/DateHeader";
import { materialService } from "../../services/materialServices";

const Materials = () => {
  const { isDark } = useTheme();
  const [selectedBranch, setSelectedBranch] = useState('');
  const [selectedSemester, setSelectedSemester] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [materials, setMaterials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [downloading, setDownloading] = useState({});
  const [error, setError] = useState(null);

  // Fetch materials from API
  useEffect(() => {
    fetchMaterials();
  }, [selectedBranch, selectedSemester, selectedType]);

  const fetchMaterials = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const filters = {};
      if (selectedBranch) filters.branch = selectedBranch;
      if (selectedSemester) filters.semester = selectedSemester;
      if (selectedType) filters.category = selectedType;

      const response = await materialService.getAllFiles(filters);
      
      // Transform API response to match the expected format
      const transformedMaterials = response.files?.map(file => ({
        id: file.id,
        title: file.name.replace(/\.[^/.]+$/, ""), // Remove file extension
        subject: extractSubjectFromPath(file.name) || "General",
        type: selectedType || extractTypeFromPath(file.name) || "Class Notes",
        branch: selectedBranch || extractBranchFromPath(file.name) || "CSE",
        semester: parseInt(selectedSemester) || extractSemesterFromPath(file.name) || 1,
        fileSize: formatFileSize(file.size),
        downloadCount: Math.floor(Math.random() * 300) + 50, // Mock download count
        uploadDate: file.createdTime ? new Date(file.createdTime).toISOString().split('T')[0] : new Date().toISOString().split('T')[0],
        downloadUrl: file.downloadUrl,
        viewUrl: file.webViewLink,
        mimeType: file.mimeType
      })) || [];

      setMaterials(transformedMaterials);
    } catch (error) {
      console.error('Failed to fetch materials:', error);
      setError('Failed to load materials. Please try again.');
      setMaterials([]);
    } finally {
      setLoading(false);
    }
  };

  // Helper functions to extract information from file names/paths
  const extractSubjectFromPath = (fileName) => {
    // Try to extract subject from file name
    const subjects = ['Mathematics', 'Physics', 'Chemistry', 'Computer Science', 'Electronics', 'Mechanical'];
    return subjects.find(subject => fileName.toLowerCase().includes(subject.toLowerCase())) || null;
  };

  const extractTypeFromPath = (fileName) => {
    const types = {
      'notes': 'Class Notes',
      'ppt': 'Lecture PPTs',
      'slides': 'Lecture PPTs',
      'previous': 'Previous Year Questions',
      'pyq': 'Previous Year Questions',
      'lab': 'Practical Reports',
      'practical': 'Practical Reports',
      'proficiency': 'Proficiency Papers',
      'syllabus': 'Syllabus'
    };
    
    for (const [key, value] of Object.entries(types)) {
      if (fileName.toLowerCase().includes(key)) {
        return value;
      }
    }
    return null;
  };

  const extractBranchFromPath = (fileName) => {
    const branchMap = { 
      'cse': 'CSE', 
      'computer': 'CSE',
      'ece': 'ece', 
      'electronics': 'ece',
      'me': 'me', 
      'mechanical': 'me',
      'ee': 'ee', 
      'electrical': 'ee',
      'it': 'it',
      'information': 'it',
    'materials': 'mme',
    };
    for (const [key, value] of Object.entries(branchMap)) {
      if (fileName.toLowerCase().includes(key)) {
        return value;
      }
    }
    return null;
  };

  const extractSemesterFromPath = (fileName) => {
    const match = fileName.match(/semester?\s*(\d+)|sem\s*(\d+)|(\d+)\s*sem/i);
    return match ? parseInt(match[1] || match[2] || match[3]) : null;
  };

  const formatFileSize = (bytes) => {
    if (!bytes) return "Unknown size";
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(1024));
    return Math.round(bytes / Math.pow(1024, i) * 100) / 100 + ' ' + sizes[i];
  };

  const handleDownload = async (material) => {
    try {
      setDownloading(prev => ({ ...prev, [material.id]: true }));
      await materialService.downloadFile(material.id, material.title);
    } catch (error) {
      console.error('Download failed:', error);
      alert('Failed to download file. Please try again.');
    } finally {
      setDownloading(prev => ({ ...prev, [material.id]: false }));
    }
  };

  const handlePreview = async (material) => {
    try {
      if (material.viewUrl) {
        window.open(material.viewUrl, '_blank');
      } else {
        const previewUrl = await materialService.getFilePreview(material.id);
        if (previewUrl) {
          window.open(previewUrl, '_blank');
        } else {
          alert('Preview not available for this file type.');
        }
      }
    } catch (error) {
      console.error('Preview failed:', error);
      alert('Failed to open file preview.');
    }
  };

  // Filter materials based on search term and filters
  const filteredMaterials = materials.filter(material => {
    const matchesSearch = !searchTerm || 
      material.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      material.subject.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesBranch = !selectedBranch || material.branch === selectedBranch;
    const matchesSemester = !selectedSemester || material.semester === parseInt(selectedSemester);
    const matchesType = !selectedType || material.type === selectedType;
    
    return matchesSearch && matchesBranch && matchesSemester && matchesType;
  });
  const getTypeColor = (type) => {
    const lightColors = {
      "Class Notes": "bg-blue-100 text-blue-700",
      "Lecture PPTs": "bg-green-100 text-green-700",
      "Previous Year Questions": "bg-purple-100 text-purple-700",
      "Practical Reports": "bg-orange-100 text-orange-700",
      "Proficiency Papers": "bg-red-100 text-red-700",
      "Syllabus": "bg-indigo-100 text-indigo-700"
    };
    const darkColors = {
      "Class Notes": "bg-blue-900/30 text-blue-400",
      "Lecture PPTs": "bg-green-900/30 text-green-400",
      "Previous Year Questions": "bg-purple-900/30 text-purple-400",
      "Practical Reports": "bg-orange-900/30 text-orange-400",
      "Proficiency Papers": "bg-red-900/30 text-red-400",
      "Syllabus": "bg-indigo-900/30 text-indigo-400"
    };
    const colorMap = isDark ? darkColors : lightColors;
    return colorMap[type] || (isDark ? "bg-gray-700/30 text-gray-400" : "bg-gray-100 text-gray-700");
  };
  const getBranchColor = (branch) => {
    const lightColors = {
      "CSE": "bg-blue-50 text-blue-600 border-blue-200",
      "ece": "bg-green-50 text-green-600 border-green-200",
      "me": "bg-orange-50 text-orange-600 border-orange-200",
      "ee": "bg-yellow-50 text-yellow-600 border-yellow-200",
      "it": "bg-purple-50 text-purple-600 border-purple-200"
    };
    const darkColors = {
      "CSE": "bg-blue-900/30 text-blue-400 border-blue-700/50",
      "ece": "bg-green-900/30 text-green-400 border-green-700/50",
      "me": "bg-orange-900/30 text-orange-400 border-orange-700/50",
      "ee": "bg-yellow-900/30 text-yellow-400 border-yellow-700/50",
      "it": "bg-purple-900/30 text-purple-400 border-purple-700/50"
    };
    const colorMap = isDark ? darkColors : lightColors;
    return colorMap[branch] || (isDark ? "bg-gray-700/30 text-gray-400 border-gray-700/50" : "bg-gray-50 text-gray-600 border-gray-200");
  };  return (
    <div className={`flex-1 flex flex-col overflow-hidden relative ${isDark ? 'bg-gray-900' : 'bg-gray-50'}`}>      {/* Enhanced Seamless Header - Responsive */}
      <div className={`flex-shrink-0 relative px-4 sm:px-6 py-5 sm:py-6 ${isDark ? 'bg-gray-800/90' : 'bg-white/90'} backdrop-blur-xl border-b ${isDark ? 'border-gray-700/50' : 'border-gray-100/50'} z-10`}>
        <div className={`absolute inset-0 ${isDark ? 'bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-indigo-500/10' : 'bg-gradient-to-r from-blue-500/5 via-purple-500/5 to-indigo-500/5'}`}></div>
        <div className="relative flex items-center justify-between">
          <DashboardHeader userName="Student" selectedRole="materials" />
          <div className="flex items-center space-x-2 sm:space-x-3">
            <div className={`flex items-center space-x-2 text-xs sm:text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'} px-3 py-2 rounded-lg ${isDark ? 'bg-gray-700/30' : 'bg-gray-100/30'} backdrop-blur-xl`}>
              <FileText className="w-4 h-4" />
              <span className="hidden sm:inline">{filteredMaterials.length} materials</span>
              <span className="sm:hidden">{filteredMaterials.length}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Date Header - Sticky */}
      <DateHeader />

      {/* Scrollable Content Area */}
      <div className="flex-1 overflow-y-auto pb-20 lg:pb-6">
        {/* Filters */}
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
        {error ? (
          <div className="text-center py-8 sm:py-12">
            <BookOpen className={`w-12 h-12 sm:w-16 sm:h-16 ${isDark ? 'text-red-500' : 'text-red-400'} mx-auto mb-4`} />
            <h3 className={`text-base sm:text-lg font-medium ${isDark ? 'text-white' : 'text-gray-900'} mb-2`}>Error Loading Materials</h3>
            <p className={`text-sm sm:text-base ${isDark ? 'text-gray-400' : 'text-gray-500'} mb-6`}>
              {error}
            </p>
            <button
              onClick={fetchMaterials}
              className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors"
            >
              Try Again
            </button>
          </div>
        ) : loading ? (
          <div className="text-center py-8 sm:py-12">
            <Loader className={`w-12 h-12 sm:w-16 sm:h-16 ${isDark ? 'text-gray-400' : 'text-gray-300'} mx-auto mb-4 animate-spin`} />
            <h3 className={`text-base sm:text-lg font-medium ${isDark ? 'text-white' : 'text-gray-900'} mb-2`}>Loading Materials</h3>
            <p className={`text-sm sm:text-base ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
              Please wait while we fetch your study materials...
            </p>
          </div>
        ) : filteredMaterials.length === 0 ? (
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
                </div>

                {/* Content */}
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
                  <button 
                    onClick={() => handleDownload(material)}
                    disabled={downloading[material.id]}
                    className="flex-1 flex items-center justify-center space-x-2 px-3 sm:px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-200 text-xs sm:text-sm shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {downloading[material.id] ? (
                      <Loader className="w-3 h-3 sm:w-4 sm:h-4 animate-spin" />
                    ) : (
                      <Download className="w-3 h-3 sm:w-4 sm:h-4" />
                    )}
                    <span>{downloading[material.id] ? 'Downloading...' : 'Download'}</span>
                  </button>
                  <button 
                    onClick={() => handlePreview(material)}
                    className={`flex items-center justify-center px-2 sm:px-3 py-2 border ${isDark 
                      ? 'border-gray-600/50 text-gray-400 hover:bg-gray-700/50' 
                      : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                    } rounded-lg transition-all duration-200 backdrop-blur-xl`}
                  >
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
            Showing {filteredMaterials.length} of {materials.length} materials
          </span>
          <span>
            Last updated: {new Date().toLocaleDateString()}
          </span>
        </div>
      </div>
      </div>
    </div>
  );
};

export default Materials;
