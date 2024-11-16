import React from 'react';
import { Download } from 'lucide-react';

const MaterialBrowser = ({
  selectedBranch,
  setSelectedBranch,
  selectedSemester,
  setSelectedSemester,
  branches,
  semesters,
  materialTypes
}) => {
  return (
    <div className="bg-white rounded-xl p-6 shadow-sm">
      <h2 className="text-xl font-bold mb-4">Browse Study Materials</h2>

      <div className="grid md:grid-cols-2 gap-4 mb-6">
        <select
          className="p-2 border rounded-lg"
          onChange={(e) => setSelectedBranch(e.target.value)}
          value={selectedBranch || ""}
        >
          <option value="">Select Branch</option>
          {branches.map((branch) => (
            <option key={branch.id} value={branch.id}>{branch.name}</option>
          ))}
        </select>

        <select
          className="p-2 border rounded-lg"
          onChange={(e) => setSelectedSemester(e.target.value)}
          value={selectedSemester || ""}
        >
          <option value="">Select Semester</option>
          {semesters.map((sem) => (
            <option key={sem.id} value={sem.id}>{sem.name}</option>
          ))}
        </select>
      </div>

      <div className="grid md:grid-cols-3 gap-4">
        {materialTypes.map((material, index) => (
          <div
            key={index}
            className="border rounded-lg p-4 hover:bg-gray-50 cursor-pointer transition-colors"
          >
            <Download size={20} className="text-blue-500 mb-2" />
            <h3 className="font-medium">{material}</h3>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MaterialBrowser