import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useTicketStore } from "../store/ticketStore";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import AIPanel from "../components/AIPanel";

export default function TicketDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const { tickets, fetchTickets, updateTicketStatus } = useTicketStore();
  const [ticket, setTicket] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      await fetchTickets();
      setLoading(false);
    };
    load();
  }, []);

  useEffect(() => {
    if (tickets?.length) {
      const found = tickets.find((t) => t._id === id);
      setTicket(found);
    }
  }, [tickets, id]);

 const handleStatusChange = async (status) => {
  console.log("Updating to:", status);

  await updateTicketStatus(id, status);

  console.log("Done update");

  await fetchTickets();
};



  if (loading) {
    return <div className="p-6">Loading ticket...</div>;
  }

  if (!ticket) {
    return <div className="p-6 text-red-500">Ticket not found</div>;
  }

  const getStatusColor = (status) => {
    if (status === "open") return "bg-blue-500/20 text-blue-400 border-blue-500/30";
    if (status === "in-progress") return "bg-purple-500/20 text-purple-400 border-purple-500/30";
    return "bg-green-500/20 text-green-400 border-green-500/30";
  };

  const getPriorityColor = (priority) => {
    if (priority === "high") return "bg-red-500/20 text-red-400 border-red-500/30";
    if (priority === "medium") return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30";
    return "bg-green-500/20 text-green-400 border-green-500/30";
  };

  return (
    <div className="p-6 max-w-3xl space-y-6">

      {/* Back */}
      <Button variant="outline" onClick={() => navigate(-1)}>
        ← Back
      </Button>

      {/* Title */}
      <div>
        <h1 className="text-2xl font-semibold">{ticket.title}</h1>
        <p className="text-sm text-muted-foreground">
          Ticket ID: {ticket._id}
        </p>
      </div>

      {/* Status + Priority */}
      <div className="flex gap-3">
        <Badge className={`border ${getStatusColor(ticket.status)}`}>
          {ticket.status || "unknown"}
        </Badge>

        <Badge className={`border ${getPriorityColor(ticket.priority)}`}>
          {ticket.priority || "low"}
        </Badge>
      </div>

      {/* Description */}
      <div className="bg-muted p-4 rounded-lg">
        <p>{ticket.description}</p>
      </div>

      {/* Actions */}
      <div className="flex flex-wrap gap-3">

        <Button
          disabled={ticket.status === "open"}
          className={`${
            ticket.status === "open"
              ? "bg-blue-300 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700"
          } text-white`}
          onClick={() => handleStatusChange("open")}
        >
          Mark Open
        </Button>

        <Button
          disabled={ticket.status === "in-progress"}
          className={`${
            ticket.status === "in-progress"
              ? "bg-yellow-300 cursor-not-allowed"
              : "bg-yellow-500 hover:bg-yellow-600"
          } text-black`}
          onClick={() => handleStatusChange("in-progress")}
        >
          In Progress
        </Button>

        <Button
          disabled={ticket.status === "closed"}
          className={`${
            ticket.status === "closed"
              ? "bg-red-300 cursor-not-allowed"
              : "bg-red-600 hover:bg-red-700"
          } text-white`}
          onClick={() => handleStatusChange("closed")}
        >
          Close Ticket
        </Button>

      </div>

      {/* AI Panel */}
      <AIPanel ticketId={ticket._id} />

    </div>
  );
}