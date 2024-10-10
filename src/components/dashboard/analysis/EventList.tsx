import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { userProp, userStore } from "../../../store/GlobalStore";
import EventDetailsModal from "./EventDetailsModal";
import { Link } from "react-router-dom";

interface IEvent {
  _id: string;
  userId: string;
  name: string;
  location: string;
  type: object[] | [];
  noOfAttendees: number;
  date: string;
  startTimes: [];
  endTimes: [];
  eventImg: string;
  title: string;
  description: string;
  registrationStartDate: string;
  registrationEndDate: string;
  registrationUrl: string;
  __v: number;
}

const EventList = () => {
  const token = userStore((state) => (state as userProp).token);

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["events"],
    queryFn: async () => {
      const response = axios.get("http://localhost:3000/events/all", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response;
    },
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return (
      <div>
        <h1>Error</h1>
      </div>
    );
  }

  console.log(data?.data.data);

  return (
    <section className="space-y-5">
      <div>
        <h1 className="text-2xl text-black/70 font-semibold ">Event List</h1>
        <p className="text-sm font-medium text-slate-500">
          This is the list of all your events
        </p>
      </div>
      <main className="grid lg:grid-cols-3 gap-10">
        {data?.data?.data ? (
          data?.data?.data.map((event: IEvent) => (
            <div className="p-4">
              <div className="bg-gray-100 p-6 rounded-lg">
                <img
                  className="h-40 rounded w-full object-cover object-center mb-6"
                  src={event.eventImg}
                  alt="content"
                />
                <h3 className="tracking-widest text-indigo-500 text-xs font-medium title-font flex items-center gap-1">
                  <span className="">Event Date:</span>
                  <span className="">{event.date}</span>
                </h3>
                <h2 className="text-lg text-gray-900 font-medium title-font mb-1">
                  {event.title}
                </h2>
                <p className="leading-relaxed text-base">{event.description}</p>
                <Link
                  to={`/dashboard/analysis/event/details/${event._id}`}
                  className="inline-block px-1 border rounded-sm text-sm bg-black/60 text-white hover:bg-black/80 transition-all duration-300"
                >
                  More details ...
                </Link>
                {/* <EventDetailsModal event={event} /> */}
              </div>
            </div>
          ))
        ) : (
          <p className="text-3xl font-extrabold text-black/10">
            No data available
          </p>
        )}
      </main>
    </section>
  );
};

export default EventList;
