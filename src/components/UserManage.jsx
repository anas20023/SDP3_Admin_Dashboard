import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { UserCog, Trash2, Edit, Users, ShieldCheck, GraduationCap, School } from 'lucide-react';
import { manageApi } from '../services/api';
import DataTable from './common/DataTable';
import StatsCard from './common/StatsCard';
import StatusBadge from './common/StatusBadge';

const UserManage = () => {
  const queryClient = useQueryClient();
  const [searchTerm, setSearchTerm] = useState('');

  const { data: users, isLoading } = useQuery({
    queryKey: ['users'],
    queryFn: manageApi.getUsers,
  });

  const deleteMutation = useMutation({
    mutationFn: manageApi.deleteUser,
    onSuccess: () => {
      queryClient.invalidateQueries(['users']);
      alert('User deleted successfully');
    },
  });

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      deleteMutation.mutate(id);
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
        onClick={() => alert(`Edit role/info for ${user.name} (to be implemented)`)}
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
    </div>
  );
};

export default UserManage;