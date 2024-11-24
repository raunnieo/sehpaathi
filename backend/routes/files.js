const express = require('express');
const router = express.Router();
const multer = require('multer');
const { verifyToken } = require('../middleware/auth');
const DriveService = require('../services/driveService');
const AcademicConfig = require('../config/academicConfig');

// Configure Multer to store file in memory
const upload = multer({ 
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 100 * 1024 * 1024, // 100MB limit
  }
});

const VALID_CATEGORIES = [
  'Class Notes',
  'Lecture PPTs',
  'Previous Year Questions',
  'Practical Reports',
  'Profiency Papers',
  'Syllabus'
];

const adminUpload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 50 * 1024 * 1024, // 50MB limit for admin uploads
  },
  fileFilter: (req, file, cb) => {
    const allowedTypes = [
      'application/pdf',
      'application/vnd.ms-powerpoint',
      'application/vnd.openxmlformats-officedocument.presentationml.presentation',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    ];
    
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Invalid file type. Only PDF, PPT, PPTX, DOC, and DOCX files are allowed.'));
    }
  }
});


// Route to upload a file
router.post('/upload', verifyToken, upload.single('file'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    // Ensure the Google Drive folder exists and get folder ID
    const folderInfo = await DriveService.ensureSehpaathiFolder(req.user.uid);
    
    // Upload the file to Google Drive
    const file = await DriveService.uploadFile(req.user.uid, req.file, folderInfo.id);
    
    // Send success response with file metadata
    res.json({
      success: true,
      file: {
        id: file.id,
        name: file.name,
        viewUrl: file.webViewLink,
        downloadUrl: file.downloadUrl,
        createdTime: file.createdTime
      }
    });
  } catch (error) {
    console.error("File upload error:", error);
    res.status(500).json({ error: "File upload failed due to server error." });
  }
});

// Route to list files in the user's folder
router.get('/list', verifyToken, async (req, res) => {
  try {
    // Get the Google Drive folder ID
    const folderInfo = await DriveService.ensureSehpaathiFolder(req.user.uid);
    
    // Retrieve list of files from the folder
    const files = await DriveService.listFiles(folderInfo.id);
    
    // Format and send the list of files
    res.json({
      success: true,
      folderUrl: folderInfo.webViewLink,
      files: files.map(file => ({
        id: file.id,
        name: file.name,
        viewUrl: file.webViewLink,
        downloadUrl: file.downloadUrl,
        createdTime: file.createdTime
      }))
    });
  } catch (error) {
    console.error("File listing error:", error);
    res.status(500).json({ error: "Failed to retrieve file list." });
  }
});

// New route to delete a file
router.delete('/delete/:fileId', verifyToken, async (req, res) => {
  try {
    const { fileId } = req.params;
    if (!fileId) {
      return res.status(400).json({ error: "File ID is required" });
    }

    // Delete the file
    const result = await DriveService.deleteFile(req.user.uid, fileId);
    
    res.json(result);
  } catch (error) {
    console.error("File deletion error:", error);
    
    // Handle specific error cases
    if (error.message.includes('File not found')) {
      return res.status(404).json({ error: "File not found" });
    }
    if (error.message.includes('not in user\'s Sehpaathi folder')) {
      return res.status(403).json({ error: "Access denied to this file" });
    }
    
    res.status(500).json({ error: "Failed to delete file" });
  }
});

// New route to delete multiple files
router.delete('/delete-multiple', verifyToken, async (req, res) => {
  try {
    const { fileIds } = req.body;
    
    if (!Array.isArray(fileIds) || fileIds.length === 0) {
      return res.status(400).json({ error: "File IDs array is required" });
    }

    // Delete multiple files
    const results = await DriveService.deleteMultipleFiles(req.user.uid, fileIds);
    
    res.json({
      success: true,
      results
    });
  } catch (error) {
    console.error("Multiple file deletion error:", error);
    res.status(500).json({ error: "Failed to delete files" });
  }
});

// Route to get a specific file's information
router.get('/file/:fileId', verifyToken, async (req, res) => {
  try {
    const file = await DriveService.getFile(req.params.fileId);
    
    if (!file) {
      return res.status(404).json({ error: "File not found" });
    }

    res.json({
      success: true,
      file: {
        id: file.id,
        name: file.name,
        viewUrl: file.webViewLink,
        downloadUrl: file.downloadUrl,
        mimeType: file.mimeType,
        size: file.size
      }
    });
  } catch (error) {
    console.error("File retrieval error:", error);
    res.status(500).json({ error: "Failed to retrieve file information." });
  }
});

// Test route to check folder creation
router.get('/test-folder', verifyToken, async (req, res) => {
  try {
    const folderInfo = await DriveService.ensureSehpaathiFolder(req.user.uid);
    res.json({ 
      success: true,
      folderId: folderInfo.id,
      folderUrl: folderInfo.webViewLink
    });
  } catch (error) {
    console.error("Folder test error:", error);
    res.status(500).json({ error: error.message });
  }
});

// Global error handler for the router
router.use((error, req, res, next) => {
  console.error('Files router error:', error);
  
  // Handle multer errors
  if (error instanceof multer.MulterError) {
    if (error.code === 'LIMIT_FILE_SIZE') {
      return res.status(400).json({
        error: "File size too large. Maximum size is 10MB."
      });
    }
    return res.status(400).json({
      error: "File upload error",
      message: error.message
    });
  }

  // Handle other types of errors
  res.status(500).json({
    error: "An unexpected error occurred",
    message: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
  });
});

// Replace academic config route
router.get('/academic-config', verifyToken, async (req, res) => {
  try {
    const config = await AcademicConfig.getConfig();
    res.json({
      success: true,
      data: config
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Failed to fetch academic configuration"
    });
  }
});

// Admin upload route
router.post('/admin/upload', 
  verifyToken, 
  adminUpload.single('file'), 
  async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ error: "No file uploaded" });
      }

      const { branch, semester, subject, category } = req.body;

      console.log('Received upload request:', {
        branch,
        semester,
        subject,
        category,
        fileName: req.file.originalname
      });

      // Validate required fields
      if (!branch || !semester || !subject || !category) {
        return res.status(400).json({ 
          error: "Missing required fields",
          received: { branch, semester, subject, category }
        });
      }

      // Get academic config and validate subject
      const semesterNum = parseInt(semester);
      const subjects = await AcademicConfig.getConfig();
      const semesterData = subjects[semesterNum];
      
      if (!semesterData) {
        return res.status(400).json({
          error: `Invalid semester: ${semester}`,
          validSemesters: Object.keys(subjects)
        });
      }

      // Get subject data
      const subjectData = await AcademicConfig.getSubjectById(subject, semesterNum);
      if (!subjectData) {
        return res.status(400).json({
          error: `Invalid subject "${subject}" for semester ${semester}`
        });
      }

      // Validate category
      if (!VALID_CATEGORIES.includes(category)) {
        return res.status(400).json({
          error: "Invalid category",
          validCategories: VALID_CATEGORIES
        });
      }

      // Upload file with folder structure using the validated subject data
      const file = await DriveService.uploadAdminFile(
        req.file,
        branch,
        parseInt(semester),
        subjectData, // Pass the entire subject object
        category
      );

      res.json({
        success: true,
        file: {
          id: file.id,
          name: file.name,
          viewUrl: file.webViewLink,
          downloadUrl: file.downloadUrl,
          createdTime: file.createdTime,
          branch: file.branch,
          semester: file.semester,
          subject: subjectData.code,
          category: file.category
        }
      });
    } catch (error) {
      console.error("Admin file upload error:", error);
      res.status(500).json({ 
        error: "File upload failed",
        message: error.message,
        details: error.stack
      });
    }
});

// Route to list admin files with filters
router.get('/admin/files', verifyToken, async (req, res) => {
  try {
    const { branch, semester, subject, category } = req.query;
    
    if (!branch || !semester || !subject || !category) {
      return res.status(400).json({
        success: false,
        error: "Missing required parameters"
      });
    }

    const subjectData = await AcademicConfig.getSubjectById(subject, parseInt(semester));

    // Get files using subject code
    const files = await DriveService.listAdminFiles(
      branch, 
      parseInt(semester), 
      subjectData.code, // Use subject code
      category
    );
    
    if (!files || files.length === 0) {
      return res.json({
        success: true,
        files: []
      });
    }

    res.json({
      success: true,
      files: files.map(file => ({
        id: file.id,
        name: file.name,
        viewUrl: file.webViewLink,
        downloadUrl: file.downloadUrl,
        createdTime: file.createdTime,
        mimeType: file.mimeType,
        size: file.size,
      }))
    });

  } catch (error) {
    console.error("Admin file listing error:", error);
    res.status(500).json({ 
      success: false, 
      error: error.message || "Failed to retrieve file list"
    });
  }
});

// Route to get subjects for a branch and semester
router.get('/admin/subjects', verifyToken, async (req, res) => {
  try {
    const { branch, semester } = req.query;
    
    if (!branch || !semester) {
      return res.status(400).json({ error: "Branch and semester are required" });
    }

    const adminFolder = await DriveService.ensureAdminFolder();
    const branchFolder = await DriveService.ensureSubFolder(adminFolder.id, branch);
    const semesterFolder = await DriveService.ensureSubFolder(branchFolder.id, `Semester ${semester}`);
    
    const response = await drive.files.list({
      q: `'${semesterFolder.id}' in parents and mimeType='application/vnd.google-apps.folder'`,
      fields: 'files(name)'
    });
    
    res.json({
      success: true,
      subjects: response.data.files.map(file => file.name)
    });
  } catch (error) {
    res.status(500).json({ error: "Failed to retrieve subjects" });
  }

});

router.get('/admin/directory-tree',  async (req, res) => {
  try {
    const directoryTree = await DriveService.getDirectoryTree();
    
    res.json({
      success: true,
      tree: directoryTree
    });
  } catch (error) {
    console.error("Error getting directory tree:", error);
    res.status(500).json({
      success: false,
      error: "Failed to retrieve directory structure"
    });
  }
});

module.exports = router;