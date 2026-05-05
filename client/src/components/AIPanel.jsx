import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useState } from "react";
import API from "../api/axios";

export default function AIPanel({ ticketId }) {
  const [ai, setAI] = useState(null);
  const [loading, setLoading] = useState(false);

  const generate = async () => {
    try {
      setLoading(true);
      const res = await API.post(`/ai/${ticketId}`);
      setAI(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="p-4 space-y-4 bg-muted/50">
      
      <Button onClick={generate} disabled={loading} className="bg-blue-500">
        {loading ? "Generating..." : "Generate AI Insight"}
      </Button>

      {ai && (
        <div className="text-sm space-y-2">
          <p><strong>Summary:</strong> {ai.summary}</p>
          <p><strong>Sentiment:</strong> {ai.sentiment}</p>
          <p><strong>Priority:</strong> {ai.suggestedPriority}</p>
          <p><strong>Next Action:</strong> {ai.nextAction}</p>
        </div>
      )}

    </Card>
  );
}