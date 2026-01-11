"use client"

import { AlertTriangle, TrendingUp, Clock, Users } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { IncidentList } from "./incident-list"
import { ThreatChart } from "./threat-chart"
import { DetectionMetrics } from "./detection-metrics"

export function Dashboard() {
  const stats = [
    {
      label: "Critical Alerts",
      value: "12",
      icon: AlertTriangle,
      color: "text-danger",
      bgColor: "bg-danger/10",
    },
    {
      label: "Incidents (24h)",
      value: "3",
      icon: TrendingUp,
      color: "text-warning",
      bgColor: "bg-warning/10",
    },
    {
      label: "Mean Response Time",
      value: "4.2m",
      icon: Clock,
      color: "text-success",
      bgColor: "bg-success/10",
    },
    {
      label: "Detected Threats",
      value: "847",
      icon: Users,
      color: "text-accent",
      bgColor: "bg-accent/10",
    },
  ]

  return (
    <div className="p-6 space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <Card key={stat.label} className="bg-card border-border">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                  <p className="text-3xl font-bold text-foreground mt-2">{stat.value}</p>
                </div>
                <div className={`${stat.bgColor} p-3 rounded-lg`}>
                  <stat.icon className={`${stat.color} w-6 h-6`} />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts & Metrics Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2 bg-card border-border">
          <CardHeader>
            <CardTitle>Threat Trend (24h)</CardTitle>
            <CardDescription>Detection activity over the past 24 hours</CardDescription>
          </CardHeader>
          <CardContent>
            <ThreatChart />
          </CardContent>
        </Card>

        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle>Detection Metrics</CardTitle>
            <CardDescription>Current detection rates</CardDescription>
          </CardHeader>
          <CardContent>
            <DetectionMetrics />
          </CardContent>
        </Card>
      </div>

      {/* Recent Incidents */}
      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle>Recent Incidents</CardTitle>
          <CardDescription>Latest security events requiring attention</CardDescription>
        </CardHeader>
        <CardContent>
          <IncidentList />
        </CardContent>
      </Card>
    </div>
  )
}
