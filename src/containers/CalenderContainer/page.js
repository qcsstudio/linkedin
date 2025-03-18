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
    const [newEvent, setNewEvent] = useState({ title: "", start: "", id: 0 });

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
      setAllEvents((prevEvents) => [...prevEvents, formattedEvent]);
      setShowModal(false);
      setNewEvent({ title: "", start: "", id: 0 });
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
      setNewEvent({ title: "", start: "", id: 0 });
    }

    function handleChange(e) {
      setNewEvent({ ...newEvent, [e.target.name]: e.target.value });
    }

    return (
      <div className="p-6">
        <nav className="flex justify-between items-center mb-4 border-b border-violet-100 p-4">
          {/* Left Section: Title and Tagline */}
          <div className="flex items-center gap-4">
            <h1 className="font-bold text-2xl text-gray-700">Hi, QCS</h1>
            <span className="text-gray-600">Keep Moving Forward</span>
          </div>
        </nav>

        <main className="w-full grid gap-5" style={{ height: "90vh" }}>
          <FullCalendar
            className="z-[100%] text-xs"
            plugins={[dayGridPlugin, interactionPlugin, timeGridPlugin]}
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
            dayMaxEventRows={2}
            contentHeight="auto"
            dayCellContent={(arg) => {
              const date = new Date(arg.date);
              const formattedDate = date.getDate().toString().padStart(2, "0"); // Ensure two-digit format

              return date.getDate() ? (
                <div className="flex justify-center gap-10 items-center text-xs py-1 w-full">
                  <span className="text-sm font-medium">
                    {date.toLocaleDateString("en-US", { weekday: "short" })}
                  </span>
                  <span className="text-3xl font-bold">{formattedDate}</span>
                </div>
              ) : null;
            }}
            views={{
              dayGridMonth: {
                dayMaxEventRows: 2,
                eventLimit: true,
              },
            }}
            dayHeaderContent={(arg) => (
              <div className="text-xs font-semibold">{arg.text}</div>
            )}
            eventContent={({ event }) => (
              <div className="text-xs bg-blue-500 text-white p-1 rounded">
                {event.title}
              </div>
            )}
            height="90vh"
            dayCellClassNames="p-1"
          />
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
              <button onClick={addEvent} className="w-full bg-blue-500 text-white p-2 rounded-md">
                Add Event 
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
