import { useState } from "react";

export default function Filters({ setFilter, tickets = [] }) {
  const [active, setActive] = useState("all");

  const handleFilter = (value) => {
    setActive(value);
    setFilter(value);
  };

  // ✅ Count logic
 const counts = {
  all: tickets?.length || 0,
  open: tickets?.filter((t) => t.status === "open").length || 0,
  "in-progress": tickets?.filter((t) => t.status === "in-progress").length || 0,
  resolved: tickets?.filter((t) => t.status === "closed").length || 0,
};
  const base = "px-4 py-2 rounded-lg text-sm font-medium transition";
  const activeStyle = "bg-blue-600 text-white shadow";
  const inactiveStyle = "bg-gray-100 text-gray-600 hover:bg-gray-200";

  return (
    <div className="flex gap-2 mb-4">

      <button
        onClick={() => handleFilter("all")}
        className={`${base} ${active === "all" ? activeStyle : inactiveStyle}`}
      >
        All ({counts.all})
      </button>

      <button
        onClick={() => handleFilter("open")}
        className={`${base} ${active === "open" ? activeStyle : inactiveStyle}`}
      >
        Open ({counts.open})
      </button>

      <button
        onClick={() => handleFilter("in-progress")}
        className={`${base} ${active === "in-progress" ? activeStyle : inactiveStyle}`}
      >
        In Progress ({counts["in-progress"]})
      </button>

      <button
        onClick={() => handleFilter("resolved")}
        className={`${base} ${active === "resolved" ? activeStyle : inactiveStyle}`}
      >
        Resolved ({counts.resolved})
      </button>

    </div>
  );
}