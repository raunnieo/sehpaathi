import { Loader2 } from "lucide-react";
import { useTheme } from "../../contexts/useTheme";
import PropTypes from "prop-types";

const AddResourceModal = ({
  newResource,
  setNewResource,
  handleAddResource,
  setIsAddResourceModalOpen,
  resourceTypes,
  uploading
}) => {
  const { isDark } = useTheme();
  
  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
      <div className={`rounded-xl p-6 w-96 shadow-2xl backdrop-blur-xl border ${
        isDark 
          ? 'bg-gray-800/90 border-gray-700/50'
          : 'bg-white/90 border-gray-200/50'
      }`}>
        {/* Glass effect overlay */}
        <div className={`absolute inset-0 rounded-xl ${
          isDark 
            ? 'bg-gradient-to-br from-gray-800/30 to-gray-900/30'
            : 'bg-gradient-to-br from-white/30 to-gray-50/30'
        }`}></div>
        
        <div className="relative">
          <h3 className={`text-xl font-bold mb-4 ${
            isDark ? 'text-white' : 'text-gray-900'
          }`}>Add New Resource</h3>
          
          <div className="space-y-4">
            <select
              className={`w-full p-3 rounded-lg transition-colors duration-200 focus:ring-2 focus:ring-blue-500 focus:outline-none ${
                isDark 
                  ? 'bg-gray-700/50 border border-gray-600/50 text-white placeholder-gray-400'
                  : 'bg-white/70 border border-gray-300/50 text-gray-900 placeholder-gray-500'
              }`}
              value={newResource.type}
              onChange={(e) => setNewResource({ ...newResource, type: e.target.value })}
            >
              <option value="">Select resource type</option>
              {resourceTypes.map((type) => (
                <option key={type.id} value={type.id}>{type.label}</option>
              ))}
            </select>            <input
              type="text"
              placeholder="Title"
              className={`w-full p-3 rounded-lg transition-colors duration-200 focus:ring-2 focus:ring-blue-500 focus:outline-none ${
                isDark 
                  ? 'bg-gray-700/50 border border-gray-600/50 text-white placeholder-gray-400'
                  : 'bg-white/70 border border-gray-300/50 text-gray-900 placeholder-gray-500'
              }`}
              value={newResource.title}
              onChange={(e) => setNewResource({ ...newResource, title: e.target.value })}
            />

            {(newResource.type === "bookmark" || newResource.type === "video") && (
              <input
                type="url"
                placeholder="URL"
                className={`w-full p-3 rounded-lg transition-colors duration-200 focus:ring-2 focus:ring-blue-500 focus:outline-none ${
                  isDark 
                    ? 'bg-gray-700/50 border border-gray-600/50 text-white placeholder-gray-400'
                    : 'bg-white/70 border border-gray-300/50 text-gray-900 placeholder-gray-500'
                }`}
                value={newResource.url}
                onChange={(e) => setNewResource({ ...newResource, url: e.target.value })}
              />
            )}

            {(newResource.type === "media" || newResource.type === "note") && (
              <input
                type="file"
                className={`w-full p-3 rounded-lg transition-colors duration-200 focus:ring-2 focus:ring-blue-500 focus:outline-none ${
                  isDark 
                    ? 'bg-gray-700/50 border border-gray-600/50 text-white'
                    : 'bg-white/70 border border-gray-300/50 text-gray-900'
                }`}
                onChange={(e) => setNewResource({ ...newResource, file: e.target.files[0] })}
              />
            )}

            {(newResource.type === "file") && (
              <input
                type="file"
                className={`w-full p-3 rounded-lg transition-colors duration-200 focus:ring-2 focus:ring-blue-500 focus:outline-none ${
                  isDark 
                    ? 'bg-gray-700/50 border border-gray-600/50 text-white'
                    : 'bg-white/70 border border-gray-300/50 text-gray-900'
                }`}
                onChange={(e) => setNewResource({ ...newResource, file: e.target.files[0] })}
              />
            )}

            <div className="flex justify-end gap-2 mt-6">
              <button
                className={`px-4 py-2 rounded-lg transition-colors duration-200 ${
                  isDark 
                    ? 'text-gray-300 hover:bg-gray-700/50'
                    : 'text-gray-500 hover:bg-gray-100'
                }`}
                onClick={() => setIsAddResourceModalOpen(false)}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 w-auto bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors disabled:opacity-50"
                onClick={handleAddResource}
                disabled={uploading}
              >
                {uploading ? (
                  <div className="flex items-center gap-2">
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Uploading...</span>
                  </div>
                ) : (
                  <span>Add Resource</span>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

AddResourceModal.propTypes = {
  newResource: PropTypes.shape({
    type: PropTypes.string,
    title: PropTypes.string,
    url: PropTypes.string,
    file: PropTypes.object
  }).isRequired,
  setNewResource: PropTypes.func.isRequired,
  handleAddResource: PropTypes.func.isRequired,
  setIsAddResourceModalOpen: PropTypes.func.isRequired,
  resourceTypes: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired
  })).isRequired,
  uploading: PropTypes.bool.isRequired
};

export default AddResourceModal;