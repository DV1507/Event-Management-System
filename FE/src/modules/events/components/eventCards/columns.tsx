"use client";
import { ColumnDef } from "@tanstack/react-table";
import { Category, Event } from "../../types";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import { Edit2, EyeIcon } from "lucide-react";
import { Dispatch, SetStateAction } from "react";
// This type is used to define the shape of our data.
// You can use a Zod schema here if you want. name, number, monthlySalary, perDaySalary, managerId
export const getEventColumns = ({
  setEvent,
}: {
  setEvent: Dispatch<SetStateAction<Event | null>>;
}): ColumnDef<Event>[] => [
  {
    header: "Name",
    accessorKey: "name",
    cell: ({ row }) => (
      <span className="text-xs md:text-lg font-bold text-slate-700 capitalize">
        {row.getValue("name")}
      </span>
    ),
  },
  {
    header: "Start Date",
    accessorKey: "startDateTime",
    cell: ({ row }) => (
      <span className="text-xs md:text-lg font-bold text-slate-700 capitalize">
        {format(
          new Date(row.getValue("startDateTime")),
          "dd MMMM yyyy, hh:mm a"
        )}
      </span>
    ),
  },
  {
    header: "End Date",
    accessorKey: "endDateTime",
    cell: ({ row }) => (
      <span className="text-xs md:text-lg font-bold text-slate-700 capitalize">
        {format(new Date(row.getValue("endDateTime")), "dd MMMM yyyy, hh:mm a")}
      </span>
    ),
  },
  {
    header: "Created At",
    accessorKey: "createdAt",
    cell: ({ row }) => (
      <span className="text-xs md:text-lg font-bold text-slate-700 capitalize">
        {format(new Date(row.getValue("createdAt")), "dd MMMM yyyy, hh:mm a")}
      </span>
    ),
  },
  {
    header: "Categories",
    accessorKey: "categories",
    cell: ({ row }) => {
      const rowData = row.getValue("categories") as [];
      return (
        <span className="text-xs md:text-lg font-bold text-slate-700 capitalize">
          {rowData?.slice(0, 2)?.map(({ category }) => (
            <div> {(category as Category).name}</div>
          ))}
          {rowData?.length > 2 && <span>...</span>}
        </span>
      );
    },
  },
  {
    header: "Actions",
    accessorKey: "",
    cell: ({ row }) => {
      return (
        <div className="flex flex-col md:flex-row gap-5 justify-start w-full">
          <Button
            onClick={() => {
              setEvent({ ...row?.original });
            }}
            className="w-5 md:w-10"
          >
            <Edit2 />
          </Button>
          <Button className="w-5 md:w-10">
            <EyeIcon />
          </Button>
        </div>
      );
    },
  },
];
