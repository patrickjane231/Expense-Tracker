import React from 'react'
import { type transactionn } from "./AddTransaction"
import { useEffect, useState } from "react"

import { TrendingUp, TrendingDown } from "lucide-react"
import { Pie, PieChart } from "recharts"
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

const MonthlyCategory = ({chartConfig,chartData}) => {

  console.log(chartConfig)
  console.log(chartData)

  // Calculate trends
  const total = chartData.reduce((acc, curr) => acc + curr.visitors, 0)
  const maxCategory = chartData.reduce((max, curr) => curr.visitors > max.visitors ? curr : max, chartData[0])
  const previousMonthTrend = total > 0 ? ((maxCategory.visitors / total) * 100).toFixed(1) : "0"
  const isTrendingUp = maxCategory.browser === 'salary' || maxCategory.browser === 'shopping'

  return (
    <div>

<Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
              </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={chartData}
              dataKey="visitors"
              nameKey="browser"
              stroke="0"
            />
          </PieChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className={`flex items-center gap-2 leading-none font-medium ${isTrendingUp ? 'text-green-600' : 'text-red-500'}`}>
          {isTrendingUp ? (
            <>Trending up by {previousMonthTrend}% this month <TrendingUp className="h-4 w-4" /></>
          ) : (
            <>Trending down by {previousMonthTrend}% this month <TrendingDown className="h-4 w-4" /></>
          )}
        </div>
        <div className="leading-none text-muted-foreground">
          {maxCategory.browser} is your highest spending category at {previousMonthTrend}%
        </div>
      </CardFooter>
    </Card>
    </div>
  )
}

export default MonthlyCategory