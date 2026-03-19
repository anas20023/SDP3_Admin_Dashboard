const StatusBadge = ({ status }) => {
  const getStatusConfig = (status) => {
    switch (status?.toLowerCase()) {
      case 'approved':
      case 'active':
        return { color: 'badge-success', label: 'Approved' };
      case 'feature':
        return { color: 'badge-success', label: 'Feature' };
      case 'bug':
        return { color: 'badge-error', label: 'Bug' };
      case 'content':
        return { color: 'badge-warning', label: 'Content' };
      case 'others':
        return { color: 'badge-info', label: 'Others' };
      case 'pending':
        return { color: 'badge-warning', label: 'Pending' };
      case 'rejected':
      case 'inactive':
        return { color: 'badge-error', label: 'Rejected' };
      default:
        return { color: 'badge-ghost', label: status || 'Unknown' };
    }
  };

  const { color, label } = getStatusConfig(status);

  return (
    <div className={`badge ${color} badge-sm font-medium`}>
      {label}
    </div>
  );
};

export default StatusBadge;
