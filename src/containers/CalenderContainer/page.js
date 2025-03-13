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
      <nav className="flex justify-between mb-4 border-b border-violet-100 p-4">
        <h1 className="font-bold text-2xl text-gray-700">Calendar</h1>
      </nav>
      <main className="grid grid-cols-10 gap-10" style={{ height: "90vh", width: "100%" }}>
        <div className="col-span-8" style={{ height: "100%", width: "100%" }}>
          <FullCalendar className="z-[100%]"
            plugins={[dayGridPlugin, interactionPlugin, timeGridPlugin]}
            headerToolbar={{ left: "prev today next", center: "title", right: "dayGridMonth,timeGridWeek,timeGridDay createPost" }}
            customButtons={{
              createPost: {
                text: "Create Post",
                click: () => setShowModal(true)
              }
            }}
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
            dayCellContent={(arg) => {
              const date = new Date(arg.date);
              return date.getDate() ? (
                <div className="flex flex-col items-center text-xs font-bold">
                  <span>{date.toLocaleDateString("en-US", { weekday: "short" })}</span>
                  <span>{date.getDate()}</span>
                </div>
              ) : null;
            }}
          />
        </div>
      </main>
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-5 rounded-md shadow-md w-96">
            <h2 className="font-bold text-lg text-center">Add Event</h2>
            <input 
              type="text" 
              name="title" 
              value={newEvent.title} 
              onChange={handleChange} 
              placeholder="Event Title" 
              className="w-full p-2 border rounded-md mb-2"
            />
            <input 
              type="datetime-local" 
              name="start" 
              value={newEvent.start} 
              onChange={handleChange} 
              className="w-full p-2 border rounded-md mb-2"
            />
            <button 
              onClick={addEvent} 
              className="w-full bg-blue-500 text-white p-2 rounded-md"
            >
              Add Event
            </button>
            <button 
              onClick={handleCloseModal} 
              className="w-full mt-2 bg-gray-500 text-white p-2 rounded-md"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
