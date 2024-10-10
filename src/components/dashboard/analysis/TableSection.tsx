import React from "react";
import Table from "./Table";
import { columnData } from "./ColumnData";
import { useQuery } from "@tanstack/react-query";
import { userProp, userStore } from "../../../store/GlobalStore";
import axios from "axios";

type PropsType = {
  filtering: string;
  setFiltering: React.Dispatch<React.SetStateAction<string>>;
};

const TableSection: React.FC<PropsType> = ({ filtering, setFiltering }) => {
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

  return (
    <main>
      {data?.data?.data ? (
        <Table
          filterState={{ filtering, setFiltering }}
          size={20}
          columnData={columnData}
          mData={data?.data?.data}
        />
      ) : (
        <p className="text-3xl font-extrabold text-black/10">
          No data available
        </p>
      )}
    </main>
  );
};

export default TableSection;
