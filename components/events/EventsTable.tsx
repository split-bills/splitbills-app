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
import { Plus } from "lucide-react"

export default function EventsTable() {
  return (
    <Card className="w-1/2">
      <CardHeader className="px-7 flex flex-row justify-between items-start">
        <div>
            <CardTitle>Events</CardTitle>
            <CardDescription>A list of events you&apos;ve attended.</CardDescription>
        </div>
        <Button className="mt-5">
            <Plus size={16} className="mr-1.5" />
            New Event
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
              <TableCell className="text-center">10-10-2023</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}
