import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
import AddTransaction from "./AddTransaction"

const BalanceCard = () => {
  return (
    <Card>
        <CardHeader className="ml-4 mb-0">
            <CardTitle className="text-2xl font-light">Total Balance</CardTitle>
            <p className="text-4xl font-medium">₹0</p>
        </CardHeader>
        <CardContent className="flex flex-row gap-5">
          <div className="m-5">
            <p className="text-xl font-medium"><span className="text-green-600 text-lg">&#x25B4;</span> Incoming</p>
            <p className="text-2xl">+₹0</p>
            <AddTransaction 
              title="Incoming"
            />
          </div>
          <div className="m-5 ml-0">
            <p className="text-xl font-medium"><span className="text-[#ED2B2A] text-sm">&#x25BC;</span> Outgoing</p>
            <p className="text-2xl">-₹0</p>
            <AddTransaction 
              title="Outgoing"
            />
          </div>
        </CardContent>
    </Card>
  )
}

export default BalanceCard