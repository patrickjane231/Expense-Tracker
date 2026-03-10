import Navbar from "./Navbar"
import { type transactionn } from "./AddTransaction"
import { Button } from "@/components/ui/button"
import { TransChart } from "./TransChart"
import RecentTransaction from "./RecentTransactions"
import { LayoutDashboard, Plus, Wallet, TrendingUp, TrendingDown, Receipt } from "lucide-react"
import { useNavigate } from "react-router-dom"
import { useGSAP } from "@gsap/react"
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);
const Dashboard = () => {
useGSAP(() => {
  const mm = gsap.matchMedia();

  const tl = gsap.timeline()

  tl.from('.dash , .but , .balance', {
    y: 30,
    opacity: 0,
    duration: 1,
    stagger: 0.3,
    ease: "power2.out"
  }, "+=1.3")

  tl.from('.income', {
    x: 30,
    opacity: 0,
    duration: 0.7,
    ease: "power2.out"
  })

  tl.from('.expense', {
    x: -30,
    opacity: 0,
    duration: 0.7,
    
    ease: "power2.out"
  }, "-=0.7")

  tl.from('.mychart', {
    y: 30,
    opacity: 0,
  })

  // DESKTOP
  mm.add("(min-width: 1024px)", () => {
    gsap.from('.myTable', {
      y: 30,
      opacity: 0,
      duration: 0.7,
      delay :3.5
    })
  })

  // MOBILE
  mm.add("(max-width: 1023px)", () => {
    gsap.from('.ourTable', {
      y: 30,
      opacity: 0,
      scrollTrigger: {
        trigger: ".tracking",
        start: "center 70%",
        end: "center 40%",
        scrub: 2,
      }
    })
  })

})

  const transactions: transactionn[] = JSON.parse(localStorage.getItem('transactions') ?? '[]')
  const navigate = useNavigate()
  const expense = transactions.filter((trans) => trans.type === 'Expense')
    .reduce((acc, curr) => {
      return acc + curr.Amount
    }, 0)

  const income = transactions.filter((trans) => trans.type === 'Income')
    .reduce((acc, curr) => {
      return acc + curr.Amount
    }, 0)

  const currentBalance = income - expense;

  return (
    <div>
      <Navbar />

      <div className="my-poppins px-0 sm:px-5 mt-10">
        <div className=" flex justify-between px-2 sm:px-10 py-6 rounded-t-xl items-center max-w-[1400px] mx-auto">
          <div className="flex items-center gap-3 dash">
            <LayoutDashboard className="h-8 w-8 text-navy" />
            <h1 className="text-2xl sm:text-3xl text-navy font-bold">Dashboard</h1>
          </div>

          <div className="but z-1">

            <Button variant='destructive' className="addbut px-2 sm:px-6 py-2 sm:py-5 hover:bg-red-600 cursor-pointer flex items-center gap-2 bg-red-500 text-[14px] " onClick={() => {
              navigate('/addtransaction')
            }}>
              <Plus className="h-5 w-5" />
              Add Transaction
            </Button>
          </div>
        </div>

        <div className="balance mt-6 bg-[#14213D]/10 p-6 rounded-xl flex items-center gap-4 px-10 max-w-[1400px] mx-2 sm:mx-auto border border-[#14213D]/20">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#14213D]">
            <Wallet className="h-6 w-6 text-[#E5E5E5]" />
          </div>
          <div>
            <div className="text-sm text-[#14213D]/70 font-medium uppercase tracking-wider">Current Balance</div>
            <div className={`${currentBalance >= 0 ? 'text-green-600' : 'text-red-500'} text-2xl font-bold`}>
              ${currentBalance.toLocaleString()}
            </div>
          </div>
        </div>

        <div className="flex max-w-[1400px] mx-2 sm:mx-auto mt-8 gap-5 font-bold">
          <div className="income flex-1 bg-white shadow-xl text-center py-8 rounded-xl border-t-4 border-green-500 flex items-center justify-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-100">
              <TrendingUp className="h-5 w-5 text-green-600" />
            </div>
            <div>
              <div className="text-sm text-gray-500 font-normal">Income</div>
              <div className="text-green-600 text-[16px] sm:text-xl">${income.toLocaleString()}</div>
            </div>
          </div>
          <div className=" expense flex-1 bg-white shadow-xl text-center py-8 rounded-xl border-t-4 border-red-500 flex items-center justify-center gap-3">
            <div className=" flex h-10 w-10 items-center justify-center rounded-full bg-red-100">
              <TrendingDown className="h-5 w-5 text-red-500" />
            </div>
            <div>
              <div className="text-sm text-gray-500 font-normal">Expense</div>
              <div className="text-red-500 text-[16px] sm:text-xl">${expense.toLocaleString()}</div>
            </div>
          </div>
        </div>
      </div>

      <div className="tracking mx-auto mt-10 mb-10 flex max-w-[1400px] flex-col gap-6 px-4 lg:flex-row lg:gap-10">
        <div className="mychart w-full flex-1 overflow-hidden rounded-xl shadow-2xl lg:w-1/2">
          <TransChart />
        </div>
        <div className="ourTable myTable w-full flex-1 rounded-xl border border-[#14213D]/10 bg-[#14213D]/5 shadow-2xl lg:w-1/2">
          <div className="flex items-center justify-center gap-3 rounded-t-xl py-4">
            <Receipt className="h-6 w-6 text-navy" />
            <div className="text-xl font-bold text-navy font-bold">Recent Transactions</div>
          </div>
          <RecentTransaction />
        </div>
      </div>
    </div>
  )
}

export default Dashboard