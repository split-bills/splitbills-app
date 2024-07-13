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

const TransactionDialog = () => {
  return (
    <>
      <Dialog>
        <DialogTrigger asChild>
          <TableCell className="cursor-pointer">
            <div className="font-medium">Liam Johnson</div>
            <div className="hidden text-sm text-muted-foreground md:inline">
              liam@example.com
            </div>
          </TableCell>
        </DialogTrigger>

        <TableCell className="text-center">₹500.00</TableCell>

        <TableCell className="hidden sm:table-cell text-center">
          <Badge className="text-xs" variant="outline">
            <span className="flex h-1.5 w-1.5 rounded-full bg-[#ED2B2A] mr-1.5"></span>
            Owe
          </Badge>
        </TableCell>

        <DialogContent>
          <DialogHeader>
            <DialogTitle>Liam Johnson</DialogTitle>
            <DialogDescription>
              Here is a detailed list of the payments and debts.
            </DialogDescription>
          </DialogHeader>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-center">Reason</TableHead>
                <TableHead className="text-center">Amount</TableHead>
                <TableHead className="hidden sm:table-cell text-center">
                  Type
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell>
                  <div className="font-medium text-center">Movie</div>
                </TableCell>
                <TableCell className="text-center">₹250.00</TableCell>
                <TableCell className="hidden sm:table-cell text-center">
                  <Badge className="text-xs" variant="secondary">
                    <span className="flex h-1.5 w-1.5 rounded-full bg-green-600 mr-1.5"></span>
                    Receive
                  </Badge>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <div className="font-medium text-center">Travel</div>
                </TableCell>
                <TableCell className="text-center">₹500.00</TableCell>
                <TableCell className="hidden sm:table-cell text-center">
                  <Badge className="text-xs" variant="outline">
                    <span className="flex h-1.5 w-1.5 rounded-full bg-[#ED2B2A] mr-1.5"></span>
                    Owe
                  </Badge>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default TransactionDialog;
