import Sidebar from "../Sidebar";
import { Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <div className="flex">

      <Sidebar />

      {/* Content */}
      <main className="flex-1 p-4 md:p-6 bg-background min-h-screen mt-10">
        <Outlet />
      </main>

    </div>
  );
}