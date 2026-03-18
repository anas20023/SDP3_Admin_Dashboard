import React, { useState } from "react";
import { NavLink, Outlet } from "react-router-dom";
import { LogOut, Menu, ChevronLeft, ChevronRight } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import roles from "../../utils/userRoles";

const Dashboard = () => {
  const { logout, user } = useAuth();
  const [collapsed, setCollapsed] = useState(false);

  const roleKey = user?.role || "user";
  const roleConfig = roles[roleKey] || roles.user;
  const RoleIcon = roleConfig.icon;
  const menuItems = roleConfig.menu;

  const toggleSidebar = () => setCollapsed((prev) => !prev);

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
                <div className={`bg-neutral text-neutral-content rounded-full ${collapsed?"w-6":"w-8"}`}>
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
            onClick={logout}
            className={`btn btn-error mt-auto ${collapsed ? "btn-square" : ""
              }`}
          >
            <LogOut className="size-5" />
            {!collapsed && <span>Logout</span>}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;