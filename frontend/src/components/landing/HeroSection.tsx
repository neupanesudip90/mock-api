import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, Play, Sparkles } from "lucide-react";

export function HeroSection() {
  return (
    <section className="relative pt-32 pb-20 overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl" />
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-[0.02]" />
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-4xl mx-auto">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-8 animate-fade-in">
            <Sparkles className="h-4 w-4" />
            <span>Now with AI-powered response generation</span>
          </div>

          {/* Headline */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight animate-slide-in-from-bottom">
            Create Mock APIs <span className="gradient-text">in Seconds</span>
          </h1>

          {/* Subheadline */}
          <p className="mt-6 text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto animate-slide-in-from-bottom [animation-delay:100ms]">
            Build, configure, and test API endpoints without writing backend
            code. Perfect for frontend development, prototyping, and testing.
          </p>

          {/* CTAs */}
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 animate-slide-in-from-bottom [animation-delay:200ms]">
            <Link href="/register">
              <Button size="xl" className="gap-2 shadow-lg shadow-primary/25">
                Start for Free
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <Button size="xl" variant="outline" className="gap-2">
              <Play className="h-4 w-4" />
              Watch Demo
            </Button>
          </div>

          {/* Social Proof */}
          <p className="mt-8 text-sm text-muted-foreground animate-slide-in-from-bottom [animation-delay:300ms]">
            Trusted by{" "}
            <span className="font-semibold text-foreground">10,000+</span>{" "}
            developers worldwide
          </p>
        </div>

        {/* Hero Image/Demo */}
        <div className="mt-16 relative animate-slide-in-from-bottom [animation-delay:400ms]">
          <div className="relative rounded-xl overflow-hidden border shadow-2xl bg-card">
            {/* Mock Browser Header */}
            <div className="flex items-center gap-2 px-4 py-3 border-b bg-muted/50">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-red-500" />
                <div className="w-3 h-3 rounded-full bg-yellow-500" />
                <div className="w-3 h-3 rounded-full bg-green-500" />
              </div>
              <div className="flex-1 flex justify-center">
                <div className="px-4 py-1 rounded-md bg-background text-xs text-muted-foreground">
                  https://api.mockapi.io/v1/users
                </div>
              </div>
            </div>

            {/* Code Preview */}
            <div className="p-6 bg-gray-950 text-gray-100 font-mono text-sm overflow-x-auto">
              <pre className="language-json">
                {`{
  "users": [
    {
      "id": "1",
      "name": "Alice Johnson",
      "email": "alice@example.com",
      "avatar": "https://api.dicebear.com/7.x/avataaars/svg?seed=alice"
    },
    {
      "id": "2", 
      "name": "Bob Smith",
      "email": "bob@example.com",
      "avatar": "https://api.dicebear.com/7.x/avataaars/svg?seed=bob"
    }
  ],
  "total": 2
}`}
              </pre>
            </div>
          </div>

          {/* Decorative Elements */}
          <div className="absolute -top-4 -left-4 w-24 h-24 bg-gradient-to-br from-primary to-blue-500 rounded-full opacity-20 blur-xl" />
          <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-gradient-to-br from-cyan-500 to-primary rounded-full opacity-20 blur-xl" />
        </div>
      </div>
    </section>
  );
}
