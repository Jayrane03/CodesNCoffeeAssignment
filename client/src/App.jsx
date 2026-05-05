import { BrowserRouter, Routes, Route } from "react-router-dom";

import Layout from "./components/layout/Layout";
import CreateTicket from "@/pages/CreateTicket";
import Dashboard from "./pages/Dashboard";
import TicketDetails from "./pages/TicketDetail";
import EditTicket from "./pages/EditTicket";

import { Toaster } from "react-hot-toast"; // ✅ add toast

export default function App() {
  return (
    <BrowserRouter>

      {/* ✅ Toast */}
      <Toaster position="top-right" />

      {/* ✅ Routes wrapper */}
      <Routes>

        <Route element={<Layout />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/create" element={<CreateTicket />} />
          <Route path="/edit/:id" element={<EditTicket />} />
          <Route path="/ticket/:id" element={<TicketDetails />} />
        </Route>

      </Routes>

    </BrowserRouter>
  );
}