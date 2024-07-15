"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

const NewEvent = () => {
  const [date, setDate] = useState<Date>();
  const [participants, setParticipants] = useState<string[]>(["", ""]);
  const [eventName, setEventName] = useState<string>("");
  const [step, setStep] = useState<number>(1);
  const [expenses, setExpenses] = useState<number[]>([]);
  const [paidAmounts, setPaidAmounts] = useState<number[]>([]);

  const addParticipant = () => {
    setParticipants([...participants, ""]);
    setExpenses([...expenses, 0]);
    setPaidAmounts([...paidAmounts, 0]);
  };

  const removeParticipant = (index: number) => {
    setParticipants(participants.filter((_, i) => i !== index));
    setExpenses(expenses.filter((_, i) => i !== index));
    setPaidAmounts(paidAmounts.filter((_, i) => i !== index));
  };

  const handleParticipantChange = (value: string, index: number) => {
    const newParticipants = [...participants];
    newParticipants[index] = value;
    setParticipants(newParticipants);
  };

  const handleExpenseChange = (value: string, index: number) => {
    const newExpenses = [...expenses];
    newExpenses[index] = Number(value);
    setExpenses(newExpenses);
  };

  const handlePaidChange = (value: string, index: number) => {
    const newPaidAmounts = [...paidAmounts];
    newPaidAmounts[index] = Number(value);
    setPaidAmounts(newPaidAmounts);
  };

  const handleNextStep = () => {
    if (eventName && date && participants.every((participant) => participant)) {
      setStep(step + 1);
    } else {
      alert("Please fill all fields before proceeding to the next step.");
    }
  };

  const handleBackStep = () => {
    setStep(step - 1);
  };

  return (
    <div className="w-[40rem]">
      {step === 1 && (
        <Card x-chunk="dashboard-04-chunk-1">
          <CardHeader>
            <CardTitle>Add Event</CardTitle>
          </CardHeader>
          <CardContent className="">
            <div className="grid grid-cols-2 gap-4">
              <Input
                placeholder="Event Name"
                value={eventName}
                onChange={(e) => setEventName(e.target.value)}
                required
              />
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={"outline"}
                    className={cn(
                      "w-[280px] justify-start text-left font-normal",
                      !date && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {date ? format(date, "PPP") : <span>Pick a date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>

              {participants.map((participant, index) => (
                <div key={index} className="flex items-center gap-2 mt-2">
                  <Input
                    placeholder={`Participant ${index + 1}`}
                    value={participant}
                    onChange={(e) =>
                      handleParticipantChange(e.target.value, index)
                    }
                    required
                  />
                  {participants.length > 2 && (
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => removeParticipant(index)}
                    >
                      Remove
                    </Button>
                  )}
                </div>
              ))}
            </div>
            <div className="grid grid-cols-2 gap-2 mt-2 items-center">
              <Button
                className="mt-2"
                size="sm"
                variant="outline"
                onClick={addParticipant}
              >
                Add Participant
              </Button>
              <Button className="mt-2" size="sm" onClick={handleNextStep}>
                Next
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
      {step === 2 && (
        <Card x-chunk="dashboard-04-chunk-2">
          <CardHeader>
            <CardTitle>Event Details</CardTitle>
          </CardHeader>
          <CardContent className="">
            <div className="">
              <div className="grid grid-cols-3 gap-4 mb-3">
                <Label className="text-center"></Label>
                <Label className="text-center text-lg">Expenses</Label>
                <Label className="text-center text-lg">Paid</Label>
              </div>
              {participants.map((participant, index) => (
                <div
                  key={index}
                  className="grid grid-cols-3 gap-4 my-2 items-center"
                >
                  <Label className="text-center">{participant}</Label>
                  <Input
                    type="number"
                    value={expenses[index] || ""}
                    onChange={(e) => handleExpenseChange(e.target.value, index)}
                    required
                  />
                  <Input
                    type="number"
                    value={paidAmounts[index] || ""}
                    onChange={(e) => handlePaidChange(e.target.value, index)}
                    required
                  />
                </div>
              ))}
            </div>
            <div className="grid grid-cols-2 gap-2 mt-2 items-center">
              <Button
                className="mt-2"
                size="sm"
                variant="outline"
                onClick={handleBackStep}
              >
                Back
              </Button>
              <Button className="mt-2" size="sm">
                Submit
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default NewEvent;
