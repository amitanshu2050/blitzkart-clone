import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Eye, EyeOff, Zap, ShoppingCart, Package, Truck, Shield, LogOut } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

type View = "login" | "signup" | "forgot";
type Role = "user" | "admin";

const Login = () => {
  const [view, setView] = useState<View>("login");
  const [role, setRole] = useState<Role>("user");
  const [showPassword, setShowPassword] = useState(false);
  const [shaking, setShaking] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();
  const { login, isLoggedIn, user, logout } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [adminCode, setAdminCode] = useState("");

  if (isLoggedIn && user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background p-4">
        <Card className="w-full max-w-md">
          <CardContent className="pt-8 pb-6 text-center">
            <div className="h-20 w-20 rounded-full bg-primary/20 text-primary flex items-center justify-center text-2xl font-bold mx-auto mb-4">
              {user.name.split(" ").map(w => w[0]).join("").toUpperCase().slice(0, 2)}
            </div>
            <h2 className="text-xl font-heading font-bold">{user.name}</h2>
            <p className="text-sm text-muted-foreground">{user.email}</p>
            {user.phone && <p className="text-sm text-muted-foreground">{user.phone}</p>}
            <p className="text-xs text-primary font-medium mt-2">
              {user.role === "admin" ? "Administrator" : "Customer"}
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              Member since {new Date(user.joinedAt).toLocaleDateString("en-IN", { month: "long", year: "numeric" })}
            </p>
            <div className="flex flex-col gap-2 mt-6">
              <Link to={user.role === "admin" ? "/admin" : "/products"}>
                <Button className="w-full">{user.role === "admin" ? "Go to Dashboard" : "Continue Shopping"}</Button>
              </Link>
              <Link to="/orders"><Button variant="outline" className="w-full">My Orders</Button></Link>
              <Button variant="ghost" className="w-full text-destructive gap-2" onClick={() => { logout(); toast({ title: "Logged out successfully" }); }}>
                <LogOut className="h-4 w-4" /> Sign Out
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || (view !== "forgot" && !password)) {
      setShaking(true); setTimeout(() => setShaking(false), 400);
      toast({ variant: "destructive", title: "Please fill in all fields" }); return;
    }
    if (view === "signup" && (!name || !phone)) {
      setShaking(true); setTimeout(() => setShaking(false), 400);
      toast({ variant: "destructive", title: "Name and phone number are required" }); return;
    }
    if (view === "login" && role === "user" && (!name || !phone)) {
      setShaking(true); setTimeout(() => setShaking(false), 400);
      toast({ variant: "destructive", title: "Name and phone number are required" }); return;
    }
    if (role === "admin" && view === "login" && !adminCode) {
      setShaking(true); setTimeout(() => setShaking(false), 400);
      toast({ variant: "destructive", title: "Admin access code is required" }); return;
    }
    if (view === "forgot") {
      toast({ title: "Reset link sent! ✉️", description: "Check your email for the password reset link." });
      setView("login"); return;
    }
    const userName = name ? name : email.split("@")[0].replace(/[._]/g, " ").replace(/\b\w/g, c => c.toUpperCase());
    login({ name: userName, email, phone, role });
    toast({
      title: view === "login" ? `Welcome back${role === "admin" ? ", Admin" : ""}! ⚡` : "Account created! 🎉",
      description: role === "admin" ? "Redirecting to admin dashboard..." : "Redirecting to BlitzKart...",
    });
    setTimeout(() => navigate(role === "admin" ? "/admin" : "/"), 800);
  };

  return (
    <div className="min-h-screen flex">
      {/* Left side */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-primary/10 via-background to-brand-lime/5 flex-col justify-center px-12">
        <div className="flex items-center gap-2 mb-8">
          <Zap className="h-8 w-8 text-primary" />
          <h1 className="text-3xl font-heading font-bold">BlitzKart</h1>
        </div>
        <h2 className="text-xl font-heading font-semibold mb-3">
          {role === "admin" ? "Manage your store 🛡️" : "Groceries at lightning speed ⚡"}
        </h2>
        <p className="text-muted-foreground mb-8">
          {role === "admin"
            ? "Access inventory, dispatch, analytics and full store management from one dashboard."
            : "From fresh produce to daily essentials — everything delivered to your door in minutes."}
        </p>
        <div className="space-y-4">
          {(role === "user"
            ? [
                { icon: Truck, label: "10-minute delivery", desc: "Fastest in the city" },
                { icon: Package, label: "10,000+ products", desc: "Everything you need" },
                { icon: ShoppingCart, label: "Easy ordering", desc: "Simple, fast checkout" },
              ]
            : [
                { icon: Shield, label: "Full admin access", desc: "Inventory & dispatch control" },
                { icon: Package, label: "Product management", desc: "Add, edit, remove products" },
                { icon: Truck, label: "Order tracking", desc: "Real-time dispatch monitoring" },
              ]
          ).map((item, i) => (
            <div key={i} className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <item.icon className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-sm font-semibold">{item.label}</p>
                <p className="text-xs text-muted-foreground">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Right side */}
      <div className="flex-1 flex items-center justify-center p-6">
        <motion.div className={`w-full max-w-md ${shaking ? "animate-shake" : ""}`}>
          {/* Mobile logo */}
          <div className="lg:hidden flex items-center gap-2 mb-8 justify-center">
            <Zap className="h-6 w-6 text-primary" />
            <span className="font-heading font-bold text-xl">BlitzKart</span>
          </div>

          {/* Role toggle */}
          <div className="flex bg-muted rounded-lg p-1 mb-6">
            <button onClick={() => setRole("user")} className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-md text-sm font-medium font-body transition-all ${role === "user" ? "bg-background text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"}`}>
              <ShoppingCart className="h-4 w-4" /> Customer
            </button>
            <button onClick={() => setRole("admin")} className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-md text-sm font-medium font-body transition-all ${role === "admin" ? "bg-background text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"}`}>
              <Shield className="h-4 w-4" /> Administrator
            </button>
          </div>

          <h2 className="text-2xl font-heading font-bold mb-1">
            {view === "login" && (role === "admin" ? "Admin Login" : "Welcome Back")}
            {view === "signup" && "Create Account"}
            {view === "forgot" && "Reset Password"}
          </h2>
          <p className="text-sm text-muted-foreground mb-6">
            {view === "login" && (role === "admin" ? "Sign in to the admin dashboard" : "Sign in to your BlitzKart account")}
            {view === "signup" && "Get started with BlitzKart today"}
            {view === "forgot" && "Enter your email to receive a reset link"}
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            {(view === "signup" || (view === "login" && role === "user")) && (
              <>
                <div><Label>Full Name</Label><Input value={name} onChange={(e) => setName(e.target.value)} className="h-11" placeholder="John Doe" /></div>
                <div><Label>Phone Number</Label><Input value={phone} onChange={(e) => setPhone(e.target.value)} className="h-11" placeholder="9876543210" /></div>
              </>
            )}
            <div><Label>{role === "admin" ? "Admin Email" : "Email"}</Label><Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="h-11" placeholder="you@email.com" /></div>
            {view !== "forgot" && (
              <div>
                <div className="flex items-center justify-between">
                  <Label>Password</Label>
                  {view === "login" && <button type="button" onClick={() => { setView("forgot"); setPassword(""); }} className="text-xs font-medium text-primary hover:underline font-body">Forgot Password?</button>}
                </div>
                <div className="relative">
                  <Input type={showPassword ? "text" : "password"} value={password} onChange={(e) => setPassword(e.target.value)} className="h-11 pr-10" />
                  <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>
            )}
            {role === "admin" && view === "login" && (
              <div><Label>Admin Access Code</Label><Input type="password" value={adminCode} onChange={(e) => setAdminCode(e.target.value)} className="h-11" /></div>
            )}
            <Button type="submit" className="w-full h-11 text-base">
              {view === "login" && (role === "admin" ? "Access Dashboard" : "Sign In")}
              {view === "signup" && "Create Account"}
              {view === "forgot" && "Send Reset Link"}
            </Button>
          </form>

          <div className="mt-6 text-center text-sm">
            {view === "login" && role === "user" && (
              <>Don't have an account?{" "}<button onClick={() => setView("signup")} className="font-medium text-primary hover:underline">Create Account</button></>
            )}
            {view === "signup" && (
              <>Already have an account?{" "}<button onClick={() => setView("login")} className="font-medium text-primary hover:underline">Sign In</button></>
            )}
            {view === "forgot" && (
              <button onClick={() => setView("login")} className="font-medium text-primary hover:underline">Back to Sign In</button>
            )}
          </div>
          <p className="text-[10px] text-muted-foreground text-center mt-6">
            By continuing, you agree to BlitzKart's Terms of Service and Privacy Policy
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default Login;
