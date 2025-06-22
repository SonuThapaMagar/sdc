import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../../api/api';
import { toast } from 'react-toastify';
import { RiCheckLine, RiCloseLine, RiEyeLine } from 'react-icons/ri';

const AdoptionRequests = () => {
  const navigate = useNavigate();
  const [adoptionRequests, setAdoptionRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [showDetails, setShowDetails] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    const userRole = localStorage.getItem('userRole');
    if (!token || userRole !== 'ADMIN') {
      toast.error('Please log in to access adoption requests');
      navigate('/login');
      return;
    }
    fetchAdoptionRequests();
  }, [navigate]);

  const fetchAdoptionRequests = async () => {
    try {
      setLoading(true);
      const response = await api.get('/api/admin/adoption-requests');
      setAdoptionRequests(response.data);
    } catch (error) {
      console.error('Failed to fetch adoption requests:', error);
      if (error.response?.status === 403) {
        toast.error('Permission denied. Ensure you have ADMIN role.');
        navigate('/login');
      } else if (error.response?.status === 401) {
        toast.error('Please log in to view adoption requests');
        navigate('/login');
      } else {
        toast.error('Failed to load adoption requests. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (requestId) => {
    try {
      await api.put(`/api/admin/adoption-requests/${requestId}/approve`);
      setAdoptionRequests(prev => 
        prev.map(req => 
          req.id === requestId 
            ? { ...req, status: 'APPROVED' }
            : req
        )
      );
      toast.success('Adoption request approved successfully!');
    } catch (error) {
      console.error('Approve error:', error);
      toast.error('Failed to approve adoption request. Please try again.');
    }
  };

  const handleReject = async (requestId) => {
    try {
      await api.put(`/api/admin/adoption-requests/${requestId}/reject`);
      setAdoptionRequests(prev => 
        prev.map(req => 
          req.id === requestId 
            ? { ...req, status: 'REJECTED' }
            : req
        )
      );
      toast.success('Adoption request rejected successfully!');
    } catch (error) {
      console.error('Reject error:', error);
      toast.error('Failed to reject adoption request. Please try again.');
    }
  };

  const handleViewDetails = (request) => {
    setSelectedRequest(request);
    setShowDetails(true);
  };

  const getStatusBadge = (status) => {
    const statusConfig = {
      'PENDING': 'bg-yellow-100 text-yellow-800',
      'APPROVED': 'bg-green-100 text-green-800',
      'REJECTED': 'bg-red-100 text-red-800',
      'COMPLETED': 'bg-blue-100 text-blue-800'
    };
    
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusConfig[status] || 'bg-gray-100 text-gray-800'}`}>
        {status}
      </span>
    );
  };

  if (loading) {
    return (
      <div className="p-6 bg-gray-100 min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Adoption Requests</h1>
        <p className="text-gray-600 mt-2">Manage and review pet adoption requests</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white rounded-lg shadow p-4">
          <div className="flex items-center">
            <div className="w-12 h-12 rounded-full bg-yellow-100 flex items-center justify-center">
              <span className="text-yellow-600 font-semibold">
                {adoptionRequests.filter(req => req.status === 'PENDING').length}
              </span>
            </div>
            <div className="ml-4">
              <p className="text-sm text-gray-500">Pending</p>
              <p className="text-lg font-semibold text-gray-800">
                {adoptionRequests.filter(req => req.status === 'PENDING').length}
              </p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow p-4">
          <div className="flex items-center">
            <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
              <span className="text-green-600 font-semibold">
                {adoptionRequests.filter(req => req.status === 'APPROVED').length}
              </span>
            </div>
            <div className="ml-4">
              <p className="text-sm text-gray-500">Approved</p>
              <p className="text-lg font-semibold text-gray-800">
                {adoptionRequests.filter(req => req.status === 'APPROVED').length}
              </p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow p-4">
          <div className="flex items-center">
            <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center">
              <span className="text-red-600 font-semibold">
                {adoptionRequests.filter(req => req.status === 'REJECTED').length}
              </span>
            </div>
            <div className="ml-4">
              <p className="text-sm text-gray-500">Rejected</p>
              <p className="text-lg font-semibold text-gray-800">
                {adoptionRequests.filter(req => req.status === 'REJECTED').length}
              </p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow p-4">
          <div className="flex items-center">
            <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
              <span className="text-blue-600 font-semibold">
                {adoptionRequests.filter(req => req.status === 'COMPLETED').length}
              </span>
            </div>
            <div className="ml-4">
              <p className="text-sm text-gray-500">Completed</p>
              <p className="text-lg font-semibold text-gray-800">
                {adoptionRequests.filter(req => req.status === 'COMPLETED').length}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Requests Table */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Requester
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Pet
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Request Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {adoptionRequests.map((request) => (
                <tr key={request.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10">
                        <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center">
                          <span className="text-gray-500 font-medium">
                            {request.requesterName?.charAt(0).toUpperCase()}
                          </span>
                        </div>
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{request.requesterName}</div>
                        <div className="text-sm text-gray-500">{request.requesterEmail}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{request.petName}</div>
                    <div className="text-sm text-gray-500">{request.petBreed}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {new Date(request.requestDate).toLocaleDateString()}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {getStatusBadge(request.status)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button
                      onClick={() => handleViewDetails(request)}
                      className="text-blue-600 hover:text-blue-900 mr-3"
                      title="View Details"
                    >
                      <RiEyeLine className="text-xl" />
                    </button>
                    {request.status === 'PENDING' && (
                      <>
                        <button
                          onClick={() => handleApprove(request.id)}
                          className="text-green-600 hover:text-green-900 mr-3"
                          title="Approve"
                        >
                          <RiCheckLine className="text-xl" />
                        </button>
                        <button
                          onClick={() => handleReject(request.id)}
                          className="text-red-600 hover:text-red-900"
                          title="Reject"
                        >
                          <RiCloseLine className="text-xl" />
                        </button>
                      </>
                    )}
                  </td>
                </tr>
              ))}
              {adoptionRequests.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-6 py-4 text-center text-gray-500">
                    No adoption requests found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Details Modal */}
      {showDetails && selectedRequest && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg shadow-lg p-6 max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-gray-800">Adoption Request Details</h2>
              <button
                onClick={() => setShowDetails(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <RiCloseLine className="text-xl" />
              </button>
            </div>
            
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h3 className="font-medium text-gray-800 mb-2">Requester Information</h3>
                  <div className="bg-gray-50 p-3 rounded">
                    <p><strong>Name:</strong> {selectedRequest.requesterName}</p>
                    <p><strong>Email:</strong> {selectedRequest.requesterEmail}</p>
                    <p><strong>Phone:</strong> {selectedRequest.requesterPhone}</p>
                    <p><strong>Address:</strong> {selectedRequest.requesterAddress}</p>
                  </div>
                </div>
                
                <div>
                  <h3 className="font-medium text-gray-800 mb-2">Pet Information</h3>
                  <div className="bg-gray-50 p-3 rounded">
                    <p><strong>Name:</strong> {selectedRequest.petName}</p>
                    <p><strong>Breed:</strong> {selectedRequest.petBreed}</p>
                    <p><strong>Age:</strong> {selectedRequest.petAge}</p>
                    <p><strong>Gender:</strong> {selectedRequest.petGender}</p>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="font-medium text-gray-800 mb-2">Request Details</h3>
                <div className="bg-gray-50 p-3 rounded">
                  <p><strong>Request Date:</strong> {new Date(selectedRequest.requestDate).toLocaleDateString()}</p>
                  <p><strong>Status:</strong> {getStatusBadge(selectedRequest.status)}</p>
                  {selectedRequest.reason && (
                    <p><strong>Reason:</strong> {selectedRequest.reason}</p>
                  )}
                </div>
              </div>
              
              {selectedRequest.status === 'PENDING' && (
                <div className="flex justify-end gap-3 pt-4 border-t">
                  <button
                    onClick={() => handleApprove(selectedRequest.id)}
                    className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                  >
                    Approve
                  </button>
                  <button
                    onClick={() => handleReject(selectedRequest.id)}
                    className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                  >
                    Reject
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdoptionRequests; 