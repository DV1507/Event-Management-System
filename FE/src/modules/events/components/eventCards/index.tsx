"use client";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useGetProductPostApi } from "../../hooks/useEvent";
import { Event } from "../../types";
import { CommonTable } from "@/components/common/commonTable";
import { getEventColumns } from "./columns";

interface EventListingProps {
  setEvent: Dispatch<SetStateAction<Event | null>>;
  filterCategory: string[];
}

const ProductListing = ({ setEvent, filterCategory }: EventListingProps) => {
  const [events, setEvents] = useState<
    | {
        data: Event[];
        pagination: {
          currentPage: number;
          totalPages: number;
          limit: number;
        };
      }
    | undefined
  >();
  const [page, setPage] = useState<number>(1);

  const { getProductsApi, loading } = useGetProductPostApi();

  const handleFetchEvents = async () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const res: any = await getProductsApi(10, page, filterCategory);
    if (res) {
      console.log("i am here");

      setEvents(res?.data);
    }
  };
  useEffect(() => {
    handleFetchEvents();
  }, [page]);

  useEffect(() => {
    setPage(() => 1);
    handleFetchEvents();
  }, [filterCategory]);

  return (
    <div>
      {events && (
        <CommonTable
          columns={getEventColumns({
            setEvent,
          })}
          data={events}
          isLoading={loading}
          page={page}
          setPage={setPage}
        />
      )}
    </div>
  );
};

export default ProductListing;
