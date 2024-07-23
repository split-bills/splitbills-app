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

interface balanceCardData {
  incoming: number;
  outgoing: number;
}

const BalanceCard = () => {
  const [balance, setBalance] = useState<balanceCardData>({
    incoming: 0,
    outgoing: 0,
  });

  useEffect(() => {
    console.log("Fetching balance data...");
    axios
      .get("http://localhost:8080/home/balance", {
        withCredentials: true,
      })
      .then((res) => {
        setBalance(res.data);
        console.log("Balance fetched:", res.data);
      })
      .catch((err) => {
        console.error("Error fetching balance:", err);
        if (err.response && err.response.status === 401) {
          window.location.href = "/login";
        }
      });
  }, []);

  const totalBalance = balance.incoming - balance.outgoing;

  return (
    <Card className="h-fit">
      <CardHeader className="ml-4 mb-0">
        <CardTitle className="text-2xl font-light">Total Balance</CardTitle>
        <p className="text-3xl font-medium">
          {totalBalance < 0 && "-"}₹{Math.abs(totalBalance).toFixed(2)}
        </p>
      </CardHeader>
      <CardContent className="flex flex-row gap-5">
        <div className="m-5">
          <p className="text-xl font-medium">
            <span className="text-green-600 text-lg">&#x25B4;</span> Incoming
          </p>
          <p className="text-xl">+₹{balance.incoming}</p>
          <AddTransaction title="Incoming" />
        </div>
        <div className="m-5 ml-0">
          <p className="text-xl font-medium">
            <span className="text-[#ED2B2A] text-sm">&#x25BC;</span> Outgoing
          </p>
          <p className="text-xl">-₹{balance.outgoing}</p>
          <AddTransaction title="Outgoing" />
        </div>
      </CardContent>
    </Card>
  );
};

export default BalanceCard;
