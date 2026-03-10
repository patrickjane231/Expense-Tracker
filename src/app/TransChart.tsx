import { TrendingUp, DollarSign } from "lucide-react"
import { Bar, BarChart, XAxis, YAxis } from "recharts"
import {
  Card,
  CardContent,
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
import { type transactionn } from "./AddTransaction"



export function TransChart() {

  const transaction: transactionn[] = (JSON.parse(localStorage.getItem('transactions') ?? '[]'))

  const salary = transaction.filter((trans) => trans.Category === 'salary').reduce((acc, curr) => {
    return acc + Number(curr.Amount)
  }, 0)

  const shopping = transaction.filter((trans) => trans.Category === 'shopping').reduce((acc, curr) => {
    return acc + Number(curr.Amount)
  }, 0)

  const entertainment = transaction.filter((trans) => trans.Category === 'entertainment').reduce((acc, curr) => {
    return acc + Number(curr.Amount)
  }, 0)

  const utilities = transaction.filter((trans) => trans.Category === 'utilities').reduce((acc, curr) => {
    return acc + Number(curr.Amount)
  }, 0)

  const others = transaction.filter((trans) => trans.Category === 'others').reduce((acc, curr) => {
    return acc + Number(curr.Amount)
  }, 0)

  console.log(salary)
  console.log(shopping)


  const chartData = [
    { browser: "salary", visitors: salary, fill: "#14213D" },
    { browser: "shopping", visitors: shopping, fill: "#28395c" },
    { browser: "entertainment", visitors: entertainment, fill: "#4a5d7c" },
    { browser: "utilities", visitors: utilities, fill: "#6c7f9e" },
    { browser: "other", visitors: others, fill: "#8ea3c0" },
  ]


  const chartConfig = {
    visitors: { label: "Amount" },
    salary: { label: "Salary", color: "#14213D" },
    shopping: { label: "Shopping", color: "#28395c" },
    entertainment: { label: "Entertainment", color: "#4a5d7c" },
    utilities: { label: "Utilities", color: "#6c7f9e" },
    other: { label: "Other", color: "#8ea3c0" },
  } satisfies ChartConfig

  const maxValue = Math.max(salary, shopping, entertainment, utilities, others)
  return (
    <Card className=" max-w-[100%] mx-auto px-2 rounded-xl backdrop-blur-sm my-poppins rounded-xl border-[#14213D]/20 bg-[#14213D]/5 shadow-xl">
      <CardHeader className="flex flex-row items-center gap-2">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#14213D] text-[#E5E5E5]">
          <DollarSign className="h-5 w-5" />
        </div>
        <CardTitle className="text-[#14213D]">Transaction by Category</CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-[300px] w-full">
          <BarChart
            accessibilityLayer
            data={chartData}
            layout="vertical"
            margin={{
              left: 20,
            }}
          >
            <YAxis
              dataKey="browser"
              type="category"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) =>
                chartConfig[value as keyof typeof chartConfig]?.label
              }
            />
            <XAxis
              type="number"
              domain={[0, maxValue * 1.2]}

            />
            <ChartTooltip
              cursor={false}
              content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  return (
                    <div className="rounded-lg bg-[#14213D] px-3 py-2 shadow-lg">
                      <p className="text-sm font-bold text-[#E5E5E5]">
                        {chartConfig[payload[0].payload.browser as keyof typeof chartConfig]?.label}: {payload[0].value}
                      </p>
                    </div>
                  )
                }
                return null
              }}
            />
            <Bar dataKey="visitors" layout="vertical" radius={5} />
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 leading-none font-medium">
          Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          Showing total visitors for the last 6 months
        </div>
      </CardFooter>
    </Card>
  )
}