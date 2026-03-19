import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { MessageSquare, Eye, CheckCircle, XCircle, Trash2, Lightbulb, Clock, Check } from 'lucide-react';
import { manageApi } from '../services/api';
import DataTable from './common/DataTable';
import StatsCard from './common/StatsCard';
import StatusBadge from './common/StatusBadge';
import { useToast } from '../context/ToastContext';
import SuggestionModal from './SuggestionModal';

const SuggestionManage = () => {
  const { showToast } = useToast();
  const queryClient = useQueryClient();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  
  // Modal state
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedId, setSelectedId] = useState(null);

  const { data: suggestions, isLoading } = useQuery({
    queryKey: ['suggestions'],
    queryFn: () => manageApi.getSuggestions(),
  });

  const { data: selectedSuggestion, isLoading: detailsLoading } = useQuery({
    queryKey: ['suggestion', selectedId],
    queryFn: () => manageApi.getSuggestionById(selectedId),
    enabled: !!selectedId && modalOpen,
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }) => manageApi.updateSuggestion(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries(['suggestions']);
      queryClient.invalidateQueries(['suggestion', selectedId]);
      showToast('Status updated successfully', 'success');
    },
    onError: (err) => {
      showToast(err.response?.data?.message || 'Failed to update status', 'error');
    }
  });

  const deleteMutation = useMutation({
    mutationFn: manageApi.deleteSuggestion,
    onSuccess: () => {
      queryClient.invalidateQueries(['suggestions']);
      showToast('Suggestion deleted successfully', 'success');
    },
    onError: (err) => {
      showToast(err.response?.data?.message || 'Failed to delete suggestion', 'error');
    }
  });

  const handleApprove = (id) => {
    updateMutation.mutate({ id, data: { status: 'approved' } });
  };

  const handleReject = (id) => {
    updateMutation.mutate({ id, data: { status: 'reject' } });
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this suggestion?')) {
      deleteMutation.mutate(id);
    }
  };

  const openModal = (id) => {
    setSelectedId(id);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setSelectedId(null);
  };

  const columns = [
    { key: 'course_code', label: 'Course Code' },
    { key: 'course_name', label: 'Course Name', render: (val) => val || '—' },
    { key: 'dept', label: 'Dept' },
    { 
      key: 'status', 
      label: 'Status',
      render: (status) => <StatusBadge status={status === 'reject' ? 'rejected' : status} />
    },
    { key: 'stars', label: 'Stars', render: (stars) => stars || 0 },
  ];

  const actions = (suggestion) => (
    <div className="flex justify-end gap-2">
      <button 
        className="btn btn-ghost btn-xs text-info hover:bg-info/10"
        onClick={() => openModal(suggestion._id)}
        title="View Details"
      >
        <Eye size={16} />
      </button>
      <button 
        className="btn btn-ghost btn-xs text-success hover:bg-success/10"
        onClick={() => handleApprove(suggestion._id)}
        title="Approve"
        disabled={suggestion.status === 'approved'}
      >
        <CheckCircle size={16} />
      </button>
      <button 
        className="btn btn-ghost btn-xs text-error hover:bg-error/10"
        onClick={() => handleReject(suggestion._id)}
        title="Reject"
        disabled={suggestion.status === 'reject'}
      >
        <XCircle size={16} />
      </button>
      <button 
        className="btn btn-ghost btn-xs text-error hover:bg-error/10"
        onClick={() => handleDelete(suggestion._id)}
        title="Delete"
      >
        <Trash2 size={16} />
      </button>
    </div>
  );

  const filteredSuggestions = suggestions?.filter(s => {
    const matchesSearch = s.course_code?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         s.course_name?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || s.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const stats = suggestions?.reduce((acc, s) => {
    acc.total++;
    if (s.status === 'pending') acc.pending++;
    if (s.status === 'approved') acc.approved++;
    if (s.status === 'reject') acc.rejected++;
    return acc;
  }, { total: 0, pending: 0, approved: 0, rejected: 0 }) || { total: 0, pending: 0, approved: 0, rejected: 0 };

  return (
    <div className="p-4 space-y-4 bg-slate-50 min-h-screen">
      {/* Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard title="Total" value={stats.total} icon={Lightbulb} colorClass="blue-500" />
        <StatsCard title="Pending" value={stats.pending} icon={Clock} colorClass="yellow-500" />
        <StatsCard title="Approved" value={stats.approved} icon={CheckCircle} colorClass="green-500" />
        <StatsCard title="Rejected" value={stats.rejected} icon={XCircle} colorClass="red-500" />
      </div>

      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
          <h2 className="text-xl font-bold text-gray-800">Suggestion Management</h2>
          <div className="flex gap-2">
            {['all', 'pending', 'approved', 'reject'].map(status => (
              <button
                key={status}
                className={`btn btn-sm capitalize ${statusFilter === status ? 'btn-primary' : 'btn-ghost'}`}
                onClick={() => setStatusFilter(status)}
              >
                {status === 'reject' ? 'rejected' : status}
              </button>
            ))}
          </div>
        </div>

        <DataTable 
          columns={columns} 
          data={filteredSuggestions} 
          onSearch={setSearchTerm}
          isLoading={isLoading}
          actions={actions}
        />
      </div>

      <SuggestionModal
        isOpen={modalOpen}
        onClose={closeModal}
        suggestion={selectedSuggestion}
        isLoading={detailsLoading}
      />
    </div>
  );
};

export default SuggestionManage;