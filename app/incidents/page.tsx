"use client"

import { Header } from "@/components/header"
import { Sidebar } from "@/components/sidebar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { IncidentList } from "@/components/incident-list"
import { Filter, Download } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function IncidentsPage() {
  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-auto bg-background">
          <div className="p-6 space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-foreground mb-2">Incidents</h1>
                <p className="text-muted-foreground">Detected security incidents and alerts</p>
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

            {/* Summary Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Card className="bg-card border-border">
                <CardContent className="p-6">
                  <p className="text-sm text-muted-foreground mb-2">Open Incidents</p>
                  <p className="text-3xl font-bold text-danger">12</p>
                </CardContent>
              </Card>
              <Card className="bg-card border-border">
                <CardContent className="p-6">
                  <p className="text-sm text-muted-foreground mb-2">Investigating</p>
                  <p className="text-3xl font-bold text-warning">3</p>
                </CardContent>
              </Card>
              <Card className="bg-card border-border">
                <CardContent className="p-6">
                  <p className="text-sm text-muted-foreground mb-2">MTTR (Minutes)</p>
                  <p className="text-3xl font-bold text-success">4.2</p>
                </CardContent>
              </Card>
              <Card className="bg-card border-border">
                <CardContent className="p-6">
                  <p className="text-sm text-muted-foreground mb-2">This Month</p>
                  <p className="text-3xl font-bold text-accent">87</p>
                </CardContent>
              </Card>
            </div>

            {/* Incidents List */}
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle>All Incidents</CardTitle>
                <CardDescription>Sorted by severity and creation time</CardDescription>
              </CardHeader>
              <CardContent>
                <IncidentList />
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  )
}
