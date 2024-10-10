import { Key } from "react";
import { Link } from "react-router-dom";

export type mainType = {
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
};

export type RowType = {
  row: {
    original: mainType;
  };
};
export type columnType = (
  | {
      id: keyof mainType;
      header: string;
      accessorKey: keyof mainType;
      cell: (prop: RowType) => JSX.Element;
    }
  | { id: keyof mainType; header: string; accessorKey: keyof mainType }
)[];

export const columnData: columnType = [
  {
    id: "name",
    header: "Event Name",
    accessorKey: "name",
    cell: ({ row }) => (
      <Link to={`${row.original._id}`} state={row.original}>
        <p>{row.original.name}</p>
      </Link>
    ),
  },
  {
    id: "date",
    header: "Event Date",
    accessorKey: "date",
  },
  {
    id: "type",
    header: "Event Type",
    accessorKey: "type",
  },
  {
    id: "location",
    header: "Event Location",
    accessorKey: "location",
  },
  {
    id: "noOfAttendees",
    header: "Expected Attendance",
    accessorKey: "noOfAttendees",
  },
];
