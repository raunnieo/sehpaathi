import { useState, useEffect } from "react";
import { useOutletContext } from "react-router-dom";
import DashboardHeader from "../../components/DashboardHeader/DashboardHeader";
import DateHeader from "../../components/DateHeader/DateHeader";
import { 
  Plus, 
  Search, 
  Filter,
  FileText, 
  Link, 
  Video, 
  Image, 
  File,
  Trash2,
  ExternalLink,
  X
} from "lucide-react";
import { collection, onSnapshot, addDoc, serverTimestamp, query, where, getDocs, deleteDoc } from "firebase/firestore";
import { db } from "../../auth/firebase";
import { useTheme } from "../../contexts/useTheme";

const Resources = () => {
  const { user } = useOutletContext();
  const { isDark } = useTheme();
  const [resources, setResources] = useState([]);
  const [filteredResources, setFilteredResources] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedType, setSelectedType] = useState("all");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [newResource, setNewResource] = useState({
    type: '',
    title: '',
    url: '',
    file: null
  });

  const API_BASE_URL = 
    import.meta.env.VITE_ENVIRONMENT === "local" 
      ? "http://localhost:3000" 
      : `${import.meta.env.VITE_BACKEND_URL}`;

  const resourceTypes = [
    { id: "all", label: "All Types", icon: File },
    { id: "note", label: "Notes", icon: FileText },
    { id: "bookmark", label: "Bookmarks", icon: Link },
    { id: "video", label: "Videos", icon: Video },
    { id: "file", label: "Files", icon: File },
    { id: "media", label: "Media", icon: Image },
  ];

  useEffect(() => {
    if (!user) return;

    const resourcesCollection = collection(db, `users/${user.uid}/resources`);
    const unsubscribe = onSnapshot(resourcesCollection, (snapshot) => {
      const resourceList = snapshot.docs.map((doc) => ({
        id: doc.id,
        docId: doc.id,
        ...doc.data(),
      }));
      setResources(resourceList);
    });

    return () => unsubscribe();
  }, [user]);

  useEffect(() => {
    let filtered = resources;

    if (searchTerm) {
      filtered = filtered.filter(resource =>
        resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        resource.type.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedType !== "all") {
      filtered = filtered.filter(resource => resource.type === selectedType);
    }

    setFilteredResources(filtered);
  }, [resources, searchTerm, selectedType]);

  const handleFileUpload = async (user, resource) => {
    setUploading(true);
    try {
      const idToken = await user.getIdToken();
      const formData = new FormData();
      formData.append('file', resource.file);

      const response = await fetch(`${API_BASE_URL}/api/files/upload`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${idToken}`,
        },
        body: formData
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Upload failed');
      }

      return await response.json();
    } catch (error) {
      console.error('Error uploading file:', error);
      throw error;
    }
  };

  const handleFetchFiles = async (user) => {
    const token = await user.getIdToken();
    try {
      const response = await fetch(`${API_BASE_URL}/api/files/list`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) {
        throw new Error('Failed to fetch files');
      }

      const data = await response.json();
      if (data.success) {
        return data.files;
      }
    } catch (error) {
      console.error('Error fetching files:', error);
      throw error;
    }
  };

  const handleAddResource = async () => {
    try {
      if (!newResource.title || !newResource.type) return;

      let resourceUrl = newResource.url;

      if (newResource.type === 'file' && newResource.file) {
        await handleFileUpload(user, newResource);
        const files = await handleFetchFiles(user);
        
        if (files && files.length > 0) {
          resourceUrl = files[0].viewUrl;
        }
      }

      const resourceData = {
        type: newResource.type,
        title: newResource.title,
        url: resourceUrl,
        id: Date.now(),
        createdBy: user.uid,
        createdAt: serverTimestamp()
      };

      const userResourcesCollection = collection(db, `users/${user.uid}/resources`);
      await addDoc(userResourcesCollection, resourceData);

      setNewResource({ type: '', title: '', url: '', file: null });
      setIsModalOpen(false);
    } catch (error) {
      console.error("Error adding resource:", error);
      alert("Failed to add resource: " + error.message);
    } finally {
      setUploading(false);
    }
  };

  const handleDeleteResource = async (resource) => {
    if (!confirm("Are you sure you want to delete this resource?")) return;

    try {
      const userResourcesCollection = collection(db, `users/${user.uid}/resources`);
      const q = query(userResourcesCollection, where("id", "==", resource.id));
      const querySnapshot = await getDocs(q);
      
      if (!querySnapshot.empty) {
        const docRef = querySnapshot.docs[0].ref;
        await deleteDoc(docRef);
      }
    } catch (error) {
      console.error("Error deleting resource:", error);
      alert("Failed to delete resource");
    }
  };

  const getIconForType = (type) => {
    const typeMap = {
      note: FileText,
      bookmark: Link,
      video: Video,
      media: Image,
      file: File
    };
    const IconComponent = typeMap[type] || File;
    return <IconComponent size={20} />;
  };
  const getColorForType = (type) => {
    const lightColors = {
      note: "text-blue-500 bg-blue-50",
      bookmark: "text-purple-500 bg-purple-50",
      video: "text-red-500 bg-red-50",
      media: "text-green-500 bg-green-50",
      file: "text-gray-500 bg-gray-50"
    };
    const darkColors = {
      note: "text-blue-400 bg-blue-900/30",
      bookmark: "text-purple-400 bg-purple-900/30",
      video: "text-red-400 bg-red-900/30",
      media: "text-green-400 bg-green-900/30",
      file: "text-gray-400 bg-gray-700/30"
    };
    const colorMap = isDark ? darkColors : lightColors;
    return colorMap[type] || (isDark ? "text-gray-400 bg-gray-700/30" : "text-gray-500 bg-gray-50");
  };  return (
    <div className={`flex-1 flex flex-col overflow-hidden relative ${isDark ? 'bg-gray-900' : 'bg-gray-50'}`}>      {/* Enhanced Seamless Header - Responsive */}
      <div className={`flex-shrink-0 relative px-4 sm:px-6 py-5 sm:py-6 ${isDark ? 'bg-gray-800/90' : 'bg-white/90'} backdrop-blur-xl border-b ${isDark ? 'border-gray-700/50' : 'border-gray-100/50'} z-10`}>
        <div className={`absolute inset-0 ${isDark ? 'bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-indigo-500/10' : 'bg-gradient-to-r from-blue-500/5 via-purple-500/5 to-indigo-500/5'}`}></div>
        <div className="relative flex items-center justify-between">
          <DashboardHeader userName="Student" selectedRole="resources" />
          <div className="flex items-center space-x-2 sm:space-x-3">
            <button
              onClick={() => setIsModalOpen(true)}
              className={`group flex items-center space-x-1 sm:space-x-2 px-3 sm:px-4 py-2 sm:py-2.5 text-xs sm:text-sm font-semibold ${isDark 
                ? 'text-white bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700' 
                : 'text-white bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700'
              } rounded-xl transition-all duration-200 shadow-sm hover:shadow-md backdrop-blur-xl`}
            >
              <Plus className="w-4 h-4 group-hover:rotate-90 transition-transform duration-200" />
              <span className="hidden sm:inline">Add Resource</span>
              <span className="sm:hidden">Add</span>
            </button>
          </div>        </div>
      </div>
<DateHeader />
      {/* Scrollable Content Area */}
      <div className="flex-1 overflow-y-auto pb-20 lg:pb-6">
        {/* Mobile-Responsive Filters */}
        <div className={`${isDark ? 'bg-gray-800/50' : 'bg-white/50'} backdrop-blur-xl border-b ${isDark ? 'border-gray-700/50' : 'border-gray-200/50'} px-4 sm:px-6 py-3 sm:py-4`}>
        <div className="flex flex-col space-y-3 sm:flex-row sm:space-y-0 sm:space-x-4">
          {/* Search */}
          <div className="flex-1 relative">
            <Search className={`absolute left-3 top-1/2 transform -translate-y-1/2 ${isDark ? 'text-gray-400' : 'text-gray-400'} w-4 h-4 sm:w-5 sm:h-5`} />
            <input
              type="text"
              placeholder="Search resources..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={`w-full pl-9 sm:pl-10 pr-4 py-2 sm:py-2.5 border ${isDark 
                ? 'border-gray-600/50 bg-gray-700/50 text-white placeholder-gray-400' 
                : 'border-gray-300 bg-white/70 text-gray-900 placeholder-gray-500'
              } rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base backdrop-blur-xl`}
            />
          </div>

          {/* Type Filter */}
          <div className="flex items-center space-x-2">
            <Filter className={`w-4 h-4 sm:w-5 sm:h-5 ${isDark ? 'text-gray-400' : 'text-gray-400'}`} />
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className={`border ${isDark 
                ? 'border-gray-600/50 bg-gray-700/50 text-white' 
                : 'border-gray-300 bg-white/70 text-gray-900'
              } rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base w-full sm:w-auto backdrop-blur-xl`}
            >
              {resourceTypes.map((type) => (
                <option key={type.id} value={type.id}>
                  {type.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>      {/* Mobile-Responsive Resources Grid */}
      <div className="flex-1 overflow-auto p-3 sm:p-6 pb-20 lg:pb-6">
        {filteredResources.length === 0 ? (
          <div className="text-center py-8 sm:py-12">
            <File className={`w-12 h-12 sm:w-16 sm:h-16 ${isDark ? 'text-gray-600' : 'text-gray-300'} mx-auto mb-3 sm:mb-4`} />
            <h3 className={`text-base sm:text-lg font-medium ${isDark ? 'text-white' : 'text-gray-900'} mb-2`}>No resources found</h3>
            <p className={`${isDark ? 'text-gray-400' : 'text-gray-500'} mb-4 sm:mb-6 text-sm sm:text-base px-4`}>
              {resources.length === 0 
                ? "Start building your resource library by adding your first resource."
                : "Try adjusting your search or filter criteria."
              }
            </p>
            <button
              onClick={() => setIsModalOpen(true)}
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-4 py-2 rounded-lg transition-all duration-200 text-sm sm:text-base shadow-lg hover:shadow-xl"
            >
              Add Your First Resource
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4">
            {filteredResources.map((resource) => (
              <div
                key={resource.docId}
                className={`${isDark 
                  ? 'bg-gray-800/40 border-gray-700/50' 
                  : 'bg-white/70 border-gray-200/50'
                } backdrop-blur-xl rounded-lg border p-3 sm:p-4 hover:shadow-lg transition-all duration-200 hover:scale-[1.02]`}
              >
                <div className="flex items-start justify-between mb-2 sm:mb-3">
                  <div className={`p-1.5 sm:p-2 rounded-lg ${getColorForType(resource.type)}`}>
                    {getIconForType(resource.type)}
                  </div>
                  <div className="flex items-center space-x-1">
                    {resource.url && (
                      <a
                        href={resource.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`p-1 ${isDark ? 'text-gray-400 hover:text-gray-300' : 'text-gray-400 hover:text-gray-600'} transition-colors`}
                      >
                        <ExternalLink className="w-3 h-3 sm:w-4 sm:h-4" />
                      </a>
                    )}
                    <button
                      onClick={() => handleDeleteResource(resource)}
                      className={`p-1 ${isDark ? 'text-gray-400 hover:text-red-400' : 'text-gray-400 hover:text-red-500'} transition-colors`}
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
                
                <h3 className={`font-semibold ${isDark ? 'text-white' : 'text-gray-900'} mb-2 line-clamp-2`}>
                  {resource.title}
                </h3>
                
                <div className={`flex items-center justify-between text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                  <span className="capitalize">{resource.type}</span>
                  <span>
                    {resource.createdAt?.toDate?.()?.toLocaleDateString() || 'Recently'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>      {/* Add Resource Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className={`${isDark 
            ? 'bg-gray-800/90 border-gray-700/50' 
            : 'bg-white/90 border-gray-200/50'
          } backdrop-blur-xl rounded-lg max-w-md w-full p-6 border shadow-2xl`}>
            <div className="flex items-center justify-between mb-4">
              <h3 className={`text-lg font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>Add New Resource</h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className={`${isDark ? 'text-gray-400 hover:text-gray-300' : 'text-gray-400 hover:text-gray-600'} transition-colors`}
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className={`block text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'} mb-2`}>
                  Resource Type
                </label>
                <select
                  value={newResource.type}
                  onChange={(e) => setNewResource({ ...newResource, type: e.target.value })}
                  className={`w-full border ${isDark 
                    ? 'border-gray-600/50 bg-gray-700/50 text-white' 
                    : 'border-gray-300 bg-white/70 text-gray-900'
                  } rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 backdrop-blur-xl`}
                >
                  <option value="">Select type...</option>
                  {resourceTypes.slice(1).map((type) => (
                    <option key={type.id} value={type.id}>
                      {type.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className={`block text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'} mb-2`}>
                  Title
                </label>
                <input
                  type="text"
                  value={newResource.title}
                  onChange={(e) => setNewResource({ ...newResource, title: e.target.value })}
                  placeholder="Enter resource title..."
                  className={`w-full border ${isDark 
                    ? 'border-gray-600/50 bg-gray-700/50 text-white placeholder-gray-400' 
                    : 'border-gray-300 bg-white/70 text-gray-900 placeholder-gray-500'
                  } rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 backdrop-blur-xl`}
                />
              </div>

              {newResource.type === 'file' ? (
                <div>
                  <label className={`block text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'} mb-2`}>
                    Upload File
                  </label>
                  <div className={`border-2 border-dashed ${isDark ? 'border-gray-600/50 bg-gray-700/30' : 'border-gray-300 bg-gray-50/50'} rounded-lg p-4 backdrop-blur-xl`}>
                    <input
                      type="file"
                      onChange={(e) => setNewResource({ ...newResource, file: e.target.files[0] })}
                      className={`w-full ${isDark ? 'text-gray-300' : 'text-gray-700'}`}
                    />
                  </div>
                </div>
              ) : (
                <div>
                  <label className={`block text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'} mb-2`}>
                    URL
                  </label>
                  <input
                    type="url"
                    value={newResource.url}
                    onChange={(e) => setNewResource({ ...newResource, url: e.target.value })}
                    placeholder="Enter URL..."
                    className={`w-full border ${isDark 
                      ? 'border-gray-600/50 bg-gray-700/50 text-white placeholder-gray-400' 
                      : 'border-gray-300 bg-white/70 text-gray-900 placeholder-gray-500'
                    } rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 backdrop-blur-xl`}
                  />
                </div>
              )}
            </div>

            <div className="flex space-x-3 mt-6">
              <button
                onClick={() => setIsModalOpen(false)}
                className={`flex-1 px-4 py-2 ${isDark 
                  ? 'text-gray-300 border-gray-600/50 hover:bg-gray-700/50' 
                  : 'text-gray-700 border-gray-300 hover:bg-gray-50'
                } border rounded-lg transition-all duration-200 backdrop-blur-xl`}
              >
                Cancel
              </button>
              <button
                onClick={handleAddResource}
                disabled={!newResource.title || !newResource.type || uploading}
                className="flex-1 px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-lg hover:shadow-xl"
              >
                {uploading ? 'Adding...' : 'Add Resource'}
              </button>            </div>
          </div>
        </div>
      )}
      </div>
    </div>
  );
};

export default Resources;
