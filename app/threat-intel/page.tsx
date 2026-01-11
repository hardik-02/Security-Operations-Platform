"use client"

import { Suspense } from "react"
import { Header } from "@/components/header"
import { Sidebar } from "@/components/sidebar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ThreatIntelPanel } from "@/components/threat-intel-panel"
import { Search, Filter } from "lucide-react"
import { Button } from "@/components/ui/button"

function ThreatIntelContent() {
  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">Threat Intelligence</h1>
        <p className="text-muted-foreground">IOC enrichment, reputation scoring, and malware association</p>
      </div>

      {/* Search & Filter */}
      <Card className="bg-card border-border">
        <CardContent className="p-4">
          <div className="flex gap-3">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-3 text-muted-foreground" size={18} />
              <input
                type="text"
                placeholder="Search IOCs (IP, domain, hash)..."
                className="w-full pl-10 pr-4 py-2 bg-muted/30 border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:border-accent"
              />
            </div>
            <Button variant="outline" className="gap-2 bg-transparent">
              <Filter size={18} />
              Filter
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* IOC Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
        <Card className="bg-card border-border">
          <CardContent className="p-6">
            <p className="text-sm text-muted-foreground mb-2">Total IOCs</p>
            <p className="text-3xl font-bold text-foreground">847</p>
          </CardContent>
        </Card>
        <Card className="bg-card border-border">
          <CardContent className="p-6">
            <p className="text-sm text-muted-foreground mb-2">Critical</p>
            <p className="text-3xl font-bold text-danger">34</p>
          </CardContent>
        </Card>
        <Card className="bg-card border-border">
          <CardContent className="p-6">
            <p className="text-sm text-muted-foreground mb-2">Malicious</p>
            <p className="text-3xl font-bold text-warning">156</p>
          </CardContent>
        </Card>
        <Card className="bg-card border-border">
          <CardContent className="p-6">
            <p className="text-sm text-muted-foreground mb-2">Feeds Active</p>
            <p className="text-3xl font-bold text-accent">8</p>
          </CardContent>
        </Card>
      </div>

      {/* IOC Details */}
      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle>High-Risk Indicators</CardTitle>
          <CardDescription>Recently detected critical threat indicators</CardDescription>
        </CardHeader>
        <CardContent>
          <ThreatIntelPanel />
        </CardContent>
      </Card>
    </div>
  )
}

export default function ThreatIntelPage() {
  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-auto bg-background">
          <Suspense fallback={null}>
            <ThreatIntelContent />
          </Suspense>
        </main>
      </div>
    </div>
  )
}
