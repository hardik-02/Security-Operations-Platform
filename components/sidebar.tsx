"use client"

import { AlertTriangle, BarChart3, Settings, Shield, Zap } from "lucide-react"
import Link from "next/link"

export function Sidebar() {
  const menuItems = [
    { icon: BarChart3, label: "Dashboard", href: "/" },
    { icon: AlertTriangle, label: "Incidents", href: "/incidents" },
    { icon: Zap, label: "Detections", href: "/detections" },
    { icon: Shield, label: "Threat Intel", href: "/threat-intel" },
    { icon: Settings, label: "Settings", href: "/settings" },
  ]

  return (
    <aside className="w-64 bg-card border-r border-border p-6 overflow-y-auto">
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-2">
          <Shield className="text-accent" size={24} />
          <h2 className="text-xl font-bold text-foreground">SecOps</h2>
        </div>
        <p className="text-xs text-muted-foreground">Threat Detection Platform</p>
      </div>

      <nav className="space-y-2">
        {menuItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="flex items-center gap-3 px-4 py-3 rounded-lg text-muted-foreground hover:bg-primary hover:text-foreground transition-colors"
          >
            <item.icon size={18} />
            <span className="text-sm font-medium">{item.label}</span>
          </Link>
        ))}
      </nav>

      <div className="mt-8 p-4 bg-primary/10 border border-primary/30 rounded-lg">
        <p className="text-xs text-muted-foreground mb-2">System Status</p>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
          <span className="text-sm text-success font-medium">All Systems Online</span>
        </div>
      </div>
    </aside>
  )
}
