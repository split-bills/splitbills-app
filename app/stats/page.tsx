"use client";

import axios from "axios";
import { useState, useEffect } from "react";
import { DatePicker } from "@/components/stats/DatePicker";
import { Button } from "@/components/ui/button";
import { ExChart } from "@/components/stats/ExChart";
import { ExpensesChart } from "@/components/stats/ExpensesChart";

type ExpenseData = {
  date: string;
  amount: string;
};

type CombinedData = {
  date: string;
  Incoming: number;
  Outgoing: number;
};

const Page = () => {
  const [startDate, setStartDate] = useState<Date>();
  const [endDate, setEndDate] = useState<Date>();
  const [incomingData, setIncomingData] = useState<ExpenseData[]>([]);
  const [outgoingData, setOutgoingData] = useState<ExpenseData[]>([]);
  const [fullData, setFullData] = useState<CombinedData[]>([]);
  const [chartData, setChartData] = useState<CombinedData[]>([]);

  useEffect(() => {
    axios
      .get("http://localhost:8080/stats/expenses", { withCredentials: true })
      .then((response) => {
        console.log("Expenses data", response.data);
        const { incoming, outgoing } = response.data;

        setIncomingData(incoming);
        setOutgoingData(outgoing);

        // Combine incoming and outgoing data
        const combinedData: CombinedData[] = [];

        const allDates = new Set([
          ...incoming.map((item: ExpenseData) => item.date),
          ...outgoing.map((item: ExpenseData) => item.date),
        ]);

        allDates.forEach((date) => {
          const incomingAmount = incoming
            .filter((item: ExpenseData) => item.date === date)
            .reduce(
              (sum: number, item: ExpenseData) => sum + parseFloat(item.amount),
              0
            );
          const outgoingAmount = outgoing
            .filter((item: ExpenseData) => item.date === date)
            .reduce(
              (sum: number, item: ExpenseData) => sum + parseFloat(item.amount),
              0
            );

          combinedData.push({
            date,
            Incoming: incomingAmount,
            Outgoing: outgoingAmount,
          });
        });

        combinedData.sort(
          (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
        );

        setFullData(combinedData);
        setChartData(combinedData);
      })
      .catch((err) => {
        console.error("Failed to fetch expenses data", err);
      });
  }, []);

  const handleApply = () => {
    if (startDate && endDate) {
      // Add a day to endDate for inclusive comparison
      const endOfDay = new Date(endDate);
      endOfDay.setDate(endOfDay.getDate() + 1);

      const filteredData = fullData.filter((item) => {
        const itemDate = new Date(item.date.split("T")[0]);
        return itemDate >= startDate && itemDate <= endOfDay;
      });
      setChartData(filteredData);
    }
  };

  return (
    <div className="p-4 w-11/12">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold">Stats</h1>
        <div className="flex flex-row gap-2">
          <div className="grid grid-cols-2 gap-2 mb-2 items-center">
            <DatePicker
              title="Pick start date"
              dateState={startDate}
              setDateState={setStartDate}
            />
            <DatePicker
              title="Pick end date"
              dateState={endDate}
              setDateState={setEndDate}
            />
          </div>
          <Button size="sm" className="w-20" onClick={handleApply}>
            Apply
          </Button>
        </div>
      </div>
      {/* <ExpensesChart chartData={chartData} /> */}
      <div className="flex flex-row gap-4">
        <ExChart
          color="hsl(var(--chart-green))"
          title="Incoming"
          chartData={chartData}
        />
        <ExChart
          color="hsl(var(--chart-red))"
          title="Outgoing"
          chartData={chartData}
        />
      </div>
    </div>
  );
};

export default Page;
