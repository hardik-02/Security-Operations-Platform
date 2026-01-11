"use client"

export function DetectionMetrics() {
  const metrics = [
    { label: "Detection Rate", value: "94.2%", color: "bg-success" },
    { label: "False Positives", value: "2.1%", color: "bg-warning" },
    { label: "Response Rate", value: "98.7%", color: "bg-accent" },
  ]

  return (
    <div className="space-y-4">
      {metrics.map((metric) => (
        <div key={metric.label}>
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-muted-foreground">{metric.label}</span>
            <span className="font-semibold text-foreground">{metric.value}</span>
          </div>
          <div className="w-full bg-muted/30 rounded-full h-2">
            <div
              className={`${metric.color} h-full rounded-full`}
              style={{
                width: metric.value,
              }}
            ></div>
          </div>
        </div>
      ))}
    </div>
  )
}
