// import { Button } from "./components/ui/button"
import Dashboard from "./app/Dashboard"
import { BrowserRouter } from "react-router-dom"
import { Routes, Route } from "react-router-dom"
import Transactions from "./app/Transactions"
import Report from "./app/Report"
import AddTransaction from "./app/AddTransaction"
import { Toaster } from "@/components/ui/sonner"
const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/transactions" element={<Transactions />} />
        <Route path="/report" element={<Report />} />
        <Route path="/addtransaction" element={<AddTransaction />} />
      </Routes>
      <Toaster position="top-center" offset={20} richColors
        toastOptions={{
          style: {
            marginTop: '60px',
          },
          className: 'my-custom-toast'
        }} />
    </BrowserRouter>
  )
}

export default App
