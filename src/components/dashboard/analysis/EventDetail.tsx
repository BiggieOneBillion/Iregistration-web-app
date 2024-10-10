import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { userProp, userStore } from "../../../store/GlobalStore";
import { useParams } from "react-router-dom";
import EventDetailList from "./EventDetailList";
import BackButton from "../../BackButton";
import DeleteEventModal from "./DeleteEventModal";
import EditFormModal from "./EditFormModal";

export interface IEvent {
  _id: string;
  userId: string;
  name: string;
  location: string;
  type: string;
  noOfAttendees: number;
  date: string;
  startTimes: string[];
  endTimes: string[];
  eventImg: string;
  title: string;
  description: string;
  registrationStartDate: string;
  registrationEndDate: string;
  registrationUrl: string;
  __v?: string;
}


const EventDetail = () => {
  const token = userStore((state) => (state as userProp).token);

  const params = useParams();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["event-details"],
    queryFn: async () => {
      const response = axios.get(`http://localhost:3000/events/${params.id}`, {
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

  console.log(data);

  const obj: IEvent = { ...data?.data[0] };

  return (
    <section className="space-y-10">
      <div>
        <div className="mb-3">
          <BackButton />
        </div>
        <h2 className="font-semibold text-2xl text-black/80">Event Details</h2>
        <p className="text-sm text-gray-500 font-medium">
          This is the total information about the event
        </p>
        <div className="mt-4">
          <EditFormModal info={obj}/>
        </div>
      </div>
      <section className="grid lg:grid-cols-2">
        {/* left side */}
        <section className="py-5 space-y-4 gap-y-2 lg:flex lg:items-start lg:flex-wrap order-1">
          {/* event name */}
          <EventDetailList title="Event Name" info={obj.name} />
          {/* event title */}
          <EventDetailList title="Event Title" info={obj.title} />
          {/* event description */}
          <EventDetailList title="Event Description" info={obj.description} />
          {/* event location */}
          <EventDetailList title="Event Location" info={obj.location} />
          {/* event number of attendance  */}
          <EventDetailList
            title="Expected Number Of Attendance"
            info={String(obj.noOfAttendees)}
          />
          {/* Event Type */}
          <EventDetailList title="Event Type" info={obj.type} />
          {/* Event date */}
          <EventDetailList title="Event Date" info={obj.date} />
          {/* event registration url */}
          <EventDetailList
            title="Event Registeration Link"
            info={obj.registrationUrl}
          />
          {/* event start registration date */}
          <EventDetailList
            title=" Registeration Start Date"
            info={obj.registrationStartDate}
          />
          {/* event end registration date */}
          <EventDetailList
            title="Registeration End Date"
            info={obj.registrationEndDate}
          />
          {/* Event start times */}
          <div className="w-1/2 flex flex-col gap-1">
            <p className="text-sm text-gray-500 font-medium">
              Event Start Times
            </p>
            <div className="flex items-start gap-1 flex-wrap">
              {obj.startTimes?.map((el) => (
                <span className="text-sm inline-block p-1 bg-black text-white w-fit">
                  {el}
                </span>
              ))}
            </div>
          </div>
          {/* Event end times */}
          <div className="w-1/2 flex flex-col gap-1">
            <p className="text-sm text-gray-500 font-medium">
              Event Closing Times
            </p>
            <div className="flex items-start gap-1 flex-wrap">
              {obj.endTimes?.map((el) => (
                <span className="text-sm inline-block p-1 bg-black text-white w-fit">
                  {el}
                </span>
              ))}
            </div>
          </div>
        </section>
        {/* right side---image container */}
        <section className="h-[300px] lg:h-[300px] lg:order-2 relative">
          <img
            src={obj.eventImg}
            alt="event image"
            className="h-full w-full object-cover"
          />
          <div className=" flex items-center justify-center absolute inset-0 z-10y bg-black/30">
            <p className="text-2xl font-bold text-white/90">Event Logo Image</p>
          </div>
        </section>
      </section>
      <div>
        {/* <Button padding={'5px 100px'} variant={'DeleteOutline'}>
            Delete Event
        </Button> */}
        <DeleteEventModal />
      </div>
    </section>
  );
};

export default EventDetail;
