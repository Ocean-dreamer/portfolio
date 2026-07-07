// frontend/src/App.tsx (UPDATE)
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { SectionProvider } from './context/SectionContext';
import NotFound from './pages/NotFound';
import Home from './pages/Home/Home';
import Login from "./pages/Admin/Login";
import ResetPassword from './pages/Admin/ResetPassword';
import Dashboard from './pages/Admin/Dashboard';
import DashboardHome from './pages/Admin/DashboardHome';
import ProfileManager from './pages/Admin/ProfileManager';
import BlogManager from './pages/Admin/BlogManager';
import SkillsManager from './pages/Admin/SkillsManager';
// import ExperienceManager from './pages/Admin/ExperienceManager';
import EducationManager from './pages/Admin/EducationManager';
import ProjectsManager from './pages/Admin/ProjectsManager';
import CertificationsManager from './pages/Admin/CertificationsManager';
import Blog from './pages/Blog/Blog';
import JourneyMap from "./components/JourneyMap";

import './styles/globals.css';

export default function App() {
  return (
    <SectionProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/irican" element={<Login />} />
          <Route path="/irican/reset_password" element={<ResetPassword />} />
          
          {/* Dashboard with nested routes */}
          <Route path="/irican/dashboard" element={<Dashboard />}>
            <Route index element={<DashboardHome />} />
            <Route path="profile" element={<ProfileManager />} />
            {/* <Route path="experience" element={<ExperienceManager />} /> */}
            <Route path="education" element={<EducationManager />} />
            <Route path="journey" element={<JourneyMap />} />
            <Route path="projects" element={<ProjectsManager />} />
            <Route path="skills" element={<SkillsManager />} />
            <Route path="certifications" element={<CertificationsManager />} />
            <Route path="blog" element={<BlogManager />} />
            {/* Add other managers here */}
          </Route>
          
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </SectionProvider>
  );
}