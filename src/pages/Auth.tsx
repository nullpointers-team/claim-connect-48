import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield, ArrowRight, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Auth = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { signIn, signUp } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!username.trim() || !password.trim()) return;
    setLoading(true);

    try {
      if (isSignUp) {
        await signUp(username.trim(), password);
        toast({ title: "Account created!", description: "You can now sign in." });
        setIsSignUp(false);
        setPassword("");
      } else {
        await signIn(username.trim(), password);
        navigate("/dashboard");
      }
    } catch (err: any) {
      toast({
        title: isSignUp ? "Sign up failed" : "Sign in failed",
        description: err.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left panel */}
      <div className="hidden lg:flex lg:w-1/2 gradient-primary items-center justify-center p-12">
        <div className="max-w-md text-primary-foreground">
          <div className="flex items-center gap-3 mb-8">
            <Shield className="h-10 w-10" />
            <span className="text-2xl font-display font-bold">SecureClaim</span>
          </div>
          <h1 className="text-4xl font-display font-bold mb-4 leading-tight">
            Your trusted partner in insurance claims
          </h1>
          <p className="text-lg opacity-80 leading-relaxed">
            File claims, manage policies, and track your coverage — all in one secure platform.
          </p>
        </div>
      </div>

      {/* Right panel */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-background">
        <div className="w-full max-w-md">
          <div className="lg:hidden flex items-center gap-2 mb-8 justify-center">
            <Shield className="h-8 w-8 text-primary" />
            <span className="text-xl font-display font-bold text-primary">SecureClaim</span>
          </div>

          <Card className="border-0 shadow-card">
            <CardHeader className="space-y-1 pb-4">
              <CardTitle className="text-2xl font-display">
                {isSignUp ? "Create an account" : "Welcome back"}
              </CardTitle>
              <CardDescription>
                {isSignUp
                  ? "Enter your details to get started"
                  : "Sign in to your account to continue"}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="username">Email / Username</Label>
                  <Input
                    id="username"
                    type="text"
                    placeholder="you@example.com"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
                <Button type="submit" className="w-full" disabled={loading}>
                  {loading ? (
                    <Loader2 className="h-4 w-4 animate-spin mr-2" />
                  ) : (
                    <ArrowRight className="h-4 w-4 mr-2" />
                  )}
                  {isSignUp ? "Create Account" : "Sign In"}
                </Button>
              </form>

              <div className="mt-6 text-center text-sm text-muted-foreground">
                {isSignUp ? "Already have an account?" : "Don't have an account?"}{" "}
                <button
                  onClick={() => {
                    setIsSignUp(!isSignUp);
                    setPassword("");
                  }}
                  className="text-accent font-medium hover:underline"
                >
                  {isSignUp ? "Sign in" : "Sign up"}
                </button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Auth;
