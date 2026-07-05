// frontend/src/components/layout/Sidebar.tsx
import { NavLink, useNavigate } from "react-router-dom";
import { logout } from "../../utils/auth";
import {
  HomeIcon,
  UserIcon,
  BriefcaseIcon,
  AcademicCapIcon,
  StarIcon,
  FolderIcon,
  DocumentTextIcon,
  ArrowLeftOnRectangleIcon,
} from "@heroicons/react/24/outline";

const Sidebar = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/irican");
  };

  const menuItems = [
    { path: "/irican/dashboard", icon: HomeIcon, label: "Overview" },
    { path: "/irican/dashboard/profile", icon: UserIcon, label: "Profile" },
    { path: "/irican/dashboard/experience", icon: BriefcaseIcon, label: "Experience" },
    { path: "/irican/dashboard/education", icon: AcademicCapIcon, label: "Education" },
    { path: "/irican/dashboard/skills", icon: StarIcon, label: "Skills" },
    { path: "/irican/dashboard/projects", icon: FolderIcon, label: "Projects" },
    { path: "/irican/dashboard/certifications", icon: AcademicCapIcon, label: "Certifications" },
    { path: "/irican/dashboard/blog", icon: DocumentTextIcon, label: "Blog" },
  ];

  return (
    <aside className="w-64 bg-gray-900 text-white min-h-screen fixed left-0 top-0 flex flex-col">
      {/* Logo/Brand */}
      <div className="p-6 border-b border-gray-700">
        <h1 className="text-2xl font-bold bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 bg-clip-text text-transparent">
          IRICAN
        </h1>
        <p className="text-gray-400 text-sm mt-1">Admin Dashboard</p>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
        {menuItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                isActive
                  ? "bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 text-white shadow-lg"
                  : "text-gray-400 hover:bg-gray-800 hover:text-white"
              }`
            }
          >
            <item.icon className="w-5 h-5" />
            <span className="font-medium">{item.label}</span>
          </NavLink>
        ))}
      </nav>

      {/* Logout Button */}
      <div className="p-4 border-t border-gray-700">
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 w-full px-4 py-3 rounded-lg text-gray-400 hover:bg-red-500 hover:text-white transition-all duration-200"
        >
          <ArrowLeftOnRectangleIcon className="w-5 h-5" />
          <span className="font-medium">Logout</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;