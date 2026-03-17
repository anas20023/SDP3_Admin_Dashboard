import React from "react";
import { NavLink } from "react-router-dom";
import { LogOut, Menu } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import roles from "../../utils/userRoles";
import Analytics from "../../components/Analytics";

const Dashboard = () => {
  const { logout, user } = useAuth();

  const roleKey = user?.role || "user";
  const roleConfig = roles[roleKey] || roles.user;

  const RoleIcon = roleConfig.icon;
  const menuItems = roleConfig.menu;

  return (
    <div className="drawer lg:drawer-open">
      <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />

      <div className="drawer-content flex flex-col">
        {/* Navbar */}
        <nav className="navbar bg-base-200 shadow-md px-4">
          <div className="flex-1 flex items-center">
            <label
              htmlFor="my-drawer-4"
              className="btn btn-square btn-ghost lg:hidden"
            >
              <Menu className="size-6" />
            </label>

            <div className="px-2 text-lg font-semibold">
              Dashboard
            </div>
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
        <Analytics role={roleConfig}/>
      </div>

      {/* Sidebar */}
      <div className="drawer-side">
        <label htmlFor="my-drawer-4" className="drawer-overlay"></label>

        <div className="flex min-h-full w-64 flex-col bg-base-200 p-4">
          {/* User Profile */}
          {user && (
            <div className="mb-6 flex items-center gap-3 rounded-box bg-base-300 p-3">
              <div className="avatar placeholder">
                <div className="w-10 rounded-full bg-primary text-neutral-content">
                  <p className="text-lg text-center pt-1.5">
                    {user.name?.charAt(0).toUpperCase()}
                  </p>
                </div>
              </div>

              <div className="overflow-hidden">
                <div className="font-semibold truncate">
                  {user.name}
                </div>
                <div className="text-xs opacity-70">
                  {user.email}
                </div>
              </div>
            </div>
          )}

          {/* Menu */}
          <ul className="menu menu-lg rounded-box flex-1 gap-1 w-full">
            {menuItems.map((item) => {
              const Icon = item.icon;

              return (
                <li key={item.to}>
                  <NavLink
                    to={item.to}
                    className={({ isActive }) =>
                      isActive
                        ? "active bg-primary text-primary-content"
                        : ""
                    }
                    end={item.to === "/dashboard"}
                  >
                    <Icon className="size-5" />
                    {item.label}
                  </NavLink>
                </li>
              );
            })}
          </ul>

          {/* Logout */}
          <button
            onClick={logout}
            className="btn btn-error btn-block mt-4"
          >
            <LogOut className="size-5 mr-2" />
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;