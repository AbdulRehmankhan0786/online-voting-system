import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

function DashboardLayout({ children }) {
  return (
    <div className="min-h-screen bg-gray-100">
      
      <Navbar />

      <div className="flex">
        
        {/* Sidebar */}
        <Sidebar />

        {/* Main Content */}
        <div className="flex-1 p-8 transition-all duration-300">
          <div className="bg-white rounded-3xl shadow-lg p-8 min-h-[80vh]">
            {children}
          </div>
        </div>

      </div>

    </div>
  );
}

export default DashboardLayout;
