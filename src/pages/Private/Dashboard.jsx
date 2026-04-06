import React, { useState } from "react";
import { NavLink, Outlet } from "react-router-dom";
import { LogOut, Menu, ChevronLeft, ChevronRight, X, AlertTriangle } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import roles from "../../utils/userRoles";
import { toast } from "react-toastify";

const Dashboard = () => {
  const { logout, user } = useAuth();
  const [collapsed, setCollapsed] = useState(false);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const roleKey = user?.role || "user";
  const roleConfig = roles[roleKey] || roles.user;
  const RoleIcon = roleConfig.icon;
  const menuItems = roleConfig.menu;

  const toggleSidebar = () => setCollapsed((prev) => !prev);

  const handleLogoutClick = () => {
    setIsLogoutModalOpen(true);
  };

  const confirmLogout = async () => {
    setIsLoggingOut(true);
    try {
      await logout();
      toast.success("Logged out successfully");
      // eslint-disable-next-line no-unused-vars
    } catch (error) {
      toast.error("Logout failed. Please try again.");
      setIsLoggingOut(false);
      setIsLogoutModalOpen(false);
    }
  };

  return (
    <div className="drawer lg:drawer-open">
      <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />

      <div className="drawer-content flex flex-col">
        {/* Navbar */}
        <nav className="navbar bg-white shadow px-4">
          <div className="flex-1 flex items-center">
            <label
              htmlFor="my-drawer-4"
              className="btn btn-square btn-ghost lg:hidden"
            >
              <Menu className="size-6" />
            </label>

            <button
              onClick={toggleSidebar}
              className="btn btn-ghost btn-square hidden md:inline-flex ml-2"
              aria-label="Toggle sidebar"
            >
              {collapsed ? (
                <ChevronRight className="size-5" />
              ) : (
                <ChevronLeft className="size-5" />
              )}
            </button>

            <div className="px-2 text-lg font-semibold">Dashboard</div>
          </div>

          <div className="flex-none">
            {user && (
              <button className="btn gap-2">
                <RoleIcon size={18} color={roleConfig.color} />
                {roleConfig.label}
              </button>
            )}
          </div>
        </nav>

        {/* Page Content */}
        <Outlet context={{ role: roleConfig }} />
      </div>

      <div className="drawer-side z-50">
        <label htmlFor="my-drawer-4" aria-label="close sidebar" className="drawer-overlay"></label>

        <div className={`flex min-h-full flex-col bg-base-300 p-4 transition-all duration-300 ${collapsed ? "w-20 overflow-x-hidden" : "w-64"}`}>
          {/* User Profile */}
          {user && (
            <div className="mb-6 flex items-center gap-3 rounded-box bg-base-100 p-3">
              <div className="avatar avatar-online avatar-placeholder">
                <div className={`bg-neutral text-neutral-content rounded-full ${collapsed ? "w-6" : "w-8"}`}>
                  <span className="text-xl">{user.name?.charAt(0).toUpperCase()}</span>
                </div>
              </div>

              <div
                className={`overflow-hidden transition-all ${collapsed ? "hidden" : "block"
                  }`}
              >
                <div className="font-semibold truncate text-base-content">
                  {user.name}
                </div>
                <div className="text-xs opacity-70 text-base-content/70">
                  {user.email}
                </div>
              </div>
            </div>
          )}

          {/* Menu */}
          <ul className="menu menu-vertical w-full gap-1 p-0">
            {menuItems.map((item) => {
              const Icon = item.icon;

              return (
                <li key={item.to} className="w-full">
                  <NavLink
                    to={item.to}
                    end={item.to === "/dashboard"}
                    className={({ isActive }) =>
                      `flex items-center gap-2 px-3 py-2 rounded-md transition-colors w-full ${isActive
                        ? "bg-primary text-primary-content"
                        : "text-base-content hover:bg-base-200"
                      } ${collapsed ? "justify-center" : ""}`
                    }
                  >
                    <Icon className="size-5 shrink-0" />
                    <span
                      className={
                        collapsed
                          ? "hidden"
                          : "text-sm font-medium truncate py-2"
                      }
                    >
                      {item.label}
                    </span>
                  </NavLink>
                </li>
              );
            })}
          </ul>

          {/* Logout */}
          <button
            onClick={handleLogoutClick}
            className={`btn btn-error mt-auto ${collapsed ? "btn-square" : ""
              }`}
          >
            <LogOut className="size-5" />
            {!collapsed && <span>Logout</span>}
          </button>
        </div>
      </div>

      {/* Logout Confirmation Modal */}
      {isLogoutModalOpen && (
        <div className="modal modal-open">
          <div className="modal-box max-w-sm bg-white border border-gray-100 shadow-2xl">
            <div className="flex flex-col items-center text-center py-4">
              <div className="bg-error/10 p-4 rounded-full mb-4 text-error">
                <AlertTriangle size={36} />
              </div>
              <h3 className="font-bold text-xl text-gray-800">Confirm Logout</h3>
              <p className="py-4 text-gray-600">
                Are you sure you want to end your session? You'll need to log in again to access the dashboard.
              </p>
            </div>

            <div className="flex gap-3 justify-center mt-4">
              <button
                className="btn btn-ghost flex-1 text-gray-500"
                onClick={() => !isLoggingOut && setIsLogoutModalOpen(false)}
                disabled={isLoggingOut}
              >
                Cancel
              </button>
              <button
                className="btn btn-error flex-1 gap-2"
                onClick={confirmLogout}
                disabled={isLoggingOut}
              >
                {isLoggingOut ? (
                  <span className="loading loading-spinner loading-md"></span>
                ) : (
                  <LogOut size={18} />
                )}
                Logout
              </button>
            </div>
          </div>
          <div className="modal-backdrop bg-black/40 backdrop-blur-sm" onClick={() => !isLoggingOut && setIsLogoutModalOpen(false)}></div>
        </div>
      )}

      {/* Full Page Loading Overlay during Logout */}
      {isLoggingOut && (
        <div className="fixed inset-0 z-100 flex items-center justify-center bg-white/60 backdrop-blur-sm">
          <div className="flex flex-col items-center gap-4">
            <span className="loading loading-spinner loading-lg text-primary"></span>
            <p className="font-medium text-gray-700">Logging you out safely...</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;