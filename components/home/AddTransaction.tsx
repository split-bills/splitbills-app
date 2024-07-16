import { useState, ChangeEvent, FormEvent } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Plus, Film, ShoppingBag, Utensils, Bus } from "lucide-react";

interface AddTransactionProps {
  email: string;
  title: string;
}

interface Transaction {
  userEmail: string;
  friendEmail: string;
  amount: string;
  reason: string;
  type: string;
}

const postTransaction = async (transaction: Transaction) => {
  console.log("Transaction:", transaction);
  try {
    const response = await axios.post(
      "http://localhost:8080/transaction",
      transaction
    );

    if (!response.data) {
      throw new Error("Failed to add transaction");
    }

    console.log("Transaction added successfully:", response.data);
    return response.data;
  } catch (error: any) {
    console.error("Error adding transaction:", error.message);
    throw error;
  }
};

const AddTransaction: React.FC<AddTransactionProps> = ({ title, email }) => {
  const [formData, setFormData] = useState<Transaction>({
    userEmail: email,
    friendEmail: "",
    amount: "",
    reason: "",
    type: title,
  });

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [id]: value }));
  };

  const handleSelectChange = (value: string) => {
    setFormData((prevData) => ({ ...prevData, reason: value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    try {
      await postTransaction(formData);
      console.log("Transaction added successfully");
    } catch (error) {
      console.error("Error adding transaction:", error);
    }
  };

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
            Add a new transaction here. Click add transaction when you&apos;re
            done.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="flex items-center">
              <Input
                id="friendEmail"
                className="col-span-3"
                placeholder="Friend's Email"
                type="email"
                value={formData.friendEmail}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="flex items-center gap-4">
              <Input
                id="amount"
                type="number"
                className="col-span-2 w-1/2"
                placeholder="Amount"
                value={formData.amount}
                onChange={handleInputChange}
                required
              />
              <Select onValueChange={handleSelectChange} required>
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
            <DialogClose asChild>
              <Button type="submit">Add Transaction</Button>
            </DialogClose>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddTransaction;
