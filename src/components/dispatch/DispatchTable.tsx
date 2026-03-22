import { Clock, MapPin } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Order } from "@/types/dispatch";
import { riders } from "@/data/mockDispatch";
import { statusConfig } from "./statusConfig";

interface DispatchTableProps {
  orders: Order[];
  onAssignRider: (orderId: string, rider: string) => void;
  onAdvanceStatus: (orderId: string) => void;
}

const DispatchTable = ({ orders, onAssignRider, onAdvanceStatus }: DispatchTableProps) => (
  <Card>
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Order ID</TableHead>
          <TableHead>Customer</TableHead>
          <TableHead>Address</TableHead>
          <TableHead>Items</TableHead>
          <TableHead>Total</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Rider</TableHead>
          <TableHead>ETA</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {orders.map((o) => {
          const cfg = statusConfig[o.status];
          return (
            <TableRow key={o.id}>
              <TableCell className="font-mono text-xs font-bold">{o.id}</TableCell>
              <TableCell>{o.customer}</TableCell>
              <TableCell className="text-xs text-muted-foreground max-w-[150px] truncate">
                <span className="flex items-center gap-1"><MapPin className="h-3 w-3" />{o.address}</span>
              </TableCell>
              <TableCell>{o.items}</TableCell>
              <TableCell className="font-semibold">₹{o.total}</TableCell>
              <TableCell>
                <Badge className={`${cfg.color} gap-1 text-xs`}>
                  {cfg.icon} {cfg.label}
                </Badge>
              </TableCell>
              <TableCell>
                {o.status === "pending" ? (
                  <Select onValueChange={(v) => onAssignRider(o.id, v)}>
                    <SelectTrigger className="h-8 w-32 text-xs">
                      <SelectValue placeholder="Assign..." />
                    </SelectTrigger>
                    <SelectContent>
                      {riders.map((r) => (
                        <SelectItem key={r} value={r}>{r}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                ) : (
                  <span className="text-sm">{o.rider || "—"}</span>
                )}
              </TableCell>
              <TableCell>
                {o.eta !== "—" ? (
                  <span className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Clock className="h-3 w-3" />{o.eta}
                  </span>
                ) : (
                  <span className="text-xs text-muted-foreground">—</span>
                )}
              </TableCell>
              <TableCell>
                {o.status !== "delivered" && o.status !== "pending" && (
                  <Button size="sm" variant="outline" className="h-7 text-xs" onClick={() => onAdvanceStatus(o.id)}>
                    Next ▸
                  </Button>
                )}
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  </Card>
);

export default DispatchTable;
