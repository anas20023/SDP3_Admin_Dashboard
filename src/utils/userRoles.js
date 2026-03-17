import {
  Home,
  Users,
  Settings,
  BarChart3,
  User,
  Crown,
  Presentation,CircleDollarSign,
  ShieldCheck 
} from "lucide-react";

const roles = {
  admin: {
    label: "ADMIN",
    icon: Settings,
    color: "#dc2626",

    permissions: [
      "view_dashboard",
      "manage_users",
      "manage_subscriptions",
      "approval",
      "system_settings"
    ],

    menu: [
      { to: "/dashboard", label: "Dashboard", icon: Home },
      { to: "/dashboard/users", label: "Users", icon: Users },
      { to: "/dashboard/subscriptions", label: "Subscriptions", icon: CircleDollarSign },
      { to: "/dashboard/suggestions", label: "Suggestions", icon: ShieldCheck }
    ]
  },

  teacher: {
    label: "TEACHER",
    icon: Presentation,
    color: "#059669",

    permissions: [
      "view_dashboard",
      "approval",
    ],

    menu: [
      { to: "/dashboard", label: "Dashboard", icon: Home },
      { to: "/dashboard/suggestions", label: "Suggestions", icon: ShieldCheck }
    ]
  },

  mod: {
    label: "MODERATOR",
    icon: Crown,
    color: "#7c3aed",

    permissions: [
      "view_dashboard",
      "manage_users",
      "approval",
    ],

    menu: [
      { to: "/dashboard", label: "Dashboard", icon: Home },
      { to: "/dashboard/users", label: "Users", icon: Users },
      { to: "/dashboard/suggestions", label: "Suggestions", icon: ShieldCheck }
    ]
  },

  user: {
    label: "USER",
    icon: User,
    color: "#2563eb",

    permissions: [
      "view_dashboard"
    ],

    menu: [
      { to: "/dashboard", label: "Dashboard", icon: Home },
      { to: "/dashboard/profile", label: "Profile", icon: User },
      { to: "/dashboard/settings", label: "Settings", icon: Settings }
    ]
  }
};
export default roles