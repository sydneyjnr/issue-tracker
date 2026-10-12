"use client";

import { Card } from "@radix-ui/themes";
import {
  ResponsiveContainer,
  BarChart,
  XAxis,
  YAxis,
  Bar,
  CartesianGrid,
  Tooltip,
} from "recharts";

interface Props {
  open: number;
  inProgress: number;
  closed: number;
}

const IssueChart = ({ open, inProgress, closed }: Props) => {
  const data = [
    { label: "Open", value: open },
    { label: "In progress", value: inProgress },
    { label: "Closed", value: closed },
  ];

  return (
    <Card>
      <div style={{ width: "100%", height: 300 }}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            margin={{ top: 10, right: 20, left: 10, bottom: 30 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="label"
              tickMargin={10}
              label={{
                value: "Issue Status",
                position: "insideBottom",
                offset: -5,
              }}
            />
            <YAxis
  domain={[0, (dataMax: number) => Math.max(dataMax, 9)]}
  ticks={Array.from(
    { length: Math.max(10, Math.max(open, inProgress, closed) + 2) },
    (_, i) => i
  )}
  allowDecimals={false}
  label={{
    value: "Number of Issues",
    angle: -90,
    position: "insideLeft",
  }}
/>
            <Tooltip />
            <Bar dataKey="value" fill="#3b82f6" maxBarSize={70} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
};

export default IssueChart;