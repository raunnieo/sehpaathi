import React, { useState, useRef, useEffect } from 'react';
import { materialService } from "../../services/materialServices";
import { academicService } from '../../services/academicService';  // Update this line
import { 
  Download, Upload, X, FileText, Loader2, FolderOpen, Search,
  ChevronRight, ChevronDown, Folder, File, Eye, RefreshCw
} from 'lucide-react';
import { selectUserRole } from '../../features/user/userSlice';
import { useSelector } from 'react-redux';
import { MATERIAL_TYPES } from '../../constants';

const MaterialBrowser = ({
  selectedBranch,
  setSelectedBranch,
  selectedSemester,
  setSelectedSemester,
  materialTypes
}) => {
  const [dragActive, setDragActive] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [selectedSubject, setSelectedSubject] = useState('');
  const [selectedMaterialType, setSelectedMaterialType] = useState('');
  const [uploadProgress, setUploadProgress] = useState({});
  const [fileList, setFileList] = useState([]);
  const [loading, setLoading] = useState(false); // for file list loading
  const [loadingTree, setLoadingTree] = useState(false); // for directory tree loading
  const [error, setError] = useState(null);
  const [errorTree, setErrorTree] = useState(null);
  const [expandedNodes, setExpandedNodes] = useState(new Set(['root']));
  const [selectedItem, setSelectedItem] = useState(null);
  const [treeData, setTreeData] = useState(null);
  const userRole = useSelector(selectUserRole);
	const fileInputRef = useRef(null)
  const [academicConfig, setAcademicConfig] = useState(null);
  const [availableSubjects, setAvailableSubjects] = useState([]);
  const [semesters, setSemesters] = useState([]);
  const [branches, setBranches] = useState([]);
  const [academicData, setAcademicData] = useState(null);

  useEffect(() => {
    fetchTreeData();
  }, []);

  useEffect(() => {
    const loadAcademicData = async () => {
      try {
        const response = await academicService.getInitialData();
        if (response.success) {
          setAcademicData(response.data);
          setBranches(response.data.branches);
          setSemesters(response.data.semesters);
        } else {
          console.error('Failed to load academic data:', response.error);
        }
      } catch (error) {
        console.error('Error loading academic data:', error);
      }
    };
    loadAcademicData();
  }, []);

  // Update subjects when branch or semester changes
  useEffect(() => {
    if (!academicData || !selectedBranch || !selectedSemester) {
      setAvailableSubjects({});
      return;
    }

    const filteredSubjects = academicService.filterSubjects(
      academicData.subjects,
      selectedBranch,
      selectedSemester
    );

    setAvailableSubjects(filteredSubjects);
  }, [selectedBranch, selectedSemester, academicData]);

  const fetchTreeData = async () => {
    setLoadingTree(true);
    setErrorTree(null);
    try {
      const response = await materialService.getFileTree();
      if (response?.success && response?.tree) {
        setTreeData(response.tree);
      } else {
        throw new Error('Invalid tree data received');
      }
    } catch (err) {
      console.error('Error fetching file tree:', err);
      setErrorTree('Failed to load file structure. Please try again.');
    } finally {
      setLoadingTree(false);
    }
  };

  // Fixed node toggling with path validation
  const toggleNode = (nodePath) => {
    if (!nodePath) return;
    
    const newExpanded = new Set(expandedNodes);
    if (newExpanded.has(nodePath)) {
      // Remove this node and all its children
      Array.from(newExpanded).forEach(path => {
        if (path.startsWith(nodePath)) {
          newExpanded.delete(path);
        }
      });
    } else {
      newExpanded.add(nodePath);
    }
    setExpandedNodes(newExpanded);
  };

  // Handle item selection
  const handleItemSelect = (node, path) => {
    if (!node || !path) return;

    setSelectedItem({ ...node, path });
    if (node.type === 'folder') {
      toggleNode(path);
    }
  };

  // Improved file icon selection based on MIME type
  const getFileIcon = (mimeType) => {
    switch (mimeType) {
      case 'application/pdf':
        return <FileText className="w-4 h-4 mr-1 text-red-500" />;
      case 'application/vnd.openxmlformats-officedocument.presentationml.presentation':
        return <FileText className="w-4 h-4 mr-1 text-orange-500" />;
      case 'application/vnd.openxmlformats-officedocument.wordprocessingml.document':
        return <FileText className="w-4 h-4 mr-1 text-blue-500" />;
      default:
        return <File className="w-4 h-4 mr-1 text-gray-500" />;
    }
  };

  // Format date for display
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  // Render tree node with proper handling of nested files
  const renderTreeNode = (node, path = '') => {
    if (!node?.name) return null;

    const currentPath = path ? `${path}/${node.name}` : node.name;
    const isExpanded = expandedNodes.has(currentPath);
    const hasChildren = node.children && node.children.length > 0;
    const isSelected = selectedItem?.path === currentPath;

    // Handle files that might be nested in arrays
    const renderFiles = (items) => {
      if (Array.isArray(items[0])) {
        return items[0].map((file, index) => renderTreeNode(file, currentPath));
      }
      return items.map((item, index) => renderTreeNode(item, currentPath));
    };

    return (
      <div key={currentPath} className="select-none">
        <div
          className={`flex items-center p-1 hover:bg-gray-100 cursor-pointer ${
            isSelected ? 'bg-blue-100' : ''
          }`}
          onClick={() => handleItemSelect(node, currentPath)}
          style={{ paddingLeft: `${path.split('/').length * 12}px` }}
        >
          {hasChildren && node.type === 'folder' && (
            <button 
              className="mr-1 focus:outline-none"
              onClick={(e) => {
                e.stopPropagation();
                toggleNode(currentPath);
              }}
            >
              {isExpanded ? (
                <ChevronDown className="w-4 h-4" />
              ) : (
                <ChevronRight className="w-4 h-4" />
              )}
            </button>
          )}
          
          {node.type === 'folder' ? (
            <Folder className="w-4 h-4 mr-1 text-yellow-500" />
          ) : (
            getFileIcon(node.mimeType)
          )}
          
          <span className="text-sm truncate flex-1">{node.name}</span>
          
          {node.type === 'file' && (
            <div className="flex items-center space-x-2">
              <span className="text-xs text-gray-500">
                {formatDate(node.createdTime)}
              </span>
              <a
                href={node.viewUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="p-1 hover:bg-blue-100 rounded-full transition-colors"
              >
                <Eye className="w-4 h-4 text-blue-500" />
              </a>
              <a
                href={node.downloadUrl}
                onClick={(e) => e.stopPropagation()}
                className="p-1 hover:bg-blue-100 rounded-full transition-colors"
              >
                <Download className="w-4 h-4 text-blue-500" />
              </a>
            </div>
          )}
        </div>
        
        {hasChildren && isExpanded && (
          <div>
            {renderFiles(node.children)}
          </div>
        )}
      </div>
    );
  };

  const handleSearch = async () => {
    if (!selectedBranch || !selectedSemester || !selectedSubject) {
      alert('Please select Branch, Semester and Subject to search');
      return;
    }
  
    setLoading(true);
    setError(null);
    try {
      const response = await materialService.listFiles(
        selectedBranch,
        selectedSemester,
        selectedSubject,
        selectedMaterialType || undefined
      );
  
      // Handle the response
      if (!response?.success) {
        throw new Error(response?.error || 'No files found');
      }
  
      setFileList(response.files || []);
    } catch (err) {
      console.error('Error fetching files:', err);
      setError(err.message || 'Failed to load files. Please try again.');
      setFileList([]);
    } finally {
      setLoading(false);
    }
  };
  
  const handleUpload = async () => {
    if (!selectedFiles.length || !selectedBranch || !selectedSemester || 
        !selectedSubject || !selectedMaterialType) {
      alert('Please select all required fields and files');
      return;
    }
  
    setUploading(true);
    try {
      const formData = new FormData();
      formData.append('branch', selectedBranch);
      formData.append('semester', selectedSemester);
      formData.append('subject', selectedSubject);
      formData.append('category', selectedMaterialType);
  
      // Append all files to formData
      selectedFiles.forEach(fileObj => {
        formData.append('file', fileObj.file);
      });
  
      const response = await materialService.uploadFiles(formData);
  
      if (!response?.success) {
        throw new Error(response?.error || 'Upload failed');
      }
  
      setSelectedFiles([]);
      setUploadProgress({});
      alert('Files uploaded successfully!');
      
      // Refresh both the file tree and search results
      await fetchTreeData();
      await handleSearch();
    } catch (error) {
      console.error('Upload error:', error);
      alert(error.message || 'Error uploading files');
    } finally {
      setUploading(false);
    }
  };
  

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    const files = Array.from(e.dataTransfer.files || []);
    if (files.length > 0) {
      addFiles(files);
    }
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleFileInput = (e) => {
    e.preventDefault();
    const files = Array.from(e.target.files || []);
    if (files.length > 0) {
      addFiles(files);
    }
  };

  const addFiles = (files) => {
    const newFiles = files.map(file => ({
      file,
      id: Math.random().toString(36).substr(2, 9),
      name: file.name,
      size: file.size,
      progress: 0
    }));

    setSelectedFiles(prev => [...prev, ...newFiles]);
  };
const removeFile = (fileId) => {
    setSelectedFiles(prev => prev.filter(f => f.id !== fileId));
    setUploadProgress(prev => {
      const newProgress = { ...prev };
      delete newProgress[fileId];
      return newProgress;
    });
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  // // Get filtered files for material type summary
  // const getFileCountByType = (materialType) => {
  //   return Array.isArray(fileList) 
  //     ? fileList.filter(f => f.materialType === materialType).length 
  //     : 0;
  // };

  // Get subjects for current branch and semester
  const getCurrentSubjects = async () => {
    if (!selectedBranch || !selectedSemester) {
      return [];
    }
    return await AcademicService.getSubjectsForBranch(selectedBranch, parseInt(selectedSemester));
  };

  // Update the renderSubjectOptions function
  const renderSubjectOptions = () => {
    return Object.entries(availableSubjects).map(([areaId, subjects]) => {
      const area = academicData?.subjectAreas?.find(a => a.id === areaId);
      if (!area || !subjects.length) return null;

      return (
        <optgroup key={areaId} label={area.name}>
          {subjects.map(subject => (
            <option key={subject.id} value={subject.id}>
              {subject.code} - {subject.name}
            </option>
          ))}
        </optgroup>
      );
    });
  };

  // Add helper text for subject select
  const getSubjectSelectText = () => {
    if (!selectedBranch) return "Select Branch first";
    if (!selectedSemester) return "Select Semester first";
    return "Select Subject";
  };

  // Reset subject selection when branch or semester changes
  useEffect(() => {
    setSelectedSubject('');
  }, [selectedBranch, selectedSemester]);

  // Disable subject selection until branch and semester are selected
  const isSubjectSelectDisabled = !selectedBranch || !selectedSemester;

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm">
      {/* Main Content */}
      <h2 className="text-xl font-bold mb-4">Browse & Upload Study Materials</h2>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <select
          className="p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          onChange={(e) => setSelectedBranch(e.target.value)}
          value={selectedBranch || ""}
        >
          <option value="">Select Branch</option>
          {branches.map((branch) => (
            <option key={branch.id} value={branch.id}>
              {branch.name} ({branch.code})
            </option>
          ))}
        </select>

        <select
          className="p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          onChange={(e) => setSelectedSemester(e.target.value)}
          value={selectedSemester || ""}
        >
          <option value="">Select Semester</option>
          {semesters.map((sem) => (
            <option key={sem.id} value={sem.id}>
              {sem.name}
            </option>
          ))}
        </select>

        <select
          className="p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          onChange={(e) => setSelectedSubject(e.target.value)}
          value={selectedSubject || ""}
          disabled={isSubjectSelectDisabled}
        >
          <option value="">
            {isSubjectSelectDisabled 
              ? "Select Branch and Semester" 
              : "Select Subject"
            }
          </option>
          {renderSubjectOptions()}
        </select>

        <select
          className="p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          onChange={(e) => setSelectedMaterialType(e.target.value)}
          value={selectedMaterialType || ""}
        >
          <option value="">Select Material Type</option>
          {MATERIAL_TYPES.map((material, index) => (
            <option key={index} value={material}>{material}</option>
          ))}
        </select>
      </div>

      <button
        onClick={handleSearch}
        className="w-full mb-6 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-medium flex items-center justify-center"
        disabled={loading}
      >
        {loading ? (
          <>
            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
            Searching...
          </>
        ) : (
          <>
            <Search className="w-4 h-4 mr-2" />
            Find Materials
          </>
        )}
      </button>
      
      {(userRole === "instructor") && (
        <>
              <div className="mb-6">
        <div
          className={`border-2 border-dashed rounded-lg p-8 text-center ${
            dragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300'
          }`}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        >
          <input
            ref={fileInputRef}
            type="file"
            multiple
            className="hidden"
            onChange={handleFileInput}
            accept=".pdf,.doc,.docx,.ppt,.pptx"
          />
          
          <div className="flex flex-col items-center">
            <Upload className="w-8 h-8 text-gray-400 mb-2" />
            <p className="text-gray-600 mb-2">
              Drag and drop files here, or{' '}
              <button
                onClick={() => fileInputRef.current?.click()}
                className="text-blue-500 hover:text-blue-600"
              >
                browse
              </button>
            </p>
            <p className="text-sm text-gray-400">
              Supported files: PDF, DOC, DOCX, PPT, PPTX
            </p>
          </div>
        </div>
      </div>

      {selectedFiles.length > 0 && (
        <div className="mb-6">
          <h3 className="font-medium mb-2">Selected Files for Upload</h3>
          <div className="space-y-2">
            {selectedFiles.map((file) => (
              <div
                key={file.id}
                className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
              >
                <div className="flex items-center space-x-3">
                  <FileText className="w-5 h-5 text-gray-400" />
                  <div>
                    <p className="text-sm font-medium">{file.name}</p>
                    <p className="text-xs text-gray-500">{formatFileSize(file.size)}</p>
                    {uploadProgress[file.id] && (
                      <div className="w-full bg-gray-200 rounded-full h-1.5 mt-1">
                        <div 
                          className="bg-blue-500 h-1.5 rounded-full"
                          style={{ width: `${uploadProgress[file.id]}%` }}
                        />
                      </div>
                    )}
                  </div>
                </div>
                <button
                  onClick={() => removeFile(file.id)}
                  className="p-1 hover:bg-gray-200 rounded"
                  disabled={uploading}
                >
                  <X className="w-4 h-4 text-gray-500" />
                </button>
              </div>
            ))}
          </div>
          
          <button
            onClick={handleUpload}
            disabled={uploading}
            className={`mt-4 px-4 py-2 rounded-lg text-white font-medium flex items-center justify-center w-full
              ${uploading 
                ? 'bg-blue-400 cursor-not-allowed' 
                : 'bg-blue-500 hover:bg-blue-600'
              }`}
          >
            {uploading ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Uploading...
              </>
            ) : (
              <>
                <Upload className="w-4 h-4 mr-2" />
                Upload Files
              </>
            )}
          </button>
        </div>
      )}
        </>
      )}

      {/* File List Section */}
      <div className="mb-6">
        <h3 className="font-medium mb-4">Available Files</h3>
        
        {loading ? (
          <div className="flex items-center justify-center p-8">
            <Loader2 className="w-6 h-6 animate-spin text-blue-500" />
          </div>
        ) : !Array.isArray(fileList) || fileList.length === 0 ? (
          <div className="text-center p-8 bg-gray-50 rounded-lg">
            <FolderOpen className="w-8 h-8 text-gray-400 mx-auto mb-2" />
            <p className="text-gray-500">No files available for the selected criteria</p>
          </div>
        ) : (
          <div className="grid gap-4">
            {fileList.map((file) => (
              <div
                key={file.id}
                className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <div className="flex items-center space-x-3">
                  <FileText className="w-5 h-5 text-blue-500" />
                  <div>
                    <p className="font-medium">{file.name}</p>
                    <p className="text-sm text-gray-500">
                      {formatFileSize(file.size)} • Uploaded {new Date(file.createdTime).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                <a
                  href={file.viewUrl}
                  download
                  className="p-2 hover:bg-blue-100 rounded-full transition-colors"
                >
                  <Eye className="w-5 h-5 text-blue-500" />
                </a>
              </div>
            ))}
          </div>
        )}
      </div>
            {/* file tree */}
            <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">File Explorer</h2>
        <button
          onClick={fetchTreeData}
          className="p-2 hover:bg-gray-100 rounded-lg"
          disabled={loadingTree}
        >
          <RefreshCw className={`w-4 h-4 ${loadingTree ? 'animate-spin' : ''}`} />
        </button>
      </div>

      {errorTree && (
        <div className="text-red-500 p-4 mb-4 bg-red-50 rounded-lg">
          {errorTree}
        </div>
      )}

      {loadingTree ? (
        <div className="flex items-center justify-center p-8">
          <Loader2 className="w-6 h-6 animate-spin text-blue-500" />
        </div>
      ) : !treeData ? (
        <div className="text-center p-8 bg-gray-50 rounded-lg">
          <FolderOpen className="w-8 h-8 text-gray-400 mx-auto mb-2" />
          <p className="text-gray-500">No files available</p>
        </div>
      ) : (
        <div className="overflow-auto max-h-[calc(100vh-200px)]">
          {renderTreeNode(treeData)}
        </div>
      )}

      {/* Material Type Summary */}
      {/* <div className="grid md:grid-cols-3 gap-4">
        {materialTypes.map((material, index) => (
          <div
            key={index}
            className="border rounded-lg p-4 hover:bg-gray-50 cursor-pointer transition-colors"
            onClick={() => setSelectedMaterialType(material)}
          ></div>
            <Download size={20} className="text-blue-500 mb-2" />
            <h3 className="font-medium">{material}</h3>
            <p className="text-sm text-gray-500">
              {getFileCountByType(material)} files
            </p>
          </div>
        ))}
      </div> */}
    </div>
  );
};

export default MaterialBrowser;
