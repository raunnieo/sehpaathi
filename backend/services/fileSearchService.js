const logger = require('../utils/logger');

class FileSearchService {
  constructor() {
    this.fileStructure = null;
  }

  setFileStructure(structure) {
    this.fileStructure = structure;
  }

  searchFiles(query, filters = {}) {
    console.log('🔍 Search initiated with:', { query, filters });
    
    if (!this.fileStructure || !this.fileStructure.children) {
      console.error('❌ Invalid file structure:', this.fileStructure);
      return [];
    }

    // Extract branch from query if not in filters
    if (!filters.branch) {
      const branchMatch = query.match(/\b(CSD|CSE|IT|ECE|EE|ME|MME)\b/i);
      if (branchMatch) {
        filters.branch = branchMatch[0].toUpperCase();
      }
    }

    console.log('Updated filters:', filters);
    const results = [];

    const searchInNode = (node, path = []) => {
      if (!node) return;

      // Check branch filter early - before processing any files or subfolders
      if (filters.branch && path[0] && path[0].toUpperCase() !== filters.branch.toUpperCase()) {
        return; // Skip this entire branch if it doesn't match
      }

      // Process files if this is a file array
      if (Array.isArray(node)) {
        node.forEach(item => {
          if (item.type === 'file') {
            const matchesFilters = (
              (!filters.semester || path[1]?.includes(filters.semester)) &&
              (!filters.subject || path[2]?.toLowerCase().includes(filters.subject?.toLowerCase()))
            );

            if (matchesFilters) {
              results.push({
                ...item,
                path: path.join(' > '),
                branch: path[0],
                semester: path[1]?.replace('Semester ', ''),
                subject: path[2],
                category: path[3]
              });
            }
          }
        });
        return;
      }

      // Recursively process folders
      if (node.type === 'folder') {
        if (node.files) {
          searchInNode(node.files, path);
        }
        if (node.children && Array.isArray(node.children)) {
          node.children.forEach(child => {
            searchInNode(child, [...path, child.name]);
          });
        }
      }
    };

    searchInNode(this.fileStructure);
    console.log(`Found ${results.length} matching files for ${filters.branch || 'all branches'}:`, results);
    return results;
  }

  formatSearchResults(results) {
    console.log('Formatting search results:', results);
    if (!results || results.length === 0) {
      return "I couldn't find any matching study materials.";
    }

    let response = "📚 **Found Study Materials:**\n\n";

    const grouped = results.reduce((acc, file) => {
      const key = `${file.branch} - Semester ${file.semester}`;
      if (!acc[key]) acc[key] = {};
      if (!acc[key][file.subject]) acc[key][file.subject] = [];
      acc[key][file.subject].push(file);
      return acc;
    }, {});

    Object.entries(grouped).forEach(([branchSem, subjects]) => {
      response += `### ${branchSem}\n\n`;
      
      Object.entries(subjects).forEach(([subject, files]) => {
        response += `#### ${subject}\n`;
        files.forEach(file => {
          response += `- 📄 **${file.name}**\n`;
          response += `  - Category: ${file.category}\n`;
          response += `  - Links: [**View Online**](${file.viewUrl}) | [**Download**](${file.downloadUrl})\n\n`;
        });
      });
    });

    return response;
  }
}

module.exports = new FileSearchService();