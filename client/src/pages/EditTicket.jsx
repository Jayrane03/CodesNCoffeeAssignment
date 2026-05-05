import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useTicketStore } from "../store/ticketStore";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import toast from "react-hot-toast";
export default function EditTicket() {
  const { id } = useParams();
  const navigate = useNavigate();

  const { tickets, fetchTickets, updateTicket } = useTicketStore();

  const [form, setForm] = useState({
    title: "",
    description: "",
    priority: "low",
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  // ✅ Fetch tickets only if empty
  useEffect(() => {
    if (!tickets.length) {
      fetchTickets().then(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, []);

  // ✅ Prefill form properly
  useEffect(() => {
    const found = tickets.find((t) => t._id === id);
    if (found) {
      setForm({
        title: found.title,
        description: found.description,
        priority: found.priority,
      });
    }
  }, [tickets, id]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.title || !form.description) {
        toast.error("Please fill in all required fields");
    //   alert("Title and Description are required");
      return;
    }

    try {
      setSaving(true);
      await updateTicket(id, form);

      toast.success("Ticket updated successfully");
      navigate(`/ticket/${id}`);
    } catch (err) {
      console.error(err);
      toast.error("Error updating ticket");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <div className="p-6">Loading ticket...</div>;
  }

  return (
    <div className="p-6 flex justify-center">

      <Card className="w-full max-w-xl shadow-lg rounded-2xl">
        <CardContent className="p-6 space-y-5">

          {/* Header */}
          <div>
            <h2 className="text-2xl font-semibold">Edit Ticket</h2>
            <p className="text-sm text-muted-foreground">
              Update ticket details
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">

            {/* Title */}
            <div>
              <label className="text-sm font-medium">Title</label>
              <input
                type="text"
                name="title"
                value={form.title}
                onChange={handleChange}
                className="w-full mt-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-transparent"
                placeholder="Enter ticket title"
              />
            </div>

            {/* Description */}
            <div>
              <label className="text-sm font-medium">Description</label>
              <textarea
                name="description"
                value={form.description}
                onChange={handleChange}
                rows="4"
                className="w-full mt-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-transparent"
                placeholder="Describe the issue..."
              />
            </div>

            {/* Priority */}
            <div>
              <label className="text-sm font-medium">Priority</label>
              <select
                name="priority"
                value={form.priority}
                onChange={handleChange}
                className="w-full mt-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-transparent"
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div>

            {/* Buttons */}
            <div className="flex gap-3 pt-2">

              <Button
                type="submit"
                disabled={saving}
                className="bg-blue-600 hover:bg-blue-700 text-white"
              >
                {saving ? "Updating..." : "Update Ticket"}
              </Button>

              <Button
                type="button"
                variant="outline"
                onClick={() => navigate(-1)}
              >
                Cancel
              </Button>

            </div>

          </form>
        </CardContent>
      </Card>

    </div>
  );
}