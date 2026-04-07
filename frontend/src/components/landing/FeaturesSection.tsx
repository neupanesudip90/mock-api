import {
  Zap,
  Shield,
  BarChart3,
  Code2,
  Clock,
  Users,
  Sparkles,
  Globe,
} from "lucide-react";
import { cn } from "@/lib/utils";

const features = [
  {
    icon: Zap,
    title: "Instant Setup",
    description:
      "Create mock endpoints in seconds. No server configuration needed.",
    color: "text-yellow-500",
    bgColor: "bg-yellow-500/10",
  },
  {
    icon: Sparkles,
    title: "Dynamic Data",
    description:
      "Generate realistic fake data using Faker.js templates automatically.",
    color: "text-purple-500",
    bgColor: "bg-purple-500/10",
  },
  {
    icon: Shield,
    title: "Secure API Keys",
    description:
      "Protect your endpoints with API keys. Revoke access instantly.",
    color: "text-green-500",
    bgColor: "bg-green-500/10",
  },
  {
    icon: BarChart3,
    title: "Usage Analytics",
    description:
      "Track requests, monitor performance, and analyze usage patterns.",
    color: "text-blue-500",
    bgColor: "bg-blue-500/10",
  },
  {
    icon: Clock,
    title: "Rate Limiting",
    description: "Built-in rate limiting to simulate real-world API behavior.",
    color: "text-orange-500",
    bgColor: "bg-orange-500/10",
  },
  {
    icon: Code2,
    title: "Custom Responses",
    description:
      "Define exact JSON schemas for your mock responses with full control.",
    color: "text-cyan-500",
    bgColor: "bg-cyan-500/10",
  },
  {
    icon: Globe,
    title: "Global CDN",
    description: "Low-latency responses from edge locations worldwide.",
    color: "text-pink-500",
    bgColor: "bg-pink-500/10",
  },
  {
    icon: Users,
    title: "Team Collaboration",
    description: "Share projects with your team. Everyone stays in sync.",
    color: "text-indigo-500",
    bgColor: "bg-indigo-500/10",
  },
];

export function FeaturesSection() {
  return (
    <section id="features" className="py-24 bg-muted/30">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
            Everything you need to{" "}
            <span className="gradient-text">mock APIs</span>
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Powerful features designed for developers who want to move fast
            without compromising on quality.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <div
              key={feature.title}
              className={cn(
                "group relative p-6 rounded-2xl bg-card border transition-all duration-300",
                "hover:shadow-lg hover:shadow-primary/5 hover:-translate-y-1",
              )}
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <div
                className={cn(
                  "inline-flex items-center justify-center w-12 h-12 rounded-xl mb-4",
                  feature.bgColor,
                )}
              >
                <feature.icon className={cn("h-6 w-6", feature.color)} />
              </div>
              <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
              <p className="text-sm text-muted-foreground">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
