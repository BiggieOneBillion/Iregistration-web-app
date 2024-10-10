import { useState } from "react";
import TableSection from "./TableSection";
import TopBoard from "./TopBoard";

const EventAnalysis = () => {
  const [filtering, setFiltering] = useState<string>("");
  return (
    <section className="space-y-10">
      {/* TOP BOARD */}
      <TopBoard />
      {/* Table Showing data */}
      <div className="w-screen overflow-x-scroll px-3y lg:w-full space-y-5">
        {/* title and description */}
        <div className="space-y-1">
          <h2 className="text-lg text-black/90 font-semibold">Table Info</h2>
          <p className="text-sm text-gray-500 font-normal">
            This is the tabulated data of the event. Click on the{" "}
            <b>Event name</b> to go to the individual event analytics
          </p>
        </div>
        <TableSection filtering={filtering} setFiltering={setFiltering} />
      </div>
    </section>
  );
};

export default EventAnalysis;
