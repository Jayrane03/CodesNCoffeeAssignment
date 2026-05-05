import { create } from "zustand";
import API from "../api/axios";

export const useTicketStore = create((set) => ({
  tickets: [],
  selected: null,
  loading: false,

  fetchTickets: async () => {
    try {
      set({ loading: true });
      const res = await API.get("/tickets");
      set({ tickets: res.data, loading: false });
    } catch (err) {
      console.error(err);
      set({ loading: false });
    }
  },

  fetchTicket: async (id) => {
    try {
      const res = await API.get(`/tickets/${id}`);
      set({ selected: res.data });
    } catch (err) {
      console.error(err);
    }
  },

  createTicket: async (data) => {
    try {
      await API.post("/tickets", data);
    } catch (err) {
      console.error(err);
    }
  },

  updateTicketStatus: async (id, status) => {
    try {
      await API.put(`/tickets/${id}`, { status });

      // update UI instantly
      set((state) => ({
        tickets: state.tickets.map((t) =>
          t._id === id ? { ...t, status } : t
        ),
      }));

    } catch (error) {
      console.error("Status update failed", error);
    }
  },
  updateTicket: async (id, data) => {
  await API.put(`/tickets/${id}`, data);
},
  deleteTicket: async (id) => {
  await API.delete(`/tickets/${id}`);

  // 🔥 update state instantly
  set((state) => ({
    tickets: state.tickets.filter((t) => t._id !== id),
  }));
}
}));