"use client";

import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin, { Draggable } from "@fullcalendar/interaction";
import timeGridPlugin from "@fullcalendar/timegrid";
import { useEffect, useState } from "react";

export default function CalenderContainer() {
  const [events, setEvents] = useState([]);
  const [allEvents, setAllEvents] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [idToDelete, setIdToDelete] = useState(null);
  const [newEvent, setNewEvent] = useState({ title: "", start: "", time: "12:00", id: 0 });

  useEffect(() => {
    let draggableEl = document.getElementById("draggable-el");
    if (draggableEl) {
      new Draggable(draggableEl, {
        itemSelector: ".fc-event",
        eventData: function (eventEl) {
          return {
            title: eventEl.getAttribute("title"),
            id: eventEl.getAttribute("data-id"),
          };
        },
      });
    }
  }, []);

  function handleDateClick(arg) {
    setNewEvent({ title: "", start: arg.date ? arg.date.toISOString() : "", id: new Date().getTime() });
    setShowModal(true);
  }

  function addEvent() {
    if (!newEvent.title || !newEvent.start) return;
    const formattedEvent = { ...newEvent, start: new Date(newEvent.start).toISOString() };
    setAllEvents(prevEvents => [...prevEvents, formattedEvent]);
    setShowModal(false);
    setNewEvent({ title: "", start: "", time: "12:00", id: 0 });
  }

  function handleDeleteModal(data) {
    setShowDeleteModal(true);
    setIdToDelete(Number(data.event.id));
  }

  function handleDelete() {
    setAllEvents(prevEvents => prevEvents.filter(event => Number(event.id) !== Number(idToDelete)));
    setShowDeleteModal(false);
    setIdToDelete(null);
  }

  function handleCloseModal() {
    setShowModal(false);
    setShowDeleteModal(false);
    setIdToDelete(null);
    setNewEvent({ title: "", start: "", time: "12:00", id: 0 });
  }

  function handleChange(e) {
    setNewEvent({ ...newEvent, [e.target.name]: e.target.value });
  }

  return (
    <div className="p-10">
      <nav className="flex justify-between mb-12 border-b border-violet-100 p-4">
        <h1 className="font-bold text-2xl text-gray-700">Calendar</h1>
      </nav>
      <main className="grid grid-cols-10 gap-4">
        <div className="col-span-8">
          <FullCalendar
            plugins={[dayGridPlugin, interactionPlugin, timeGridPlugin]}
            headerToolbar={{ left: "prev,next today", center: "title", right: "dayGridMonth,timeGridWeek,timeGridDay" }}
            initialView="dayGridMonth"
            events={allEvents}
            nowIndicator={true}
            editable={true}
            droppable={true}
            selectable={true}
            selectMirror={true}
            dateClick={handleDateClick}
            eventClick={handleDeleteModal}
            key={allEvents.length} 
            eventContent={(arg) => {
              if (arg.view.type === "dayGridMonth" && arg.date) {
                const dateStr = arg.date.toISOString().split("T")[0];
                const count = allEvents.filter(event => event.start.split("T")[0] === dateStr).length;
                return count > 0 ? `${count} events` : null;
              }
              return arg.event.title;
            }}
          />
        </div>
        <div className="col-span-2 border-2 p-2 rounded-md bg-blue-500 text-white w-full">
          <h2 className="font-bold text-lg text-center">Add Event</h2>
          <input 
            type="text" 
            name="title" 
            value={newEvent.title} 
            onChange={handleChange} 
            placeholder="Event Title" 
            className="w-full p-2 border rounded-md mb-2 bg-white text-black"
          />
          <input 
            type="datetime-local" 
            name="start" 
            value={newEvent.start} 
            onChange={handleChange} 
            className="w-full p-2 border rounded-md mb-2 bg-white text-black"
          />
          <button 
            onClick={addEvent} 
            className="w-full bg-white text-blue-500 p-2 rounded-md"
          >
            Add Event
          </button>
          <h2 className="font-bold text-lg text-center mt-4">Drag Event</h2>
          <div id="draggable-el">
            {events.map(event => (
              <div key={event.id} className="fc-event border-2 p-1 m-2 w-full rounded-md text-center bg-white shadow-md" title={event.title} data-id={event.id}>
                {event.title}
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}