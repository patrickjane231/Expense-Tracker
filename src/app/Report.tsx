import MonthlyCategory from "./MonthlyCategory"
import Navbar from "./Navbar"
import { useState, useEffect } from "react"
import { type transactionn } from "./AddTransaction"
import { MonthlyTrack } from "./MonthlyTrack"
import { FileText, Calendar, TrendingUp, TrendingDown, BarChart3, PieChart } from "lucide-react"
import { useGSAP } from "@gsap/react"
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Report = () => {

  const [date, setDate] = useState("")
  const [income, setIncome] = useState(0)
  const [expense, setExpense] = useState(0)
  const [salary, setSalary] = useState(0);
  const [entertainment, setEntertainment] = useState(0);
  const [shopping, setShopping] = useState(0);
  const [utilities, setUtilities] = useState(0);
  const [others, setOthers] = useState(0);

  useGSAP(() => {
    const mm = gsap.matchMedia();
    const tl = gsap.timeline()

    tl.from('.report-header , .date-picker , .balance-cards', {
      y: 30,
      opacity: 0,
      duration: 1,
      stagger: 0.3,
      ease: "power2.out"
    }, "+=1.3")

    tl.from('.income-card', {
      x: 30,
      opacity: 0,
      duration: 0.7,
      ease: "power2.out"
    })

    tl.from('.expense-card', {
      x: -30,
      opacity: 0,
      duration: 0.7,
      ease: "power2.out"
    }, "-=0.7")

    tl.from('.category-chart', {
      y: 30,
      opacity: 0,
    })

    // DESKTOP
    mm.add("(min-width: 1024px)", () => {
      gsap.from('.trend-chart', {
        y: 30,
        opacity: 0,
        duration: 0.7,
        delay: 3.5
      })
    })

    // MOBILE
    mm.add("(max-width: 1023px)", () => {
      gsap.from('.trend-chart', {
        y: 30,
        opacity: 0,
        scrollTrigger: {
          trigger: ".charts-section",
          start: "center 70%",
          end: "center 40%",
          scrub: 2,
        }
      })
    })
  })

  useEffect(() => {
    const transactions: transactionn[] = JSON.parse(localStorage.getItem('transactions') ?? '[]')

    const myIncome = transactions
      .filter((trans) => new Date(trans.Date).toISOString().slice(0, 7) === date)
      .filter((trans) => trans.type === 'Income')
      .reduce((acc, curr) => acc + curr.Amount, 0)

    const myExpense = transactions
      .filter((trans) => new Date(trans.Date).toISOString().slice(0, 7) === date)
      .filter((trans) => trans.type === 'Expense')
      .reduce((acc, curr) => acc + curr.Amount, 0)

    const salary = transactions.filter((trans) => new Date(trans.Date).toISOString().slice(0, 7) === date)
    .filter((trans) => trans.Category === 'salary')
    .reduce((acc, curr) => {
      return acc + Number(curr.Amount)
    }, 0)

    const shopping = transactions.
      filter((trans) => new Date(trans.Date).toISOString().slice(0, 7) === date)
      .filter((trans) => trans.Category === 'shopping')
      .reduce((acc, curr) => {
        return acc + Number(curr.Amount)
      }, 0)

    const entertainment = transactions
      .filter((trans) => new Date(trans.Date).toISOString().slice(0, 7) === date)
      .filter((trans) => trans.Category === 'entertainment')
      .reduce((acc, curr) => {
        return acc + Number(curr.Amount)
      }, 0)

    const utilities = transactions.filter((trans) => new Date(trans.Date).toISOString().slice(0, 7) === date)
      .filter((trans) => trans.Category === 'utilities')
      .reduce((acc, curr) => {
        return acc + Number(curr.Amount)
      }, 0)

    const others = transactions.filter((trans) => new Date(trans.Date).toISOString().slice(0, 7) === date)
      .filter((trans) => trans.Category === 'others')
      .reduce((acc, curr) => {
        return acc + Number(curr.Amount)
      }, 0)

    setSalary(salary)
    setEntertainment(entertainment)
    setUtilities(utilities)
    setShopping(shopping)
    setOthers(others)
    setIncome(myIncome)
    setExpense(myExpense)
  }, [date])

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
  }

  function updateDate(e: React.ChangeEvent<HTMLInputElement>) {
    setDate(e.target.value)
  }

  return (
    <>
      <Navbar />
      <div className="my-poppins px-0 sm:px-5 mt-10">
        
        {/* Header */}
        <div className="report-header flex justify-between px-2 sm:px-10 py-6 rounded-t-xl items-center max-w-[1400px] mx-auto">
          <div className="flex items-center gap-3">
            <FileText className="h-6 w-6 sm:h-8 sm:w-8 text-navy" />
            <h1 className="text-2xl sm:text-3xl text-navy font-bold">Monthly Report</h1>
          </div>
        </div>

        {/* Date Selector */}
        <div className="date-picker mt-6 flex justify-center px-2 sm:px-0">
          <div className="flex items-center gap-3 rounded-lg bg-white px-4 sm:px-6 py-3 shadow-lg border border-[#14213D]/20 w-full sm:w-auto max-w-[1400px] mx-2 sm:mx-auto">
            <Calendar className="h-5 w-5 text-[#14213D]" />
            <input 
              type="month" 
              className="border-2 border-[#14213D]/20 bg-transparent px-3 py-2 text-[#14213D] outline-none focus:border-[#14213D] rounded-md font-medium w-full sm:w-auto" 
              onChange={updateDate} 
            />
          </div>
        </div>

        {/* Income & Expense Cards */}
        <div className="balance-cards flex max-w-[1400px] mx-2 sm:mx-auto mt-8 gap-5 font-bold flex-col sm:flex-row">
          <div className="income-card flex-1 bg-white shadow-xl text-center py-6 sm:py-8 rounded-xl border-t-4 border-green-500 flex items-center justify-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-100">
              <TrendingUp className="h-5 w-5 text-green-600" />
            </div>
            <div>
              <div className="text-sm text-gray-500 font-normal">Total Income</div>
              <div className="text-green-600 text-[16px] sm:text-2xl font-bold">${income.toLocaleString()}</div>
            </div>
          </div>
          <div className="expense-card flex-1 bg-white shadow-xl text-center py-6 sm:py-8 rounded-xl border-t-4 border-red-500 flex items-center justify-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-red-100">
              <TrendingDown className="h-5 w-5 text-red-500" />
            </div>
            <div>
              <div className="text-sm text-gray-500 font-normal">Total Expense</div>
              <div className="text-red-500 text-[16px] sm:text-2xl font-bold">${expense.toLocaleString()}</div>
            </div>
          </div>
        </div>

        {/* Charts Section */}
        <div className="charts-section mx-auto mt-10 mb-10 flex max-w-[1400px] flex-col gap-6 px-4 lg:flex-row lg:gap-10">
          <div className="category-chart w-full flex-1 rounded-xl bg-white p-4 sm:p-6 shadow-xl lg:w-1/2">
            <div className="mb-4 sm:mb-6 flex items-center gap-3 border-b border-[#14213D]/10 pb-4">
              <PieChart className="h-5 w-5 sm:h-6 sm:w-6 text-[#14213D]" />
              <h2 className="text-lg sm:text-xl font-bold text-[#14213D]">Category Breakdown</h2>
            </div>
            <MonthlyCategory chartData={chartData} chartConfig={chartConfig} />
          </div>

          <div className="trend-chart w-full flex-1 rounded-xl bg-white p-4 sm:p-6 shadow-xl lg:w-1/2">
            <div className="mb-4 sm:mb-6 flex items-center gap-3 border-b border-[#14213D]/10 pb-4">
              <BarChart3 className="h-5 w-5 sm:h-6 sm:w-6 text-[#14213D]" />
              <h2 className="text-lg sm:text-xl font-bold text-[#14213D]">Monthly Trends</h2>
            </div>
            <MonthlyTrack income={income} expense={expense} />
          </div>
        </div>

      </div>
    </>
  )
}

export default Report