"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import AddTransaction from "./AddTransaction";

interface BalanceCardProps {
  email: string;
}

interface balanceCardData {
  incoming: number;
  outgoing: number;
}

const BalanceCard: React.FC<BalanceCardProps> = ({ email }) => {
  const [balance, setBalance] = useState<balanceCardData>({
    incoming: 0,
    outgoing: 0,
  });

  useEffect(() => {
    console.log("Fetching balance data...");
    axios
      .get("http://localhost:8080/balance/jane.smith@example.com")
      .then((res) => {
        setBalance(res.data);
        console.log("Balance fetched:", res.data);
      })
      .catch((err) => {
        console.error("Error fetching balance:", err);
      });
  }, []);

  const totalBalance = balance.incoming - balance.outgoing;

  return (
    <Card className="h-fit">
      <CardHeader className="ml-4 mb-0">
        <CardTitle className="text-2xl font-light">Total Balance</CardTitle>
        <p className="text-4xl font-medium">
          {totalBalance < 0
            ? `-₹${Math.abs(totalBalance)}`
            : `₹${totalBalance}`}
        </p>
      </CardHeader>
      <CardContent className="flex flex-row gap-5">
        <div className="m-5">
          <p className="text-xl font-medium">
            <span className="text-green-600 text-lg">&#x25B4;</span> Incoming
          </p>
          <p className="text-2xl">+₹{balance.incoming}</p>
          <AddTransaction email={email} title="Incoming" />
        </div>
        <div className="m-5 ml-0">
          <p className="text-xl font-medium">
            <span className="text-[#ED2B2A] text-sm">&#x25BC;</span> Outgoing
          </p>
          <p className="text-2xl">-₹{balance.outgoing}</p>
          <AddTransaction email={email} title="Outgoing" />
        </div>
      </CardContent>
    </Card>
  );
};

export default BalanceCard;
