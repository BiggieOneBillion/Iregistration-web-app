import React from "react";

type Props = {
  title: string;
  info: string;
};
const EventDetailList: React.FC<Props> = (props) => {
  return (
    <div className="lg:w-1/2">
      <span className="text-sm lg:text-gray-500 font-medium p-1 lg:p-0 bg-black/90 lg:bg-transparent text-white">{props.title} :</span>
      <h3 className="font-bold text-base text-black/80 w-[300px]  lg:w-[80%] ">{props.info}</h3>
    </div>
  );
};

export default EventDetailList;
