"use client"
import { Card, CardContent } from "@/components/ui/card"

interface ThreatData {
  ioc: string
  type: string
  threat_level: string
  reputation_score: number
  source: string
  description: string
  malware: string[]
}

export function ThreatIntelPanel() {
  const threats: ThreatData[] = [
    {
      ioc: "192.168.1.100",
      type: "IP Address",
      threat_level: "CRITICAL",
      reputation_score: 0.95,
      source: "AbuseIPDB",
      description: "Known C2 command and control server",
      malware: ["Emotet", "Trickbot"],
    },
    {
      ioc: "10.0.0.50",
      type: "IP Address",
      threat_level: "MALICIOUS",
      reputation_score: 0.85,
      source: "Shodan",
      description: "Known brute force attacker",
      malware: ["Hydra", "Medusa"],
    },
  ]

  const getThreatColor = (level: string) => {
    const colors = {
      CRITICAL: "text-danger",
      MALICIOUS: "text-warning",
      SUSPICIOUS: "text-accent",
      BENIGN: "text-success",
    }
    return colors[level as keyof typeof colors] || "text-muted-foreground"
  }

  const getThreatBg = (level: string) => {
    const colors = {
      CRITICAL: "bg-danger/10",
      MALICIOUS: "bg-warning/10",
      SUSPICIOUS: "bg-accent/10",
      BENIGN: "bg-success/10",
    }
    return colors[level as keyof typeof colors] || "bg-muted"
  }

  return (
    <div className="space-y-4">
      {threats.map((threat) => (
        <Card key={threat.ioc} className="bg-card border-border overflow-hidden">
          <CardContent className="p-4">
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <code className="text-sm font-mono text-foreground bg-muted/50 px-2 py-1 rounded">{threat.ioc}</code>
                  <span className="text-xs text-muted-foreground">{threat.type}</span>
                </div>
                <p className="text-sm text-muted-foreground">{threat.description}</p>
              </div>
              <div className={`${getThreatBg(threat.threat_level)} px-3 py-2 rounded flex-shrink-0`}>
                <span className={`text-xs font-bold ${getThreatColor(threat.threat_level)}`}>
                  {threat.threat_level}
                </span>
              </div>
            </div>

            {/* Reputation Score */}
            <div className="mb-3">
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs text-muted-foreground">Reputation Score</span>
                <span className="text-sm font-semibold text-danger">{(threat.reputation_score * 100).toFixed(0)}%</span>
              </div>
              <div className="w-full bg-muted/30 rounded-full h-2">
                <div
                  className="bg-danger h-full rounded-full"
                  style={{ width: `${threat.reputation_score * 100}%` }}
                ></div>
              </div>
            </div>

            {/* Source & Malware */}
            <div className="flex items-center justify-between text-xs">
              <span className="text-muted-foreground">Source: {threat.source}</span>
              <div className="flex gap-1">
                {threat.malware.map((m) => (
                  <span key={m} className="bg-danger/20 text-danger px-2 py-1 rounded-sm text-xs">
                    {m}
                  </span>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
