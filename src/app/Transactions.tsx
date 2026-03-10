import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { format } from "date-fns"
import { Button } from "@/components/ui/button"

import type { transactionn } from "./AddTransaction"
import Navbar from "./Navbar"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { useGSAP } from "@gsap/react"
import gsap from 'gsap'

const Transactions = () => {


  useGSAP(() => {
    gsap.from('.myTable', {
      y: 30,
      opacity: 0,
      delay: 1
    })
  })

  const navigate = useNavigate()
  const [transaction, setTransaction] = useState<transactionn[]>(JSON.parse(localStorage.getItem('transactions') ?? '[]'))

  useEffect(() => {
    localStorage.setItem('transactions', JSON.stringify(transaction))
  }, [transaction])

  function deleteTransaction(id: string) {
    const filteredTransactions = transaction.filter((trans) => trans.id != id)
    setTransaction(filteredTransactions)
  }

  function handelEdit(trans: transactionn) {
    navigate('/addtransaction', { state: { editTrans: { ...trans } } })
  }


  return (
    <>
      <Navbar />
      {transaction.length > 0 && (
        <div className="myTable max-w-[100%] sm:max-w-[70%] mx-auto mt-20 rounded-xl bg-[#14213D]/5 p-6 shadow-2xl backdrop-blur-sm my-poppins">
          <Table className="w-full border-collapse overflow-hidden rounded-lg">
            <TableCaption className="mb-4 text-sm font-medium text-[#14213D]/70">
              A list of your recent invoices.
            </TableCaption>

            <TableHeader>
              <TableRow className="border-b-2 border-[#14213D]/20">
                <TableHead className="w-[100px] bg-[#14213D] py-4 text-left text-sm font-semibold uppercase tracking-wider font-bold text-white first:rounded-tl-lg transition-colors duration-200 hover:bg-[#28395c]">
                  <div className="flex items-center gap-2">
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
                    </svg>
                    Type
                  </div>
                </TableHead>
                <TableHead className="w-[100px] bg-[#14213D] py-4 text-left text-sm font-semibold uppercase tracking-wider font-bold text-white transition-colors duration-200 hover:bg-[#28395c]">
                  <div className="flex items-center gap-2">
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                    </svg>
                    Category
                  </div>
                </TableHead>
                <TableHead className="w-[100px] bg-[#14213D] py-4 text-left text-sm font-semibold uppercase tracking-wider font-bold text-white transition-colors duration-200 hover:bg-[#28395c]">
                  <div className="flex items-center gap-2">
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h7" />
                    </svg>
                    Description
                  </div>
                </TableHead>
                <TableHead className="w-[100px] bg-[#14213D] py-4 text-left text-sm font-semibold uppercase tracking-wider font-bold text-white transition-colors duration-200 hover:bg-[#28395c]">
                  <div className="flex items-center gap-2">
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    Date
                  </div>
                </TableHead>
                <TableHead className="w-[100px] bg-[#14213D] py-4 text-left text-sm font-semibold uppercase tracking-wider font-bold text-white last:rounded-tr-lg transition-colors duration-200 hover:bg-[#28395c]">
                  <div className="flex items-center gap-2">
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Amount
                  </div>
                </TableHead>

                <TableHead className="w-[100px] bg-[#14213D] py-4 text-left text-sm font-semibold uppercase tracking-wider font-bold text-white last:rounded-tr-lg transition-colors duration-200 hover:bg-[#28395c]">
                  Update
                </TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {transaction.map((trans) => (
                <TableRow
                  key={trans.id}
                  className="group border-b border-[#14213D]/10 transition-all duration-200 hover:bg-[#14213D]/5 even:bg-[#14213D]/[0.02]"
                >
                  <TableCell className="py-4 text-sm font-medium text-[#14213D]">
                    <span className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold ${trans.type === 'Income' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                      }`}>
                      {trans.type === 'Income' ? (
                        <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M7 17l9.2-9.2M17 8v9H8" />
                        </svg>
                      ) : (
                        <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M17 7l-9.2 9.2M7 16V7h9" />
                        </svg>
                      )}
                      {trans.type}
                    </span>
                  </TableCell>
                  <TableCell className="py-4 text-sm text-[#14213D]/80">
                    <div className="flex items-center gap-2">
                      <svg className="h-4 w-4 text-[#14213D]/40" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                      </svg>
                      {trans.Category}
                    </div>
                  </TableCell>
                  <TableCell className="py-4 text-sm text-[#14213D]/80">
                    <div className="flex items-center gap-2">
                      <svg className="h-4 w-4 text-[#14213D]/40" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h7" />
                      </svg>
                      {trans.Description}
                    </div>
                  </TableCell>
                  <TableCell className="py-4 text-sm font-mono text-[#14213D]/70">
                    <div className="flex items-center gap-2">
                      <svg className="h-4 w-4 text-[#14213D]/40" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      {format(trans.Date, "dd-MM-yyyy")}
                    </div>
                  </TableCell>
                  <TableCell className="py-4 text-sm font-bold text-[#14213D]">
                    <div className="flex items-center gap-2">
                      <svg className="h-4 w-4 text-[#14213D]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      {trans.Amount}
                    </div>
                  </TableCell>

                  <TableCell className="flex gap-5 py-4 text-sm font-bold text-[#14213D]">
                    <Button variant='destructive' className="cursor-pointer" onClick={() => deleteTransaction(trans.id)} >Delete</Button>
                    <Button variant='secondary' className="cursor-pointer" onClick={() => handelEdit(trans)}>Edit</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}

      {transaction.length <= 0 && (
        <div className="myTable mx-auto mt-12 flex max-w-md flex-col items-center rounded-xl bg-[#14213D]/5 p-10 shadow-lg">
          <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-[#14213D]/10">
            <svg className="h-8 w-8 text-[#14213D]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
          </div>
          <h3 className="font-['Poppins'] text-xl font-bold text-[#14213D]">No Transactions</h3>
          <p className="mt-2 text-center text-sm text-[#14213D]/60">Add your first transaction to get started</p>
        </div>
      )}
    </>
  )
}

export default Transactions
