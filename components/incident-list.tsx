"use client"

export function IncidentList() {
  const incidents = [
    {
      id: "INC-001",
      title: "Brute Force Attack Detected",
      severity: "critical",
      status: "open",
      timestamp: "2 minutes ago",
      description: "Multiple failed login attempts from 192.168.1.100",
    },
    {
      id: "INC-002",
      title: "Suspicious Privilege Escalation",
      severity: "high",
      status: "investigating",
      timestamp: "15 minutes ago",
      description: "Unusual sudo access pattern detected",
    },
    {
      id: "INC-003",
      title: "Data Exfiltration Alert",
      severity: "high",
      status: "investigating",
      timestamp: "1 hour ago",
      description: "Large outbound data transfer detected",
    },
  ]

  const getSeverityStyles = (severity: string) => {
    const styles = {
      critical: "bg-danger/10 text-danger border-danger/30",
      high: "bg-warning/10 text-warning border-warning/30",
      medium: "bg-accent/10 text-accent border-accent/30",
      low: "bg-success/10 text-success border-success/30",
    }
    return styles[severity as keyof typeof styles] || styles.medium
  }

  const getStatusStyles = (status: string) => {
    const styles = {
      open: "bg-danger/10 text-danger",
      investigating: "bg-warning/10 text-warning",
      resolved: "bg-success/10 text-success",
      mitigated: "bg-accent/10 text-accent",
    }
    return styles[status as keyof typeof styles] || styles.open
  }

  return (
    <div className="space-y-3">
      {incidents.map((incident) => (
        <div
          key={incident.id}
          className="p-4 border border-border rounded-lg hover:bg-muted/30 transition-colors cursor-pointer"
        >
          <div className="flex items-start justify-between mb-2">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-1">
                <span className="font-mono text-sm text-muted-foreground">{incident.id}</span>
                <span className={`text-xs px-2 py-1 rounded border ${getSeverityStyles(incident.severity)}`}>
                  {incident.severity.toUpperCase()}
                </span>
                <span className={`text-xs px-2 py-1 rounded ${getStatusStyles(incident.status)}`}>
                  {incident.status.toUpperCase()}
                </span>
              </div>
              <h3 className="font-semibold text-foreground">{incident.title}</h3>
              <p className="text-sm text-muted-foreground mt-1">{incident.description}</p>
            </div>
            <span className="text-xs text-muted-foreground whitespace-nowrap ml-4">{incident.timestamp}</span>
          </div>
        </div>
      ))}
    </div>
  )
}
