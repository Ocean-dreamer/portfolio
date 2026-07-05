import Header from '../../components/layout/Header';
import HeroSection from '../../components/sections/HeroSection';
import ExperienceSection from '../../components/sections/ExperienceSection';
import SkillSection from '../../components/sections/SkillSection';
import ProjectsSection from '../../components/sections/ProjectsSection';
import CertificationsSection from '../../components/sections/CertificationsSection';
import EducationSection from '../../components/sections/EducationSection';
import ContactSection from '../../components/sections/ContactSection';
import Footer from '../../components/layout/Footer';
import ScrollSpy from '../../components/ScrollSpy';


const Home = () => {
  return (
    <div className="grid-pattern min-h-screen font-space">
      <Header />
      <ScrollSpy />
      <HeroSection />
      <ExperienceSection />
      <SkillSection />
      <EducationSection />
      <CertificationsSection />
      <ProjectsSection />
      <ContactSection />
      <Footer/>
    </div>
  );
}

export default Home;