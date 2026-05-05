import { Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  Plus,
  Filter,
  Sparkles,
  CircleDot,
} from "lucide-react";

export default function Sidebar({ setFilter }) {
  const location = useLocation();

  const linkClass = (path) =>
    `flex items-center gap-2 p-2 rounded transition ${
      location.pathname === path
        ? "bg-gray-700"
        : "hover:bg-gray-800"
    }`;

  return (
    <div className="w-64 min-h-screen bg-gray-900 text-white p-5 flex flex-col justify-between">
      
      {/* TOP */}
      <div>
        <h1 className="text-xl font-bold mb-6">AI Support</h1>

        {/* Navigation */}
        <div className="flex flex-col gap-2 mb-6">
          <Link to="/" className={linkClass("/")}>
            <LayoutDashboard size={18} /> Dashboard
          </Link>

          <Link to="/create" className={linkClass("/create")}>
            <Plus size={18} /> Create Ticket
          </Link>
        </div>

        {/* Filters */}
        {/* <div className="mb-6">
          <h2 className="text-sm text-gray-400 mb-2 flex items-center gap-2">
            <Filter size={14} /> Filters
          </h2>

          <div className="flex flex-col gap-2 text-sm">
            <button
              onClick={() => setFilter("all")}
              className="text-left hover:text-blue-400"
            >
              All Tickets
            </button>

            <button
              onClick={() => setFilter("open")}
              className="text-left hover:text-green-400"
            >
              Open
            </button>

            <button
              onClick={() => setFilter("pending")}
              className="text-left hover:text-yellow-400"
            >
              Pending
            </button>

            <button
              onClick={() => setFilter("closed")}
              className="text-left hover:text-red-400"
            >
              Closed
            </button>
          </div>
        </div> */}

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

      {/* BOTTOM (Optional Stats) */}
      <div className="mt-6 border-t border-gray-700 pt-4 text-sm">
        <div className="flex items-center gap-2">
          <CircleDot size={12} className="text-green-400" />
          System Online
        </div>
      </div>
    </div>
  );
}