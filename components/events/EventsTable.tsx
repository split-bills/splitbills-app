"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation"; // Use next/router instead of next/navigation
import axios from "axios";
import { Button } from "@/components/ui/button";
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
import { ArrowRight, MoveRight } from "lucide-react";
import { format } from "date-fns";

interface EventsTableProps {
  toggleNewEvent: () => void;
  showNewEvent: boolean;
}

interface Event {
  name: string;
  date: Date;
}

const EventsTable: React.FC<EventsTableProps> = ({
  toggleNewEvent,
  showNewEvent,
}) => {
  const [events, setEvents] = useState<Event[]>([]);
  const router = useRouter();

  useEffect(() => {
    console.log("fetching events data...");
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:8080/events/all", {
          withCredentials: true,
        });
        console.log("Events data: ", response.data);
        response.data.events.sort((a: Event, b: Event) =>
          a.date < b.date ? 1 : -1
        );
        setEvents(response.data.events);
      } catch (error: any) {
        console.error("Error fetching events data: ", error);
        if (error.response && error.response.status === 401) {
          router.push("/login");
        }
      } finally {
        console.log("Events data fetched successfully!");
      }
    };

    fetchData();
  }, [router]); // Empty dependency array ensures useEffect runs only once on mount

  return (
    <Card className="w-[40rem] h-fit">
      <CardHeader className="px-7 flex flex-row justify-between items-start">
        <div>
          <CardTitle>Events</CardTitle>
          <CardDescription>
            A list of events you&apos;ve attended.
          </CardDescription>
        </div>
        <Button className="mt-5" onClick={toggleNewEvent}>
          {showNewEvent ? "Cancel" : "New Event"}
          <MoveRight size={16} className="ml-1.5" />
        </Button>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead className="text-center">Attendees</TableHead>
              <TableHead className="text-center">Date</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {events.map((event, index) => (
              <TableRow key={index}>
                <TableCell>{event.name}</TableCell>
                <TableCell className="text-center">7</TableCell>
                <TableCell className="text-center">
                  {format(event.date, "PPP")}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default EventsTable;
