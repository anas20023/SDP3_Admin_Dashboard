// User.jsx
const User = ({ user }) => {
    // Format dates to readable strings
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
        });
    };

    // Role badge color mapping
    const roleColors = {
        student: "bg-green-100 text-green-800",
        teacher: "bg-blue-100 text-blue-800",
        admin: "bg-purple-100 text-purple-800",
        mod: "bg-yellow-100 text-yellow-800",
    };

    return (
        <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden">
            {/* Header with user_id and role badge */}
            <div className="bg-gray-50 px-4 py-3 border-b flex justify-between items-center">
                <span className="text-sm font-mono text-gray-600">{user.user_id}</span>
                <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold uppercase ${roleColors[user.role] || "bg-gray-100 text-gray-800"
                        }`}
                >
                    {user.role}
                </span>
            </div>

            {/* Main content */}
            <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-800 mb-1">
                    {user.name}
                </h3>
                <p className="text-sm text-gray-600 mb-3">{user.email}</p>

                {/* Details grid */}
                <div className="grid grid-cols-2 gap-2 text-sm mb-4">
                    <div>
                        <span className="text-gray-500">Dept:</span>{" "}
                        <span className="font-medium">{user.dept || "—"}</span>
                    </div>
                    <div>
                        <span className="text-gray-500">Intake:</span>{" "}
                        <span className="font-medium">{user.intake || "—"}/{user.section || "—"}</span>
                    </div>
                </div>

                {/* Dates */}
                <div className="text-xs text-gray-500 space-y-1 mb-4">
                    <div className="flex justify-between">
                        <span>Created:</span>
                        <span className="font-medium">{formatDate(user.createdAt)}</span>
                    </div>
                    <div className="flex justify-between">
                        <span>Updated:</span>
                        <span className="font-medium">{formatDate(user.updatedAt)}</span>
                    </div>
                </div>

                {/* Action buttons */}
                <div className="flex gap-2 mt-2">
                    <button
                        className="flex-1 bg-blue-50 hover:bg-blue-100 text-blue-700 font-medium py-2 px-3 rounded-lg text-sm transition-colors"
                        onClick={() => alert(`Change role for ${user.name} (to be implemented)`)}
                    >
                        Change Role
                    </button>
                    <button
                        className="flex-1 bg-gray-50 hover:bg-gray-100 text-gray-700 font-medium py-2 px-3 rounded-lg text-sm transition-colors"
                        onClick={() => alert(`Edit ${user.name} (to be implemented)`)}
                    >
                        Edit
                    </button>
                </div>
            </div>
        </div>
    );
};

export default User;