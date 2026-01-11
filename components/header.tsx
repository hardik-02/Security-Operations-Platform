"use client"

import { Clock, RefreshCw, Settings } from "lucide-react"
import { Button } from "@/components/ui/button"

export function Header() {
  return (
    <header className="bg-card border-b border-border px-6 py-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Security Operations Center</h1>
          <p className="text-sm text-muted-foreground">Real-time threat detection & incident response</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 text-muted-foreground">
            <Clock size={16} />
            <span className="text-sm">Last updated: 2 min ago</span>
          </div>
          <Button variant="outline" size="sm" className="gap-2 bg-transparent">
            <RefreshCw size={16} />
            Refresh
          </Button>
          <Button variant="outline" size="sm">
            <Settings size={16} />
          </Button>
        </div>
      </div>
    </header>
  )
}
