"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
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
  const [participants, setParticipants] = useState<string[]>([""]);
  const [step, setStep] = useState<number>(1); // Added state to track the current step

  const addParticipant = () => {
    setParticipants([...participants, ""]);
  };

  const removeParticipant = (index: number) => {
    setParticipants(participants.filter((_, i) => i !== index));
  };

  const handleParticipantChange = (value: string, index: number) => {
    const newParticipants = [...participants];
    newParticipants[index] = value;
    setParticipants(newParticipants);
  };

  const handleNextStep = () => {
    setStep(step + 1);
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
              <Input placeholder="Event Name" />
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
                  />
                  {participants.length > 1 && (
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
            <div className="grid gap-1">
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
            <div className="grid grid-cols-2 gap-4">
              <Input placeholder="Event Location" />
              <Input placeholder="Event Description" />
            </div>
            <div className="grid gap-1">
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
