import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import type {
  DateSelectArg,
  EventClickArg,
  EventDropArg,
} from "@fullcalendar/core";
import { useState } from "react";

interface CalendarEvent {
  id: string;
  title: string;
  start: string;
  end?: string;
  allDay?: boolean;
  color?: string;
}

const INITIAL_EVENTS: CalendarEvent[] = [];

export default function CalendarPage() {
  const [events, setEvents] = useState<CalendarEvent[]>(INITIAL_EVENTS);

  const handleDateSelect = (select: DateSelectArg) => {
    const title = prompt("Event title:");
    if (title?.trim()) {
      setEvents((prev) => [
        ...prev,
        {
          id: String(Date.now()),
          title: title.trim(),
          start: select.startStr,
          end: select.endStr,
          allDay: select.allDay,
          color: "#3b82f6",
        },
      ]);
    }
    select.view.calendar.unselect();
  };

  const handleEventClick = (click: EventClickArg) => {
    if (confirm(`Delete "${click.event.title}"?`)) {
      setEvents((prev) => prev.filter((e) => e.id !== click.event.id));
    }
  };

  const handleEventDrop = (drop: EventDropArg) => {
    setEvents((prev) =>
      prev.map((e) =>
        e.id === drop.event.id
          ? {
              ...e,
              start: drop.event.startStr,
              end: drop.event.endStr ?? undefined,
            }
          : e,
      ),
    );
  };

  return (
    <div className="h-full pt-2 [&_.fc]:h-full [&_.fc-toolbar-title]:text-light-text-primary [&_.fc-toolbar-title]:dark:text-dark-text-primary [&_.fc-button]:!bg-light-CTA-bg [&_.fc-button]:dark:!bg-dark-CTA-bg [&_.fc-button]:!border-0 [&_.fc-button]:!shadow-none [&_.fc-button-active]:!opacity-70 [&_.fc-button:focus]:!shadow-none [&_.fc-col-header-cell-cushion]:text-light-text-secondary [&_.fc-col-header-cell-cushion]:dark:text-dark-text-secondary [&_.fc-col-header-cell-cushion]:no-underline [&_.fc-daygrid-day-number]:text-light-text-secondary [&_.fc-daygrid-day-number]:dark:text-dark-text-secondary [&_.fc-daygrid-day-number]:no-underline [&_.fc-scrollgrid]:!border-light-border [&_.fc-scrollgrid]:dark:!border-dark-border [&_td]:!border-light-border [&_td]:dark:!border-dark-border [&_th]:!border-light-border [&_th]:dark:!border-dark-border [&_.fc-timegrid-slot-label-cushion]:text-light-text-secondary [&_.fc-timegrid-slot-label-cushion]:dark:text-dark-text-secondary [&_.fc-day-today]:!bg-light-surface [&_.fc-day-today]:dark:!bg-dark-surface">
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        headerToolbar={{
          left: "prev,next today",
          center: "title",
          right: "dayGridMonth,timeGridWeek,timeGridDay",
        }}
        height="100%"
        selectable
        selectMirror
        editable
        dayMaxEvents
        events={events}
        select={handleDateSelect}
        eventClick={handleEventClick}
        eventDrop={handleEventDrop}
      />
    </div>
  );
}
