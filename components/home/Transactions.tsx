import TransactionDialog from "./TransactionDialog";

import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default function Transactions() {
  return (
    <Card className="w-[32rem]">
      <CardHeader className="px-7">
        <CardTitle>Transactions</CardTitle>
        <CardDescription>Your current payments and debts.</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>User</TableHead>
              <TableHead className="text-center">Amount</TableHead>
              <TableHead className="hidden sm:table-cell text-center">
                Type
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell>
                <div className="font-medium">Liam Johnson</div>
                <div className="hidden text-sm text-muted-foreground md:inline">
                  liam@example.com
                </div>
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
                <div className="font-medium">Liam Johnson</div>
                <div className="hidden text-sm text-muted-foreground md:inline">
                  liam@example.com
                </div>
              </TableCell>
              <TableCell className="text-center">₹500.00</TableCell>
              <TableCell className="hidden sm:table-cell text-center">
                <Badge className="text-xs" variant="outline">
                  <span className="flex h-1.5 w-1.5 rounded-full bg-[#ED2B2A] mr-1.5"></span>
                  Owe
                </Badge>
              </TableCell>
            </TableRow>
            <TableRow>
              <TransactionDialog />
            </TableRow>
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
