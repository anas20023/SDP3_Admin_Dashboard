import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { UserCog, Trash2, Edit, Users, ShieldCheck, GraduationCap, School, X, Save } from 'lucide-react';
import { manageApi } from '../services/api';
import DataTable from './common/DataTable';
import StatsCard from './common/StatsCard';
import StatusBadge from './common/StatusBadge';
import { toast } from 'react-toastify';
import ConfirmModal from './common/ConfirmModal';

const UserManage = () => {
  const queryClient = useQueryClient();
  const [searchTerm, setSearchTerm] = useState('');
  const [editingUser, setEditingUser] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [selectedUserToDelete, setSelectedUserToDelete] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    user_id: '',
    email: '',
    role: '',
    dept: '',
    intake: '',
    section: ''
  });

  const { data: users, isLoading } = useQuery({
    queryKey: ['users'],
    queryFn: manageApi.getUsers,
  });

  const deleteMutation = useMutation({
    mutationFn: manageApi.deleteUser,
    onSuccess: () => {
      queryClient.invalidateQueries(['users']);
      toast.success('User deleted successfully');
      setIsConfirmOpen(false);
      setSelectedUserToDelete(null);
    },
    onError: (err) => {
      toast.error(err.response?.data?.message || 'Failed to delete user');
      setIsConfirmOpen(false);
    }
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }) => manageApi.updateUser(id, data),
    onMutate: async ({ id, data }) => {
      await queryClient.cancelQueries(['users']);
      const previousUsers = queryClient.getQueryData(['users']);
      queryClient.setQueryData(['users'], old => 
        old?.map(user => user._id === id ? { ...user, ...data } : user)
      );
      return { previousUsers };
    },
    onSuccess: () => {
      toast.success('User updated successfully');
      setIsModalOpen(false);
      setEditingUser(null);
    },
    onError: (err, variables, context) => {
      if (context?.previousUsers) {
        queryClient.setQueryData(['users'], context.previousUsers);
      }
      toast.error(err.response?.data?.message || 'Failed to update user');
    },
    onSettled: () => {
      queryClient.invalidateQueries(['users']);
    }
  });

  const handleEdit = (user) => {
    setEditingUser(user);
    setFormData({
      name: user.name || '',
      user_id: user.user_id || '',
      email: user.email || '',
      role: user.role || 'student',
      dept: user.dept || '',
      intake: user.intake || '',
      section: user.section || ''
    });
    setIsModalOpen(true);
  };

  const handleUpdateSubmit = (e) => {
    e.preventDefault();
    updateMutation.mutate({ id: editingUser._id, data: formData });
  };

  const handleDelete = (id) => {
    setSelectedUserToDelete(id);
    setIsConfirmOpen(true);
  };

  const confirmDelete = () => {
    if (selectedUserToDelete) {
      deleteMutation.mutate(selectedUserToDelete);
    }
  };

  const columns = [
    { key: 'name', label: 'Name' },
    { key: 'user_id', label: 'User ID' },
    { key: 'email', label: 'Email' },
    { 
      key: 'role', 
      label: 'Role',
      render: (role) => <StatusBadge status={role} />
    },
    { key: 'dept', label: 'Department', render: (dept) => dept || '—' },
  ];

  const actions = (user) => (
    <div className="flex justify-end gap-2">
      <button 
        className="btn btn-ghost btn-xs text-info hover:bg-info/10"
        onClick={() => handleEdit(user)}
        title="Edit Role/Info"
      >
        <UserCog size={16} />
      </button>
      <button 
        className="btn btn-ghost btn-xs text-error hover:bg-error/10"
        onClick={() => handleDelete(user._id)}
        title="Delete User"
      >
        <Trash2 size={16} />
      </button>
    </div>
  );

  const filteredUsers = users?.filter(user => 
    user.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.user_id?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const roleCounts = users?.reduce(
    (acc, user) => {
      acc[user.role] = (acc[user.role] || 0) + 1;
      return acc;
    },
    { student: 0, teacher: 0, admin: 0, mod: 0 }
  ) || { student: 0, teacher: 0, admin: 0, mod: 0 };

  return (
    <div className="p-4 space-y-4 bg-slate-50 min-h-screen">
      {/* Role Summary Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
        <StatsCard title="Total Users" value={users?.length || 0} icon={Users} colorClass="blue-500" />
        <StatsCard title="Students" value={roleCounts.student} icon={GraduationCap} colorClass="green-500" />
        <StatsCard title="Teachers" value={roleCounts.teacher} icon={School} colorClass="yellow-500" />
        <StatsCard title="Admins" value={roleCounts.admin} icon={ShieldCheck} colorClass="purple-500" />
        <StatsCard title="Moderators" value={roleCounts.mod} icon={UserCog} colorClass="indigo-500" />
      </div>

      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-gray-800">User Management</h2>
        </div>
        
        <DataTable 
          columns={columns} 
          data={filteredUsers} 
          onSearch={setSearchTerm}
          isLoading={isLoading}
          actions={actions}
        />
      </div>

      {/* Edit User Modal */}
      {isModalOpen && (
        <div className="modal modal-open">
          <div className="modal-box max-w-md bg-white border border-gray-100 shadow-2xl">
            <button 
              className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
              onClick={() => setIsModalOpen(false)}
            >
              <X size={20} />
            </button>
            
            <h3 className="font-bold text-lg mb-6 flex items-center gap-2 text-gray-800">
              <UserCog className="text-primary" />
              Update User Details
            </h3>

            <form onSubmit={handleUpdateSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="form-control w-full">
                  <label className="label">
                    <span className="label-text font-medium text-gray-700">Name</span>
                  </label>
                  <input 
                    type="text" 
                    placeholder="User Name"
                    className="input input-bordered w-full bg-slate-50 border-gray-200 text-gray-700 focus:outline-none focus:ring-2 focus:ring-primary/20"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                  />
                </div>
                <div className="form-control w-full">
                  <label className="label">
                    <span className="label-text font-medium text-gray-700">User ID</span>
                  </label>
                  <input 
                    type="text" 
                    placeholder="Student/Teacher ID"
                    className="input input-bordered w-full bg-slate-50 border-gray-200 text-gray-700 focus:outline-none focus:ring-2 focus:ring-primary/20"
                    value={formData.user_id}
                    onChange={(e) => setFormData({ ...formData, user_id: e.target.value })}
                    required
                  />
                </div>
              </div>

              <div className="form-control w-full">
                <label className="label">
                  <span className="label-text font-medium text-gray-700">Email</span>
                </label>
                <input 
                  type="email" 
                  placeholder="Email Address"
                  className="input input-bordered w-full bg-slate-50 border-gray-200 text-gray-700 focus:outline-none focus:ring-2 focus:ring-primary/20"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                />
              </div>

              <div className="form-control w-full">
                <label className="label">
                  <span className="label-text font-medium text-gray-700">Role</span>
                </label>
                <select 
                  className="select select-bordered w-full bg-slate-50 border-gray-200 text-gray-700 focus:outline-none focus:ring-2 focus:ring-primary/20"
                  value={formData.role}
                  onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                  required
                >
                  <option value="student">Student</option>
                  <option value="teacher">Teacher</option>
                  <option value="mod">Moderator</option>
                  <option value="admin">Administrator</option>
                </select>
              </div>

              <div className="grid grid-cols-1 gap-4">
                <div className="form-control w-full">
                  <label className="label">
                    <span className="label-text font-medium text-gray-700">Department</span>
                  </label>
                  <input 
                    type="text" 
                    placeholder="e.g. CSE, EEE"
                    className="input input-bordered w-full bg-slate-50 border-gray-200 text-gray-700 focus:outline-none focus:ring-2 focus:ring-primary/20"
                    value={formData.dept}
                    onChange={(e) => setFormData({ ...formData, dept: e.target.value })}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="form-control w-full">
                    <label className="label">
                      <span className="label-text font-medium text-gray-700">Intake</span>
                    </label>
                    <input 
                      type="text" 
                      placeholder="e.g. 48, 49"
                      className="input input-bordered w-full bg-slate-50 border-gray-200 text-gray-700 focus:outline-none focus:ring-2 focus:ring-primary/20"
                      value={formData.intake}
                      onChange={(e) => setFormData({ ...formData, intake: e.target.value })}
                    />
                  </div>
                  <div className="form-control w-full">
                    <label className="label">
                      <span className="label-text font-medium text-gray-700">Section</span>
                    </label>
                    <input 
                      type="text" 
                      placeholder="e.g. 1, 2"
                      className="input input-bordered w-full bg-slate-50 border-gray-200 text-gray-700 focus:outline-none focus:ring-2 focus:ring-primary/20"
                      value={formData.section}
                      onChange={(e) => setFormData({ ...formData, section: e.target.value })}
                    />
                  </div>
                </div>
              </div>

              <div className="modal-action mt-8">
                <button 
                  type="button" 
                  className="btn btn-ghost text-gray-500"
                  onClick={() => setIsModalOpen(false)}
                  disabled={updateMutation.isPending}
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  className="btn btn-primary gap-2"
                  disabled={updateMutation.isPending}
                >
                  {updateMutation.isPending ? (
                    <span className="loading loading-spinner loading-sm"></span>
                  ) : (
                    <Save size={18} />
                  )}
                  Save Changes
                </button>
              </div>
            </form>
          </div>
          <div className="modal-backdrop bg-black/40 backdrop-blur-sm" onClick={() => setIsModalOpen(false)}></div>
        </div>
      )}

      <ConfirmModal 
        isOpen={isConfirmOpen}
        title="Delete User"
        message="Are you sure you want to delete this user? This action cannot be undone."
        isLoading={deleteMutation.isPending}
        onConfirm={confirmDelete}
        onCancel={() => setIsConfirmOpen(false)}
      />
    </div>
  );
};

export default UserManage;