"use client";

import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin, { Draggable } from "@fullcalendar/interaction";
import timeGridPlugin from "@fullcalendar/timegrid";
import { useEffect, useState, useRef, useContext } from "react";
import Link from "next/link";
import Image from "next/image";
import { MdEdit } from "react-icons/md";
import postContext from "@/Context/post.context";

export default function CalendarContainer() {
  const [allEvents, setAllEvents] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [idToDelete, setIdToDelete] = useState(null);
  const [newEvent, setNewEvent] = useState({ title: "", start: "", end: "", id: 0 });
  const [colorIndex, setColorIndex] = useState(0);
  const [currentView, setCurrentView] = useState("dayGridMonth");

  const [scheduleData,setScheduleData] = useState([]);
  const calendarRef = useRef(null);

  const {getSchedulePost,scheduledPostData,setScheduledPostData} = useContext(postContext);

  // getting Scheduled Post Data
  useEffect(()=>{
    getSchedulePost();



  },[])

  useEffect(()=>{
    if(scheduledPostData.length > 0){
      const formatted = scheduledPostData.map((post) => ({
        id: post._id,
        title: post.postCaption.replace(/<[^>]+>/g, ""), 
        start: new Date(Number(post.scheduleTime)).toISOString(),
        backgroundColor: "#3b82f6",
        extendedProps: {
          postCaption: post.postCaption, 
        }
      }));
      setAllEvents(formatted);


      const formatted2 = scheduledPostData.map((post) => {
        const startDate = new Date(Number(post.scheduleTime));
        const endDate = new Date(startDate.getTime() + 60 * 60 * 1000);
      
        return {
          id: post._id,
          title: post.postCaption.replace(/<[^>]+>/g, ""), 
          start: startDate.toISOString(),
          end: endDate.toISOString(),
          backgroundColor: "#3b82f6",
          extendedProps: {
            postCaption: post.postCaption,
          },
        };
      });

      console.log("formated data from calendar : ",formatted2);

    }
  },[scheduledPostData]);

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

  useEffect(() => {
    const calendarEl = document.querySelector('.fc');
    if (calendarEl) {
      calendarEl.classList.remove('fc-media-screen');
    }
  }, [currentView]); // Re-run when view changes

  const changeView = (view) => {
    if (calendarRef.current) {
      const calendarApi = calendarRef.current.getApi();
      calendarApi.changeView(view);
      setCurrentView(view);
    }
  };

  const handleToday = () => {
    if (calendarRef.current) {
      const calendarApi = calendarRef.current.getApi();
      calendarApi.today();
    }
  };

  const handlePrev = () => {
    if (calendarRef.current) {
      const calendarApi = calendarRef.current.getApi();
      calendarApi.prev();
    }
  };

  const handleNext = () => {
    if (calendarRef.current) {
      const calendarApi = calendarRef.current.getApi();
      calendarApi.next();
    }
  };

  function handleDateClick(arg) {
    const clickedDate = new Date(arg.date);
    clickedDate.setHours(0, 0, 0, 0); // Start of the day
  
    const filteredPosts = scheduledPostData.filter((post) => {
      const postDate = new Date(Number(post.scheduleTime));
      postDate.setHours(0, 0, 0, 0); // Normalize to start of the day
      return postDate.getTime() === clickedDate.getTime();
    });
  
    setScheduleData(filteredPosts); // Store only the posts of the selected day
    setShowModal(true);
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
    <div className="p-6 relative z-10 h-[80vh] overflow-hidden">

      <div className="topBar w-[100%] flex justify-between">


        <div className="z-10">
          <nav className="flex justify-between items-center mb-4 p-4">
            <div className="flex items-center gap-4">
              <h1 className="font-bold text-2xl text-gray-700">Hi, QCS</h1>
              <span className="text-gray-600">Keep Moving Forward</span>
            </div>
          </nav>
        </div>

        <div className="flex justify-end m-5">
          <div className="flex items-center gap-4">
            {/* Navigation Buttons */}
            <div className="flex items-center gap-2 mr-4">
              <button
                onClick={handlePrev}
                className="px-3 py-1 bg-white border border-gray-300 rounded-md text-md h-10 w-12 hover:bg-gray-50"
              >
                &lt;
              </button>
              <button
                onClick={handleToday}
                className="px-3 py-1 bg-white border border-gray-300 rounded-md text-md h-10  hover:bg-gray-50"
              >
                Today
              </button>
              <button
                onClick={handleNext}
                className="px-3 py-1 bg-white border border-gray-300 rounded-md text-md h-10 w-12  hover:bg-gray-50"
              >
                &gt;
              </button>
            </div>

            {/* View Switcher - Styled exactly like before */}
            <div className="flex items-center justify-between bg-white rounded-[0.5rem] px-[0.93rem] py-[0.5rem] text-[0.8rem] h-[2.78rem]">
              {["dayGridMonth", "timeGridWeek", "timeGridDay"].map((view) => (
                <button
                  key={view}
                  className={`cursor-pointer select-none mx-1 ${view === currentView
                      ? "px-[1rem] py-[0.5rem] bg-[#F1F5F9] rounded-[0.5rem] text-[14px] text-gray-800 font-medium"
                      : "px-[1rem] py-[0.5rem] text-gray-600"
                    }`}
                  onClick={() => changeView(view)}
                >
                  {view === "dayGridMonth" ? "Month" : view === "timeGridWeek" ? "Week" : "Day"}
                </button>
              ))}
            </div>
            <div className="flex justify-end items-center align-middle">
          <Link href="/dashboard/create-post" className="text-white text-center flex justify-center items-center bg-blue-600 h-[2.5rem] w-[8rem] rounded-lg">
            +Create Button
          </Link>
        </div>
          </div>
        </div>
        



      </div>

      <div className="calendarContainer w-[100%] h-[100%] overflow-x-hidden overflow-y-scroll no-scrollbar">



        <main className="w-full grid gap-5 h-[120vh] bg-none ">
          <FullCalendar
            ref={calendarRef}
            plugins={[dayGridPlugin, interactionPlugin, timeGridPlugin]}
            initialView={currentView}
            headerToolbar={false}
            events={allEvents}
            nowIndicator={true}
            editable={true}
            slotMinTime="06:00:00"
            droppable={false}
            selectable={true}
            selectMirror={true}
            dateClick={handleDateClick}
            eventClick={handleDeleteModal}
            dayMaxEventRows={1}
            contentHeight="auto"
            slotLabelFormat={{ hour: 'numeric', minute: '2-digit', hour12: true }}
            datesSet={(info) => {
              const start = info.startStr;
              const end = info.endStr;
              getSchedulePost(start, end); // Fetch posts for the current view's date range
            }}
            dayCellContent={(arg) => {
              const date = new Date(arg.date);
              const formattedDate = date.getDate().toString().padStart(2, "0");
              return date.getDate() ? (
                <div className="flex justify-start gap-9 items-center text-xs w-full ">
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
              timeGridWeek: {
                dayHeaderContent: () => null,
              },
            }}
            dayHeaderContent={(arg) => {
              return <div className="text-xs font-semibold">{arg.text}</div>;
            }}
            eventContent={({ event }) => {
              const { postCaption } = event.extendedProps;
            
              return (
                <div className="text-xs text-white p-1 rounded truncate-event-text" style={{ backgroundColor: event.backgroundColor || "#3b82f6" }} dangerouslySetInnerHTML={{__html:postCaption}}>
                  {/* <p className="line-clamp-2 text-[0.7rem] font-medium">{postCaption}</p> */}
                </div>
              );
            }}
            height="100vh"
            dayCellClassNames="p-1"
          />
        </main>z
      </div>

      {/* Add Event Modal */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-5 rounded-md shadow-md w-96">
            <h2 className="font-bold text-lg text-center">Scheduled Post's</h2>

            {/* Post Container */}
            <div className="scheduledPost w-[100%] max-h-[15rem] flex flex-col gap-[.5rem]  my-[1rem] z-20 overflow-y-scroll no-scrollbar">
              {scheduleData.length > 0 ? 
                scheduleData.map((post,index)=>(
                  <div key={index} className="post w-[100%] max-h-[6.5rem] min-h-[6.5rem] flex gap-[.5rem] justify-center hover:bg-[beige] overflow-hidden rounded-[.5rem] py-[.5rem]">

                  {/* Post Image */}
                  <Image src={post.formImage[0]} width={1024} height={1024} alt="Post_Image" className=" w-[45%] object-cover rounded-[.5rem]" />
  
                  {/* Post Deatil */}
                  <div className="rightContainer w-[50%] flex flex-col justify-between">
                    <div className="captionData text-[.75rem] postText" dangerouslySetInnerHTML={{__html:post.postCaption}}></div>
                    {/* <p className="">{post.postCaption}</p> */}
  
                    {/* Post User Detail */}
                    <div className="lowerConainer flex gap-[.5rem] items-center">
                      <div className="avatar w-[1.7rem] h-[1.7rem] bg-[#fff] rounded-[50%] justify-center items-center">
                        <Image src={"/images/postImages/avatar.png"} width={1024} height={1024} alt="Post_Image" className=" w-[100%] h-[100%] object-cover " />
                      </div>
                        <p className="name text-[.75rem] font-semibold">Omkar</p>
                        <p className="name text-[.75rem] ">{new Date(Number(post.scheduleTime)).toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}</p>
                        <MdEdit className="hover:text-[#3fff3f] cursor-pointer"/>
                    </div>
  
                  </div>
                </div>
                )) : <p className="text-[.9rem] text-[#515151]" >No Scheduled Post</p>
              }
              
            

            </div>

            <Link href="/dashboard/create-post">
            <button className="w-full bg-blue-500 text-white p-2 rounded-md">
              Add Post
            </button>
            </Link>
            <button onClick={handleCloseModal} className="w-full mt-2 bg-gray-500 text-white p-2 rounded-md">
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Delete Event Modal */}
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