import { useEffect, useState } from "react";
import { useTicketStore } from "../store/ticketStore";
import TicketCard from "../components/TicketCard";
import SkeletonLoader from "../components/SkeletonLoader";
import Filters from "../components/Filters";
// import toast from "react-hot-toast";
export default function Dashboard() {
  const { tickets = [], fetchTickets, loading } = useTicketStore();
  const [filter, setFilter] = useState("all");
const [search, setSearch] = useState("");
  useEffect(() => {
    fetchTickets();
  }, []);

  const filtered = tickets
  .filter((t) => {
    if (filter === "resolved") return t.status === "closed";
    if (filter === "all") return true;
    return t.status === filter;
  })
  .filter((t) =>
    t.title.toLowerCase().includes(search.toLowerCase()) ||
    t.description.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-6 space-y-6">

      {/* Header */}
      <div>
        <h1 className="text-2xl font-semibold">Tickets Dashboard</h1>
        <p className="text-sm text-muted-foreground">
          Manage and track all support tickets
        </p>
      </div>
    
<input
  type="text"
  placeholder="Search tickets..."
  value={search}
  onChange={(e) => setSearch(e.target.value)}
  className="w-full p-2 border rounded-lg mb-4 bg-transparent"
/>
      {/* Filters */}
    <Filters setFilter={setFilter} tickets={tickets} />

      {/* Content */}
      {loading ? (
        <SkeletonLoader />
      ) : filtered.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <h2 className="text-lg font-medium">No tickets found</h2>
          <p className="text-sm text-muted-foreground">
            Try changing filter or create a new ticket
          </p>
        </div>
      ) : (
        <div className="
          grid 
          gap-4 
          grid-cols-1 
          sm:grid-cols-2 
          lg:grid-cols-3
        ">
          {filtered.map((t) => (
            <TicketCard key={t._id} ticket={t} />
          ))}
        </div>
      )}
    </div>
  );
}