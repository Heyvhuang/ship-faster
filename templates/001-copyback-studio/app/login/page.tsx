"use client";

import { useEffect, useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Command, Mail, Lock, ArrowRight, Loader2, Eye, EyeOff } from "lucide-react";
import { useAuth } from "../../components/AuthProvider";
import { Button } from "../../components/Button";

function LoginContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const code = searchParams.get("code");
  const redirectPath = "/studio";
  const { supabase, session } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSignUp, setIsSignUp] = useState(false);
  const [useMagicLink, setUseMagicLink] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  useEffect(() => {
    if (!code) return;

    const runExchange = async () => {
      const { error } = await supabase.auth.exchangeCodeForSession(code);
      if (!error) {
        router.replace(redirectPath);
      }
    };

    runExchange();
  }, [code, supabase, router, redirectPath]);

  useEffect(() => {
    if (session) {
      router.replace(redirectPath);
    }
  }, [session, router, redirectPath]);

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    if (!useMagicLink && !password) return;

    setLoading(true);
    setMessage(null);

    try {
      if (isSignUp) {
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            emailRedirectTo: `${window.location.origin}${redirectPath}`,
          },
        });
        if (error) throw error;
        setMessage({ type: "success", text: "Check your email to confirm your account!" });
      } else if (useMagicLink) {
        const { error } = await supabase.auth.signInWithOtp({
          email,
          options: {
            emailRedirectTo: `${window.location.origin}${redirectPath}`,
          },
        });
        if (error) throw error;
        setMessage({ type: "success", text: "Check your email for the login link!" });
      } else {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        if (error) throw error;
        router.replace(redirectPath);
      }
    } catch (error: any) {
      setMessage({ type: "error", text: error.message });
    } finally {
      setLoading(false);
    }
  };

  const handleOAuth = async (provider: "google") => {
    await supabase.auth.signInWithOAuth({
      provider,
      options: {
        redirectTo: `${window.location.origin}${redirectPath}`,
      },
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-paper px-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 font-bold text-xl tracking-tight mb-4">
            <div className="w-8 h-8 bg-ink-900 text-white flex items-center justify-center rounded-md">
              <Command size={18} />
            </div>
            CopyBack Studio
          </div>
          <p className="text-ink-500 text-sm">Sign in to access your projects</p>
        </div>

        <div className="bg-white border border-ink-200 rounded-xl p-6 shadow-sm">
          <div className="flex items-center justify-center gap-4 mb-6">
            <button
              onClick={() => setIsSignUp(false)}
              className={`text-sm font-medium transition-colors ${!isSignUp ? "text-ink-900 font-bold" : "text-ink-400 hover:text-ink-600"
                }`}
            >
              Sign In
            </button>
            <div className="w-px h-4 bg-ink-200" />
            <button
              onClick={() => {
                setIsSignUp(true);
                setUseMagicLink(false);
              }}
              className={`text-sm font-medium transition-colors ${isSignUp ? "text-ink-900 font-bold" : "text-ink-400 hover:text-ink-600"
                }`}
            >
              Sign Up
            </button>
          </div>

          <form onSubmit={handleAuth} className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-xs font-bold text-ink-700 mb-2 uppercase tracking-wide">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-ink-400" size={16} />
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="w-full pl-10 pr-4 py-2.5 border border-ink-200 rounded-lg text-sm focus:ring-2 focus:ring-accent focus:border-accent"
                  required
                />
              </div>
            </div>

            {(!useMagicLink || isSignUp) && (
              <div>
                <label htmlFor="password" className="block text-xs font-bold text-ink-700 mb-2 uppercase tracking-wide">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-ink-400" size={16} />
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="********"
                    className="w-full pl-10 pr-10 py-2.5 border border-ink-200 rounded-lg text-sm focus:ring-2 focus:ring-accent focus:border-accent"
                    required={!useMagicLink || isSignUp}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((prev) => !prev)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-ink-400 hover:text-ink-700"
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
                {!isSignUp && !useMagicLink && (
                  <button
                    type="button"
                    onClick={() => {
                      setUseMagicLink(true);
                      setPassword("");
                    }}
                    className="mt-2 text-[11px] text-ink-500 hover:text-ink-900 underline decoration-ink-300 underline-offset-2"
                  >
                    Forgot password? Send a magic link.
                  </button>
                )}
              </div>
            )}

            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <>
                  {isSignUp
                    ? "Create Account"
                    : useMagicLink
                      ? "Send Magic Link"
                      : "Sign In"}
                  <ArrowRight className="w-4 h-4 ml-2" />
                </>
              )}
            </Button>
          </form>

          {!isSignUp && (
            <div className="mt-4 text-center">
              <button
                type="button"
                onClick={() => setUseMagicLink(!useMagicLink)}
                className="text-xs text-ink-500 hover:text-ink-900 underline decoration-ink-300 underline-offset-2 transition-colors"
              >
                {useMagicLink
                  ? "Sign in with password instead"
                  : "Sign in with magic link instead"}
              </button>
            </div>
          )}

          {message && (
            <div
              className={`mt-4 p-3 rounded-lg text-sm ${message.type === "success"
                  ? "bg-green-50 text-green-700 border border-green-200"
                  : "bg-red-50 text-red-700 border border-red-200"
                }`}
            >
              {message.text}
            </div>
          )}

          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-ink-200" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-white px-2 text-ink-400">or continue with</span>
            </div>
          </div>

          <div className="grid grid-cols-1">
            <button
              type="button"
              onClick={() => handleOAuth("google")}
              className="flex items-center justify-center gap-2 px-4 py-2.5 border border-ink-200 rounded-lg text-sm font-medium hover:bg-ink-50 transition-colors"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="currentColor"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="currentColor"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                />
                <path
                  fill="currentColor"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
              Google
            </button>
          </div>
        </div>

        <p className="text-center text-xs text-ink-400 mt-6">
          By signing in, you agree to our Terms of Service and Privacy Policy.
        </p>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center bg-paper"><Loader2 className="animate-spin text-ink-400" /></div>}>
      <LoginContent />
    </Suspense>
  );
}
