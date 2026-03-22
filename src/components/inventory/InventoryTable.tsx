import { Minus, Plus } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Product } from "@/types/inventory";

interface InventoryTableProps {
  products: Product[];
  onAdjustStock: (id: string, delta: number) => void;
}

const InventoryTable = ({ products, onAdjustStock }: InventoryTableProps) => (
  <Card>
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Product</TableHead>
          <TableHead>SKU</TableHead>
          <TableHead>Category</TableHead>
          <TableHead>Warehouse</TableHead>
          <TableHead>Stock</TableHead>
          <TableHead>Min</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Updated</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {products.map((p) => {
          const isLow = p.stock < p.minStock;
          return (
            <TableRow key={p.id}>
              <TableCell className="font-medium">{p.name}</TableCell>
              <TableCell className="font-mono text-xs">{p.sku}</TableCell>
              <TableCell>{p.category}</TableCell>
              <TableCell>{p.warehouse}</TableCell>
              <TableCell className={isLow ? "text-destructive font-bold" : ""}>{p.stock}</TableCell>
              <TableCell>{p.minStock}</TableCell>
              <TableCell>
                {isLow ? (
                  <Badge variant="destructive" className="text-xs">Low</Badge>
                ) : (
                  <Badge className="bg-primary/10 text-primary text-xs">OK</Badge>
                )}
              </TableCell>
              <TableCell className="text-xs text-muted-foreground">{p.lastUpdated}</TableCell>
              <TableCell>
                <div className="flex gap-1">
                  <Button size="sm" variant="outline" className="h-7 w-7 p-0" onClick={() => onAdjustStock(p.id, -10)}>
                    <Minus className="h-3 w-3" />
                  </Button>
                  <Button size="sm" className="h-7 w-7 p-0" onClick={() => onAdjustStock(p.id, 10)}>
                    <Plus className="h-3 w-3" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  </Card>
);

export default InventoryTable;
