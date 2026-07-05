import { useEffect, useState } from "react";
import { useNavigate, Outlet } from "react-router-dom";
import { checkAuth } from "../../utils/auth";
import Sidebar from "../../components/layout/Sidebar";

const Dashboard = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const verifyAuth = async () => {
      console.log("Checking auth...");
      const isAuth = await checkAuth();
      console.log("Is authenticated:", isAuth);
      if (!isAuth) {
        console.log("Not authenticated, redirecting...");
        navigate("/irican");
      }
      setLoading(false);
    };
    verifyAuth();
  }, [navigate]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-950">
        <div className="text-white text-xl">Loading...</div>
      </div>
    );
  }

  console.log("Rendering dashboard"); // ADD THIS

  return (
    <div className="flex bg-gray-950 min-h-screen">
      <Sidebar />
      <main className="ml-64 flex-1 p-8">
        <Outlet />
      </main>
    </div>
  );
};

export default Dashboard;