"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { StatsCard } from "@/components/shared/StatsCard";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Activity,
  Clock,
  AlertCircle,
  CheckCircle,
  TrendingUp,
} from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
} from "recharts";

interface AnalyticsTabProps {
  projectId: string;
}

// Mock data - replace with real API call
const mockTimeSeriesData = [
  { time: "00:00", requests: 120, errors: 5 },
  { time: "04:00", requests: 80, errors: 2 },
  { time: "08:00", requests: 450, errors: 12 },
  { time: "12:00", requests: 780, errors: 18 },
  { time: "16:00", requests: 620, errors: 8 },
  { time: "20:00", requests: 340, errors: 6 },
];

const mockEndpointData = [
  { endpoint: "GET /users", requests: 1250 },
  { endpoint: "GET /users/:id", requests: 890 },
  { endpoint: "POST /users", requests: 320 },
  { endpoint: "GET /products", requests: 280 },
  { endpoint: "DELETE /users/:id", requests: 120 },
];

export function AnalyticsTab({ projectId }: AnalyticsTabProps) {
  const [timeRange, setTimeRange] = useState("7d");

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold">Analytics</h2>
          <p className="text-sm text-muted-foreground">
            Monitor your API usage and performance
          </p>
        </div>
        <Select value={timeRange} onValueChange={setTimeRange}>
          <SelectTrigger className="w-36">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="24h">Last 24 hours</SelectItem>
            <SelectItem value="7d">Last 7 days</SelectItem>
            <SelectItem value="30d">Last 30 days</SelectItem>
            <SelectItem value="90d">Last 90 days</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatsCard
          title="Total Requests"
          value="12.5k"
          icon={Activity}
          trend={{ value: 12.5, isPositive: true }}
        />
        <StatsCard
          title="Success Rate"
          value="99.2%"
          icon={CheckCircle}
          trend={{ value: 0.5, isPositive: true }}
        />
        <StatsCard
          title="Avg Response Time"
          value="124ms"
          icon={Clock}
          trend={{ value: 8.2, isPositive: false }}
        />
        <StatsCard
          title="Error Rate"
          value="0.8%"
          icon={AlertCircle}
          trend={{ value: 0.2, isPositive: false }}
        />
      </div>

      {/* Charts */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Requests Over Time */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <TrendingUp className="h-4 w-4" />
              Requests Over Time
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={mockTimeSeriesData}>
                  <CartesianGrid
                    strokeDasharray="3 3"
                    className="stroke-muted"
                  />
                  <XAxis
                    dataKey="time"
                    className="text-xs"
                    tick={{ fill: "hsl(var(--muted-foreground))" }}
                  />
                  <YAxis
                    className="text-xs"
                    tick={{ fill: "hsl(var(--muted-foreground))" }}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "8px",
                    }}
                  />
                  <Line
                    type="monotone"
                    dataKey="requests"
                    stroke="hsl(var(--primary))"
                    strokeWidth={2}
                    dot={false}
                  />
                  <Line
                    type="monotone"
                    dataKey="errors"
                    stroke="hsl(var(--destructive))"
                    strokeWidth={2}
                    dot={false}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Top Endpoints */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Top Endpoints</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={mockEndpointData} layout="vertical">
                  <CartesianGrid
                    strokeDasharray="3 3"
                    className="stroke-muted"
                  />
                  <XAxis
                    type="number"
                    className="text-xs"
                    tick={{ fill: "hsl(var(--muted-foreground))" }}
                  />
                  <YAxis
                    type="category"
                    dataKey="endpoint"
                    className="text-xs"
                    tick={{ fill: "hsl(var(--muted-foreground))" }}
                    width={120}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "8px",
                    }}
                  />
                  <Bar
                    dataKey="requests"
                    fill="hsl(var(--primary))"
                    radius={4}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity Table */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Recent Requests</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4 font-medium text-muted-foreground">
                    Endpoint
                  </th>
                  <th className="text-left py-3 px-4 font-medium text-muted-foreground">
                    Status
                  </th>
                  <th className="text-left py-3 px-4 font-medium text-muted-foreground">
                    Response Time
                  </th>
                  <th className="text-left py-3 px-4 font-medium text-muted-foreground">
                    IP Address
                  </th>
                  <th className="text-left py-3 px-4 font-medium text-muted-foreground">
                    Time
                  </th>
                </tr>
              </thead>
              <tbody>
                {[
                  {
                    endpoint: "GET /users/123",
                    status: 200,
                    time: 45,
                    ip: "192.168.1.1",
                    when: "2 min ago",
                  },
                  {
                    endpoint: "POST /users",
                    status: 201,
                    time: 120,
                    ip: "192.168.1.2",
                    when: "5 min ago",
                  },
                  {
                    endpoint: "GET /users",
                    status: 200,
                    time: 89,
                    ip: "192.168.1.1",
                    when: "8 min ago",
                  },
                  {
                    endpoint: "DELETE /users/456",
                    status: 204,
                    time: 34,
                    ip: "192.168.1.3",
                    when: "12 min ago",
                  },
                  {
                    endpoint: "GET /products",
                    status: 429,
                    time: 12,
                    ip: "192.168.1.4",
                    when: "15 min ago",
                  },
                ].map((row, i) => (
                  <tr
                    key={i}
                    className="border-b last:border-0 hover:bg-muted/50"
                  >
                    <td className="py-3 px-4 font-mono">{row.endpoint}</td>
                    <td className="py-3 px-4">
                      <span
                        className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${
                          row.status < 300
                            ? "bg-success/10 text-success"
                            : row.status < 400
                              ? "bg-warning/10 text-warning"
                              : "bg-destructive/10 text-destructive"
                        }`}
                      >
                        {row.status}
                      </span>
                    </td>
                    <td className="py-3 px-4">{row.time}ms</td>
                    <td className="py-3 px-4 font-mono text-muted-foreground">
                      {row.ip}
                    </td>
                    <td className="py-3 px-4 text-muted-foreground">
                      {row.when}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
