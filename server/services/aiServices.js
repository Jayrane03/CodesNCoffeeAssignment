exports.generateAI = async (ticket) => {
  return {
    summary: `Issue: ${ticket.title}`,
    sentiment: ticket.description.includes("error")
      ? "Frustrated"
      : "Neutral",
    suggestedPriority:
      ticket.description.length > 100 ? "High" : "Medium",
    nextAction: "Investigate logs and reproduce issue",
    confidenceScore: 0.8
  };
};