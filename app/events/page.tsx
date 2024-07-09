"use client"

import { useState } from "react"
import EventsTable from "@/components/events/EventsTable"
import NewEvent from "@/components/events/NewEvent"

const Page = () => {
  const [showNewEvent, setShowNewEvent] = useState(false)

  const toggleNewEvent = () => {
    setShowNewEvent(prev => !prev)
  }

  return (
    <div className="p-4 flex flex-row gap-10">
      <EventsTable toggleNewEvent={toggleNewEvent} showNewEvent={showNewEvent} />

      <div className={`relative ${showNewEvent ? '' : 'pointer-events-none opacity-50'}`}>
        <NewEvent />
      </div>
    </div>
  )
}

export default Page