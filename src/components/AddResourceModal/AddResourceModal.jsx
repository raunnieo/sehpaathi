const AddResourceModal = ({
  newResource,
  setNewResource,
  handleAddResource,
  setIsAddResourceModalOpen,
  resourceTypes
}) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-96">
        <h3 className="text-xl font-bold mb-4">Add New Resource</h3>
        <div className="space-y-4">
          <select
            className="w-full p-2 border rounded-lg"
            value={newResource.type}
            onChange={(e) => setNewResource({ ...newResource, type: e.target.value })}
          >
            <option value="">Select resource type</option>
            {resourceTypes.map((type) => (
              <option key={type.id} value={type.id}>{type.label}</option>
            ))}
          </select>

          <input
            type="text"
            placeholder="Title"
            className="w-full p-2 border rounded-lg"
            value={newResource.title}
            onChange={(e) => setNewResource({ ...newResource, title: e.target.value })}
          />

          {(newResource.type === "bookmark" || newResource.type === "video") && (
            <input
              type="url"
              placeholder="URL"
              className="w-full p-2 border rounded-lg"
              value={newResource.url}
              onChange={(e) => setNewResource({ ...newResource, url: e.target.value })}
            />
          )}

          {(newResource.type === "media" || newResource.type === "note") && (
            <input
              type="file"
              className="w-full p-2 border rounded-lg"
              onChange={(e) => setNewResource({ ...newResource, file: e.target.files[0] })}
            />
          )}

          <div className="flex justify-end gap-2 mt-6">
            <button
              className="px-4 py-2 text-gray-500 hover:bg-gray-100 rounded-lg transition-colors"
              onClick={() => setIsAddResourceModalOpen(false)}
            >
              Cancel
            </button>
            <button
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
              onClick={handleAddResource}
            >
              Add Resource
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default AddResourceModal