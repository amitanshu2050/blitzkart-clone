import { useInventory } from "@/hooks/useInventory";
import InventoryHeader from "@/components/inventory/InventoryHeader";
import InventoryStats from "@/components/inventory/InventoryStats";
import InventoryFilters from "@/components/inventory/InventoryFilters";
import InventoryTable from "@/components/inventory/InventoryTable";

const Inventory = () => {
  const { products, filtered, search, setSearch, filter, setFilter, lowStockCount, totalItems, adjustStock } = useInventory();

  return (
    <div className="min-h-screen bg-background p-6 lg:p-8">
      <InventoryHeader />
      <InventoryStats totalSKUs={products.length} totalItems={totalItems} lowStockCount={lowStockCount} />
      <InventoryFilters search={search} setSearch={setSearch} filter={filter} setFilter={setFilter} />
      <InventoryTable products={filtered} onAdjustStock={adjustStock} />
    </div>
  );
};

export default Inventory;
