import * as React from "react"
import { cn } from "@/lib/utils"
import {
  Bar,
  BarChart,
  Line,
  LineChart,
  PieChart,
  Pie,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
} from "recharts"

function Chart({ type = "bar", data, config = {}, className, ...props }) {
  return (
    <div className={cn("w-full h-[300px]", className)} {...props}>
      <ResponsiveContainer>
        {type === "bar" && (
          <BarChart data={data}>
            <XAxis dataKey={config.xKey} />
            <YAxis />
            <Tooltip />
            <Legend />
            {config.yKeys?.map((key, i) => (
              <Bar key={i} dataKey={key} fill={config.colors?.[i] || "#8884d8"} />
            ))}
          </BarChart>
        )}

        {type === "line" && (
          <LineChart data={data}>
            <XAxis dataKey={config.xKey} />
            <YAxis />
            <Tooltip />
            <Legend />
            {config.yKeys?.map((key, i) => (
              <Line key={i} dataKey={key} stroke={config.colors?.[i] || "#8884d8"} />
            ))}
          </LineChart>
        )}

        {type === "pie" && (
          <PieChart>
            <Pie
              data={data}
              innerRadius={config.innerRadius || 40}
              outerRadius={config.outerRadius || 80}
              dataKey={config.valueKey}
              nameKey={config.labelKey}
              fill={config.colors?.[0] || "#8884d8"}
              label
            />
            <Tooltip />
            <Legend />
          </PieChart>
        )}
      </ResponsiveContainer>
    </div>
  )
}

export { Chart }
