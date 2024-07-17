import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { format } from "date-fns";

interface Transaction {
  amount: number;
  reason: string;
  created_at: Date;
  first_name: string;
  last_name: string;
  email: string;
}

interface Transactions {
  name: string;
  balance: number;
  email: string;
  incoming_transactions: Transaction[];
  outgoing_transactions: Transaction[];
}

interface TransactionDialogProps {
  transactions: Transactions;
}

const TransactionDialog: React.FC<TransactionDialogProps> = ({
  transactions,
}) => {
  // combine incoming and outgoing transactions
  const transactions_array: Transaction[] =
    transactions.incoming_transactions.concat(
      transactions.outgoing_transactions
    );

  // sort transactions by date
  transactions_array.sort((a, b) => {
    return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
  });
  return (
    <>
      <Dialog>
        <DialogTrigger asChild>
          <TableCell className="cursor-pointer">
            <div className="font-medium">{transactions.name}</div>
            <div className="hidden text-sm text-muted-foreground md:inline">
              {transactions.email}
            </div>
          </TableCell>
        </DialogTrigger>

        <TableCell className="text-center">
          ₹{Math.abs(transactions.balance).toFixed(2)}
        </TableCell>

        <TableCell className="hidden sm:table-cell text-center">
          {transactions.balance < 0 ? (
            <Badge className="text-xs" variant="outline">
              <span className="flex h-1.5 w-1.5 rounded-full bg-[#ED2B2A] mr-1.5"></span>
              Owe
            </Badge>
          ) : (
            <Badge className="text-xs" variant="secondary">
              <span className="flex h-1.5 w-1.5 rounded-full bg-green-600 mr-1.5"></span>
              Receive
            </Badge>
          )}
        </TableCell>

        <DialogContent>
          <DialogHeader>
            <DialogTitle>{transactions.name}</DialogTitle>
            <DialogDescription>
              Here is a detailed list of the payments and debts.
            </DialogDescription>
          </DialogHeader>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-center">Date</TableHead>
                <TableHead className="text-center">Reason</TableHead>
                <TableHead className="text-center">Amount</TableHead>
                <TableHead className="hidden sm:table-cell text-center">
                  Type
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {transactions_array.map((transaction, index) => (
                <TableRow key={index}>
                  <TableCell>
                    <div className="font-medium text-center">
                      {format(transaction.created_at, "PPP")}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="font-medium text-center">
                      {transaction.reason}
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    ₹{Math.abs(transaction.amount).toFixed(2)}
                  </TableCell>
                  <TableCell className="hidden sm:table-cell text-center">
                    {transaction.amount < 0 ? (
                      <Badge className="text-xs" variant="outline">
                        <span className="flex h-1.5 w-1.5 rounded-full bg-[#ED2B2A] mr-1.5"></span>
                        Owe
                      </Badge>
                    ) : (
                      <Badge className="text-xs" variant="secondary">
                        <span className="flex h-1.5 w-1.5 rounded-full bg-green-600 mr-1.5"></span>
                        Receive
                      </Badge>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default TransactionDialog;
