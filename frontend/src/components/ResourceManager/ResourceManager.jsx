import { useTheme } from '../../contexts/useTheme';
import PropTypes from 'prop-types';
import { Plus, Edit2, Trash2 } from 'lucide-react';
import { resourceTypes } from '../../constants';
import AddResourceModal from '../AddResourceModal/AddResourceModal';

const ResourceManager = ({
  resources,
  isAddResourceModalOpen,
  setIsAddResourceModalOpen,
  newResource,
  setNewResource,
  handleAddResource,
  handleDeleteResource,
  getIconForType,
  uploading
}) => {
  const { isDark } = useTheme();
  
  return (
    <div className={`rounded-xl p-6 shadow-lg mb-8 backdrop-blur-xl border relative ${
      isDark 
        ? 'bg-gray-800/70 border-gray-700/50'
        : 'bg-white/70 border-gray-200/50'
    }`}>
      {/* Glass effect overlay */}
      <div className={`absolute inset-0 rounded-xl ${
        isDark 
          ? 'bg-gradient-to-br from-gray-800/30 to-gray-900/30'
          : 'bg-gradient-to-br from-white/30 to-gray-50/30'
      }`}></div>

      <div className="relative flex justify-between items-center mb-4">
        <h2 className={`text-xl font-bold ${
          isDark ? 'text-white' : 'text-gray-900'
        }`}>Your Resources</h2>
        <button
          onClick={() => setIsAddResourceModalOpen(true)}
          className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
        >
          <Plus size={16} /> Add Resource
        </button>
      </div>      <div className="relative grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {resources.map((resource) => (
          <div
            key={resource.id}
            className={`border rounded-lg p-4 cursor-pointer transition-all duration-300 backdrop-blur-sm hover:shadow-lg transform hover:-translate-y-1 ${
              isDark 
                ? 'border-gray-700/50 hover:bg-gray-700/30 bg-gray-800/20'
                : 'border-gray-200/50 hover:bg-gray-50/70 bg-white/20'
            }`}
            onClick={() => window.open(resource.url, "_blank")}
          >
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-2">
                {getIconForType(resource.type)}
                <div>
                  <h3 className={`font-medium ${
                    isDark ? 'text-white' : 'text-gray-900'
                  }`}>{resource.title}</h3>
                  <p className={`text-sm capitalize ${
                    isDark ? 'text-gray-400' : 'text-gray-500'
                  }`}>{resource.type}</p>
                </div>
              </div>
              <div className="flex gap-2">
                <button className={`p-1 rounded transition-colors ${
                  isDark 
                    ? 'hover:bg-gray-600/50 text-gray-400'
                    : 'hover:bg-gray-100 text-gray-500'
                }`}>
                  <Edit2 size={16} />
                </button>
                <button
                  className={`p-1 rounded transition-colors ${
                    isDark 
                      ? 'hover:bg-red-500/20 text-red-400'
                      : 'hover:bg-red-50 text-red-500'
                  }`}
                  onClick={(e) => {
                    e.stopPropagation()
                    handleDeleteResource(resource.id)}}
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {isAddResourceModalOpen && (
        <AddResourceModal
          newResource={newResource}
          setNewResource={setNewResource}
          handleAddResource={handleAddResource}
          setIsAddResourceModalOpen={setIsAddResourceModalOpen}
          resourceTypes={resourceTypes}
          uploading = {uploading}
        />
      )}
    </div>
  );
};

ResourceManager.propTypes = {
  resources: PropTypes.array.isRequired,
  isAddResourceModalOpen: PropTypes.bool.isRequired,
  setIsAddResourceModalOpen: PropTypes.func.isRequired,
  newResource: PropTypes.object.isRequired,
  setNewResource: PropTypes.func.isRequired,
  handleAddResource: PropTypes.func.isRequired,
  handleDeleteResource: PropTypes.func.isRequired,
  getIconForType: PropTypes.func.isRequired,
  uploading: PropTypes.bool.isRequired,
};

export default ResourceManager