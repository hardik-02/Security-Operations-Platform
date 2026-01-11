"use client"

import { Header } from "@/components/header"
import { Sidebar } from "@/components/sidebar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Filter, Download, TrendingUp } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function DetectionsPage() {
  const detections = [
    {
      id: "DET-001",
      rule: "Brute Force Attack",
      severity: "critical",
      count: 5,
      source_ip: "192.168.1.100",
      mitre: "T1110",
      timestamp: "2 min ago",
    },
    {
      id: "DET-002",
      rule: "Suspicious Port Access",
      severity: "high",
      count: 12,
      source_ip: "10.0.0.50",
      mitre: "T1570",
      timestamp: "15 min ago",
    },
    {
      id: "DET-003",
      rule: "Multiple Failed Logins",
      severity: "medium",
      count: 3,
      source_ip: "172.16.0.25",
      mitre: "T1110",
      timestamp: "1 hour ago",
    },
  ]

  const getSeverityColor = (severity: string) => {
    const colors = {
      critical: "text-danger",
      high: "text-warning",
      medium: "text-accent",
      low: "text-success",
    }
    return colors[severity as keyof typeof colors] || "text-muted-foreground"
  }

  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-auto bg-background">
          <div className="p-6 space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-foreground mb-2">Detections</h1>
                <p className="text-muted-foreground">Sigma-style detection rules and threat patterns</p>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" className="gap-2 bg-transparent">
                  <Filter size={18} />
                  Filter
                </Button>
                <Button variant="outline" className="gap-2 bg-transparent">
                  <Download size={18} />
                  Export
                </Button>
              </div>
            </div>

            {/* Detection Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card className="bg-card border-border">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground mb-2">Active Rules</p>
                      <p className="text-3xl font-bold text-foreground">24</p>
                    </div>
                    <TrendingUp className="w-8 h-8 text-accent" />
                  </div>
                </CardContent>
              </Card>
              <Card className="bg-card border-border">
                <CardContent className="p-6">
                  <p className="text-sm text-muted-foreground mb-2">24h Detections</p>
                  <p className="text-3xl font-bold text-danger">847</p>
                </CardContent>
              </Card>
              <Card className="bg-card border-border">
                <CardContent className="p-6">
                  <p className="text-sm text-muted-foreground mb-2">Critical Alerts</p>
                  <p className="text-3xl font-bold text-warning">12</p>
                </CardContent>
              </Card>
            </div>

            {/* Detection Rules */}
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle>Recent Detections</CardTitle>
                <CardDescription>Latest rule matches and threat detections</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {detections.map((detection) => (
                    <div
                      key={detection.id}
                      className="p-4 border border-border rounded-lg hover:bg-muted/30 transition-colors"
                    >
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-1">
                            <span className="font-mono text-sm text-muted-foreground">{detection.id}</span>
                            <span
                              className={`text-xs px-2 py-1 rounded font-mono bg-primary/20 ${getSeverityColor(detection.severity)}`}
                            >
                              {detection.severity.toUpperCase()}
                            </span>
                            <span className="text-xs text-muted-foreground bg-muted/30 px-2 py-1 rounded">
                              {detection.mitre}
                            </span>
                          </div>
                          <h3 className="font-semibold text-foreground">{detection.rule}</h3>
                          <p className="text-sm text-muted-foreground mt-1">
                            Source: {detection.source_ip} ({detection.count} matches)
                          </p>
                        </div>
                        <span className="text-xs text-muted-foreground whitespace-nowrap ml-4">
                          {detection.timestamp}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  )
}
