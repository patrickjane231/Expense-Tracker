// import { Button } from "./components/ui/button"
import Dashboard from "./app/Dashboard"
import { BrowserRouter } from "react-router-dom"
import { Routes,Route } from "react-router-dom"
import Transactions from "./app/Transactions"
import Report from "./app/Report"
import AddTransaction from "./app/AddTransaction"
const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/transactions" element={<Transactions />} />
        <Route path="/report" element={<Report />} />
        <Route path="/addtransaction" element={<AddTransaction />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
