import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Shield,
  FileText,
  ShoppingCart,
  ClipboardList,
  History,
  User,
  LogOut,
  TrendingUp,
  AlertTriangle,
  CheckCircle,
} from "lucide-react";

const Dashboard = () => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  const stats = [
    { label: "Active Policies", value: "3", icon: Shield, color: "text-accent" },
    { label: "Pending Claims", value: "1", icon: AlertTriangle, color: "text-warning" },
    { label: "Resolved Claims", value: "7", icon: CheckCircle, color: "text-success" },
    { label: "Total Coverage", value: "$250K", icon: TrendingUp, color: "text-primary" },
  ];

  const actions = [
    {
      title: "Submit a Claim",
      description: "File a new insurance claim quickly and securely",
      icon: FileText,
      onClick: () => {},
      featured: true,
    },
    {
      title: "Purchase Policy",
      description: "Browse and purchase new insurance policies",
      icon: ShoppingCart,
      onClick: () => {},
    },
    {
      title: "My Policies",
      description: "View and manage your active insurance policies",
      icon: ClipboardList,
      onClick: () => {},
    },
    {
      title: "Claims History",
      description: "Track the status of all your past claims",
      icon: History,
      onClick: () => {},
    },
    {
      title: "My Profile",
      description: "Update your personal information and preferences",
      icon: User,
      onClick: () => {},
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="gradient-primary text-primary-foreground">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Shield className="h-8 w-8" />
            <span className="text-xl font-display font-bold">SecureClaim</span>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm opacity-80 hidden sm:inline">{user?.email}</span>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                signOut();
                navigate("/");
              }}
              className="text-primary-foreground hover:bg-white/10"
            >
              <LogOut className="h-4 w-4 mr-2" />
              Sign Out
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-6 py-8 max-w-6xl">
        {/* Welcome */}
        <div className="mb-8">
          <h1 className="text-3xl font-display font-bold text-foreground">
            Welcome back{user?.email ? `, ${user.email.split("@")[0]}` : ""}
          </h1>
          <p className="text-muted-foreground mt-1">
            Here's an overview of your insurance portfolio
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {stats.map((stat) => (
            <Card key={stat.label} className="shadow-card border">
              <CardContent className="p-5">
                <div className="flex items-center justify-between mb-2">
                  <stat.icon className={`h-5 w-5 ${stat.color}`} />
                </div>
                <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                <p className="text-xs text-muted-foreground mt-1">{stat.label}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Quick Actions */}
        <h2 className="text-xl font-display font-bold text-foreground mb-4">Quick Actions</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {actions.map((action) => (
            <Card
              key={action.title}
              className={`shadow-card hover:shadow-card-hover transition-all duration-300 cursor-pointer group ${
                action.featured
                  ? "gradient-primary text-primary-foreground md:col-span-2 lg:col-span-1"
                  : "border hover:border-accent/30"
              }`}
              onClick={action.onClick}
            >
              <CardHeader className="pb-2">
                <div className="flex items-center gap-3">
                  <div
                    className={`p-2 rounded-lg ${
                      action.featured
                        ? "bg-white/15"
                        : "bg-accent/10"
                    }`}
                  >
                    <action.icon
                      className={`h-5 w-5 ${
                        action.featured ? "text-primary-foreground" : "text-accent"
                      }`}
                    />
                  </div>
                  <CardTitle
                    className={`text-lg font-sans font-semibold ${
                      action.featured ? "text-primary-foreground" : ""
                    }`}
                  >
                    {action.title}
                  </CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription
                  className={action.featured ? "text-primary-foreground/70" : ""}
                >
                  {action.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
