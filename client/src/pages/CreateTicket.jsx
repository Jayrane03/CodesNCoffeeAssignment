import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useTicketStore } from "../store/ticketStore";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
export default function CreateTicket() {
  const navigate = useNavigate();
  const { createTicket } = useTicketStore();

  const [form, setForm] = useState({
    title: "",
    description: "",
    priority: "low", // ✅ default
  });

  const submit = async (e) => {
    e.preventDefault();

    if (!form.title || !form.description) {
    //   alert("Title and Description are required");
      toast.error("Please fill in all required fields");
      return;
    }

    await createTicket({
      ...form,
      status: "open", // ✅ auto-set
    });
    toast.success("Tickets generated successfully !")
    navigate("/");
  };

  return (
    <div className="flex justify-center items-start min-h-screen bg-muted/40 p-6">
      
      <Card className="w-full max-w-xl shadow-lg border border-border">
        
        <CardHeader>
          <CardTitle className="text-2xl font-semibold">
            Create New Ticket
          </CardTitle>
          <p className="text-sm text-muted-foreground">
            Describe your issue clearly so we can help faster.
          </p>
        </CardHeader>

        <CardContent>
          <form onSubmit={submit} className="space-y-5">
            
            {/* Title */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Title</label>
              <Input
                placeholder="e.g. Payment not working"
                value={form.title}
                onChange={(e) =>
                  setForm({ ...form, title: e.target.value })
                }
              />
            </div>

            {/* Description */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Description</label>
              <Textarea
                placeholder="Explain your issue in detail..."
                value={form.description}
                onChange={(e) =>
                  setForm({ ...form, description: e.target.value })
                }
              />
            </div>

            {/* Priority ✅ NEW */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Priority</label>
              <select
                value={form.priority}
                onChange={(e) =>
                  setForm({ ...form, priority: e.target.value })
                }
                className="w-full p-2 border rounded-lg bg-transparent"
              >
                <option className="bg-black"value="low">Low</option>
                <option className="bg-black"value="medium">Medium</option>
                <option className="bg-black"value="high">High</option>
              </select>
            </div>

            {/* Submit */}
            <Button
              type="submit"
              className="w-full text-base font-medium bg-purple-700 hover:scale-[1.02]"
            >
              Create Ticket
            </Button>

          </form>
        </CardContent>

      </Card>
    </div>
  );
}