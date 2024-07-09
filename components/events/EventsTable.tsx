import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  ArrowRight,
  MoveRight,
} from "lucide-react"
import { format } from "date-fns"

interface EventsTableProps {
  toggleNewEvent: () => void
  showNewEvent: boolean
}

const EventsTable: React.FC<EventsTableProps> = ({ toggleNewEvent, showNewEvent }) => {
  return (
    <Card className="w-[40rem] h-fit">
      <CardHeader className="px-7 flex flex-row justify-between items-start">
        <div>
            <CardTitle>Events</CardTitle>
            <CardDescription>A list of events you&apos;ve attended.</CardDescription>
        </div>
        <Button className="mt-5" onClick={toggleNewEvent}>
          {showNewEvent ? 'Cancel' : 'New Event'}
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
            <TableRow>
              <TableCell>Haikyuu Movie</TableCell>
              <TableCell className="text-center">7</TableCell>
              <TableCell className="text-center">{format("10-11-2023", "PPP")}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}

export default EventsTable