"use client"

import { Header } from "@/components/header"
import { Sidebar } from "@/components/sidebar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Bell, Shield, Database } from "lucide-react"

export default function SettingsPage() {
  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-auto bg-background">
          <div className="p-6 space-y-6">
            <div>
              <h1 className="text-3xl font-bold text-foreground mb-2">Settings</h1>
              <p className="text-muted-foreground">Configure security operations platform</p>
            </div>

            {/* Alert Settings */}
            <Card className="bg-card border-border">
              <CardHeader className="flex flex-row items-center justify-between space-y-0">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <Bell size={20} />
                    Alert Settings
                  </CardTitle>
                  <CardDescription>Configure alert thresholds and notifications</CardDescription>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-foreground">Critical Alerts</p>
                    <p className="text-sm text-muted-foreground">Email notifications for critical severity</p>
                  </div>
                  <input type="checkbox" defaultChecked className="w-4 h-4" />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-foreground">Incident Auto-Escalation</p>
                    <p className="text-sm text-muted-foreground">Auto-escalate high severity incidents</p>
                  </div>
                  <input type="checkbox" defaultChecked className="w-4 h-4" />
                </div>
              </CardContent>
            </Card>

            {/* Detection Settings */}
            <Card className="bg-card border-border">
              <CardHeader className="flex flex-row items-center justify-between space-y-0">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <Shield size={20} />
                    Detection Rules
                  </CardTitle>
                  <CardDescription>Manage detection engine rules</CardDescription>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button className="w-full">Add Custom Rule</Button>
                <Button variant="outline" className="w-full bg-transparent">
                  Update Rule Set
                </Button>
              </CardContent>
            </Card>

            {/* Data Management */}
            <Card className="bg-card border-border">
              <CardHeader className="flex flex-row items-center justify-between space-y-0">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <Database size={20} />
                    Data Management
                  </CardTitle>
                  <CardDescription>Manage logs and incident data retention</CardDescription>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <label className="text-sm text-muted-foreground">Log Retention (days)</label>
                  <input
                    type="number"
                    defaultValue="30"
                    className="w-full px-3 py-2 mt-1 bg-muted/30 border border-border rounded text-foreground"
                  />
                </div>
                <Button variant="outline" className="w-full bg-transparent">
                  Export Incident Data
                </Button>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  )
}
