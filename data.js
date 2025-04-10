"use client";

import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin, { Draggable } from "@fullcalendar/interaction";
import timeGridPlugin from "@fullcalendar/timegrid";
import { useEffect, useState } from "react";


export default function CalenderContainer() {
  const [allEvents, setAllEvents] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [idToDelete, setIdToDelete] = useState(null);
  const [newEvent, setNewEvent] = useState({ title: "", start: "", end: "", id: 0 });
  const [colorIndex, setColorIndex] = useState(0); // To track event colors

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
    const startDate = new Date(arg.date);
    const endDate = new Date(startDate.getTime() + 2 * 60 * 60 * 1000); // Default 2-hour event

    setNewEvent({
      title: "",
      start: startDate.toISOString().slice(0, 16),
      end: endDate.toISOString().slice(0, 16),
      id: new Date().getTime(),
    });
    setShowModal(true);
  }

  function addEvent() {
    if (!newEvent.title || !newEvent.start) return;

    const formattedEvent = {
      ...newEvent,
      start: new Date(newEvent.start).toISOString(),
      end: newEvent.end ? new Date(newEvent.end).toISOString() : undefined,
      backgroundColor: colorIndex % 2 === 0 ? "#B0F8FF" : "#B1B9F8", // Alternate between blue and pink
    };

    setAllEvents((prevEvents) => [...prevEvents, formattedEvent]);
    setColorIndex((prevIndex) => prevIndex + 1); // Toggle color index
    setShowModal(false);
    setNewEvent({ title: "", start: "", end: "", id: 0 });
  }

  function handleDeleteModal(data) {
    setShowDeleteModal(true);
    setIdToDelete(Number(data.event.id));
  }

  function handleDelete() {
    setAllEvents((prevEvents) => prevEvents.filter((event) => Number(event.id) !== Number(idToDelete)));
    setShowDeleteModal(false);
    setIdToDelete(null);
  }

  function handleCloseModal() {
    setShowModal(false);
    setShowDeleteModal(false);
    setIdToDelete(null);
    setNewEvent({ title: "", start: "", end: "", id: 0 });
  }

  function handleChange(e) {
    setNewEvent({ ...newEvent, [e.target.name]: e.target.value });
  }

  return (
    <div className="p-6 relative z-10 ">
      <nav className="flex justify-between items-center mb-4 p-4">
        <div className="flex items-center gap-4">
          <h1 className="font-bold text-2xl text-gray-700">Hi, QCS</h1>
          <span className="text-gray-600">Keep Moving Forward</span>
        </div>
      </nav>

      <div className="w-full grid gap-2" style={{ height: "90vh" }}>

      
        <FullCalendar
          className=" text-xs  " 
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
          headerToolbar={{
            left: "prev today next",
            center: "title",
            right: "dayGridMonth,timeGridWeek,timeGridDay createPost",
          }}
          customButtons={{
            createPost: {
              text: " +Create Post",
              click: () => setShowModal(true),
            },
          }}
          events={allEvents}
          nowIndicator={true}
          editable={true}
          slotMinTime="06:00:00"
          droppable={false}
          selectable={true}
          selectMirror={true}
          dateClick={handleDateClick}
          eventClick={handleDeleteModal}
          key={allEvents.length}
          dayMaxEventRows={2}
          contentHeight="auto"
          slotLabelFormat={{ hour: 'numeric', minute: '2-digit', hour12: true }}
          dayCellContent={(arg) => {
            const date = new Date(arg.date);
            const formattedDate = date.getDate().toString().padStart(2, "0");
            return date.getDate() ? (
              <div className="min-w-[100%] max-w-[100%] px-[2px]   
                              bg-gradient-to-l from-[rgba(177,185,248,1)] to-[rgba(176,248,255,1)] 
                              rounded-[.5rem]  flex  z-[100] ">
                  <div className="child w-[100%] h-[100%] mx-[px] my-[2px] py-5 px-2 bg-white/80
                                  rounded-[.4rem]  flex gap-9 items-center">
                      <span className="text-sm font-medium text-gray-500">
                        {date.toLocaleDateString("en-US", { weekday: "short" })}
                      </span>
                      <span className="text-3xl font-bold text-gray-800">{formattedDate}</span>
                  </div>

              </div>
             
            ) : null;
          }}
          views={{
            dayGridMonth: {
              dayMaxEventRows: 2,
              eventLimit: true,
            },
            timeGridWeek: {
              dayHeaderContent: () => null, // Hide weekday and date in week toggle header
            },
          }}
          dayHeaderContent={(arg) => {
            // Only show the header text (e.g., "Sun", "Mon") without the date
            return <div className="text-xs font-semibold ">{arg.text}</div>;
          }}
          eventContent={({ event }) => (
            <div className="text-xs text-white p-1 rounded" style={{ backgroundColor: event.backgroundColor || "#3b82f6" }}>
              {event.title}
            </div>
          )}
          height="90vh"
          dayCellClassNames="p-1"
        />
      </div>

      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50  z-10">
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
            <input
              type="datetime-local"
              name="end"
              value={newEvent.end}
              onChange={handleChange}
              className="w-full p-2 border rounded-md mb-2"
            />
            <button onClick={addEvent} className="w-full bg-blue-500 text-white p-2 rounded-md">
              Add Event 
            </button>
            <button onClick={handleCloseModal} className="w-full mt-2 bg-gray-500 text-white p-2 rounded-md">
              Cancel
            </button>
          </div>
        </div>
      )}

      {showDeleteModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-5 rounded-md shadow-md w-96">
            <h2 className="font-bold text-lg text-center">Delete Event</h2>
            <p className="text-center">Are you sure you want to delete this event?</p>
            <button onClick={handleDelete} className="w-full bg-red-500 text-white p-2 rounded-md mt-4">
              Delete
            </button>
            <button onClick={handleCloseModal} className="w-full mt-2 bg-gray-500 text-white p-2 rounded-md">
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}