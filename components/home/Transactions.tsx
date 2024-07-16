import axios from "axios";
import { useState, useEffect } from "react";

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

export default function Transactions() {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    console.log("Fetching user transactions");
    axios
      .get("http://localhost:8080/transactions/jane.smith@example.com")
      .then((response) => {
        console.log("Response:", response.data);
        setTransactions(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <Card className="w-[32rem] h-fit">
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
            {transactions.map((transactions: Transactions) => (
              <TableRow key={transactions.name}>
                <TransactionDialog transactions={transactions} />
              </TableRow>
            ))}
            {/* <TableRow>
              <TransactionDialog />
            </TableRow> */}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
