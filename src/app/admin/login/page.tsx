"use client";

import { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Lock, Mail, Loader2, AlertCircle } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

export default function AdminLoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Initialize Supabase client (using singleton from lib)
  const supabase = createClient();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        throw error;
      }

      // Hard redirect to ensure middleware picks up the new auth cookie
      window.location.href = "/admin";
    } catch (err: any) {
      setError(err.message || "Failed to authenticate.");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-apyx-bg flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md bg-apyx-surface border border-apyx-border rounded-3xl p-8 shadow-2xl">
        <div className="text-center space-y-2 mb-8">
          <h1 className="text-3xl font-bold font-heading text-white">Sign in to APYX</h1>
          <p className="text-apyx-text-secondary text-sm">
            Enter your credentials to access the dashboard.
          </p>
        </div>

        {error && (
          <div className="mb-6 p-4 rounded-xl bg-red-500/10 border border-red-500/20 flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
            <p className="text-sm text-red-400">{error}</p>
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-white" htmlFor="email">
              Email Address
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Mail className="h-5 w-5 text-apyx-text-muted" />
              </div>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="pl-10 bg-apyx-bg border-apyx-border h-12"
                placeholder="admin@apyx.club"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-white" htmlFor="password">
              Password
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Lock className="h-5 w-5 text-apyx-text-muted" />
              </div>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="pl-10 bg-apyx-bg border-apyx-border h-12"
                placeholder="••••••••"
                required
              />
            </div>
          </div>

          <Button
            type="submit"
            disabled={loading}
            className="w-full bg-apyx-purple hover:bg-apyx-purple/90 text-white h-12 text-base font-semibold mt-4"
          >
            {loading ? (
              <>
                <Loader2 className="w-5 h-5 mr-2 animate-spin" /> Authenticating...
              </>
            ) : (
              "Sign In"
            )}
          </Button>
        </form>
      </div>
    </div>
  );
}
