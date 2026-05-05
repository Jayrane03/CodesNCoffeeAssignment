import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useState, useEffect } from "react";
import API from "../api/axios";
import toast from "react-hot-toast";

export default function AIPanel({ ticketId }) {
  const [ai, setAI] = useState(null);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);

  // ✅ Load existing AI
  useEffect(() => {
    const fetchAI = async () => {
      try {
        const res = await API.get(`/ai/${ticketId}`);
        if (res.data) setAI(res.data);
      } catch {
        console.log("No AI yet");
      }
    };

    fetchAI();
  }, [ticketId]);

  // ✅ Generate / Regenerate AI
  const generate = async () => {
    const id = toast.loading("Generating AI...");
    try {
      setLoading(true);
      const res = await API.post(`/ai/${ticketId}`);
      setAI(res.data);

      // 🔥 Confidence warning
      if (res.data.confidenceScore < 0.5) {
        toast.error("Low confidence AI result", { id });
      } else {
        toast.success("AI generated", { id });
      }
    } catch {
      toast.error("AI failed", { id });
    } finally {
      setLoading(false);
    }
  };

  // ✅ Handle input change
  const handleChange = (field, value) => {
    setAI((prev) => ({ ...prev, [field]: value }));
  };

  // ✅ Save edited AI
  const saveAI = async () => {
    const id = toast.loading("Saving AI...");
    try {
      setSaving(true);
      const res = await API.put(`/ai/${ticketId}`, ai);
      setAI(res.data);
      toast.success("AI saved", { id });
    } catch {
      toast.error("Save failed", { id });
    } finally {
      setSaving(false);
    }
  };

  // ✅ Confidence %
  const confidencePercent =
    ai?.confidenceScore !== undefined
      ? Math.round(ai.confidenceScore * 100)
      : null;

  return (
    <Card className="p-4 space-y-4 bg-muted/50">

      {/* Generate Button */}
      <Button
        onClick={generate}
        disabled={loading}
        className="bg-blue-500"
      >
        {loading
          ? "Generating..."
          : ai
          ? "Regenerate AI"
          : "Generate AI Insight"}
      </Button>

      {/* AI DATA */}
      {ai && (
        <div className="space-y-3 text-sm">

          {/* Summary */}
          <input
            value={ai.summary || ""}
            onChange={(e) =>
              handleChange("summary", e.target.value)
            }
            placeholder="Summary"
            className="w-full p-2 rounded bg-gray-800 text-white"
          />

          {/* Sentiment */}
          <input
            value={ai.sentiment || ""}
            onChange={(e) =>
              handleChange("sentiment", e.target.value)
            }
            placeholder="Sentiment"
            className="w-full p-2 rounded bg-gray-800 text-white"
          />

          {/* Priority */}
          <input
            value={ai.suggestedPriority || ""}
            onChange={(e) =>
              handleChange("suggestedPriority", e.target.value)
            }
            placeholder="Priority"
            className="w-full p-2 rounded bg-gray-800 text-white"
          />

          {/* Next Action */}
          <textarea
            value={ai.nextAction || ""}
            onChange={(e) =>
              handleChange("nextAction", e.target.value)
            }
            placeholder="Next Action"
            className="w-full p-2 rounded bg-gray-800 text-white"
          />

          {/* ✅ Confidence */}
          {confidencePercent !== null && (
            <div className="space-y-1">
              <p
                className={`text-xs font-medium ${
                  ai.confidenceScore < 0.5
                    ? "text-red-400"
                    : ai.confidenceScore < 0.75
                    ? "text-yellow-400"
                    : "text-green-400"
                }`}
              >
                Confidence: {confidencePercent}%
              </p>

              {ai.confidenceScore < 0.5 && (
                <p className="text-xs text-red-400">
                  ⚠️ Low confidence — verify before using
                </p>
              )}

              {ai.confidenceScore >= 0.5 &&
                ai.confidenceScore < 0.75 && (
                  <p className="text-xs text-yellow-400">
                    ⚠️ Moderate confidence — review recommended
                  </p>
                )}

              {ai.confidenceScore >= 0.75 && (
                <p className="text-xs text-green-400">
                  ✔ High confidence
                </p>
              )}
            </div>
          )}

          {/* Save Button */}
          <Button
            onClick={saveAI}
            disabled={saving}
            className="bg-green-600"
          >
            {saving ? "Saving..." : "Save Changes"}
          </Button>

        </div>
      )}
    </Card>
  );
}