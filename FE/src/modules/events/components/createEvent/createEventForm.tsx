import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import addEventSchema from "./validation-schema";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { addDays, format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Textarea } from "@/components/ui/textarea";

const CreateEventForm = () => {
  const form = useForm<z.infer<typeof addEventSchema>>({
    resolver: zodResolver(addEventSchema),
    defaultValues: {
      description: "",
      end: addDays(new Date(), 1),
      name: "",
      start: new Date(),
    },
    reValidateMode: "onChange",
  });
  const onSubmit = (data: z.infer<typeof addEventSchema>) => {
    console.log(data);
  };
  const HHArray = Array.from({ length: 24 }).map((_, i) => i);
  const MMArray = Array.from({ length: 60 }).map((_, i) => i);
  const combineDateAndTime = (payload: {
    time: number;
    label: "start" | "end";
    timeVariable: "HH" | "MM";
  }) => {
    const { label, time, timeVariable } = payload;
    if (label === "start") {
      const resultDate = new Date(form.watch("start"));
      if (timeVariable === "HH") {
        resultDate.setHours(Number(time));
        form.setValue("start", resultDate);
      } else {
        resultDate.setMinutes(Number(time));
        form.setValue("start", resultDate);
      }
    }
    if (label === "end") {
      const resultDate = new Date(form.watch("end"));
      if (timeVariable === "HH") {
        resultDate.setHours(Number(time));
        form.setValue("end", resultDate);
      } else {
        resultDate.setMinutes(Number(time));
        form.setValue("end", resultDate);
      }
    }
  };

  const formatSelectedDateWithTime = (
    selectedDate: Date = new Date(),
    currentSelectedDate: Date
  ) => {
    const hours = currentSelectedDate.getHours();
    const minutes = currentSelectedDate.getMinutes();
    selectedDate?.setHours(hours, minutes, 0, 0);
    return selectedDate;
  };

  return (
    <Dialog>
      <DialogTrigger>
        <Button variant={"default"} className="text-neutral-800">
          Create Event
        </Button>
      </DialogTrigger>
      <DialogContent className="max-h-[calc(100dvh_-_200px)] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Create an event</DialogTitle>
          <DialogDescription>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-8"
              >
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Event name</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Please enter event name"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>
                        This is your event display name.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Brief about the event"
                          className="resize-y"
                          {...field}
                        />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="start"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Start date</FormLabel>
                      <Popover modal>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant={"outline"}
                              className={cn(
                                "w-full pl-3 text-left font-normal",
                                !field.value && "text-muted-foreground"
                              )}
                            >
                              {field.value ? (
                                format(field.value, "PPPP hh:mm")
                              ) : (
                                <span>Pick a date</span>
                              )}
                              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <div className="flex ">
                            <Calendar
                              mode="single"
                              selected={field.value}
                              onSelect={(selectedDate) =>
                                field.onChange(
                                  formatSelectedDateWithTime(
                                    selectedDate,
                                    field.value
                                  )
                                )
                              }
                              disabled={(date) => date <= new Date()}
                              initialFocus
                            />
                            <ScrollArea
                              className="h-72 w-24  border text-center"
                              type="scroll"
                            >
                              <div className="p-4 relative">
                                <h4 className="mb-4 text-sm font-medium leading-none ">
                                  HH
                                </h4>
                                {HHArray.map((tag) => (
                                  <>
                                    <Button
                                      onClick={() =>
                                        combineDateAndTime({
                                          time: tag,
                                          label: "start",
                                          timeVariable: "HH",
                                        })
                                      }
                                      variant={
                                        form.watch("start")?.getHours() === tag
                                          ? "default"
                                          : "outline"
                                      }
                                      key={tag}
                                      className="text-sm my-4 px-5"
                                    >
                                      {tag / 10 < 1 ? `0${tag}` : tag}
                                    </Button>
                                  </>
                                ))}
                              </div>
                            </ScrollArea>
                            <ScrollArea
                              className="h-72 w-24  border text-center"
                              type="hover"
                            >
                              <div className="p-4">
                                <h4 className="mb-4 text-sm font-medium leading-none">
                                  MM
                                </h4>
                                {MMArray.map((tag) => (
                                  <>
                                    <Button
                                      onClick={() =>
                                        combineDateAndTime({
                                          time: tag,
                                          label: "start",
                                          timeVariable: "MM",
                                        })
                                      }
                                      variant={
                                        form.watch("start")?.getMinutes() ===
                                        tag
                                          ? "default"
                                          : "outline"
                                      }
                                      key={tag}
                                      className="text-sm my-4 px-5"
                                    >
                                      {tag / 10 < 1 ? `0${tag}` : tag}
                                    </Button>
                                  </>
                                ))}
                              </div>
                            </ScrollArea>
                          </div>
                        </PopoverContent>
                      </Popover>
                      <FormDescription>
                        Please select start time of event.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="end"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>End date</FormLabel>
                      <Popover modal>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant={"outline"}
                              className={cn(
                                "w-full pl-3 text-left font-normal",
                                !field.value && "text-muted-foreground"
                              )}
                            >
                              {field.value ? (
                                format(field.value, "PPPP hh:mm")
                              ) : (
                                <span>Pick a date</span>
                              )}
                              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <div className="flex ">
                            <Calendar
                              mode="single"
                              selected={field.value}
                              onSelect={(selectedDate) =>
                                field.onChange(
                                  formatSelectedDateWithTime(
                                    selectedDate,
                                    field.value
                                  )
                                )
                              }
                              disabled={(date) =>
                                date.getDate() <= form.watch("start").getDate()
                              }
                              initialFocus
                            />
                            <ScrollArea
                              className="h-72 w-24  border text-center"
                              type="scroll"
                            >
                              <div className="p-4 relative">
                                <h4 className="mb-4 text-sm font-medium leading-none ">
                                  HH
                                </h4>
                                {HHArray.map((tag) => (
                                  <Button
                                    onClick={() =>
                                      combineDateAndTime({
                                        time: tag,
                                        label: "end",
                                        timeVariable: "HH",
                                      })
                                    }
                                    variant={
                                      form.watch("end")?.getHours() === tag
                                        ? "default"
                                        : "outline"
                                    }
                                    key={tag}
                                    className="text-sm my-4 px-5"
                                  >
                                    {tag < 10 ? `0${tag}` : tag}
                                  </Button>
                                ))}{" "}
                              </div>
                              <ScrollBar orientation="horizontal" />
                            </ScrollArea>
                            <ScrollArea
                              className="h-72 w-24  border text-center"
                              type="hover"
                            >
                              <div className="p-4">
                                <h4 className="mb-4 text-sm font-medium leading-none">
                                  MM
                                </h4>
                                {MMArray.map((tag) => (
                                  <>
                                    <Button
                                      onClick={() =>
                                        combineDateAndTime({
                                          time: tag,
                                          label: "end",
                                          timeVariable: "MM",
                                        })
                                      }
                                      variant={
                                        form.watch("end")?.getMinutes() === tag
                                          ? "default"
                                          : "outline"
                                      }
                                      key={tag}
                                      className="text-sm my-4 px-5"
                                    >
                                      {tag / 10 < 1 ? `0${tag}` : tag}
                                    </Button>
                                  </>
                                ))}
                              </div>
                            </ScrollArea>
                          </div>
                        </PopoverContent>
                      </Popover>
                      <FormDescription>
                        Please select end time of event.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" className="flex w-full items-center">
                  Submit
                </Button>
              </form>
            </Form>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default CreateEventForm;
