"use client";

import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";
import { format } from "date-fns";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
} from "@/components/ui/chart";

type CombinedData = {
  date: string;
  Incoming: number;
  Outgoing: number;
};

interface ExChartProps {
  title: string;
  color: string;
  chartData: CombinedData[];
}

export function ExChart({ title, color, chartData }: ExChartProps) {
  const chartConfig = {
    expense: {
      label: "Expense",
      color: color,
    },
  } satisfies ChartConfig;

  return (
    <Card className="w-6/12">
      <CardHeader>
        <CardTitle>{title} Expenses Chart</CardTitle>
        <CardDescription>
          Showing total {title} expenses between the dates provided
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <AreaChart
            accessibilityLayer
            data={chartData}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <defs>
              <linearGradient id="fillgreen" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="hsl(var(--chart-green))"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="hsl(var(--chart-green))"
                  stopOpacity={0.1}
                />
              </linearGradient>
              <linearGradient id="fillred" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="hsl(var(--chart-red))"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="hsl(var(--chart-red))"
                  stopOpacity={0.1}
                />
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => {
                const date = new Date(value);
                return date.toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                });
              }}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="line" />}
            />
            <Area
              dataKey={title}
              type="natural"
              fill={
                title.toLowerCase() === "incoming"
                  ? "url(#fillgreen)"
                  : "url(#fillred)"
              }
              stroke="var(--color-expense)"
              stackId="a"
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
      <CardFooter>
        <div className="flex w-full items-start gap-2 text-sm">
          {chartData.length > 0 && (
            <div className="grid gap-2">
              <div className="flex items-center gap-2 leading-none text-muted-foreground">
                {format(new Date(chartData[0].date), "PPP")} -{" "}
                {format(new Date(chartData[chartData.length - 1].date), "PPP")}
              </div>
            </div>
          )}
        </div>
      </CardFooter>
    </Card>
  );
}
