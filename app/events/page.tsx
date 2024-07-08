import EventsTable from "@/components/events/EventsTable"
import NewEvent from "@/components/events/NewEvent"

const page = () => {
  return (
    <div className="p-4 flex flex-row gap-10">
      <EventsTable />
      <NewEvent />
    </div>
  )
}

export default page