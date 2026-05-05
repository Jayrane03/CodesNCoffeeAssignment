import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link, useNavigate } from "react-router-dom";
import { useTicketStore } from "../store/ticketStore";

export default function TicketCard({ ticket }) {
  const navigate = useNavigate();
  const { deleteTicket } = useTicketStore();

  const getPriorityColor = (priority) => {
    if (priority === "high") return "bg-red-500/20 text-red-400 border-red-500/30";
    if (priority === "medium") return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30";
    return "bg-green-500/20 text-green-400 border-green-500/30";
  };

  const getStatusColor = (status) => {
    if (status === "open") return "bg-blue-500/20 text-blue-400 border-blue-500/30";
    if (status === "in-progress") return "bg-purple-500/20 text-purple-400 border-purple-500/30";
    return "bg-green-500/20 text-green-400 border-green-500/30";
  };

  const handleDelete = async (e) => {
    e.preventDefault(); // 🚨 stop Link navigation
    e.stopPropagation();

    const confirmDelete = window.confirm("Delete this ticket?");
    if (!confirmDelete) return;

    await deleteTicket(ticket._id);
  };

  const handleEdit = (e) => {
    e.preventDefault(); // 🚨 stop Link navigation
    e.stopPropagation();

    navigate(`/edit/${ticket._id}`);
  };

  return (
    <Link to={`/ticket/${ticket._id}`}>
      <Card className="bg-card border border-border rounded-xl hover:shadow-xl hover:bg-accent/50 transition-all duration-200">
        <CardContent className="p-4 space-y-3">

          {/* Title */}
          <div>
            <h3 className="font-semibold text-base">{ticket.title}</h3>
            <p className="text-sm text-muted-foreground line-clamp-2">
              {ticket.description}
            </p>
          </div>

          {/* Status + Priority */}
          <div className="flex justify-between items-center">
            <Badge className={`${getStatusColor(ticket.status)} border`}>
              {ticket.status === "closed" ? "Resolved" : ticket.status}
            </Badge>

            <Badge className={`${getPriorityColor(ticket.priority)} border`}>
              {ticket.priority}
            </Badge>
          </div>

          {/* Actions */}
          <div className="flex gap-2 pt-2">
            <button
              onClick={handleEdit}
              className="text-sm px-3 py-1 rounded bg-blue-500 text-white hover:bg-blue-600"
            >
              Edit
            </button>

            <button
              onClick={handleDelete}
              className="text-sm px-3 py-1 rounded bg-red-500 text-white hover:bg-red-600"
            >
              Delete
            </button>
          </div>

        </CardContent>
      </Card>
    </Link>
  );
}