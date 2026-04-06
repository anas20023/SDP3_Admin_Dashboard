import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { MessageSquare, Trash2, Search, Filter, Bug, Lightbulb, FileText, HelpCircle, Calendar } from 'lucide-react';
import { manageApi } from '../services/api';
import DataTable from './common/DataTable';
import StatsCard from './common/StatsCard';
import StatusBadge from './common/StatusBadge';
import { toast } from 'react-toastify';
import ConfirmModal from './common/ConfirmModal';

const FeedbackManage = () => {
    const queryClient = useQueryClient();
    const [searchTerm, setSearchTerm] = useState('');
    const [filterCategory, setFilterCategory] = useState('all');

    const [isConfirmOpen, setIsConfirmOpen] = useState(false);
    const [feedbackToDelete, setFeedbackToDelete] = useState(null);

    const { data: feedbacks, isLoading } = useQuery({
        queryKey: ['feedbacks'],
        queryFn: manageApi.getFeedbacks,
    });

    const deleteMutation = useMutation({
        mutationFn: manageApi.deleteFeedback,
        onSuccess: () => {
            queryClient.invalidateQueries(['feedbacks']);
            toast.success('Feedback deleted successfully');
            setIsConfirmOpen(false);
            setFeedbackToDelete(null);
        },
        onError: (err) => {
            toast.error(err.response?.data?.message || 'Failed to delete feedback');
            setIsConfirmOpen(false);
        }
    });

    const handleDelete = (id) => {
        setFeedbackToDelete(id);
        setIsConfirmOpen(true);
    };

    const confirmDelete = () => {
        if (feedbackToDelete) {
            deleteMutation.mutate(feedbackToDelete);
        }
    };

    const columns = [
        { 
            key: 'createdAt', 
            label: 'Date',
            render: (date) => (
                <div className="flex items-center gap-2">
                    <Calendar size={14} className="text-gray-400" />
                    <span>{new Date(date).toLocaleDateString()}</span>
                </div>
            )
        },
        { 
            key: 'category', 
            label: 'Category',
            render: (category) => <StatusBadge status={category} />
        },
        { key: 'subject', label: 'Subject' },
        { 
            key: 'message', 
            label: 'Message',
            render: (msg) => (
                <div className="max-w-md truncate" title={msg}>
                    {msg}
                </div>
            )
        },
    ];

    const actions = (feedback) => (
        <div className="flex justify-end gap-2">
            <button 
                className="btn btn-ghost btn-xs text-error hover:bg-error/10"
                onClick={() => handleDelete(feedback._id)}
                title="Delete Feedback"
            >
                <Trash2 size={16} />
            </button>
        </div>
    );

    const filteredFeedbacks = feedbacks?.filter(item => {
        const matchesSearch = 
            item.subject?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.message?.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = filterCategory === 'all' || item.category === filterCategory;
        return matchesSearch && matchesCategory;
    });

    const categoryCounts = feedbacks?.reduce(
        (acc, item) => {
            acc[item.category] = (acc[item.category] || 0) + 1;
            return acc;
        },
        { bug: 0, feature: 0, content: 0, others: 0 }
    ) || { bug: 0, feature: 0, content: 0, others: 0 };

    return (
        <div className="p-4 space-y-4 bg-slate-50 min-h-screen">
            {/* Category Stats */}
            <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
                <StatsCard 
                    title="Total Feedbacks" 
                    value={feedbacks?.length || 0} 
                    icon={MessageSquare} 
                    colorClass="blue-500" 
                />
                <StatsCard 
                    title="Bugs" 
                    value={categoryCounts.bug} 
                    icon={Bug} 
                    colorClass="red-500" 
                />
                <StatsCard 
                    title="Features" 
                    value={categoryCounts.feature} 
                    icon={Lightbulb} 
                    colorClass="green-500" 
                />
                <StatsCard 
                    title="Content" 
                    value={categoryCounts.content} 
                    icon={FileText} 
                    colorClass="yellow-500" 
                />
                <StatsCard 
                    title="Others" 
                    value={categoryCounts.others} 
                    icon={HelpCircle} 
                    colorClass="indigo-500" 
                />
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
                    <h2 className="text-xl font-bold text-gray-800">Feedback Management</h2>
                    
                    <div className="flex items-center gap-2 w-full md:w-auto">
                        <select 
                            className="select select-sm select-bordered bg-white border-gray-200"
                            value={filterCategory}
                            onChange={(e) => setFilterCategory(e.target.value)}
                        >
                            <option value="all">All Categories</option>
                            <option value="bug">Bugs</option>
                            <option value="feature">Features</option>
                            <option value="content">Content</option>
                            <option value="others">Others</option>
                        </select>
                    </div>
                </div>
                
                <DataTable 
                    columns={columns} 
                    data={filteredFeedbacks} 
                    onSearch={setSearchTerm}
                    isLoading={isLoading}
                    actions={actions}
                />
            </div>

            <ConfirmModal 
                isOpen={isConfirmOpen}
                title="Delete Feedback"
                message="Are you sure you want to delete this feedback? This action cannot be undone."
                isLoading={deleteMutation.isPending}
                onConfirm={confirmDelete}
                onCancel={() => setIsConfirmOpen(false)}
            />
        </div>
    );
};

export default FeedbackManage;