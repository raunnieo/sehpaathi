const DriveService = require('./services/driveService');
const { branches } = require('../shared/academicConfig');

async function initializeServices() {
  try {
    console.log('Initializing services...');
    const tree = await DriveService.initializeFileStructure();
    
    // Verify structure and use branches from config
    if (!tree || !tree.children) {
      throw new Error('Invalid file structure generated');
    }
    
    console.log('File structure stats:', {
      totalFiles: countFiles(tree),
      branches: branches.map(b => b.name).join(', ')
    });
    
    console.log('Services initialized successfully');
  } catch (error) {
    console.error('Failed to initialize services:', error);
    process.exit(1);
  }
}

function countFiles(node) {
  let count = 0;
  if (node.files) count += node.files.length;
  if (node.children) {
    node.children.forEach(child => {
      count += countFiles(child);
    });
  }
  return count;
}

initializeServices().then(() => {
  // Your existing server start code
  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
});