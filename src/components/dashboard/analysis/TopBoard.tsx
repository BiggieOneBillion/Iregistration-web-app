import { RxActivityLog } from "react-icons/rx";
import { FaPeopleGroup } from "react-icons/fa6";
import { IoStatsChartSharp } from "react-icons/io5";
import { QueryClient, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { userProp, userStore } from "../../../store/GlobalStore";
import { IEvent } from "./EventDetail";

const TopBoard = () => {
  const token = userStore((state) => (state as userProp).token);

  const { data, isLoading, isError } = useQuery({
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

  // console.log(data?.data.data);

  const totalNumOfExpectedGuest = data?.data.data
    .map((item: IEvent) => item.noOfAttendees)
    .reduce((prev: any, curr: any) => prev + curr, 0);

  return (
    <section className="space-y-5 bg-black/[0.03] p-5 rounded-md">
      <h1 className="text-xl font-semibold text-black/90">Top Board</h1>
      <div className="flex flex-col md:flex-row item-start md:items-center gap-5 md:gap-10">
        {/* total event count */}
        <div className="border rounded-md bg-white/90 py-5 px-5 lg:min-w-[300px] w-full ">
          <span className="inline-block rounded-full bg-black/[0.03] p-2 border text-base md:text-xl mb-2">
            <RxActivityLog />
          </span>
          <h3 className="font-semibold text-base md:text-xl text-black">
            {data?.data.data ? (
              data?.data.data.length
            ) : (
              <span className="text-xs">...loading</span>
            )}
          </h3>
          <p className="font-medium  text-sm md:text-base text-black/80">
            Total Events Count
          </p>
        </div>
        {/* total attended guest for all events */}
        <div className="border rounded-md bg-white/90 py-5 px-5 lg:min-w-[300px] w-full ">
          <span className="inline-block rounded-full bg-black/[0.03] p-2 border text-base md:text-xl mb-2">
            <FaPeopleGroup />
          </span>
          <h3 className="font-semibold text-base md:text-xl text-black">
            {totalNumOfExpectedGuest}
          </h3>
          <p className="font-medium text-sm md:text-base text-black/80">
            Total Guest For All Events
          </p>
        </div>
        {/* percentage attendance for all events */}
        {/* total attended guest for all events */}
        <div className="border rounded-md bg-white/90 py-5 px-5 lg:min-w-[300px] w-full ">
          <span className="inline-block rounded-full bg-black/[0.03] p-2 border text-base md:text-xl mb-2">
            <IoStatsChartSharp />
          </span>
          <h3 className="font-semibold text-base md:text-xl text-black">80%</h3>
          <p className="font-medium text-sm md:text-base text-black/80">
            Average Attendance For All Events
          </p>
        </div>
      </div>
    </section>
  );
};

export default TopBoard;
