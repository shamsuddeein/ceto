import { createFileRoute } from "@tanstack/react-router";
import { DashboardLayout } from "@/components/dashboard-layout";
import { Download, Search } from "lucide-react";

export const Route = createFileRoute("/dashboard/creator/customers")({
  component: CustomersComponent,
});

const CUSTOMERS = [
  {
    id: "CUST-001",
    name: "Alice Freeman",
    email: "alice@example.com",
    spent: "₦45,000.00",
    orders: 3,
    status: "Active",
    date: "2026-05-12",
  },
  {
    id: "CUST-002",
    name: "Bobby Tables",
    email: "bobby@example.com",
    spent: "₦12,000.00",
    orders: 1,
    status: "Active",
    date: "2026-06-01",
  },
  {
    id: "CUST-003",
    name: "Charlie Davis",
    email: "charlie@example.com",
    spent: "₦89,000.00",
    orders: 7,
    status: "VIP",
    date: "2026-06-05",
  },
  {
    id: "CUST-004",
    name: "Diana Prince",
    email: "diana@example.com",
    spent: "₦5,000.00",
    orders: 1,
    status: "Inactive",
    date: "2025-12-10",
  },
  {
    id: "CUST-005",
    name: "Evan Wright",
    email: "evan@example.com",
    spent: "₦32,000.00",
    orders: 2,
    status: "Active",
    date: "2026-06-08",
  },
];

function CustomersComponent() {
  return (
    <DashboardLayout title="Customers">
      <div className="rounded-[2.5rem] border-[4px] border-border bg-white p-8 shadow-vibe">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between mb-8">
          <div>
            <h2 className="font-display text-2xl font-black text-foreground">Customer Directory</h2>
            <p className="mt-2 text-base font-bold text-foreground/70">
              Manage your audience and view purchase history.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full sm:w-auto">
            <div className="relative flex-1 flex items-center rounded-[1.5rem] border-[3px] border-border bg-white px-4 py-3 shadow-vibe-sm focus-within:translate-x-[2px] focus-within:translate-y-[2px] focus-within:shadow-none transition-all">
              <Search className="h-5 w-5 text-foreground stroke-[3px]" />
              <input
                type="text"
                placeholder="Search customers..."
                className="ml-3 w-full bg-transparent text-base font-bold text-foreground outline-none placeholder:text-foreground/50"
              />
            </div>
            <button className="inline-flex justify-center items-center gap-2 rounded-xl border-[3px] border-border bg-tint-mint px-6 py-3 text-base font-black text-foreground shadow-vibe-sm transition-transform hover:-translate-y-1">
              <Download className="h-5 w-5 stroke-[3px]" /> Export
            </button>
          </div>
        </div>
        <div>
          <div className="overflow-x-auto">
            <table className="min-w-full text-base">
              <thead className="text-left text-sm font-black uppercase tracking-wider text-foreground/60 border-b-[3px] border-border">
                <tr>
                  <th className="py-4">Name</th>
                  <th className="py-4">Email</th>
                  <th className="py-4">Total Spent</th>
                  <th className="py-4">Orders</th>
                  <th className="py-4">Status</th>
                  <th className="py-4 text-right">Last Order</th>
                </tr>
              </thead>
              <tbody className="divide-y-[3px] divide-border font-medium">
                {CUSTOMERS.map((c) => (
                  <tr key={c.id} className="transition-colors hover:bg-muted/50">
                    <td className="py-4 font-semibold">{c.name}</td>
                    <td className="py-4 text-foreground/70">{c.email}</td>
                    <td className="py-4 font-semibold">{c.spent}</td>
                    <td className="py-4">{c.orders}</td>
                    <td className="py-4">
                      <span
                        className={`inline-flex items-center rounded-full border-[3px] border-border px-3 py-1 text-xs font-black shadow-vibe-sm ${c.status === "VIP" ? "bg-tint-rose text-foreground" : c.status === "Active" ? "bg-tint-mint text-foreground" : "bg-tint-cream text-foreground"}`}
                      >
                        {c.status}
                      </span>
                    </td>
                    <td className="py-4 text-right text-foreground/70">{c.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
