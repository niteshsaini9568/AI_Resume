import React, { useState } from "react";
import { Download, Mail, ChevronDown, CheckCircle, XCircle, Star, ArrowLeft, Eye, UserCircle, Filter } from "lucide-react";

const Tab3 = ({ goBack }) => {
  const [filter, setFilter] = useState("all"); 
  const [mockData, setMockData] = useState([
    { 
      id: 1, 
      name: "John Smith", 
      email: "john.smith@example.com",
      skillsMatch: 85, 
      jdMatch: 78, 
      qualified: true,
      invited: false 
    },
    { 
      id: 2, 
      name: "Sarah Johnson", 
      email: "sarah.j@example.com",
      skillsMatch: 92, 
      jdMatch: 81, 
      qualified: true,
      invited: true 
    },
    { 
      id: 3, 
      name: "Michael Brown", 
      email: "m.brown@example.com",
      skillsMatch: 45, 
      jdMatch: 52, 
      qualified: false,
      invited: false 
    },
  ]);
  
  const [expandedRow, setExpandedRow] = useState(null);
  const [dataLoaded, setDataLoaded] = useState(true); 

  const toggleExpand = (id) => {
    setExpandedRow(expandedRow === id ? null : id);
  };

  const handleInvite = (id) => {
    setMockData(mockData.map(candidate => 
      candidate.id === id ? { ...candidate, invited: true } : candidate
    ));
  };

  const handleInviteAll = () => {
    setMockData(mockData.map(candidate => 
      candidate.qualified ? { ...candidate, invited: true } : candidate
    ));
  };

  const getFilteredData = () => {
    if (filter === "qualified") {
      return mockData.filter(candidate => candidate.qualified);
    } else if (filter === "unqualified") {
      return mockData.filter(candidate => !candidate.qualified);
    }
    return mockData;
  };

  const filteredData = getFilteredData();
  const qualifiedCount = mockData.filter(c => c.qualified).length;
  const invitedCount = mockData.filter(c => c.invited).length;

  return (
    <div className="max-w-5xl mx-auto bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="bg-gray-50 px-6 py-4 border-b border-gray-100">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <h2 className="text-xl font-semibold text-gray-800">Resume Evaluation Results</h2>
          <div className="flex flex-wrap items-center gap-3">
            <button 
              onClick={() => setFilter("all")}
              className={`text-xs px-3 py-1 rounded-full transition-colors ${
                filter === "all" 
                  ? "bg-gray-200 text-gray-800" 
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              All ({mockData.length})
            </button>
            <button 
              onClick={() => setFilter("qualified")}
              className={`text-xs px-3 py-1 rounded-full transition-colors ${
                filter === "qualified" 
                  ? "bg-green-100 text-green-800" 
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              Qualified ({qualifiedCount})
            </button>
            <button 
              onClick={() => setFilter("unqualified")}
              className={`text-xs px-3 py-1 rounded-full transition-colors ${
                filter === "unqualified" 
                  ? "bg-red-100 text-red-800" 
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              Unqualified ({mockData.length - qualifiedCount})
            </button>
          </div>
        </div>
      </div>

      <div className="p-6">
        {/* Stats summary */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
          <div className="bg-blue-50 rounded-lg p-4 border border-blue-100">
            <div className="text-sm text-blue-600 mb-1">Total Resumes</div>
            <div className="text-2xl font-semibold text-blue-800">{mockData.length}</div>
          </div>
          
          <div className="bg-green-50 rounded-lg p-4 border border-green-100">
            <div className="text-sm text-green-600 mb-1">Qualified Candidates</div>
            <div className="text-2xl font-semibold text-green-800">{qualifiedCount}</div>
          </div>
          
          <div className="bg-indigo-50 rounded-lg p-4 border border-indigo-100">
            <div className="text-sm text-indigo-600 mb-1">Invited to Interview</div>
            <div className="text-2xl font-semibold text-indigo-800">{invitedCount} / {qualifiedCount}</div>
          </div>
        </div>
        
        {/* Action buttons */}
        <div className="flex flex-wrap items-center justify-between mb-6 gap-3">
          <div className="flex items-center space-x-2">
            <Filter size={16} className="text-gray-500" />
            <span className="text-sm text-gray-600">Filter:</span>
            <select className="text-sm border rounded-md px-2 py-1">
              <option>All Skills</option>
              <option>JavaScript</option>
              <option>React</option>
              <option>Python</option>
            </select>
          </div>
          
          <div className="flex flex-wrap gap-3">
            <button className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors text-sm">
              <Download size={16} />
              Download CSV
            </button>
            
            <button 
              onClick={handleInviteAll}
              disabled={qualifiedCount === invitedCount || qualifiedCount === 0}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-white text-sm
                ${qualifiedCount === invitedCount || qualifiedCount === 0
                  ? "bg-gray-300 cursor-not-allowed" 
                  : "bg-blue-600 hover:bg-blue-700 transition-colors"
                }`}
            >
              <Mail size={16} />
              Invite All Qualified
            </button>
          </div>
        </div>

        {/* Results table */}
        <div className="overflow-x-auto border border-gray-200 rounded-lg">
          {dataLoaded && filteredData.length > 0 ? (
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Candidate</th>
                  <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Skills Match</th>
                  <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">JD Match</th>
                  <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  <th className="px-4 py-3 w-10"></th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredData.map((candidate) => (
                  <React.Fragment key={candidate.id}>
                    <tr className={`hover:bg-gray-50 ${expandedRow === candidate.id ? 'bg-blue-50' : ''}`}>
                      <td className="px-4 py-3 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                            <UserCircle size={20} />
                          </div>
                          <div className="ml-3">
                            <div className="text-sm font-medium text-gray-900">{candidate.name}</div>
                            <div className="text-xs text-gray-500">{candidate.email}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        <div className="flex flex-col items-center">
                          <div className={`text-sm font-medium ${
                            candidate.skillsMatch >= 70 ? 'text-green-600' : 
                            candidate.skillsMatch >= 50 ? 'text-yellow-600' : 'text-red-600'
                          }`}>
                            {candidate.skillsMatch}%
                          </div>
                          <div className="w-16 h-1.5 bg-gray-200 rounded-full mt-1 overflow-hidden">
                            <div 
                              className={`h-full rounded-full ${
                                candidate.skillsMatch >= 70 ? 'bg-green-500' : 
                                candidate.skillsMatch >= 50 ? 'bg-yellow-500' : 'bg-red-500'
                              }`} 
                              style={{ width: `${candidate.skillsMatch}%` }}
                            />
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        <div className="flex flex-col items-center">
                          <div className={`text-sm font-medium ${
                            candidate.jdMatch >= 70 ? 'text-green-600' : 
                            candidate.jdMatch >= 50 ? 'text-yellow-600' : 'text-red-600'
                          }`}>
                            {candidate.jdMatch}%
                          </div>
                          <div className="w-16 h-1.5 bg-gray-200 rounded-full mt-1 overflow-hidden">
                            <div 
                              className={`h-full rounded-full ${
                                candidate.jdMatch >= 70 ? 'bg-green-500' : 
                                candidate.jdMatch >= 50 ? 'bg-yellow-500' : 'bg-red-500'
                              }`}
                              style={{ width: `${candidate.jdMatch}%` }}
                            />
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-center">
                        {candidate.qualified ? (
                          <span className="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                            Qualified
                          </span>
                        ) : (
                          <span className="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">
                            Unqualified
                          </span>
                        )}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-right text-sm">
                        {candidate.qualified && (
                          <button
                            onClick={() => handleInvite(candidate.id)}
                            disabled={candidate.invited}
                            className={`inline-flex items-center px-3 py-1 text-xs rounded-md ${
                              candidate.invited 
                                ? "bg-gray-100 text-gray-500" 
                                : "bg-blue-600 text-white hover:bg-blue-700"
                            }`}
                          >
                            {candidate.invited ? "Invited" : "Send Invite"}
                          </button>
                        )}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-right">
                        <button 
                          onClick={() => toggleExpand(candidate.id)}
                          className="text-gray-400 hover:text-gray-600"
                        >
                          <ChevronDown 
                            size={18} 
                            className={`transition-transform ${expandedRow === candidate.id ? 'rotate-180' : ''}`} 
                          />
                        </button>
                      </td>
                    </tr>
                    
                    {/* Expanded details row */}
                    {expandedRow === candidate.id && (
                      <tr className="bg-blue-50">
                        <td colSpan="6" className="px-4 py-4">
                          <div className="text-sm text-gray-700 space-y-3">
                            <div>
                              <h4 className="font-medium mb-1">Skills Analysis</h4>
                              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                                {["JavaScript", "React", "Python", "Data Analysis"].map((skill, idx) => (
                                  <div key={idx} className="flex items-center gap-1">
                                    {idx % 2 === 0 ? (
                                      <CheckCircle size={14} className="text-green-500" />
                                    ) : (
                                      <XCircle size={14} className="text-red-500" />
                                    )}
                                    <span>{skill}</span>
                                  </div>
                                ))}
                              </div>
                            </div>
                            
                            <div>
                              <h4 className="font-medium mb-1">AI Analysis</h4>
                              <p className="text-gray-600">This candidate shows strong technical skills but may need additional experience in team management.</p>
                            </div>
                            
                            <div className="flex items-center justify-end gap-2">
                              <button className="flex items-center gap-1 px-3 py-1 text-xs bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200">
                                <Eye size={14} />
                                View Resume
                              </button>
                              <button className="flex items-center gap-1 px-3 py-1 text-xs bg-yellow-100 text-yellow-700 rounded-md hover:bg-yellow-200">
                                <Star size={14} />
                                Shortlist
                              </button>
                            </div>
                          </div>
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
                ))}
              </tbody>
            </table>
          ) : (
            <div className="text-center py-12">
              <div className="mx-auto w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-700">No Results Available</h3>
              <p className="text-gray-500 mt-1">Please evaluate resumes first to see the results.</p>
            </div>
          )}
        </div>

        {/* Pagination */}
        {dataLoaded && filteredData.length > 0 && (
          <div className="flex items-center justify-between mt-6">
            <div className="text-sm text-gray-500">
              Showing <span className="font-medium">1</span> to <span className="font-medium">{filteredData.length}</span> of <span className="font-medium">{filteredData.length}</span> results
            </div>
            
            <div className="flex items-center space-x-2">
              <button className="px-3 py-1 border border-gray-300 rounded-md text-sm text-gray-500 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed" disabled>
                Previous
              </button>
              <button className="px-3 py-1 border border-gray-300 rounded-md text-sm text-gray-500 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed" disabled>
                Next
              </button>
            </div>
          </div>
        )}
        
        {/* Back button */}
        <div className="mt-6">
          <button
            onClick={goBack}
            className="flex items-center gap-2 px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <ArrowLeft size={16} />
            Back to Evaluation
          </button>
        </div>
      </div>
    </div>
  );
};

export default Tab3;