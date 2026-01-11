"use client"

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

const data = [
  { hour: "00:00", detections: 12, threats: 3 },
  { hour: "04:00", detections: 8, threats: 1 },
  { hour: "08:00", detections: 24, threats: 5 },
  { hour: "12:00", detections: 18, threats: 2 },
  { hour: "16:00", detections: 31, threats: 8 },
  { hour: "20:00", detections: 27, threats: 6 },
  { hour: "24:00", detections: 15, threats: 3 },
]

export function ThreatChart() {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
        <XAxis dataKey="hour" stroke="var(--muted-foreground)" style={{ fontSize: "12px" }} />
        <YAxis stroke="var(--muted-foreground)" style={{ fontSize: "12px" }} />
        <Tooltip
          contentStyle={{
            backgroundColor: "var(--card)",
            border: "1px solid var(--border)",
            borderRadius: "8px",
          }}
          labelStyle={{ color: "var(--foreground)" }}
        />
        <Line
          type="monotone"
          dataKey="detections"
          stroke="var(--accent)"
          dot={false}
          strokeWidth={2}
          name="Detections"
        />
        <Line
          type="monotone"
          dataKey="threats"
          stroke="var(--danger)"
          dot={false}
          strokeWidth={2}
          name="Critical Threats"
        />
      </LineChart>
    </ResponsiveContainer>
  )
}
