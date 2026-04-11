import Link from "next/link";
import { Logo } from "@/components/shared/Logo";

interface AuthLayoutProps {
  children: React.ReactNode;
  title: string;
  description?: string;
  footer?: React.ReactNode;
}

export function AuthLayout({
  children,
  title,
  description,
  footer,
}: AuthLayoutProps) {
  return (
    <div className="min-h-screen flex overflow-hidden">
      {/* Left Panel - Form */}
      {/* Left Panel */}
      <div className="flex w-full flex-col justify-center px-6 py-12 lg:w-1/2 lg:shrink-0 xl:px-24">
        <div className="mx-auto w-full max-w-sm">
          {/* Logo */}
          <div className="mb-8">
            <Logo size="lg" />
          </div>
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-2xl font-bold tracking-tight">{title}</h1>
            {description && (
              <p className="mt-2 text-sm text-muted-foreground">
                {description}
              </p>
            )}
          </div>
          {/* Form Content */}
          {children}
          {/* Footer */}
          {footer && <div className="mt-6 text-center text-sm">{footer}</div>}
        </div>
      </div>
     {/* Right Panel */}
<div className="hidden lg:block lg:w-1/2 relative">
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(135deg, #1a1a2e 0%, #16213e 40%, #0f3460 100%)",
          }}
        >
          {/* Grid background */}
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                "linear-gradient(rgba(99,102,241,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(99,102,241,0.08) 1px, transparent 1px)",
              backgroundSize: "40px 40px",
            }}
          />
          {/* Orbs */}
          <div
            className="absolute -top-20 -right-20 w-72 h-72 rounded-full"
            style={{
              background:
                "radial-gradient(circle, rgba(99,102,241,0.25) 0%, transparent 70%)",
            }}
          />
          <div
            className="absolute -bottom-10 -left-10 w-48 h-48 rounded-full"
            style={{
              background:
                "radial-gradient(circle, rgba(6,182,212,0.2) 0%, transparent 70%)",
            }}
          />

          <div className="absolute inset-0 flex items-center justify-center p-12">
            <div className="w-full max-w-sm space-y-4">
              {/* Live badge */}
              <div
                className="inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-mono"
                style={{
                  background: "rgba(99,102,241,0.15)",
                  borderColor: "rgba(99,102,241,0.3)",
                  color: "#a5b4fc",
                }}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-pulse" />
                Live mock server
              </div>

              {/* Code card */}
              <div
                className="rounded-xl p-4 font-mono text-xs space-y-1"
                style={{
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(255,255,255,0.08)",
                }}
              >
                <div>
                  <span style={{ color: "rgba(255,255,255,0.2)" }}>1 </span>
                  <span style={{ color: "#c084fc" }}>const</span>
                  <span style={{ color: "rgba(255,255,255,0.6)" }}>
                    {" "}
                    api ={" "}
                  </span>
                  <span style={{ color: "#67e8f9" }}>MockAPI</span>
                  <span style={{ color: "rgba(255,255,255,0.6)" }}>
                    .create({"({"}
                  </span>
                </div>
                <div>
                  <span style={{ color: "rgba(255,255,255,0.2)" }}>2 </span>
                  <span style={{ color: "rgba(255,255,255,0.6)" }}>
                    {" "}
                    base:{" "}
                  </span>
                  <span style={{ color: "#86efac" }}>"/api/v1"</span>
                  <span style={{ color: "rgba(255,255,255,0.6)" }}>,</span>
                </div>
                <div>
                  <span style={{ color: "rgba(255,255,255,0.2)" }}>3 </span>
                  <span style={{ color: "rgba(255,255,255,0.6)" }}>
                    {" "}
                    delay:{" "}
                  </span>
                  <span style={{ color: "#86efac" }}>120</span>
                  <span style={{ color: "rgba(255,255,255,0.6)" }}>,</span>
                </div>
                <div>
                  <span style={{ color: "rgba(255,255,255,0.2)" }}>4 </span>
                  <span style={{ color: "rgba(255,255,255,0.6)" }}>
                    {" "}
                    rateLimit:{" "}
                  </span>
                  <span style={{ color: "#86efac" }}>1000</span>
                  <span style={{ color: "rgba(255,255,255,0.6)" }}>,</span>
                </div>
                <div>
                  <span style={{ color: "rgba(255,255,255,0.2)" }}>5 </span>
                  <span style={{ color: "rgba(255,255,255,0.6)" }}>{"})"}</span>
                </div>
                <div>
                  <span style={{ color: "rgba(255,255,255,0.2)" }}>6 </span>
                  <span style={{ color: "rgba(255,255,255,0.3)" }}>
                    // → deployed in 3 seconds ✓
                  </span>
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-2">
                {[
                  ["12k", "requests/day"],
                  ["99.9%", "uptime"],
                  ["<50ms", "latency"],
                ].map(([num, lbl]) => (
                  <div
                    key={lbl}
                    className="rounded-lg p-3 text-center"
                    style={{
                      background: "rgba(255,255,255,0.04)",
                      border: "1px solid rgba(255,255,255,0.07)",
                    }}
                  >
                    <div className="text-lg font-semibold text-white">
                      {num}
                    </div>
                    <div
                      className="text-xs mt-0.5"
                      style={{ color: "rgba(255,255,255,0.4)" }}
                    >
                      {lbl}
                    </div>
                  </div>
                ))}
              </div>

              {/* Endpoints */}
              {[
                {
                  method: "GET",
                  path: "/api/v1/users",
                  ms: "48ms",
                  color: "#86efac",
                  bg: "rgba(34,197,94,0.15)",
                },
                {
                  method: "POST",
                  path: "/api/v1/orders",
                  ms: "52ms",
                  color: "#a5b4fc",
                  bg: "rgba(99,102,241,0.2)",
                },
                {
                  method: "DEL",
                  path: "/api/v1/session",
                  ms: "31ms",
                  color: "#fca5a5",
                  bg: "rgba(239,68,68,0.15)",
                },
              ].map(({ method, path, ms, color, bg }) => (
                <div
                  key={path}
                  className="flex items-center gap-2 rounded-lg px-3 py-2.5"
                  style={{
                    background: "rgba(255,255,255,0.04)",
                    border: "1px solid rgba(255,255,255,0.07)",
                  }}
                >
                  <span
                    className="text-xs font-bold font-mono px-1.5 py-0.5 rounded"
                    style={{ color, background: bg }}
                  >
                    {method}
                  </span>
                  <span
                    className="text-xs font-mono"
                    style={{ color: "rgba(255,255,255,0.7)" }}
                  >
                    {path}
                  </span>
                  <span
                    className="ml-auto text-xs font-mono"
                    style={{ color: "rgba(255,255,255,0.3)" }}
                  >
                    {ms}
                  </span>
                </div>
              ))}

              {/* Tags */}
              <div className="flex flex-wrap gap-2">
                {["Faker.js", "Rate limiting", "JWT auth", "Redis", "REST"].map(
                  (tag) => (
                    <span
                      key={tag}
                      className="text-xs px-2.5 py-1 rounded-full"
                      style={{
                        color: "rgba(255,255,255,0.4)",
                        background: "rgba(255,255,255,0.05)",
                        border: "1px solid rgba(255,255,255,0.08)",
                      }}
                    >
                      {tag}
                    </span>
                  ),
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
