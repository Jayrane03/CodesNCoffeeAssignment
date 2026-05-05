import { Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  Plus,
  Sparkles,
  CircleDot,
  Menu,
  X,
} from "lucide-react";
import { useState, useEffect } from "react";

export default function Sidebar() {
  const location = useLocation();
  const [open, setOpen] = useState(false);

  // ✅ Prevent background scroll when sidebar open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [open]);

  const linkClass = (path) =>
    `flex items-center gap-2 p-2 rounded transition ${
      location.pathname === path
        ? "bg-gray-700"
        : "hover:bg-gray-800"
    }`;

  return (
    <>
      {/* 🔥 Mobile Top Bar */}
      <div className="md:hidden flex items-center justify-between p-4 bg-gray-900 text-white fixed top-0 left-0 right-0 z-50 shadow">
        <h1 className="text-lg font-bold">AI Support</h1>
        <button onClick={() => setOpen(true)}>
          <Menu />
        </button>
      </div>

      {/* 🔥 Overlay */}
      {open && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      {/* 🔥 Sidebar */}
      <div
        className={`
          fixed top-0 left-0 h-screen w-64 bg-gray-900 text-white p-5 flex flex-col justify-between z-50
          transform transition-transform duration-300
          ${open ? "translate-x-0" : "-translate-x-full"}
          md:translate-x-0 md:static
        `}
      >
        {/* Close button (mobile) */}
        <div className="md:hidden flex justify-end mb-4">
          <button onClick={() => setOpen(false)}>
            <X />
          </button>
        </div>

        {/* TOP */}
        <div>
          <h1 className="text-xl font-bold mb-6 hidden md:block">
            AI Support
          </h1>

          {/* Navigation */}
          <div className="flex flex-col gap-2 mb-6">
            <Link
              to="/"
              className={linkClass("/")}
              onClick={() => setOpen(false)}
            >
              <LayoutDashboard size={18} /> Dashboard
            </Link>

            <Link
              to="/create"
              className={linkClass("/create")}
              onClick={() => setOpen(false)}
            >
              <Plus size={18} /> Create Ticket
            </Link>
          </div>

          {/* AI Panel */}
          <div>
            <h2 className="text-sm text-gray-400 mb-2 flex items-center gap-2">
              <Sparkles size={14} /> AI Panel
            </h2>

            <div className="bg-gray-800 p-3 rounded text-sm space-y-2">
              <p>• Auto classify tickets</p>
              <p>• Suggest replies</p>
              <p>• Priority detection</p>
            </div>
          </div>
        </div>

        {/* BOTTOM */}
        <div className="mt-6 border-t border-gray-700 pt-4 text-sm">
          <div className="flex items-center gap-2">
            <CircleDot size={12} className="text-green-400" />
            System Online
          </div>
        </div>
      </div>
    </>
  );
}