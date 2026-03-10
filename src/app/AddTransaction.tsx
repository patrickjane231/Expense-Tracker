import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Field, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import Navbar from "./Navbar"
import {  useEffect, useState } from "react"
import { Calendar } from "@/components/ui/calendar"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { Button } from "@/components/ui/button"
import { format } from "date-fns"
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

import { useLocation } from "react-router-dom"
import { startTransition } from "react"
import { useGSAP } from "@gsap/react"
import gsap from 'gsap'


export interface transactionn{
    id : string,
    Amount : number,
    Description : string,
    Category : string,
    Date : Date
    type : string
}

const AddTransaction = () => {

    useGSAP(()=>{
        gsap.from('.myCard',{
            y : 30,
            opacity : 0,
            delay : 1
        })
    })

    const [transaction,setTransaction]=useState<transactionn[]>(
            JSON.parse(localStorage.getItem('transactions') ?? "[]") 
        )
    const [date, setDate] = useState<Date | undefined>()
    const [amount,setAmount]=useState(0);
    const [description,setDescription]=useState<string>('');
    const [category,setCategory]=useState<string>('');
    const [type,setType]=useState<string>("Expense")
    const[tid,setTid]=useState<string>(crypto.randomUUID())
    const location = useLocation()

    useEffect(()=>{
        const editTransaction:transactionn=location.state?.editTrans
        if(editTransaction){
            startTransition(()=>{
            setTid(editTransaction.id)
            setDate(editTransaction.Date)
            setType(editTransaction.type)
            setAmount(editTransaction.Amount)
            setDescription(editTransaction.Description)
            setCategory(editTransaction.Category)
            })
        }
    },[location.state])

    function addTransaction(){
        
        if(!amount || !date || !category){
            return alert("Please Enter All Field");
        }
        const newTransaction:transactionn={
            id : tid,
            type : type,
            Date : date,
            Amount : amount,
            Category  : category,
            Description : description
        }

        

        const updateTransactions=transaction.some(t=>t.id === tid) ?
        transaction.map((t)=>t.id === tid ? newTransaction : t)
        :[...transaction,newTransaction];

        localStorage.setItem("transactions",JSON.stringify(updateTransactions))
        setTransaction(updateTransactions)
    

        setAmount(0)
        setDescription('')
        setCategory('')
        setType('')
        setDate(undefined)

    }


    return (
        <>
            <Navbar />
            <div className="myCard flex items-center justify-center mt-15 p-10 max-w-[40%] min-w-[400px] sm:min-w-[600px] mx-auto">
                <Card className="w-[100%] flex-none">
                    <CardHeader>
                        <CardTitle className="text-2xl text-center my-poppins font-bold text-navy">Transaction</CardTitle>
                    </CardHeader>
                    <CardContent>

                        <RadioGroup className="flex gap-10  p-2 rounded border-2">
                            <div className="flex gap-3">
                                <RadioGroupItem value="Expense" id="r1" checked={type==='Expense'} onClick={()=>setType("Expense")} />
                                <Label htmlFor="r1">Expense</Label>
                            </div>

                            <div className="flex gap-3">
                                <RadioGroupItem value="Income" id="r1" checked={type==='Income'} onClick={()=>setType("Income")}/>
                                <Label htmlFor="r1">Income</Label>
                            </div>

                        </RadioGroup>

                        <div className="flex flex-col mt-5 gap-3">
                            <Field>
                                <FieldLabel>
                                    Field Required  <span className="text-destructive">*</span>
                                </FieldLabel>
                                <Input id='Amount' name="Amount" placeholder="Amount" required type="number" value={amount}
                                onChange={(e)=>{setAmount(Number(e.target.value))}} />
                            </Field>

                            <Field>
                                <FieldLabel>
                                    Field Required  <span className="text-destructive">*</span>
                                </FieldLabel>
                                <Select onValueChange={(value:string)=>{setCategory(value)}}>
                                    <SelectTrigger className="w-[180px]">
                                        <SelectValue placeholder="Select a Category" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectGroup>
                                            <SelectItem value="salary">Salary</SelectItem>
                                            <SelectItem value="shopping">Shopping</SelectItem>
                                            <SelectItem value="entertainment">Entertainment</SelectItem>
                                            <SelectItem value="utilities">Utilities</SelectItem>
                                            <SelectItem value="others">Others</SelectItem>
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                            </Field>

                            <Field>
                                <Input id='Description' name="Description" placeholder="Description" required type="text" value={description}
                                onChange={(e)=>setDescription(e.target.value)} />
                            </Field>

                            <Field>
                                <FieldLabel>
                                    Field Required <span className="text-destructive">*</span>
                                </FieldLabel>

                                <Popover>
                                    <PopoverTrigger asChild>
                                        <Button
                                            variant="outline"
                                            className="w-full justify-start text-left font-normal"
                                        >
                                            {date ? format(date, "PPP") : "Pick a date"}
                                        </Button>
                                    </PopoverTrigger>

                                    <PopoverContent className="w-auto p-0">
                                        <Calendar
                                            mode="single"
                                            selected={date}
                                            onSelect={setDate}
                                            initialFocus
                                            required
                                        />
                                    </PopoverContent>
                                </Popover>
                            </Field>
                        </div>

                    </CardContent>
                    <CardFooter className="flex items-center justify-center">
                        <Button className="bg-navy text-white font-semibold text-xl w-[100%] hover:bg-navyHover
                        cursor-pointer" onClick={addTransaction}>{location.state ? 'Update Transaction' : '+ Add Transaction'}</Button>
                    </CardFooter>
                </Card>
            </div>
        </>
    )
}

export default AddTransaction
