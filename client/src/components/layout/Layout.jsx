import { Outlet, useLocation } from "react-router-dom";
import Sidebar from "@/components/Sidebar";

export default function Layout() {
  const location = useLocation();

  // Map route → title
  const getTitle = () => {
    switch (location.pathname) {
      case "/":
        return "Dashboard";
      case "/create":
        return "Create Ticket";
      default:
        return "AI Support";
    }
  };

  return (
    <div className="flex min-h-screen">
      
      {/* Sidebar */}
      <Sidebar />

      {/* Main Area */}
      <div className="flex-1 flex flex-col">
        
        {/* Header */}
        <header className="h-16 flex items-center border-b px-6">
          <h1 className="text-lg font-semibold">{getTitle()}</h1>
        </header>

        {/* Page Content */}
        <main className="p-4 flex-1">
          <Outlet />
        </main>

      </div>
    </div>
  );
}