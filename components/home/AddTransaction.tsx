import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { 
  Plus,
  Film,
  ShoppingBag,
  Utensils,
  Bus,
} from "lucide-react"

interface AddTransactionProps {
    title: string
}

const AddTransaction: React.FC<AddTransactionProps> = ({ title }) => {
    return (
        <Dialog>
          <DialogTrigger asChild>
            <Button className="mt-2 w-full" size="sm">
              <Plus size={16} className="mr-1.5" />
               Add
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Add {title}</DialogTitle>
              <DialogDescription>
                Add a new transaction here. Click add transaction when you&apos;re done.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="flex items-center">
                <Input
                  id="name"
                  className="col-span-3"
                  placeholder="Username"
                />
              </div>
              <div className="flex items-center gap-4">
                <Input
                  id="amount"
                  type="number"
                  className="col-span-2 w-1/2"
                  placeholder="Amount"
                />
                <Select>
                  <SelectTrigger className="w-1/2">
                    <SelectValue placeholder="Reason" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="movie">
                      <div className="flex items-start gap-3">
                        <Film className="size-5" />
                        <p>Movie</p>
                      </div>
                    </SelectItem>
                    <SelectItem value="shopping">
                      <div className="flex items-start gap-3">
                        <ShoppingBag className="size-5" />
                        <p>Shopping</p>
                      </div>
                    </SelectItem>
                    <SelectItem value="food">
                      <div className="flex items-start gap-3">
                        <Utensils className="size-5" />
                        <p>Food</p>
                      </div>
                    </SelectItem>
                    <SelectItem value="travel">
                      <div className="flex items-start gap-3">
                        <Bus className="size-5" />
                        <p>Travel</p>
                      </div>
                    </SelectItem>
                    <SelectItem value="others">
                      <div className="flex items-start gap-3">
                        <p>Others</p>
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <DialogFooter>
              <Button type="submit">Add Transaction</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
    )
}

export default AddTransaction