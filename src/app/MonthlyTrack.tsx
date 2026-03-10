"use client"

import { TrendingUp, TrendingDown, BarChart3 } from "lucide-react"
import { Bar, BarChart, CartesianGrid, XAxis, Cell } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart"
import { useMemo } from "react"

export function MonthlyTrack({ expense, income }: { expense: number, income: number }) {

  const chartData = useMemo(() => [
    { month: "Expense", amount: Number(expense), color: "#ef4444" },
    { month: "Income", amount: Number(income), color: "#22c55e" },
  ], [income, expense])

  const chartConfig = {
    amount: {
      label: "Amount",
      color: "#14213D",
    },
  } satisfies ChartConfig

  const total = income + expense
  const trend = income > expense ? "up" : "down"
  const percentage = total > 0 ? Math.abs(((income - expense) / total) * 100).toFixed(1) : "0"

  return (
    <Card className="rounded-xl border-[#14213D]/20 bg-[#14213D]/5 shadow-xl">
      <CardHeader className="flex flex-row items-center gap-3 border-b border-[#14213D]/10 pb-4">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#14213D]">
          <BarChart3 className="h-5 w-5 text-[#E5E5E5]" />
        </div>
        <div>
          <CardTitle className="text-[#14213D]">Income vs Expense</CardTitle>
          <CardDescription className="text-[#14213D]/60">Current month comparison</CardDescription>
        </div>
      </CardHeader>
      <CardContent className="pt-6">
        <ChartContainer config={chartConfig} className="h-[300px] w-full">
          <BarChart accessibilityLayer data={chartData}>
            <CartesianGrid vertical={false} stroke="#14213D/10" />
            <XAxis
              dataKey="month"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tick={{ fill: '#14213D', fontWeight: 600 }}
            />
            <ChartTooltip
              cursor={{ fill: '#14213D/5' }}
              content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  return (
                    <div className="rounded-lg bg-[#14213D] px-4 py-2 shadow-lg">
                      <p className="text-sm font-bold text-[#E5E5E5]">
                        {payload[0].payload.month}: ${payload[0].value?.toLocaleString()}
                      </p>
                    </div>
                  )
                }
                return null
              }}
            />
            <Bar dataKey="amount" radius={8}>
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Bar>
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 border-t border-[#14213D]/10 pt-4 text-sm">
        <div className={`flex gap-2 leading-none font-bold ${trend === 'up' ? 'text-green-600' : 'text-red-500'}`}>
          {trend === 'up' ? (
            <TrendingUp className="h-4 w-4" />
          ) : (
            <TrendingDown className="h-4 w-4" />
          )}
          Trending {trend} by {percentage}% this month
        </div>
        <div className="leading-none text-[#14213D]/60">
          {income > expense ? "Income exceeds expenses" : "Expenses exceed income"}
        </div>
      </CardFooter>
    </Card>
  )
}