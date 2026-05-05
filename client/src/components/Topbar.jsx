import { Input } from "@/components/ui/input";
import { Avatar } from "@/components/ui/avatar";

export default function Topbar() {
  return (
   <div className="bg-card border-b border-border p-4 flex justify-between">
      <Input placeholder="Search tickets..." className="w-80" />
      <Avatar />
    </div>
  );
}