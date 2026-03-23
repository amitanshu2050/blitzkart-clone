import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import {
  Truck, Package, CheckCircle2, AlertTriangle, Users, UserX,
  Search, MapPin, Clock, Zap, Flame, Navigation, Timer,
  ChevronRight, Phone, Star, Signal, SignalZero, Eye, Edit
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  mockDeliveries, mockRiders, mockZones,
  deliveryStatusConfig, zoneLoadConfig,
  type ActiveDelivery, type DeliveryStatus
} from "@/data/mockDelivery";
import { toast } from "sonner";

const fadeUp = { initial: { opacity: 0, y: 12 }, animate: { opacity: 1, y: 0 } };

const StatCard = ({ icon: Icon, label, value, color }: { icon: any; label: string; value: number | string; color: string }) => (
  <motion.div {...fadeUp}>
    <Card className="relative overflow-hidden group hover:shadow-lg transition-shadow">
      <div className={`absolute inset-0 opacity-[0.04] ${color}`} />
      <CardContent className="p-4 flex items-center gap-4">
        <div className={`p-2.5 rounded-lg ${color} bg-opacity-15`}>
          <Icon className="h-5 w-5" />
        </div>
        <div>
          <p className="text-xs text-muted-foreground font-medium">{label}</p>
          <p className="text-2xl font-heading font-bold">{value}</p>
        </div>
      </CardContent>
    </Card>
  </motion.div>
);

const AdminDelivery = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<"all" | DeliveryStatus>("all");
  const [zoneFilter, setZoneFilter] = useState("all");
  const [riderFilter, setRiderFilter] = useState("all");
  const [sortBy, setSortBy] = useState<"eta" | "priority">("eta");

  const activeDeliveries = mockDeliveries.filter(d => d.status !== "delivered").length;
  const outForDelivery = mockDeliveries.filter(d => d.status === "on_the_way").length;
  const deliveredToday = mockDeliveries.filter(d => d.status === "delivered").length;
  const delayedCount = mockDeliveries.filter(d => d.isDelayed).length;
  const availableRiders = mockRiders.filter(r => r.status === "online").length;
  const busyRiders = mockRiders.filter(r => r.status === "busy").length;

  const uniqueRiders = useMemo(() => {
    const names = mockDeliveries.map(d => d.rider).filter(Boolean) as string[];
    return [...new Set(names)];
  }, []);

  const filtered = useMemo(() => {
    let list = [...mockDeliveries];
    if (searchQuery) list = list.filter(d => d.orderId.toLowerCase().includes(searchQuery.toLowerCase()) || d.customerName.toLowerCase().includes(searchQuery.toLowerCase()));
    if (statusFilter !== "all") list = list.filter(d => d.status === statusFilter);
    if (zoneFilter !== "all") list = list.filter(d => d.deliveryAddress.toLowerCase().includes(zoneFilter.toLowerCase()));
    if (riderFilter !== "all") list = list.filter(d => d.rider === riderFilter);
    list.sort((a, b) => {
      if (sortBy === "priority") return a.priority === "express" ? -1 : 1;
      const etaA = parseInt(a.eta) || 999;
      const etaB = parseInt(b.eta) || 999;
      return etaA - etaB;
    });
    return list;
  }, [searchQuery, statusFilter, zoneFilter, riderFilter, sortBy]);

  const handleAssignRider = (deliveryId: string, riderName: string) => {
    toast.success(`${riderName} assigned to ${deliveryId}`);
  };

  const onlineRiders = mockRiders.filter(r => r.status === "online");

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-heading font-bold">Delivery Management</h1>
        <p className="text-muted-foreground text-sm mt-1">Track, assign, and manage all active deliveries in real-time.</p>
      </div>

      {/* 1. Stats Overview */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
        <StatCard icon={Truck} label="Active Deliveries" value={activeDeliveries} color="text-primary" />
        <StatCard icon={Package} label="Out for Delivery" value={outForDelivery} color="text-blue-400" />
        <StatCard icon={CheckCircle2} label="Delivered Today" value={deliveredToday} color="text-primary" />
        <StatCard icon={AlertTriangle} label="Delayed" value={delayedCount} color="text-destructive" />
        <StatCard icon={Users} label="Available Riders" value={availableRiders} color="text-brand-lime" />
        <StatCard icon={UserX} label="Busy Riders" value={busyRiders} color="text-accent" />
      </div>

      {/* 6. Filters & Controls */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-wrap items-center gap-3">
            <div className="relative flex-1 min-w-[200px]">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search order ID or customer..." value={searchQuery} onChange={e => setSearchQuery(e.target.value)} className="pl-9 h-9" />
            </div>
            <Select value={statusFilter} onValueChange={(v) => setStatusFilter(v as any)}>
              <SelectTrigger className="w-[150px] h-9"><SelectValue placeholder="Status" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="preparing">Preparing</SelectItem>
                <SelectItem value="picked_up">Picked Up</SelectItem>
                <SelectItem value="on_the_way">On The Way</SelectItem>
                <SelectItem value="delivered">Delivered</SelectItem>
              </SelectContent>
            </Select>
            <Select value={zoneFilter} onValueChange={setZoneFilter}>
              <SelectTrigger className="w-[160px] h-9"><SelectValue placeholder="Zone" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Zones</SelectItem>
                {mockZones.map(z => <SelectItem key={z.id} value={z.name}>{z.name}</SelectItem>)}
              </SelectContent>
            </Select>
            <Select value={riderFilter} onValueChange={setRiderFilter}>
              <SelectTrigger className="w-[160px] h-9"><SelectValue placeholder="Rider" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Riders</SelectItem>
                {uniqueRiders.map(r => <SelectItem key={r} value={r}>{r}</SelectItem>)}
              </SelectContent>
            </Select>
            <Select value={sortBy} onValueChange={(v) => setSortBy(v as any)}>
              <SelectTrigger className="w-[130px] h-9"><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="eta">Sort by ETA</SelectItem>
                <SelectItem value="priority">Sort by Priority</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Main Content Tabs */}
      <Tabs defaultValue="tracking" className="space-y-4">
        <TabsList>
          <TabsTrigger value="tracking">Live Tracking</TabsTrigger>
          <TabsTrigger value="riders">Rider Panel</TabsTrigger>
          <TabsTrigger value="zones">Delivery Zones</TabsTrigger>
          <TabsTrigger value="map">Map Preview</TabsTrigger>
        </TabsList>

        {/* 2. Live Delivery Tracking */}
        <TabsContent value="tracking" className="space-y-0">
          <Card>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Order</TableHead>
                  <TableHead>Customer</TableHead>
                  <TableHead>Pickup</TableHead>
                  <TableHead>Delivery</TableHead>
                  <TableHead>Rider</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>ETA</TableHead>
                  <TableHead className="w-[140px]">Progress</TableHead>
                  <TableHead>Tags</TableHead>
                  <TableHead>Assign</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filtered.map(d => {
                  const cfg = deliveryStatusConfig[d.status];
                  return (
                    <TableRow key={d.id} className="group">
                      <TableCell className="font-mono text-xs font-bold">{d.orderId}</TableCell>
                      <TableCell className="font-medium text-sm">{d.customerName}</TableCell>
                      <TableCell className="text-xs text-muted-foreground max-w-[120px] truncate">{d.pickupStore}</TableCell>
                      <TableCell className="text-xs text-muted-foreground max-w-[130px] truncate">
                        <span className="flex items-center gap-1"><MapPin className="h-3 w-3 shrink-0" />{d.deliveryAddress}</span>
                      </TableCell>
                      <TableCell className="text-sm">{d.rider || <span className="text-destructive text-xs">Unassigned</span>}</TableCell>
                      <TableCell>
                        <Badge className={`${cfg.color} gap-1 text-[10px] px-2`}>{cfg.label}</Badge>
                      </TableCell>
                      <TableCell>
                        {d.eta !== "—" ? (
                          <span className="flex items-center gap-1 text-xs"><Clock className="h-3 w-3 text-muted-foreground" />{d.eta}</span>
                        ) : <span className="text-xs text-muted-foreground">—</span>}
                      </TableCell>
                      <TableCell>
                        <Progress value={d.progressPercent} className="h-2" />
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-1 flex-wrap">
                          {d.priority === "express" && <Badge variant="outline" className="text-[10px] px-1.5 py-0 border-brand-lime/30 text-brand-lime gap-0.5"><Zap className="h-2.5 w-2.5" />Express</Badge>}
                          {d.isHighDemand && <Badge variant="outline" className="text-[10px] px-1.5 py-0 border-destructive/30 text-destructive gap-0.5"><Flame className="h-2.5 w-2.5" />Hot</Badge>}
                          {d.isNearby && <Badge variant="outline" className="text-[10px] px-1.5 py-0 border-primary/30 text-primary gap-0.5"><Navigation className="h-2.5 w-2.5" />Near</Badge>}
                          {d.isDelayed && <Badge variant="outline" className="text-[10px] px-1.5 py-0 border-destructive/30 text-destructive gap-0.5"><Timer className="h-2.5 w-2.5" />Delayed</Badge>}
                        </div>
                      </TableCell>
                      <TableCell>
                        {!d.rider && d.status === "preparing" ? (
                          <Select onValueChange={(v) => handleAssignRider(d.orderId, v)}>
                            <SelectTrigger className="h-7 w-28 text-xs"><SelectValue placeholder="Assign..." /></SelectTrigger>
                            <SelectContent>
                              {onlineRiders.map(r => <SelectItem key={r.id} value={r.name}>{r.name}</SelectItem>)}
                            </SelectContent>
                          </Select>
                        ) : d.status !== "delivered" ? (
                          <Button size="sm" variant="ghost" className="h-7 text-xs gap-1"><ChevronRight className="h-3 w-3" />Track</Button>
                        ) : null}
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </Card>
        </TabsContent>

        {/* 3. Rider Assignment Panel */}
        <TabsContent value="riders">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {mockRiders.map(r => (
              <motion.div key={r.id} {...fadeUp}>
                <Card className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-4 space-y-3">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-10 w-10">
                        <AvatarFallback className="bg-primary/10 text-primary text-sm font-bold">{r.avatar}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <p className="font-heading font-semibold text-sm truncate">{r.name}</p>
                        <p className="text-xs text-muted-foreground flex items-center gap-1"><MapPin className="h-3 w-3" />{r.location}</p>
                      </div>
                      <Badge className={`text-[10px] px-2 ${r.status === "online" ? "bg-primary/15 text-primary border-primary/25" : r.status === "busy" ? "bg-accent/15 text-accent border-accent/25" : "bg-muted text-muted-foreground border-border"}`}>
                        {r.status === "online" ? <Signal className="h-3 w-3 mr-1" /> : r.status === "offline" ? <SignalZero className="h-3 w-3 mr-1" /> : null}
                        {r.status.charAt(0).toUpperCase() + r.status.slice(1)}
                      </Badge>
                    </div>
                    <div className="grid grid-cols-3 gap-2 text-center">
                      <div className="bg-muted/50 rounded-md p-2">
                        <p className="text-lg font-bold">{r.activeOrders}</p>
                        <p className="text-[10px] text-muted-foreground">Active</p>
                      </div>
                      <div className="bg-muted/50 rounded-md p-2">
                        <p className="text-lg font-bold flex items-center justify-center gap-0.5"><Star className="h-3 w-3 text-accent" />{r.rating}</p>
                        <p className="text-[10px] text-muted-foreground">Rating</p>
                      </div>
                      <div className="bg-muted/50 rounded-md p-2">
                        <p className="text-lg font-bold">{r.totalDeliveries}</p>
                        <p className="text-[10px] text-muted-foreground">Total</p>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-muted-foreground flex items-center gap-1"><Phone className="h-3 w-3" />{r.phone}</span>
                      {r.status === "online" && (
                        <Button size="sm" className="h-7 text-xs">Assign</Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </TabsContent>

        {/* 4. Delivery Zones */}
        <TabsContent value="zones">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {mockZones.map(z => {
              const lcfg = zoneLoadConfig[z.load];
              return (
                <motion.div key={z.id} {...fadeUp}>
                  <Card className="hover:shadow-lg transition-shadow">
                    <CardHeader className="pb-2 p-4">
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-sm font-heading">{z.name}</CardTitle>
                        <Badge className={`${lcfg.color} text-[10px] px-2`}>{lcfg.label}</Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="p-4 pt-0 space-y-3">
                      <div className="grid grid-cols-3 gap-2 text-center">
                        <div>
                          <p className="text-lg font-bold">{z.activeOrders}</p>
                          <p className="text-[10px] text-muted-foreground">Orders</p>
                        </div>
                        <div>
                          <p className="text-lg font-bold">{z.ridersAvailable}</p>
                          <p className="text-[10px] text-muted-foreground">Riders</p>
                        </div>
                        <div>
                          <p className="text-lg font-bold text-primary">{z.avgDeliveryTime}</p>
                          <p className="text-[10px] text-muted-foreground">Avg Time</p>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline" className="flex-1 h-7 text-xs gap-1"><Eye className="h-3 w-3" />View</Button>
                        <Button size="sm" variant="outline" className="flex-1 h-7 text-xs gap-1"><Edit className="h-3 w-3" />Edit</Button>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </TabsContent>

        {/* 5. Map Preview (UI Mock) */}
        <TabsContent value="map">
          <Card className="overflow-hidden">
            <CardContent className="p-0">
              <div className="relative bg-muted/30 h-[500px] flex items-center justify-center">
                {/* Mock map grid */}
                <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "linear-gradient(hsl(var(--border)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--border)) 1px, transparent 1px)", backgroundSize: "40px 40px" }} />
                {/* Mock rider pins */}
                {[
                  { x: "20%", y: "30%", name: "RS", active: true },
                  { x: "45%", y: "55%", name: "AK", active: true },
                  { x: "70%", y: "25%", name: "VJ", active: true },
                  { x: "35%", y: "70%", name: "DS", active: true },
                  { x: "60%", y: "45%", name: "SY", active: true },
                  { x: "80%", y: "65%", name: "SP", active: false },
                ].map((pin, i) => (
                  <motion.div
                    key={i}
                    className="absolute"
                    style={{ left: pin.x, top: pin.y }}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: i * 0.1 }}
                  >
                    <div className={`relative flex items-center justify-center w-8 h-8 rounded-full text-[10px] font-bold shadow-lg ${pin.active ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"}`}>
                      {pin.name}
                      {pin.active && <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 bg-brand-lime rounded-full border-2 border-card animate-pulse" />}
                    </div>
                  </motion.div>
                ))}
                {/* Mock delivery route lines */}
                <svg className="absolute inset-0 w-full h-full pointer-events-none" xmlns="http://www.w3.org/2000/svg">
                  <line x1="20%" y1="30%" x2="35%" y2="70%" className="stroke-primary/30" strokeWidth="2" strokeDasharray="6 4" />
                  <line x1="45%" y1="55%" x2="70%" y2="25%" className="stroke-primary/30" strokeWidth="2" strokeDasharray="6 4" />
                  <line x1="60%" y1="45%" x2="80%" y2="65%" className="stroke-muted-foreground/20" strokeWidth="2" strokeDasharray="6 4" />
                </svg>
                {/* Mock order markers */}
                {[
                  { x: "35%", y: "70%" },
                  { x: "70%", y: "25%" },
                  { x: "55%", y: "40%" },
                ].map((m, i) => (
                  <motion.div
                    key={`m-${i}`}
                    className="absolute"
                    style={{ left: m.x, top: m.y }}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.5 + i * 0.1 }}
                  >
                    <div className="w-5 h-5 rounded-sm bg-accent/80 flex items-center justify-center shadow-md">
                      <Package className="h-3 w-3 text-accent-foreground" />
                    </div>
                  </motion.div>
                ))}
                {/* Legend */}
                <div className="absolute bottom-4 left-4 bg-card/90 backdrop-blur border rounded-lg p-3 space-y-1.5">
                  <p className="text-xs font-heading font-semibold mb-1">Legend</p>
                  <div className="flex items-center gap-2 text-xs"><div className="w-3 h-3 rounded-full bg-primary" /> Active Rider</div>
                  <div className="flex items-center gap-2 text-xs"><div className="w-3 h-3 rounded-full bg-muted" /> Idle Rider</div>
                  <div className="flex items-center gap-2 text-xs"><div className="w-3 h-3 rounded-sm bg-accent/80" /> Order Pickup</div>
                  <div className="flex items-center gap-2 text-xs"><div className="w-8 h-0 border border-dashed border-primary/40" /> Delivery Route</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminDelivery;
