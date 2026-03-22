import { Link } from "react-router-dom";
import { Package, ArrowLeft } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const InventoryHeader = () => (
  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
    <div>
      <h1 className="text-3xl font-heading font-bold">Inventory Management</h1>
      <Badge className="mt-2 bg-primary/10 text-primary">BlitzKart Admin</Badge>
    </div>
    <Link to="/admin">
      <Button variant="outline" className="gap-2">
        <ArrowLeft className="h-4 w-4" />
        Back to Admin
      </Button>
    </Link>
  </div>
);

export default InventoryHeader;
